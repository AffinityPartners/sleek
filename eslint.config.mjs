/**
 * ESLint flat config for Next.js 16.
 *
 * eslint-config-next 16 ships native flat configs, so we import them directly.
 * (Previously this used @eslint/eslintrc's FlatCompat to bridge the legacy
 * format, but ESLint's config validator crashes on the bundled plugin objects.)
 */
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'] },
  // Next.js core web vitals (recommended rules + performance checks)
  ...nextCoreWebVitals,
  // Disable formatting rules that conflict with Prettier
  prettier,
];

export default eslintConfig;
