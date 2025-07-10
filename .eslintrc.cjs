module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
      // to lint graphql documents marked with /* GraphQL */ comments inside js/ts codeblocks in markdown
      processor: '@graphql-eslint/graphql',
      plugins: ['@graphql-eslint'],
      extends: ['@edgeandnode/eslint-config', '@edgeandnode/eslint-config/next'],
      settings: {
        next: { rootDir: 'website' },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      excludedFiles: ['**/*.{md,mdx}/*.{ts,tsx}'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    {
      // We lint only english pages because other languages will be translated from english
      files: ['website/pages/en/**/*.{md,mdx}'],
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      rules: {
        'mdx/remark': 'error',
      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    {
      files: ['**/*.{md,mdx}/*.{ts,tsx}'],
      rules: {
        // Disables rules that requires type information
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'off',
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-return-this-type': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        // Disable rules for code-blocks
        'no-restricted-globals': 'off',
      },
    },
    {
      files: ['**/*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
    },
  ],
}
