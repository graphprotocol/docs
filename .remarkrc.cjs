module.exports = {
  plugins: [
    'frontmatter', // should be defined
    ['remark-lint-first-heading-level', 2],
    ['remark-lint-restrict-elements', { type: 'heading', depth: 1 }],
    'remark-lint-heading-increment',
    ['remark-lint-no-heading-punctuation', '\\.,;:'],
  ],
}
