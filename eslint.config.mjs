import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'ctrf/**',
      'scripts/**',
    ],
  },
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    files: ['tests/api-tests/**/*.ts'],
    rules: {
      // API tests often assert different outcomes by HTTP status (200 vs auth errors).
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-conditional-expect': 'off',
    },
  },
);
