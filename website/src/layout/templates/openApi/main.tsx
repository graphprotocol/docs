import { useMap } from '@react-hookz/web'
import { type ComponentPropsWithoutRef, useContext } from 'react'

import { ExperimentalCodeInline } from '@edgeandnode/gds'

import { Callout } from '@/components'
import { getApi, isApiId } from '@/openApi'

import { LayoutContext } from '../../shared'
import TemplateDefaultMain from '../default/main'

import { OpenApiProvider } from './OpenApiContext'

export default function TemplateOpenApiMain({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const { template } = useContext(LayoutContext)!
  const securitySchemes = useMap<string, string>() // Keeping this state here instead of in `OpenApiProvider` to persist it across OpenAPI pages

  if (template.type !== 'openApi' || !isApiId(template.apiId)) {
    return (
      <TemplateDefaultMain {...props}>
        <Callout variant="important">
          <p>
            Could not retrieve API{' '}
            <ExperimentalCodeInline>{'apiId' in template ? template.apiId : '<undefined>'}</ExperimentalCodeInline>.
          </p>
        </Callout>
      </TemplateDefaultMain>
    )
  }

  const api = getApi(template.apiId)
  const operation = api.operations[template.operationId]

  if (!operation) {
    return (
      <TemplateDefaultMain {...props}>
        <Callout variant="important">
          <p>
            Could not retrieve operation <ExperimentalCodeInline>{template.operationId}</ExperimentalCodeInline> in API{' '}
            <ExperimentalCodeInline>{template.apiId}</ExperimentalCodeInline>.
          </p>
        </Callout>
      </TemplateDefaultMain>
    )
  }

  return (
    <OpenApiProvider key={template.operationId} api={api} operation={operation} securitySchemes={securitySchemes}>
      <TemplateDefaultMain {...props}>{children}</TemplateDefaultMain>
    </OpenApiProvider>
  )
}
