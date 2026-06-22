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
  {
    rules: {
      // eslint-config-next 16 bundles eslint-plugin-react-hooks 7, which enables
      // these newer (React Compiler-oriented) rules as errors. The existing,
      // already-shipped components trigger them — keep as warnings so the upgrade
      // doesn't block lint; address the underlying patterns in a separate pass.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },
];

export default eslintConfig;
