import { compileErrors, dereference, validate } from '@readme/openapi-parser'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { OpenAPIV3_1 } from 'openapi-types'

import { API_IDS, APIS, getApi } from '../src/openApi'

async function fetchApiReference() {
  for (const apiId of API_IDS) {
    try {
      let document
      try {
        document = await fetchApi(apiId)
      } catch (error) {
        console.warn(`Failed to fetch ${apiId}:`, error)
      }
      const api = getApi(apiId, document)
      for (const section of Object.values(api.sections)) {
        const sectionPath = path.join(process.cwd(), 'src/pages/en', section.path)
        await fs.mkdir(sectionPath, { recursive: true })
        for (const operation of section.operations) {
          const filePath = path.join(sectionPath, `${operation.slug}.mdx`)
          try {
            await fs.access(filePath)
          } catch {
            // File doesn't exist, create it
            const content = `---
title: ${operation.summary || operation.operationId}
template:
  type: openApi
  apiId: ${apiId}
  operationId: ${operation.operationId}
---

${operation.description}
`
            await fs.writeFile(filePath, content, 'utf-8')
            console.log(`Created ${path.relative(process.cwd(), filePath)}`)
          }
        }
      }
    } catch (error) {
      console.error(`Failed to process ${apiId}:`, error)
      throw error
    }
  }
}

async function fetchApi(apiId: (typeof API_IDS)[number]) {
  const config = APIS[apiId]
  const response = await fetch(config.url)
  const schema = await response.json()
  const document = await validateOpenApi(schema)
  const filePath = path.join(process.cwd(), `src/openApi/${apiId}.json`)
  await fs.writeFile(filePath, JSON.stringify(schema, null, 2), 'utf-8')
  console.log(`Saved remote API definition from ${config.url} to ${path.relative(process.cwd(), filePath)}`)
  return document
}

async function validateOpenApi(schema: unknown) {
  if (typeof schema !== 'object' || schema === null) {
    throw new Error('Schema must be an object')
  }
  const validationResult = await validate(schema as OpenAPIV3_1.Document)
  if (!validationResult.valid) {
    throw new Error(compileErrors(validationResult))
  }
  if (validationResult.specification !== 'OpenAPI') {
    throw new Error(`API specification must be OpenAPI, got ${validationResult.specification}`)
  }
  const document: OpenAPIV3_1.Document = await dereference(schema as OpenAPIV3_1.Document)
  if (!document.openapi.startsWith('3.1')) {
    throw new Error(`OpenAPI version must be 3.1.x, got ${document.openapi}`)
  }
  return document
}

fetchApiReference().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
