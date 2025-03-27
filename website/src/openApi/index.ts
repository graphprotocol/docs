import type { OpenAPIV3_1 } from 'openapi-types'

import { camelToKebab } from '@edgeandnode/gds'

import tokenApi from './tokenApi.json'

export const API_IDS = ['tokenApi'] as const

export const APIS = {
  tokenApi: {
    name: 'Token API',
    url: 'https://token-api.thegraph.com/openapi',
    document: tokenApi as OpenAPIV3_1.Document,
    sections: {
      EVM: '/token-api/evm',
      Monitoring: '/token-api/monitoring',
    },
  },
} satisfies Record<ApiId, ApiConfig>

export type ApiId = (typeof API_IDS)[number]

export type ApiConfig = {
  name: string
  url: string
  document: OpenAPIV3_1.Document
  sections: Record<string, string>
}

export type ApiSection = {
  name: string
  path: string
  operations: ApiOperation[]
}

export type ApiParameter = Omit<OpenAPIV3_1.ParameterObject, 'schema' | 'content'> & {
  schema: Omit<OpenAPIV3_1.SchemaObject, 'description'>
  serializationFormat?: string
}

export type ApiSecurityScheme = OpenAPIV3_1.SecuritySchemeObject & {
  schemeId: string
  name: string
  scheme?: string
  bearerFormat?: string
  in?: string
}

export type ApiPotentialResponse = Omit<OpenAPIV3_1.ResponseObject, 'content' | 'links'> & {
  status: string
  schema: OpenAPIV3_1.SchemaObject
  example: any
}

export type ApiOperation = Omit<OpenAPIV3_1.OperationObject, 'responses'> & {
  operationId: string
  slug: string
  method: string
  baseUrl: string
  path: string
  pathParameters: ApiParameter[]
  queryParameters: ApiParameter[]
  headerParameters: ApiParameter[]
  cookieParameters: ApiParameter[]
  securitySchemes: ApiSecurityScheme[]
  potentialResponses: ApiPotentialResponse[]
}

export type Api = {
  config: Omit<ApiConfig, 'document'>
  document: OpenAPIV3_1.Document
  sections: Record<string, ApiSection>
  operations: Record<string, ApiOperation>
}

export const isApiId = (value: string): value is ApiId => API_IDS.includes(value as ApiId)

function isParameterObject(
  value: OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject,
): value is OpenAPIV3_1.ParameterObject {
  return !('$ref' in value) && 'in' in value
}

function transformParameter(parameter: OpenAPIV3_1.ParameterObject): ApiParameter {
  const schema = (
    parameter.content ? Object.values(parameter.content)[0]?.schema : parameter.schema
  ) as OpenAPIV3_1.SchemaObject
  return {
    ...parameter,
    schema,
    description: parameter.description ?? schema.description ?? undefined,
    required: parameter.required ?? schema.required?.includes(parameter.name) ?? false,
    serializationFormat: parameter.content ? Object.keys(parameter.content)[0] : undefined,
  }
}

export function getApi(apiId: ApiId, passedDocument?: OpenAPIV3_1.Document): Api {
  const api = APIS[apiId]
  const { document: staticDocument, ...config } = api
  const document = passedDocument || staticDocument

  const sections: Record<string, ApiSection> = {}
  const operations: Record<string, ApiOperation> = {}

  for (const [path, documentPath] of Object.entries(document.paths ?? {})) {
    if (!documentPath) continue
    for (const [method, documentOperation] of Object.entries(documentPath)) {
      if (typeof documentOperation !== 'object' || !('tags' in documentOperation) || !documentOperation.tags) continue

      // Get the section name and path from the tags
      const sectionName = documentOperation.tags.find((tag) => tag in config.sections) as
        | keyof typeof config.sections
        | undefined
      const sectionPath = sectionName ? config.sections[sectionName] : undefined
      if (!sectionName || !sectionPath || !('operationId' in documentOperation) || !documentOperation.operationId) {
        continue
      }
      if (!sections[sectionName]) {
        sections[sectionName] = {
          name: sectionName,
          path: sectionPath,
          operations: [],
        }
      }

      // Get the first production-looking server URL and ensure it has no trailing slash (known limitation: we only support one server)
      const servers = documentOperation.servers ?? documentPath.servers ?? document.servers
      const server =
        servers?.find((server) => server.description?.toLowerCase().includes('production')) ??
        servers?.find((server) => !server.url.includes('localhost'))
      const baseUrl = server?.url.replace(/\/$/, '') ?? ''

      const parameters = (documentOperation.parameters ?? []).filter(isParameterObject)
      const securitySchemes: ApiSecurityScheme[] = []
      const securityRequirements = documentOperation.security ?? document.security ?? []
      for (const securityRequirement of securityRequirements) {
        for (const [schemeId, _scopes] of Object.entries(securityRequirement)) {
          const securityScheme = document.components?.securitySchemes?.[schemeId]
          if (securityScheme && !('$ref' in securityScheme)) {
            securitySchemes.push({
              ...securityScheme,
              schemeId,
              name: 'name' in securityScheme ? securityScheme.name : schemeId,
              description:
                ('description' in securityScheme ? securityScheme.description : undefined) ??
                (securityScheme.type === 'http' && securityScheme.scheme === 'bearer'
                  ? `Bearer Token${securityScheme.bearerFormat ? ` (${securityScheme.bearerFormat})` : ''}`
                  : undefined),
            })
          }
        }
      }

      const potentialResponses: ApiPotentialResponse[] = []
      for (const [status, response] of Object.entries(documentOperation.responses)) {
        if (!('content' in response) || typeof response.content !== 'object') continue
        const content = response.content['application/json'] ?? response.content['text/plain']
        if (!content || '$ref' in content || !content.schema || '$ref' in content.schema) continue
        potentialResponses.push({
          ...response,
          status,
          schema: content.schema,
          example: content.example,
        })
      }

      const operation: ApiOperation = {
        ...documentOperation,
        operationId: documentOperation.operationId,
        slug: camelToKebab(documentOperation.operationId),
        method: method.toUpperCase(),
        baseUrl,
        path,
        pathParameters: parameters.filter((p) => p.in === 'path').map(transformParameter),
        queryParameters: parameters.filter((p) => p.in === 'query').map(transformParameter),
        headerParameters: parameters.filter((p) => p.in === 'header').map(transformParameter),
        cookieParameters: parameters.filter((p) => p.in === 'cookie').map(transformParameter),
        securitySchemes,
        potentialResponses,
      }
      operations[operation.operationId] = operation
      sections[sectionName].operations.push(operation)
    }
  }

  return {
    config,
    document,
    sections,
    operations,
  }
}
