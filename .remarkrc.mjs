import remarkFrontmatter from 'remark-frontmatter'

/**
 * This config is used by `eslint-plugin-mdx` to lint the MDX files, not by Nextra.
 * Nextra uses the remark and rehype plugins registered in `next.config.js`, under `mdxOptions`.
 */
export default {
  plugins: [
    remarkFrontmatter,
    ['remark-lint-first-heading-level', 2],
    ['remark-lint-restrict-elements', { type: 'heading', depth: 1 }],
    'remark-lint-heading-increment',
    ['remark-lint-no-heading-punctuation', '\\.,;:'],
  ],
}
