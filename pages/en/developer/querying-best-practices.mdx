---
title: Querying best practices
---

The Graph provides a decentralized way to query data from blockchains.

The Graph network's data is exposed through a GraphQL API, making it easier to query data with the GraphQL language.

This page will guide you through the essential GraphQL language rules and GraphQL queries best practices.

---

## Querying a GraphQL API

### The anatomy of a GraphQL query

Unlike REST API, a GraphQL API is built upon a Schema that defines which queries can be performed.

For example, a query to get a token using the `token` query will look as follows:

```graphql
query GetToken($id: ID!) {
  token(id: $id) {
    id
    owner
  }
}
```

which will return the following predictable JSON response (*when passing the proper `$id` variable value*):

```json
{
  "token": {
    "id": "...",
    "owner": "..."
  },
}
```

GraphQL queries use the GraphQL language, which is defined upon [a specification](https://spec.graphql.org/).

The above `GetToken` query is composed of multiple language parts (replaced below with `[...]` placeholders):

```graphql
query [operationName]([variableName]: [variableType]) {
  [queryName]([argumentName]: [variableName]) {
    # "{ ... }" express a Selection-Set, we are querying fields from `queryName`.
    [field]
    [field]
  }
}
```

While the list of syntactic do's and don'ts is long, here are the essential rules to keep in mind when it comes to writing GraphQL queries:

- Each `queryName` must only be used once per operation.
- Each `field` must be used only once in a selection (we cannot query `id` twice under `token`)
- Some `field`s or queries (like `tokens`) return complex types that require a selection of sub-field.
Not providing a selection when expected (or providing one when not expected - for example, on `id`) will raise an error.
To know a field type, please refer to [The Graph Explorer](https://thegraph.com/docs/en/explorer/).
- Any variable assigned to an argument must match its type.
- In a given list of variables, each of them must be unique.
- All defined variables must be used.

Failing to follow the above rules will end with an error from the Graph API.

For a complete list of rules with code examples, please look at our GraphQL Validations guide.

<br />

### Sending a query to a GraphQL API

GraphQL is a language and set of conventions that transport over HTTP.

It means that you can query a GraphQL API using standard `fetch` (natively or via `cross-undici-fetch` or `isomorphic-fetch`) as follows:

```tsx
const query = `
query GetToken($id: ID!) {
  token(id: $id) {
    id
    owner
  }
}
`
const variables = { id: "1" }

const fetchResult = await fetch('http://example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables })
})
const result = await fetchResult.json()
```

Another lightweight alternative, best for back-end use-cases, is the famous [`graphql-request` library](https://github.com/prisma-labs/graphql-request).

This lightweight GraphQL client comes with the essential features to query a GraphQL API:

- Mutations validation
- Support for file upload
- Batching
- Promise-based API
- TypeScript support

<br />

A complete GraphQL client is [URQL](https://formidable.com/open-source/urql/) which is available within Node.js, React/Preact, Vue, Svelte environments, with more advanced features:

- Flexible cache system
- Extensible design (easing adding new capabilities on top of it)
- Lightweight bundle (~5x lighter than Apollo Client)
- Support for file uploads and offline mode

<br />

In the React ecosystem, [React Query](https://react-query.tanstack.com/graphql) brings a lightweight and agnostic solution for GraphQL.

React Query is a great candidate if you are looking for an easy-to-use and lightweight multipurpose client (GraphQL-capable) that provides essential features such as: 

- Powerful cache (background refresh, window-focus refreshing)
- Advanced querying pattern (parallel queries, dependent queries, prefetching)
- UX patterns: optimistic updates, scroll restoration
- Great dev tools

<br />

Finally, Apollo Client is the ubiquitous GraphQL client on the front-end ecosystem.

Available for React, Angular, Vue, Ember, iOS, and Android, Apollo Client, although the heaviest clients, brings many features to build advanced UI on-top of GraphQL:

- advanced error handling
- pagination
- data prefetching
- optimistic UI
- local state management

<br />

Now that we covered the basic rules of GraphQL queries syntax, let's now look at the best practices of GraphQL query writing.

---

## Writing GraphQL queries

### Always write static queries

A common (bad) practice is to dynamically build query strings as follows:

```tsx
const id = params.id
const fields = ["id", "owner"]
const query = `
query GetToken {
  token(id: ${id}) {
    ${fields.join("\n")}
  }
}
`

// Execute query...
```

While the above snippet produces a valid GraphQL query, **it has many drawbacks**:

- it makes it **harder to understand** the query as a whole
- developers are **responsible for safely sanitizing the string interpolation**
- not sending the values of the variables as part of the request parameters **prevent possible caching on server-side**
- it **prevents tools from statically analyzing the query** (ex: Linter, or type generations tools)

For this reason, it is recommended to always write queries as static strings:

```tsx
import { execute } from "your-favorite-graphql-client"

const id = params.id
const query = `
query GetToken($id: ID!) {
  token(id: $id) {
    id
    owner
  }
}
`

const result = await execute(
  query, 
  {
    variables: {
      id
    }
  }
)
```

Doing so brings **many advantages**:

- **Easy to read and maintain** queries
- The GraphQL **server handles variables sanitization**
- **Variables can be cached** at server-level
- **Queries can be statically analyzed by tools** (more on this in the following sections)

**Note: How to include fields conditionally in static queries**

We might want to include the `owner` field only on a particular condition.

For this, we can leverage the `@include(if:...)` directive as follows:

```tsx
import { execute } from "your-favorite-graphql-client"

const id = params.id
const query = `
query GetToken($id: ID!, $includeOwner: Boolean) {
  token(id: $id) {
    id
    owner @include(if: $includeOwner)
  }
}
`

const result = await execute(
  query, 
  {
    variables: {
      id,
      includeOwner: true
    }
  }
)
```

Note: The opposite directive is `@skip(if: ...)`.

<br />

### Performance tips

**"Ask for what you want"**

GraphQL became famous for its "Ask for what you want" tagline.

For this reason, there is no way, in GraphQL, to get all available fields without having to list them individually.

When querying GraphQL APIs, always think of querying only the fields that will be actually used.

A common cause of over-fetching is collections of entities. By default, queries will fetch 100 entities in a collection, which is usually much more than what will actually be used, e.g., for display to the user. Queries should therefore almost always set first explicitly, and make sure they only fetch as many entities as they actually need. This applies not just to top-level collections in a query, but even more so to nested collections of entities.

For example, in the following query:

```graphql
query listTokens {
  tokens { # will fetch up to 100 tokens
    id
    transactions { # will fetch up to 100 transactions
      id
    }
  }
}
```

The response could contain 100 transactions for each of the 100 tokens.

If the application only needs 10 transactions, the query should explicitly set `first: 10` on the transactions field.

**Combining multiple queries**

Your application might require querying multiple types of data as follows:

```graphql
import { execute } from "your-favorite-graphql-client"

const tokensQuery = `
query GetTokens {
  tokens(first: 50) {
    id
    owner
  }
}
`
const countersQuery = `
query GetCounters {
  counters {
    id
    value
  }
}
`

const [tokens, counters] = Promise.all(
  [
    tokensQuery,
    countersQuery,
  ].map(execute)
)
```

While this implementation is totally valid, it will require two round trips with the GraphQL API.

Fortunately, it is also valid to send multiple queries in the same GraphQL request as follows:

```graphql
import { execute } from "your-favorite-graphql-client"

const query = `
query GetTokensandCounters {
  tokens(first: 50) {
    id
    owner
  }
  counters {
    id
    value
  }
}
`

const  { result: { tokens, counters } } = execute(query)
```

This approach will **improve the overall performance** by reducing the time spent on the network (saves you a round trip to the API) and will provide a **more concise implementation**.

<br />

### Leverage GraphQL Fragments

A helpful feature to write GraphQL queries is GraphQL Fragment.

Looking at the following query, you will notice that some fields are repeated across multiple Selection-Sets (`{ ... }`):

```graphql
query {
  bondEvents {
    id 
    newDelegate {
      id
      active
      status
    }
    oldDelegate {
      id
      active
      status
    }
  }
}
```

Such repeated fields (`id`, `active`, `status`) bring many issues:

- harder to read for more extensive queries
- when using tools that generate TypeScript types based on queries (*more on that in the last section*), `newDelegate` and `oldDelegate` will result in two distinct inline interfaces.

A refactored version of the query would be the following:

```graphql
query {
  bondEvents {
    id 
    newDelegate {
      ...DelegateItem
    }
    oldDelegate {
      ...DelegateItem
    }
  }
}

# we define a fragment (subtype) on Transcoder
# to factorize repeated fields in the query
fragment DelegateItem on Transcoder {
  id
  active
  status
}
```

Using GraphQL `fragment` will improve readability (especially at scale) but also will result in better TypeScript types generation.

When using the types generation tool, the above query will generate a proper `DelegateItemFragment` type (*see last "Tools" section*).

<br />

### GraphQL Fragment do's and don'ts

**Fragment base must be a type**

A Fragment cannot be based on a non-applicable type, in short, **on type not having fields**:

```graphql
fragment MyFragment on BigInt {
  # ...
}
```

`BigInt` is a **scalar** (native "plain" type) that cannot be used as a fragment's base.

**How to spread a Fragment**

Fragments are defined on specific types and should be used accordingly in queries.

Example:

```graphql
query {
  bondEvents {
    id 
    newDelegate {
      ...VoteItem # Error! `VoteItem` cannot be spread on `Transcoder` type
    }
    oldDelegate {
      ...VoteItem
    }
  }
}

fragment VoteItem on Vote {
  id
  voter
}
```

`newDelegate` and `oldDelegate` are of type `Transcoder`.

It is not possible to spread a fragment of type `Vote` here.

**Define Fragment as an atomic business unit of data**

GraphQL Fragment must be defined based on their usage.

For most use-case, defining one fragment per type (in the case of repeated fields usage or type generation) is sufficient.

Here is a rule of thumb for using Fragment:

- when fields of the same type are repeated in a query, group them in a Fragment
- when similar but not the same fields are repeated, create multiple fragments, ex:

```graphql
# base fragment (mostly used in listing)
fragment Voter on Vote {
  id
  voter
}

# extended fragment (when querying a detailed view of a vote)
fragment VoteWithPoll on Vote {
  id
  voter
  choiceID
  poll {
    id
    proposal
  }
}
```

---

## The essential tools

### GraphQL web-based explorers

Iterating over queries by running them in your application can be cumbersome.
For this reason, don't hesitate to use [The Graph Explorer](https://thegraph.com/explorer) to test your queries before adding them to your application.
The Graph Explorer will provide you a preconfigured GraphQL playground to test your queries.

If you are looking for a more flexible way to debug/test your queries, other similar web-based tools are available such as [Altair](https://altair.sirmuel.design/) and [GraphiQL](https://graphiql-online.com/graphiql).

<br />

### GraphQL Linting

In order to keep up with the mentioned above best practices and syntactic rules, it is highly recommended to use the following workflow and IDE tools.

**GraphQL ESLint**

[GraphQL ESLint](https://github.com/dotansimha/graphql-eslint) will help you stay on top of GraphQL best practices with zero effort.

[Setup the "operations-recommended"](https://github.com/dotansimha/graphql-eslint#available-configs) config will enforce essential rules such as:

- `@graphql-eslint/fields-on-correct-type`: is a field used on a proper type?
- `@graphql-eslint/no-unused variables`: should a given variable stay unused?
- and more!

This will allow you to **catch errors without even testing queries** on the playground or running them in production! 

<br />

### IDE plugins

**VSCode and GraphQL**

The [GraphQL VSCode extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) is an excellent addition to your development workflow to get:

- syntax highlighting
- autocomplete suggestions
- validation against schema
- snippets
- go to definition for fragments and input types

If you are using `graphql-eslint`, the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is a must-have to visualize errors and warnings inlined in your code correctly. 

 

**WebStorm/Intellij and GraphQL**

The [JS GraphQL plugin](https://plugins.jetbrains.com/plugin/8097-graphql/) will significantly improve your experience while working with GraphQL by providing:

- syntax highlighting
- autocomplete suggestions
- validation against schema
- snippets

More information on this [WebStorm article](https://blog.jetbrains.com/webstorm/2019/04/featured-plugin-js-graphql/) that showcases all the plugin's main features.

<br />

### TypeScript types generation

Finally, the best GraphQL experience is reached when the TypeScript data types are generated from the defined GraphQL queries, as follows:

```tsx
import { execute } from "your-favorite-graphql-client"
import { GetTokenQuery } from "./generated."

const id = params.id
const query = `
query GetToken($id: ID!) {
  token(id: $id) {
    id
    owner
  }
}
`

const result: GetTokenQuery = await execute(
  query, 
  {
    variables: {
      id
    }
  }
)

// `result` is typed!
```

Such a setup can be easily achieved by installing and configuring [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started) as follows:

```bash
yarn add graphql @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

Then update your `package.json` (or similar script configuration setup) as follows:

```tsx
{
  // ...
  "scripts": {
    // ...
    "generate": "graphql-codegen",
    // ...
  }
  // ...
}
```

Add the following configuration file to your project:

```tsx
schema: "<SUBGRAPH_URL>"
documents: './src/**/*.ts'
generates:
  ./generated.ts:
    plugins:
      - typescript
      - typescript-operations
```

Finally, by simply running the configured script (`yarn generate`), GraphQL Code Generator will generate the proper TypeScript types in the `generated.ts` file:

- Each query will get a corresponding `[QueryName]Query` type (ex: `GetToken` → `GetTokenQuery` type
- Each fragment will get a corresponding `[FragmentName]Fragment` type (ex: `DelegateItem` → `DelegateItemFragment` type
