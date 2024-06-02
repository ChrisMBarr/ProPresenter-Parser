// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    files: ['src/**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.strict],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'warn',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'warn',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
      'no-return-await': 'off',
      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',

      'array-callback-return': 'warn',
      complexity: ['warn', { max: 8 }],
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      'no-unused-vars': 'warn',
      'object-shorthand': ['warn', 'always'],

      'simple-import-sort/imports': 'warn',
    },
  },
  {
    files: ['*.spec.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }
);
