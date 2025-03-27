import { type ReactNode, useContext } from 'react'

import * as defaultParts from './templates/default'
import * as openApiParts from './templates/openApi'
import { LayoutContext } from './shared'

const partsByTemplate = {
  default: defaultParts,
  openApi: openApiParts,
}

interface TemplateProps {
  part: keyof typeof defaultParts
  children?: ReactNode
}

export function Template({ part, children }: TemplateProps) {
  const { template } = useContext(LayoutContext)!
  const parts = partsByTemplate[template.type] as Record<string, (typeof defaultParts)[typeof part]>
  const Part = parts[part] ?? defaultParts[part]
  return <Part>{children}</Part>
}
