import { useMap } from '@react-hookz/web'
import { createContext, type ReactNode } from 'react'

import { objectFromEntries, useRefWithInit } from '@edgeandnode/gds'

import type { Api, ApiOperation } from '@/openApi'

export const PARAMETER_TYPES = ['pathParameters', 'queryParameters', 'headerParameters', 'cookieParameters'] as const

export type ParameterValue = string | boolean

type OpenApiContextValue = {
  api: Api
  operation: ApiOperation
  values: {
    pathParameters: Map<string, ParameterValue>
    queryParameters: Map<string, ParameterValue>
    headerParameters: Map<string, ParameterValue>
    cookieParameters: Map<string, ParameterValue>
    securitySchemes: Map<string, string>
  }
}

export const OpenApiContext = createContext<OpenApiContextValue | null>(null)

interface OpenApiProviderProps {
  api: Api
  operation: ApiOperation
  securitySchemes: OpenApiContextValue['values']['securitySchemes']
  children: ReactNode
}

export function OpenApiProvider({ api, operation, securitySchemes, children }: OpenApiProviderProps) {
  const initialValues = useRefWithInit(() =>
    objectFromEntries(
      PARAMETER_TYPES.map((parameterType) => {
        return [
          parameterType,
          operation[parameterType].map((parameter) => {
            const defaultOrExampleValue =
              'default' in parameter.schema
                ? parameter.schema.default
                : 'example' in parameter.schema
                  ? parameter.schema.example
                  : 'enum' in parameter.schema && parameter.schema.enum?.length
                    ? parameter.schema.enum[0]
                    : undefined
            const initialValue: ParameterValue =
              typeof defaultOrExampleValue === 'string' || typeof defaultOrExampleValue === 'boolean'
                ? defaultOrExampleValue
                : defaultOrExampleValue !== undefined
                  ? String(defaultOrExampleValue)
                  : parameter.schema.type === 'boolean'
                    ? false
                    : ''
            return [parameter.name, initialValue] as const
          }),
        ]
      }),
    ),
  )

  const pathParameters = useMap(initialValues.current.pathParameters)
  const queryParameters = useMap(initialValues.current.queryParameters)
  const headerParameters = useMap(initialValues.current.headerParameters)
  const cookieParameters = useMap(initialValues.current.cookieParameters)

  return (
    <OpenApiContext.Provider
      value={{
        api,
        operation,
        values: {
          pathParameters,
          queryParameters,
          headerParameters,
          cookieParameters,
          securitySchemes,
        },
      }}
    >
      {children}
    </OpenApiContext.Provider>
  )
}
