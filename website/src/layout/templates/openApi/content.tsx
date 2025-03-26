import { type ComponentPropsWithoutRef, Fragment, useContext } from 'react'

import { camelToKebab, ExperimentalCodeInline, ExperimentalSwitch, ExperimentalTag } from '@edgeandnode/gds'
import { CaretDown } from '@edgeandnode/gds/icons'

import { Heading, Table } from '@/components'
import { useI18n } from '@/i18n'

import TemplateDefaultContent from '../default/content'

import { OpenApiContext, PARAMETER_TYPES, type ParameterValue } from './OpenApiContext'

export default function TemplateOpenApiContent({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const openApiContext = useContext(OpenApiContext)
  const { t } = useI18n()

  if (!openApiContext) {
    return <TemplateDefaultContent {...props}>{children}</TemplateDefaultContent>
  }

  const { operation, values } = openApiContext

  return (
    <TemplateDefaultContent {...props}>
      <p className="flex items-center gap-2">
        <ExperimentalTag className="shrink-0">{operation.method}</ExperimentalTag>
        <code className="gradient-mask-x overflow-x-auto overflow-y-clip font-mono scrollbar-thin">
          {operation.path.split(/({[^}]+})/).map((part, index) => {
            if (part.startsWith('{')) {
              return (
                <span key={index} className="text-galactic-400">
                  {part}
                </span>
              )
            } else {
              return part
            }
          })}
        </code>
      </p>
      {children}
      {PARAMETER_TYPES.map((parameterType) => {
        const parameters = operation[parameterType]
        const parameterValues = values[parameterType]
        if (parameters.length === 0) return null
        return (
          <Fragment key={parameterType}>
            <Heading.H2 id={camelToKebab(parameterType)}>{t(`global.openApi.parameters.${parameterType}`)}</Heading.H2>
            <Table>
              <thead>
                <tr>
                  <th>{t('global.openApi.parameters.parameter')}</th>
                  <th>{t('global.openApi.parameters.description')}</th>
                  <th align="center" className="min-w-30">
                    {t('global.openApi.parameters.value')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((parameter) => {
                  const parameterValue = parameterValues.get(parameter.name)!
                  const setParameterValue = (value: ParameterValue) => {
                    parameterValues.set(parameter.name, value)
                  }
                  const enumValues = parameter.schema.enum ?? []
                  return (
                    <tr key={parameter.name}>
                      <td className="whitespace-nowrap">
                        <ExperimentalCodeInline className="whitespace-nowrap">{parameter.name}</ExperimentalCodeInline>
                        <div className="mt-1 text-12 text-space-500">{parameter.schema.type}</div>
                      </td>
                      <td className="text-body-xsmall">
                        {parameter.description ? <p className="+:mb-0">{parameter.description}</p> : null}
                        <ul className="mt-1 empty:hidden">
                          {parameter.schema.default ? (
                            <li>
                              {t('global.openApi.parameters.defaultValue')}:{' '}
                              <ExperimentalCodeInline>{String(parameter.schema.default)}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                          {parameter.schema.minimum !== undefined ? (
                            <li>
                              {t('global.openApi.parameters.minimumValue')}:{' '}
                              <ExperimentalCodeInline>{parameter.schema.minimum}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                          {parameter.schema.maximum !== undefined ? (
                            <li>
                              {t('global.openApi.parameters.maximumValue')}:{' '}
                              <ExperimentalCodeInline>{parameter.schema.maximum}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                          {enumValues.length > 0 ? (
                            <li>
                              {t('global.openApi.parameters.acceptedValues')}:{' '}
                              {enumValues.map((value, valueIndex: number) => (
                                <Fragment key={String(value)}>
                                  {valueIndex > 0 ? ', ' : null}
                                  <ExperimentalCodeInline>{String(value)}</ExperimentalCodeInline>
                                </Fragment>
                              ))}
                            </li>
                          ) : null}
                          {parameter.schema.pattern ? (
                            <li>
                              {t('global.openApi.parameters.acceptedPattern')}:{' '}
                              <ExperimentalCodeInline>{parameter.schema.pattern}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                          {parameter.schema.format ? (
                            <li>
                              {t('global.openApi.parameters.format')}:{' '}
                              <ExperimentalCodeInline>{parameter.schema.format}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                          {parameter.serializationFormat ? (
                            <li>
                              {t('global.openApi.parameters.serializationFormat')}:{' '}
                              <ExperimentalCodeInline>{parameter.serializationFormat}</ExperimentalCodeInline>
                            </li>
                          ) : null}
                        </ul>
                      </td>
                      <td className="py-3.5">
                        {parameter.required ? (
                          <ExperimentalTag size="small" variant="yellow" className="mx-auto mb-3">
                            {t('global.openApi.parameters.required')}
                          </ExperimentalTag>
                        ) : null}
                        {parameter.deprecated ? (
                          <ExperimentalTag size="small" variant="red" className="mx-auto mb-3">
                            {t('global.openApi.parameters.deprecated')}
                          </ExperimentalTag>
                        ) : null}
                        {typeof parameterValue === 'boolean' ? (
                          <ExperimentalSwitch
                            size="small"
                            aria-label={parameter.name}
                            checked={parameterValue}
                            onChange={setParameterValue}
                          />
                        ) : enumValues.length > 0 ? (
                          <div
                            className={`
                              flex h-8 w-full items-center border border-space-1500 px-2 text-14 transition
                              hover:border-space-1300
                              active:transition-none
                              has-focus-visible:border-focus
                            `}
                          >
                            <span className="me-1 w-0 flex-1 truncate">{parameterValue}</span>
                            <CaretDown size={3} alt="" className="ms-auto" />
                            <select
                              aria-label={parameter.name}
                              value={parameterValue}
                              onChange={(event) => setParameterValue(event.target.value)}
                              className="absolute left-0 top-0 h-full w-full opacity-0"
                            >
                              <option value="">–</option>
                              {enumValues.map((value) => (
                                <option key={String(value)} value={String(value)}>
                                  {String(value)}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          // Known limitation: we don't support `object` or `array` parameter types
                          <input
                            type="text"
                            aria-label={parameter.name}
                            value={parameterValue}
                            onChange={(event) => setParameterValue(event.target.value)}
                            className={`
                              h-8 w-full border border-space-1500 px-2 text-14 transition outline-none
                              hover:border-space-1300
                              focus-visible:border-focus
                              active:transition-none
                            `}
                          />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Fragment>
        )
      })}
      {operation.potentialResponses.length > 0 ? (
        <>
          <Heading.H2 id="potential-responses">{t('global.openApi.responses.potentialResponses')}</Heading.H2>
          <Table>
            <thead>
              <tr>
                <th className="w-[15%]">{t('global.openApi.responses.status')}</th>
                <th>{t('global.openApi.responses.description')}</th>
              </tr>
            </thead>
            <tbody>
              {operation.potentialResponses.map((potentialResponse) => {
                return (
                  <tr key={potentialResponse.status}>
                    <td>
                      <ExperimentalTag variant={potentialResponse.status === '200' ? 'green' : 'red'}>
                        {potentialResponse.status}
                      </ExperimentalTag>
                    </td>
                    <td className="text-body-xsmall">
                      {potentialResponse.description}
                      {/* TODO: Show response schema */}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </>
      ) : null}
    </TemplateDefaultContent>
  )
}
