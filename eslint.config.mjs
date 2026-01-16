/**
 * ESLint flat config for Next.js 15+ with ESLint 9.
 *
 * This configuration uses the new flat config format required by ESLint 9.
 * It includes the Next.js recommended rules and integrates with Prettier.
 */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * FlatCompat allows using legacy eslintrc-style configs in the new flat config format.
 * This is necessary because eslint-config-next still uses the legacy format.
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js core web vitals rules (includes recommended rules + performance checks)
  ...compat.extends('next/core-web-vitals'),
  // Extend Prettier config to disable formatting rules that conflict with Prettier
  ...compat.extends('prettier'),
];

export default eslintConfig;
