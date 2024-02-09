/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 120,
  proseWrap: 'never',
  overrides: [
    {
      files: ['**/tsconfig.json'],
      options: {
        trailingComma: 'none', // temporary fix for "JSON does not support trailing commas" errors on `nextra-theme` build
      },
    },
  ],
}
