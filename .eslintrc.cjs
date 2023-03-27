module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
      extends: ['@edgeandnode/eslint-config', '@edgeandnode/eslint-config/next'],
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: require.resolve('./tsconfig.json'),
      },
    },
    {
      files: ['website/pages/en/**/*.{md,mdx}'],
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      rules: {
        'mdx/remark': 'error',
      },
      parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
      },
    },
  ],
}
