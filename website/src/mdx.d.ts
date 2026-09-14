// Allow importing `.mdx` files as React components (used for per-network
// custom content on Supported Networks pages). Nextra's MDX loader compiles
// these at build time; this declaration just gives TypeScript a type for them.
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}
