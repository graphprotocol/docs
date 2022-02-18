import { Parser } from 'acorn'
import acornJsx from 'acorn-jsx'

/**
 * This plugin attaches a `getInitialProps` to the existing `MDXContent` page component before exporting it.
 *
 * @type {import('unified').Plugin<[RecmaStringifyOptions]|[], Program, string>}
 **/
export const recmaInitialProps = () => {
  const JSXParser = Parser.extend(acornJsx())

  /** @type {import('unified').CompilerFunction<Program, string>} */
  return (tree) => {
    for (let i = 0; i < tree.body.length; i++) {
      const node = tree.body[i]
      if (
        node.type === 'ExportDefaultDeclaration' &&
        node.declaration.type === 'Identifier' &&
        node.declaration.name === 'MDXContent'
      ) {
        tree.body[i] = JSXParser.parse(
          `
          MDXContent.getInitialProps = async (context) => {
            const locale = context.query.locale
            const navItems = await getNavItems(locale)
          
            return {
              locale,
              navItems,
            }
          }
          export default MDXContent
        `,
          {
            sourceType: 'module',
            ecmaVersion: '2020',
          }
        )
        break
      }
    }

    return tree
  }
}
