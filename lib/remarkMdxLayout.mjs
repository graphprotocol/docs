import path from 'path'
import process from 'process'

import { slugifyWithCounter } from '@sindresorhus/slugify'
import { Parser } from 'acorn'
import acornJsx from 'acorn-jsx'
import merge from 'lodash/merge'
import { Serializer } from 'serialize-as-code'
import { visit } from 'unist-util-visit'

/**
 * This plugin customizes MDX pages by wrapping their content in an `MDXLayout` component, and generates their outline based on the headings they contain.
 *
 * @type {import('unified').Plugin<[], import('mdast').Root>}
 **/
export const remarkMdxLayout = () => {
  const JSXParser = Parser.extend(acornJsx())

  const getAstToInject = (pagePath, outline) => {
    const locale = pagePath.split('/')[0]

    return {
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: JSXParser.parse(
          `
          import { MDXLayout as _MDXLayout } from '@/layout'
          import { getNavItems } from '@/navigation'
  
          const outline = ${Serializer.run(outline)}
  
          export const getStaticProps = async () => {
            const locale = '${locale}'
            const navItems = await getNavItems(locale)

            return {
              props: {
                locale,
                navItems,
              },
            }
          }

          export default function ({ navItems, children }) {
            return (
              <_MDXLayout
                pagePath="${pagePath}"
                navItems={navItems}
                frontmatter={typeof frontmatter !== 'undefined' ? frontmatter : undefined}
                outline={outline}
              >
                {children}
              </_MDXLayout>
            )
          }
        `,
          {
            sourceType: 'module',
            ecmaVersion: '2020',
          }
        ),
      },
    }
  }

  return (tree, file) => {
    const slugify = slugifyWithCounter()
    const outline = []
    let headingCount = 0

    visit(tree, 'heading', (heading) => {
      headingCount++
      let headingText = ''

      visit(heading, 'text', (textNode) => {
        headingText = `${headingText}${textNode.value}`
      })

      const headingId = slugify(headingText) || `heading-${headingCount}`

      heading.data = merge(heading.data, {
        hProperties: {
          id: headingId,
        },
      })

      outline.push({
        id: headingId,
        title: headingText,
        level: heading.depth,
      })
    })

    const pagePath = path.relative(path.join(process.cwd(), 'pages'), file.path)
    const astToInject = getAstToInject(pagePath, outline)

    tree.children.push(astToInject)
  }
}
