module.exports = {
  extends: ['@edgeandnode/eslint-config', '@edgeandnode/eslint-config/next'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: require.resolve('./tsconfig.json'),
      },
    },
  ],
}
