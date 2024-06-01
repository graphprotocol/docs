/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 120,
  proseWrap: 'never',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './website/tailwind.config.ts',
  tailwindPreserveWhitespace: true,
  tailwindFunctions: ['classNames'],
  overrides: [
    {
      files: ['**/tsconfig.json'],
      options: {
        trailingComma: 'none', // temporary fix for "JSON does not support trailing commas" errors on `nextra-theme` build
      },
    },
  ],
}
