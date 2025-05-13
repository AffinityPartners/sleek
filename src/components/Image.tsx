import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  sizes?: string;
}

export default function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  quality = 80,
  sizes,
  ...props
}: ImageProps) {
  // If the source is from the public folder, it starts with a slash
  const isLocalImage = src.startsWith('/');

  // For local images in public folder
  if (isLocalImage) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('', className)}
        priority={priority}
        fill={fill}
        quality={quality}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        {...props}
      />
    );
  }

  // For remote images
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('', className)}
      priority={priority}
      fill={fill}
      quality={quality}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      {...props}
    />
  );
} 