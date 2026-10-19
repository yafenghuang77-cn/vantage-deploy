import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const sourceFiles = ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'];
const typescriptFiles = ['**/*.{ts,tsx,cts,mts}'];

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'public/pdfjs/**',
    '.husky/_/**',
    '.pnpm-store/**',
    '.swc/**',
    '.turbopack/**',
    'next-env.d.ts',
    '**/*.min.js',
  ]),
  { files: sourceFiles, rules: js.configs.recommended.rules },
  ...nextVitals.map((config) =>
    config.name === 'next' ? { ...config, files: sourceFiles } : config,
  ),
  ...nextTs,
  {
    files: sourceFiles,
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'array-callback-return': 'error',
      'guard-for-in': 'error',
      'no-eval': 'error',
      'no-global-assign': 'error',
      'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'disallow' }],
      'no-constant-condition': ['error', { checkLoops: true }],
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'react/button-has-type': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-string-refs': 'error',
      'react/no-render-return-value': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react-hooks/rules-of-hooks': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react(?:$|/)', '^react-dom(?:$|/)'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: typescriptFiles,
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-invalid-this': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    ...jest.configs['flat/recommended'],
    files: ['tests/setup.{ts,tsx,js,jsx}', 'tests/unit/**/*.{ts,tsx,js,jsx}'],
  },
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: { sourceType: 'commonjs' },
  },
  prettier,
  {
    files: sourceFiles,
    // Keep the original project's required braces after the Prettier preset.
    rules: { curly: ['error', 'all'] },
  },
]);
