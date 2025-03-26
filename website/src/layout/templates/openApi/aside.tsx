import { usePrevious } from '@react-hookz/web'
import { HTTPSnippet } from '@readme/httpsnippet'
import fetchHar from 'fetch-har'
import { type ComponentPropsWithoutRef, useContext, useState } from 'react'

import {
  ExperimentalButton,
  ExperimentalCodeBlock,
  ExperimentalInput,
  ExperimentalStatus,
  objectEntries,
  objectFromEntries,
  objectKeys,
} from '@edgeandnode/gds'
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

// TODO: Allow showing the aside on mobile?
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
    php: 'PHP',
    java: 'Java',
  } as const

  const snippets = objectFromEntries(
    objectKeys(snippetLanguages).map((language) => {
      let code = (snippet.convert(language) || [])[0] ?? ''
      // Unencode placeholders potentially present in the URL
      for (const placeholder of [
        ...Object.values(PLACEHOLDERS),
        ...operation.pathParameters.map((parameter) => `{${parameter.name}}`),
      ]) {
        const encodedPlaceholder = encodeURIComponent(placeholder)
        code = code.replaceAll(encodedPlaceholder, placeholder)
      }
      return [language, code] as const
    }),
  )

  const previousShellSnippet = usePrevious(snippets.shell)
  const snippetsChanged = previousShellSnippet !== undefined && previousShellSnippet !== snippets.shell

  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [response, setResponse] = useState<{ status: number; text: string } | null>(null)

  const sendRequest = async () => {
    setIsSendingRequest(true)
    try {
      // fetch-har's types are bad
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await fetchHar({ log: { entries: snippet.entries } } as any)
      let responseText = await response.text()
      try {
        responseText = JSON.parse(responseText)
      } catch {}
      responseText = JSON.stringify(responseText, null, 2)
      setResponse({ status: response.status, text: responseText })
    } catch (error) {
      console.error({ error })
      setResponse(null)
    }
    setSelectedResponseTabIndex(0)
    setIsSendingRequest(false)
  }

  const responseTabs = [
    ...(response
      ? [
          {
            label: {
              label: `${response.status} (${t('global.openApi.responses.liveResponse')})`,
              iconBefore: <ExperimentalStatus variant={response.status === 200 ? 'success' : 'error'} />,
            },
            content: (
              <ExperimentalCodeBlock
                key="live-response"
                label={
                  operation.potentialResponses.length === 0
                    ? `${response.status} (${t('global.openApi.responses.liveResponse')})`
                    : undefined
                }
                language="json"
                lineNumbers={response.text.split('\n').length > 1}
              >
                {response.text}
              </ExperimentalCodeBlock>
            ),
          },
        ]
      : []),
    ...operation.potentialResponses.map((potentialResponse) => {
      const label = `${potentialResponse.status} ${t('global.openApi.responses.example')}`
      const exampleResponseText = JSON.stringify(potentialResponse.example, null, 2)
      return {
        label,
        content: (
          <ExperimentalCodeBlock
            key={potentialResponse.status}
            label={operation.potentialResponses.length === 1 && !response ? label : undefined}
            language="json"
            lineNumbers={exampleResponseText.split('\n').length > 1}
          >
            {exampleResponseText}
          </ExperimentalCodeBlock>
        ),
      }
    }),
  ]

  const [selectedResponseTabIndex, setSelectedResponseTabIndex] = useState(0)

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
      <div>
        <ExperimentalCodeBlock.Tabs tabs={Object.values(snippetLanguages)}>
          {objectEntries(snippets).map(([language, code]) => (
            <ExperimentalCodeBlock key={language} language={language}>
              {code}
            </ExperimentalCodeBlock>
          ))}
        </ExperimentalCodeBlock.Tabs>
        {snippetsChanged ? (
          <div
            key={snippets.shell}
            className="animate-opacity-to-0 absolute inset-0 rounded-8 border border-solar-600 pointer-events-none animate-fill-forwards"
          />
        ) : null}
      </div>
      {responseTabs.length > 0 ? (
        <div className="mt-6">
          {responseTabs.length === 1 ? (
            responseTabs[0]!.content
          ) : (
            <ExperimentalCodeBlock.Tabs
              tabs={responseTabs.map((responseTab) => responseTab.label)}
              selectedIndex={selectedResponseTabIndex}
              onChange={setSelectedResponseTabIndex}
            >
              {responseTabs.map((responseTab) => responseTab.content)}
            </ExperimentalCodeBlock.Tabs>
          )}
          {response ? (
            <div
              key={response.text}
              className="animate-opacity-to-0 absolute inset-0 rounded-8 border border-solar-600 pointer-events-none animate-fill-forwards"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
