// @ts-check

/** @type {import('prettier').Options} */
export default {
  singleQuote: true,
  semi: false,
  printWidth: 120,
  proseWrap: 'never',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './website/tailwind.config.mjs',
  tailwindPreserveWhitespace: true,
  tailwindFunctions: ['classNames'],
}
