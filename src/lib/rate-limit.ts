/**
 * In-memory rate limiter using a sliding window algorithm.
 *
 * This module provides IP-based rate limiting to protect API endpoints from abuse.
 * It uses an in-memory Map to track request timestamps per identifier (typically IP address).
 *
 * IMPORTANT: This implementation works well for single-instance deployments.
 * For serverless environments (Vercel, AWS Lambda) or multi-instance setups,
 * consider using a distributed rate limiter like @upstash/ratelimit with Redis.
 *
 * Features:
 * - Sliding window algorithm for smooth rate limiting
 * - Automatic cleanup of stale entries to prevent memory leaks
 * - Configurable request limits and time windows
 * - Returns remaining requests and reset time for client feedback
 */

/**
 * Configuration options for the rate limiter.
 */
interface RateLimitConfig {
  /** Maximum number of requests allowed within the time window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

/**
 * Result returned from a rate limit check.
 */
interface RateLimitResult {
  /** Whether the request is allowed (under the limit) */
  allowed: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Timestamp (in ms) when the rate limit window resets */
  resetTime: number;
  /** Number of requests made in the current window */
  current: number;
}

/**
 * In-memory store for tracking request timestamps by identifier.
 * Key: identifier (e.g., IP address)
 * Value: array of request timestamps (in milliseconds)
 */
const requestStore = new Map<string, number[]>();

/**
 * Interval handle for the cleanup process.
 * Stored to allow for cleanup cancellation if needed.
 */
let cleanupInterval: NodeJS.Timeout | null = null;

/**
 * Default configuration for rate limiting.
 * 5 requests per minute per IP is a reasonable default for form submissions.
 */
const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
};

/**
 * Starts the periodic cleanup process to remove stale entries from memory.
 * This prevents the requestStore from growing indefinitely.
 *
 * Cleanup runs every 5 minutes and removes entries older than the cleanup threshold.
 *
 * @param windowMs - The rate limit window in milliseconds (used to calculate cleanup threshold)
 */
function startCleanupProcess(windowMs: number): void {
  // Only start if not already running
  if (cleanupInterval) return;

  // Run cleanup every 5 minutes
  const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
  // Remove entries that are older than 2x the window (generous buffer)
  const cleanupThreshold = windowMs * 2;

  cleanupInterval = setInterval(() => {
    const now = Date.now();
    let entriesRemoved = 0;

    for (const [identifier, timestamps] of Array.from(requestStore.entries())) {
      // Filter out timestamps older than the cleanup threshold
      const validTimestamps = timestamps.filter(
        (ts) => now - ts < cleanupThreshold
      );

      if (validTimestamps.length === 0) {
        // No valid timestamps left, remove the entire entry
        requestStore.delete(identifier);
        entriesRemoved++;
      } else if (validTimestamps.length < timestamps.length) {
        // Some timestamps were removed, update the entry
        requestStore.set(identifier, validTimestamps);
      }
    }

    if (entriesRemoved > 0) {
      console.log(
        `Rate limiter cleanup: removed ${entriesRemoved} stale entries`
      );
    }
  }, CLEANUP_INTERVAL_MS);

  // Ensure the cleanup interval doesn't prevent the process from exiting
  // This is important for serverless environments
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

/**
 * Checks if a request from the given identifier is allowed under the rate limit.
 *
 * Uses a sliding window algorithm:
 * 1. Retrieves all timestamps for the identifier
 * 2. Filters to only include timestamps within the current window
 * 3. Checks if the count is under the limit
 * 4. If allowed, records the new request timestamp
 *
 * @param identifier - Unique identifier for the requester (typically IP address)
 * @param config - Optional rate limit configuration (defaults to 5 requests per minute)
 * @returns RateLimitResult object with allowed status and metadata
 *
 * @example
 * ```ts
 * const result = checkRateLimit('192.168.1.1');
 * if (!result.allowed) {
 *   return new Response('Too many requests', { status: 429 });
 * }
 * ```
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitResult {
  const { maxRequests, windowMs } = config;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Start cleanup process if not already running
  startCleanupProcess(windowMs);

  // Get existing timestamps for this identifier
  const timestamps = requestStore.get(identifier) || [];

  // Filter to only include timestamps within the current window
  const validTimestamps = timestamps.filter((ts) => ts > windowStart);

  // Calculate the reset time (when the oldest request in window expires)
  const resetTime =
    validTimestamps.length > 0 ? validTimestamps[0] + windowMs : now + windowMs;

  // Check if under the limit
  const allowed = validTimestamps.length < maxRequests;
  const remaining = Math.max(0, maxRequests - validTimestamps.length - (allowed ? 1 : 0));

  if (allowed) {
    // Record this request
    validTimestamps.push(now);
    requestStore.set(identifier, validTimestamps);
  }

  return {
    allowed,
    remaining,
    resetTime,
    current: validTimestamps.length,
  };
}

/**
 * Extracts the client IP address from a Request object.
 *
 * Checks headers in order of preference:
 * 1. x-forwarded-for (standard proxy header, takes first IP in chain)
 * 2. x-real-ip (alternative proxy header)
 * 3. Falls back to 'unknown' if no IP can be determined
 *
 * Note: The x-forwarded-for header can contain multiple IPs separated by commas.
 * The first one is the original client IP.
 *
 * @param request - The incoming Request object
 * @returns The client's IP address or 'unknown'
 *
 * @example
 * ```ts
 * const ip = getClientIp(request);
 * const rateLimitResult = checkRateLimit(ip);
 * ```
 */
export function getClientIp(request: Request): string {
  // x-forwarded-for can contain multiple IPs: "client, proxy1, proxy2"
  // We want the first one (the original client)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  // Alternative header used by some proxies
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  // Fallback - in production this should rarely happen if behind a proxy
  return 'unknown';
}

/**
 * Creates rate limit headers for the response.
 *
 * These headers follow common rate limiting conventions and help clients
 * understand their rate limit status:
 * - X-RateLimit-Limit: Maximum requests allowed in window
 * - X-RateLimit-Remaining: Requests remaining in current window
 * - X-RateLimit-Reset: Unix timestamp when the window resets
 *
 * @param result - The rate limit check result
 * @param maxRequests - The maximum requests allowed (for the Limit header)
 * @returns Headers object to spread into the response
 *
 * @example
 * ```ts
 * const headers = createRateLimitHeaders(result, 5);
 * return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers });
 * ```
 */
export function createRateLimitHeaders(
  result: RateLimitResult,
  maxRequests: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}

/**
 * Pre-configured rate limit settings for different use cases.
 * Import and use these instead of creating custom configs for consistency.
 */
export const RATE_LIMITS = {
  /** Standard form submission: 5 requests per minute */
  FORM_SUBMISSION: { maxRequests: 5, windowMs: 60 * 1000 },
  /** Strict limit for sensitive operations: 3 requests per minute */
  STRICT: { maxRequests: 3, windowMs: 60 * 1000 },
  /** Relaxed limit for less sensitive operations: 20 requests per minute */
  RELAXED: { maxRequests: 20, windowMs: 60 * 1000 },
  /** API calls: 60 requests per minute */
  API: { maxRequests: 60, windowMs: 60 * 1000 },
} as const;
