---
title: Querying from an Application
---

Once a subgraph is deployed to the Subgraph Studio or to The Graph Explorer, you will be given the endpoint for your GraphQL API that should look something like this:

**Subgraph Studio (testing endpoint)**

```sh
Queries (HTTP)
https://api.studio.thegraph.com/query/<ID>/<SUBGRAPH_NAME>/<VERSION>
```

**Graph Explorer**

```sh
Queries (HTTP)
https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/<SUBGRAPH_ID>
```

Using the GraphQL endpoint, you can use various GraphQL Client libraries to query the subgraph and populate your app with the data indexed by the subgraph.

Here are a couple of the more popular GraphQL clients in the ecosystem and how to use them:

### Apollo client

[Apollo client](https://www.apollographql.com/docs/) supports web projects, including frameworks like React and Vue, as well as mobile clients like iOS, Android, and React Native.

Let's look at how to fetch data from a subgraph with Apollo client in a web project.

First, install `@apollo/client` and `graphql`:

```sh
npm install @apollo/client graphql
```

Then you can query the API with the following code:

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/'

const tokensQuery = `
  query {
    tokens {
      id
      tokenID
      contentURI
      metadataURI
    }
  }
`

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql(tokensQuery),
  })
  .then((data) => console.log('Subgraph data: ', data))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
```

To use variables, you can pass in a `variables` argument to the query:

```javascript
const tokensQuery = `
  query($first: Int, $orderBy: BigInt, $orderDirection: String) {
    tokens(
      first: $first, orderBy: $orderBy, orderDirection: $orderDirection
    ) {
      id
      tokenID
      contentURI
      metadataURI
    }
  }
`

client
  .query({
    query: gql(tokensQuery),
    variables: {
      first: 10,
      orderBy: 'createdAtTimestamp',
      orderDirection: 'desc',
    },
  })
  .then((data) => console.log('Subgraph data: ', data))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
```

### URQL

Another option is [URQL](https://formidable.com/open-source/urql/), a somewhat lighter-weight GraphQL client library.

Let's look at how to fetch data from a subgraph with URQL in a web project.

First, install `urql` and `graphql`:

```sh
npm install urql graphql
```

Then you can query the API with the following code:

```javascript
import { createClient } from 'urql'

const APIURL = 'https://api.thegraph.com/subgraphs/name/username/subgraphname'

const tokensQuery = `
  query {
    tokens {
      id
      tokenID
      contentURI
      metadataURI
    }
  }
`

const client = createClient({
  url: APIURL,
})

const data = await client.query(tokensQuery).toPromise()
```
