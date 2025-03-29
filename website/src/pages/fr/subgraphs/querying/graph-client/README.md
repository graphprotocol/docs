# The Graph Client Tools

This repo is the home for [The Graph](https://thegraph.com) consumer-side tools (for both browser and NodeJS environments).

## Background

The tools provided in this repo are intended to enrich and extend the DX, and add the additional layer required for dApps in order to implement distributed applications.

Developers who consume data from [The Graph](https://thegraph.com) GraphQL API often need peripherals for making data consumption easier, and also tools that allow using multiple indexers at the same time.

## Features and Goals

This library is intended to simplify the network aspect of data consumption for dApps. The tools provided within this repository are intended to run at build time, in order to make execution faster and performant at runtime.

> The tools provided in this repo can be used as standalone, but you can also use it with any existing GraphQL Client!

| Status | Feature                                                          | Notes                                                                                                                            |
| :----: | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
|    ✅   | Multiple indexers                                                | based on fetch strategies                                                                                                        |
|    ✅   | Fetch Strategies                                                 | timeout, retry, fallback, race, highestValue                                                                                     |
|    ✅   | Build time validations & optimizations       |                                                                                                                                  |
|    ✅   | Client-Side Composition                                          | with improved execution planner (based on GraphQL-Mesh)                                                       |
|    ✅   | Cross-chain Subgraph Handling                                    | Use similar subgraphs as a single source                                                                                         |
|    ✅   | Raw Execution (standalone mode)               | without a wrapping GraphQL client                                                                                                |
|    ✅   | Local (client-side) Mutations                 |                                                                                                                                  |
|    ✅   | [Automatic Block Tracking](../packages/block-tracking/README.md) | tracking block numbers [as described here](https://thegraph.com/docs/en/developer/distributed-systems/#polling-for-updated-data) |
|    ✅   | [Automatic Pagination](../packages/auto-pagination/README.md)    | doing multiple requests in a single call to fetch more than the indexer limit                                                    |
|    ✅   | Integration with `@apollo/client`                                |                                                                                                                                  |
|    ✅   | Intégration avec `urql`                                          |                                                                                                                                  |
|    ✅   | Prise en charge de TypeScript                                    | avec GraphQL Codegen et `TypedDocumentNode` intégrés                                                                             |
|    ✅   | [`@live` queries](./live.md)                                     | Sur la base de sondages                                                                                                          |

> Vous pouvez trouver un [modèle d'architecture étendu ici](./architecture.md)

## Introduction

Vous pouvez suivre [l'épisode 45 de `graphql.wtf`] (https://graphql.wtf/episodes/45-the-graph-client) pour en savoir plus sur Graph Client :

[![GraphQL.wtf Episode 45](https://img.youtube.com/vi/ZsRAmyUtvwg/0.jpg)](https://graphql.wtf/episodes/45-the-graph-client)

Pour commencer, assurez-vous d'installer [The Graph Client CLI] dans votre projet :

```sh
yarn add -D @graphprotocol/client-cli
# or, with NPM:
npm install --save-dev @graphprotocol/client-cli
```

> La CLI est installé en tant que dépendance dev puisque nous l'utilisons pour produire des artefacts d'exécution optimisés qui peuvent être chargés directement à partir de votre application !

Créez un fichier de configuration (appelé `.graphclientrc.yml`) et pointez vers vos endpoints GraphQL fournis par The Graph, par exemple :

```yml
# .graphclientrc.yml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
```

Maintenant, créez un artefact d'exécution en exécutant The Graph Client CLI:

```sh
graphclient build
```

> Note : vous devez exécuter ceci avec le préfixe `yarn`, ou ajouter ce script dans votre `package.json`.

Cela devrait produire une fonction autonome `execute` prête à l'emploi, que vous pouvez utiliser pour exécuter les opérations GraphQL de votre application, vous devriez obtenir une sortie similaire à la suivante :

```sh
GraphClient: Cleaning existing artifacts
GraphClient: Reading the configuration
🕸️: Generating the unified schema
🕸️: Generating artifacts
🕸️: Generating index file in TypeScript
🕸️: Writing index.ts for ESM to the disk.
🕸️: Cleanup
🕸️: Done! => .graphclient
```

Maintenant, l'artefact `.graphclient` est généré pour vous, et vous pouvez l'importer directement depuis votre code, et lancer vos requêtes :

```ts
import { execute } from '../.graphclient'

const myQuery = gql`
  query pairs {
    pair(id: "0x00004ee988665cdda9a1080d5792cecd16dc1220") {
      id
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
    }
  }
`

async function main() {
  const result = await execute(myQuery, {})
  console.log(result)
}

main()
```

### Utiliser Vanilla JavaScript au lieu de TypeScript

GraphClient CLI génère par défaut les artefacts du client sous forme de fichiers TypeScript, mais vous pouvez configurer la CLI pour générer des fichiers JavaScript et JSON ainsi que des fichiers de définition TypeScript supplémentaires en utilisant `--fileType js` ou `--fileType json`.

L'option `js` génère tous les fichiers en tant que fichiers JavaScript avec la syntaxe ESM et l'option `json` génère les artefacts source en tant que fichiers JSON tandis que le fichier JavaScript du point d'entrée avec l'ancienne syntaxe CommonJS parce que seul CommonJS supporte les fichiers JSON en tant que modules.

A moins que vous n'utilisiez CommonJS (`require`) spécifiquement, nous vous recommandons d'utiliser le l'option `js`.

`graphclient --fileType js`

- [Un exemple d'utilisation de JavaScript dans la syntaxe CommonJS avec des fichiers JSON](../examples/javascript-cjs)
- [Un exemple d'utilisation de JavaScript dans la syntaxe ESM](../examples/javascript-esm)

#### Le DevTools The Graph Client

La CLI de The Graph Client est dotée d'une interface GraphiQL intégrée, ce qui vous permet d'expérimenter des requêtes en temps réel.

Le schéma GraphQL servi dans cet environnement est le schéma final basé sur tous les subgraphs composés et les transformations que vous avez appliquées.

Pour lancer Le DevTool GraphiQL, exécutez la commande suivante :

```sh
graphclient serve-dev
```

Et ouvrez http://localhost:4000/ pour utiliser GraphiQL. Vous pouvez maintenant expérimenter votre schéma GraphQL côté client localement ! 🥳

#### Exemples

Vous pouvez également vous référer aux [répertoires examples dans ce repo](../examples), pour des exemples plus avancés et des exemples d'intégration :

- [Exemple TypeScript & React avec un `execute` brut et GraphQL-Codegen intégré](../examples/execute)
- [TS/JS NodeJS standalone mode](../examples/node)
- [Composition GraphQL côté client](../examples/composition)
- [Intégration avec Urql et React](../examples/urql)
- [Intégration avec NextJS et TypeScript](../examples/nextjs)
- [Intégration avec Apollo-Client et React](../examples/apollo)
- [Intégration avec React-Query](../examples/react-query)
- Fusion interchain (même subgraph, blockchains différentes)
- - [Appels SDK parallèles](../examples/cross-chain-sdk)
- - [Appels internes parallèles avec les extensions de schéma](../examples/cross-chain-extension)
- [Personnaliser l'exécution avec Transforms (auto-pagination et auto-block-tracking)](../examples/transforms)

### Exemples/fonctionnalités avancés

#### Personnaliser les appels réseau

Vous pouvez personnaliser l'exécution du réseau (par exemple, pour ajouter des en-têtes d'authentification) en utilisant `operationHeaders` :

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        operationHeaders:
          Authorization: Bearer MY_TOKEN
```

Vous pouvez également utiliser des variables d'exécution si vous le souhaitez, et les spécifier de manière déclarative :

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        operationHeaders:
          Authorization: Bearer {context.config.apiToken}
```

Vous pouvez ensuite le spécifier lorsque vous exécutez des opérations :

```ts
execute(myQuery, myVariables, {
  config: {
    apiToken: 'MY_TOKEN',
  },
})
```

> You can find the [complete documentation for the `graphql` handler here](https://graphql-mesh.com/docs/handlers/graphql#config-api-reference).

#### Environment Variables Interpolation

If you wish to use environment variables in your Graph Client configuration file, you can use interpolation with `env` helper:

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        operationHeaders:
          Authorization: Bearer {env.MY_API_TOKEN} # runtime
```

Then, make sure to have `MY_API_TOKEN` defined when you run `process.env` at runtime.

You can also specify environment variables to be filled at build time (during `graphclient build` run) by using the env-var name directly:

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        operationHeaders:
          Authorization: Bearer ${MY_API_TOKEN} # build time
```

> You can find the [complete documentation for the `graphql` handler here](https://graphql-mesh.com/docs/handlers/graphql#config-api-reference).

#### Fetch Strategies and Multiple Graph Indexers

C'est une pratique courante d'utiliser plus d'un Indexeur dans les dApps, donc pour obtenir l'expérience idéale avec The Graph, vous pouvez spécifier plusieurs stratégies `fetch` afin de rendre les choses plus fluides et plus simples.

Toutes les stratégies `fetch` peuvent être combinées pour créer le flux d'exécution ultime.

<details>
 <summary>`retry`</summary>

The `retry` mechanism allow you to specify the retry attempts for a single GraphQL endpoint/source.

The retry flow will execute in both conditions: a netword error, or due to a runtime error (indexing issue/inavailability of the indexer).

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        retry: 2 # specify here, if you have an unstable/error prone indexer
```

</details>

<details>
 <summary>`timeout`</summary>

The `timeout` mechanism allow you to specify the `timeout` for a given GraphQL endpoint.

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
        timeout: 5000 # 5 seconds
```

</details>

<details>
 <summary>`fallback`</summary>

The `fallback` mechanism allow you to specify use more than one GraphQL endpoint, for the same source.

This is useful if you want to use more than one indexer for the same Subgraph, and fallback when an error/timeout happens. You can also use this strategy in order to use a custom indexer, but allow it to fallback to [The Graph Hosted Service](https://thegraph.com/hosted-service).

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        strategy: fallback
        sources:
          - endpoint: https://bad-uniswap-v2-api.com
            retry: 2
            timeout: 5000
          - endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
```

</details>

<details>
 <summary>`race`</summary>

The `race` mechanism allow you to specify use more than one GraphQL endpoint, for the same source, and race on every execution.

This is useful if you want to use more than one indexer for the same Subgraph, and allow both sources to race and get the fastest response from all specified indexers.

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        strategy: race
        sources:
          - endpoint: https://bad-uniswap-v2-api.com
          - endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
```

</details>

<details>
  <summary>`highestValue`</summary>

This strategy allows you to send parallel requests to different endpoints for the same source and choose the most updated.

This is useful if you want to choose most synced data for the same Subgraph over different indexers/sources.

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        strategy: highestValue
        strategyConfig:
          selectionSet: |
            {
              _meta {
                block {
                  number
                }
              }
            }
          value: '_meta.block.number'
        sources:
          - endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2-1
          - endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2-2
```

```mermaid
graph LR;
    subgraph most-synced
    req(Outgoing Query)-->sA[Subgraph A];
    sA-->d{MostSyncedStrategy};
    d-->s1[Source 1];
    d-->s2[Source 2];
    s1-->synced["process"]
    s2-->synced
    synced-->|"max(_meta.block_number)"|d
    end
```

</details>

#### Block Tracking

The Graph Client can track block numbers and do the following queries by following [this pattern](https://thegraph.com/docs/en/developer/distributed-systems/#polling-for-updated-data) with `blockTracking` transform;

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
    transforms:
      - blockTracking:
          # You might want to disable schema validation for faster startup
          validateSchema: true
          # Ignore the fields that you don't want to be tracked
          ignoreFieldNames: [users, prices]
          # Exclude the operation with the following names
          ignoreOperationNames: [NotFollowed]
```

[You can try a working example here](../examples/transforms)

#### Automatic Pagination

With most subgraphs, the number of records you can fetch is limited. In this case, you have to send multiple requests with pagination.

```graphql
query {
  # Will throw an error if the limit is 1000
  users(first: 2000) {
    id
    name
  }
}
```

So you have to send the following operations one after the other:

```graphql
query {
  # Will throw an error if the limit is 1000
  users(first: 1000) {
    id
    name
  }
}
```

Then after the first response:

```graphql
query {
  # Will throw an error if the limit is 1000
  users(first: 1000, skip: 1000) {
    id
    name
  }
}
```

After the second response, you have to merge the results manually. But instead The Graph Client allows you to do the first one and automatically does those multiple requests for you under the hood.

All you have to do is:

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
    transforms:
      - autoPagination:
          # You might want to disable schema validation for faster startup
          validateSchema: true
```

[You can try a working example here](../examples/transforms)

#### Client-side Composition

The Graph Client has built-in support for client-side GraphQL Composition (powered by [GraphQL-Tools Schema-Stitching](https://graphql-tools.com/docs/schema-stitching/stitch-combining-schemas)).

You can leverage this feature in order to create a single GraphQL layer from multiple Subgraphs, deployed on multiple indexers.

> 💡 Tip: You can compose any GraphQL sources, and not only Subgraphs!

Trivial composition can be done by adding more than one GraphQL source to your `.graphclientrc.yml` file, here's an example:

```yaml
sources:
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
  - name: compoundv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2
```

Tant qu'il n'y a pas de conflit entre les schémas composés, vous pouvez les composer, puis exécuter une seule requête sur les deux subgraphs :

```graphql
query myQuery {
  # Celui-ci provient de compound-v2
  markets(first: 7) {
    borrowRate
  }
  # Celui-ci provient de l'uniswap-v2
  pair(id: "0x00004ee988665cdda9a1080d5792cecd16dc1220") {
    id
    token0 {
      id
    }
    token1 {
      id
    }
  }
}
```

Vous pouvez également résoudre des conflits, renommer des parties du schéma, ajouter des champs GraphQL personnalisés et modifier l'ensemble de la phase d'exécution.

Pour les cas d'utilisation avancée de la composition, veuillez vous référer aux ressources suivantes :

- [Exemple de composition avancée](../examples/composition)
- [Transformations de schémas GraphQL-Mesh](https://graphql-mesh.com/docs/transforms/transforms-introduction)
- [Documentation GraphQL-Tools Schema-Stitching](https://graphql-tools.com/docs/schema-stitching/stitch-combining-schemas)

#### Prise en charge de TypeScript

Si votre projet est écrit en TypeScript, vous pouvez exploiter la puissance de [`TypedDocumentNode`](https://the-guild.dev/blog/typed-document-node) et avoir une expérience GraphQL client entièrement typée.

Le mode autonome de The GraphQL, et les bibliothèques client GraphQL populaires comme Apollo-Client et urql ont une prise en charge intégrée pour `TypedDocumentNode` !

La CLI The Graph Client est livrée avec une configuration prête à l'emploi pour [GraphQL Code Generator](https://graphql-code-generator.com), et il peut générer `TypedDocumentNode` sur la base de vos opérations GraphQL.

Pour commencer, définissez vos opérations GraphQL dans le code de votre application, et pointez vers ces fichiers en utilisant la section `documents` de `.graphclientrc.yml` :

```yaml
sources:
  -  # ... vos sources Subgraphs/GQL ici

documents:
  - ./src/example-query.graphql
```

Vous pouvez également utiliser des expressions globales, ou même pointer vers des fichiers de code, et la CLI trouvera automatiquement vos requêtes GraphQL :

```yaml
documents:
  - './src/**/*.graphql'
  - './src/**/*.{ts,tsx,js,jsx}'
```

Maintenant, lancez à nouveau la commande `build` de la CLI GraphQL, la CLI va générer un objet `TypedDocumentNode` sous `.graphclient` pour chaque opération trouvée.

> Veillez à nommer vos opérations GraphQL, sinon elles seront ignorées !

Par exemple, une requête appelée `query ExampleQuery` aura le `ExampleQueryDocument` correspondant généré dans `.graphclient`. Vous pouvez maintenant l'importer et l'utiliser pour vos appels GraphQL, et vous aurez une expérience entièrement typée sans écrire ou spécifier manuellement du TypeScript :

```ts
import { ExampleQueryDocument, execute } from '../.graphclient'

async function main() {
  //La variable "result" est entièrement typée et représente la structure exacte des champs que vous avez sélectionnés dans votre requête.
  const result = await execute(ExampleQueryDocument, {})
  console.log(result)
}
```

> Vous pouvez trouver un [exemple de projet TypeScript ici](../examples/urql).

#### Mutations côté client

En raison de la nature de la configuration de Graph-Client, il est possible d'ajouter un schéma côté client, que vous pouvez ensuite relier pour exécuter n'importe quel code arbitraire.

Cela est utile car vous pouvez implémenter du code personnalisé dans le cadre de votre schéma GraphQL et en faire un schéma d'application unifié qui est plus facile à suivre et à développer.

> Ce document explique comment ajouter des mutations personnalisées, mais en fait vous pouvez ajouter n'importe quelle opération GraphQL (requête/mutation/abonnements). Voir [Extension de l'article sur le schéma unifié](https://graphql-mesh.com/docs/guides/extending-unified-schema) pour plus d'informations sur cette fonctionnalité.

Pour commencer, définissez une section `additionalTypeDefs` dans votre fichier de configuration :

```yaml
additionalTypeDefs: |
  # Nous devrions définir le type `Mutation` manquant
  extend schema {
    mutation: Mutation
  }

  type Mutation {
    doSomething(input: SomeCustomInput!): Boolean!
  }

  input SomeCustomInput {
    field: String!
  }
```

Ensuite, ajoutez un pointeur vers un fichier de résolveurs GraphQL personnalisé :

```yaml
additionalResolvers:
  - './resolvers'
```

Maintenant, créez `resolver.js` (ou, `resolvers.ts`) dans votre projet, et implémentez votre mutation personnalisée :

```js
module.exports = {
  Mutation: {
    async doSomething(root, args, context, info) {
      // Ici, vous pouvez exécuter tout ce que vous voulez.
      // Par exemple, utiliser la librairie `web3`, connecter un portefeuille et ainsi de suite.

      return true
    },
  },
}
```

Si vous utilisez TypeScript, vous pouvez également obtenir une signature entièrement sécurisée en faisant :

```ts
import { Resolvers } from './.graphclient'

// Maintenant, il est entièrement saisi !
const resolvers: Resolvers = {
  Mutation: {
    async doSomething(root, args, context, info) {
      // Ici, vous pouvez exécuter tout ce que vous voulez.
      // Par exemple, utiliser la librairie `web3`, connecter un portefeuille et ainsi de suite.

      return true
    },
  },
}

export default resolvers
```

Si vous avez besoin d'injecter des variables d'exécution dans votre `contexte` d'exécution GraphQL, vous pouvez utiliser l'extrait suivant :

```ts
execute(
  MY_QUERY,
  {},
  {
    myHelper: {}, // Ceci sera disponible dans votre Mutation resolver as `context.myHelper`
  },
)
```

> [Pour en savoir plus sur les extensions de schéma côté client, cliquez ici](https://graphql-mesh.com/docs/guides/extending-unified-schema)

> [Vous pouvez également déléguer et appeler des champs de requête dans le cadre de votre mutation](https://graphql-mesh.com/docs/guides/extending-unified-schema#using-the-sdk-to-fetch-sources)

## Licence

Publié sous la [licence MIT](../LICENSE).
