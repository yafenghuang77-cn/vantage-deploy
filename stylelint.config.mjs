const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    '**/node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'public/pdfjs/**',
    '.pnpm-store/**',
    '**/*.min.css',
  ],
  overrides: [
    {
      files: ['src/app/globals.css'],
      // Tailwind resolves the package name from a string import.
      rules: { 'import-notation': 'string' },
    },
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-standard-less'],
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-syntaxes'] },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'source',
          'apply',
          'reference',
          'config',
          'plugin',
        ],
      },
    ],
  },
};

export default stylelintConfig;
