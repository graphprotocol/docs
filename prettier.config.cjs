module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 120,
  proseWrap: 'never',
  plugins: [
    // for sort fields in package.json
    require('prettier-plugin-pkg'),
  ],
}
