import { HTTPSnippet } from '@readme/httpsnippet'
import fetchHar from 'fetch-har'
import { type ComponentPropsWithoutRef, useContext, useState } from 'react'

import { ExperimentalButton, ExperimentalCodeBlock, ExperimentalInput, objectKeys } from '@edgeandnode/gds'
import { Play } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

import { OpenApiContext } from './OpenApiContext'

const PLACEHOLDERS = {
  apiKey: '{api-key}',
  token: '{token}',
}

export default function TemplateOpenApiAside(props: ComponentPropsWithoutRef<'div'>) {
  const openApiContext = useContext(OpenApiContext)

  if (!openApiContext) {
    return null
  }

  return <TemplateOpenApiAsideContent {...props} />
}

function TemplateOpenApiAsideContent(props: ComponentPropsWithoutRef<'div'>) {
  const openApiContext = useContext(OpenApiContext)!
  const { operation, values } = openApiContext
  const { t } = useI18n()

  // Replace path parameters with actual values
  let url = `${operation.baseUrl}${operation.path}`
  operation.pathParameters.forEach((parameter) => {
    const value = values.pathParameters.get(parameter.name)
    if (value !== undefined && value !== '') {
      url = url.replace(`{${parameter.name}}`, decodeURIComponent(String(value)))
    }
  })

  // Known limitation: we only support one security scheme, and it must be of type `apiKey` or `http` with scheme `bearer`
  const securityScheme = operation.securitySchemes.find(
    (scheme) => scheme.type === 'apiKey' || (scheme.type === 'http' && scheme.scheme === 'bearer'),
  )
  const securitySchemeValue = securityScheme ? (values.securitySchemes.get(securityScheme.name) ?? '') : ''
  const setSecuritySchemeValue = (value: string) => {
    if (!securityScheme) return
    values.securitySchemes.set(securityScheme.name, value)
  }

  // Build query string array
  const queryString = []
  if (securityScheme?.type === 'apiKey' && securityScheme.in === 'query') {
    queryString.push({ name: securityScheme.name, value: securitySchemeValue || PLACEHOLDERS.apiKey })
  }
  operation.queryParameters.forEach((parameter) => {
    const value = values.queryParameters.get(parameter.name)
    if (value !== undefined && value !== '') {
      queryString.push({
        name: parameter.name,
        value: String(value),
      })
    }
  })

  // Build headers array
  const headers = []
  if (securityScheme?.type === 'http' && securityScheme.scheme === 'bearer') {
    headers.push({ name: 'Authorization', value: `Bearer ${securitySchemeValue || PLACEHOLDERS.token}` })
  }
  if (securityScheme?.type === 'apiKey' && securityScheme.in === 'header') {
    headers.push({ name: securityScheme.name, value: securitySchemeValue || PLACEHOLDERS.apiKey })
  }
  operation.headerParameters.forEach((parameter) => {
    const value = values.headerParameters.get(parameter.name)
    if (value !== undefined && value !== '') {
      headers.push({
        name: parameter.name,
        value: String(value),
      })
    }
  })

  // Build cookies array
  const cookies = []
  if (securityScheme?.type === 'apiKey' && securityScheme.in === 'cookie') {
    cookies.push({ name: securityScheme.name, value: securitySchemeValue || PLACEHOLDERS.apiKey })
  }
  operation.cookieParameters.forEach((parameter) => {
    const value = values.cookieParameters.get(parameter.name)
    if (value !== undefined && value !== '') {
      cookies.push({
        name: parameter.name,
        value: String(value),
      })
    }
  })

  const snippet = new HTTPSnippet({
    method: operation.method,
    url,
    queryString,
    headers,
    cookies,
    // Not sure why these are required
    postData: { mimeType: 'application/json' },
    httpVersion: 'HTTP/1.1',
    headersSize: -1,
    bodySize: -1,
  })

  const snippetLanguages = {
    shell: 'cURL',
    javascript: 'JavaScript',
    python: 'Python',
    go: 'Go',
    // TODO: Add `php` and `java` after GDS update
  }

  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [responseStatus, setResponseStatus] = useState<number | null>(null)
  const [responseText, setResponseText] = useState<string | null>(null)

  const sendRequest = async () => {
    setIsSendingRequest(true)
    try {
      // fetch-har's types are bad
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await fetchHar({ log: { entries: snippet.entries } } as any)
      setResponseStatus(response.status)
      let text = await response.text()
      try {
        const data = JSON.parse(text)
        text = JSON.stringify(data, null, 2)
      } catch {}
      setResponseText(text)
    } catch (error) {
      console.error({ error })
      setResponseStatus(null)
      setResponseText(null)
    }
    setIsSendingRequest(false)
  }

  const actualResponseLabel =
    responseStatus && responseText ? `${t('global.openApi.responses.actualResponse')} (${responseStatus})` : undefined
  const responseTabs = [
    ...(actualResponseLabel
      ? [
          {
            label: actualResponseLabel,
            content: (
              <ExperimentalCodeBlock
                key="actual-response"
                label={operation.potentialResponses.length === 0 ? actualResponseLabel : undefined}
                language="json"
              >
                {responseText!}
              </ExperimentalCodeBlock>
            ),
          },
        ]
      : []),
    ...operation.potentialResponses.map((potentialResponse) => {
      const label = `${t('global.openApi.responses.exampleResponse')} (${potentialResponse.status})`
      return {
        label: operation.potentialResponses.length === 1 && actualResponseLabel ? label : potentialResponse.status,
        content: (
          <ExperimentalCodeBlock
            key={potentialResponse.status}
            label={operation.potentialResponses.length === 1 && !actualResponseLabel ? label : undefined}
            language="json"
          >
            {JSON.stringify(potentialResponse.example, null, 2)}
          </ExperimentalCodeBlock>
        ),
      }
    }),
  ]

  return (
    <div key={operation.path} {...props}>
      <ExperimentalInput
        label={t('global.openApi.request.label')}
        placeholder={
          securityScheme
            ? (securityScheme.description ?? securityScheme.name)
            : t('global.openApi.request.noCredentialsRequired')
        }
        disabled={!securityScheme}
        value={securitySchemeValue}
        onChange={setSecuritySchemeValue}
        trailingAction={
          <ExperimentalButton
            variant="primary"
            size="small"
            onClick={() => void sendRequest()}
            loading={isSendingRequest}
          >
            <Play variant="fill" alt={t('global.openApi.request.send')} />
          </ExperimentalButton>
        }
        className="mb-6"
      />
      <ExperimentalCodeBlock.Tabs tabs={Object.values(snippetLanguages)}>
        {objectKeys(snippetLanguages).map((language) => {
          let code = (snippet.convert(language) || [])[0] ?? ''
          // Unencode placeholders potentially present in the URL
          for (const placeholder of [
            ...Object.values(PLACEHOLDERS),
            ...operation.pathParameters.map((parameter) => `{${parameter.name}}`),
          ]) {
            const encodedPlaceholder = encodeURIComponent(placeholder)
            code = code.replaceAll(encodedPlaceholder, placeholder)
          }
          return (
            <ExperimentalCodeBlock
              key={language}
              language={language}
              className="[tab-size:4]" // TODO: Remove after GDS update
            >
              {code}
            </ExperimentalCodeBlock>
          )
        })}
      </ExperimentalCodeBlock.Tabs>
      {responseTabs.length === 1 ? (
        <div className="mt-6">{responseTabs[0]!.content}</div>
      ) : (
        <ExperimentalCodeBlock.Tabs tabs={responseTabs.map((responseTab) => responseTab.label)} className="mt-6">
          {responseTabs.map((responseTab) => responseTab.content)}
        </ExperimentalCodeBlock.Tabs>
      )}
    </div>
  )
}
