---
title: GraphQL API
---

This guide explains the GraphQL Query API that is used for the Graph Protocol.

## Queries

In your subgraph schema you define types called `Entities`. For each `Entity` type, an `entity` and `entities` field will be generated on the top-level `Query` type. Note that `query` does not need to be included at the top of the `graphql` query when using The Graph.

#### Examples

Query for a single `Token` entity defined in your schema:

```graphql
{
  token(id: "1") {
    id
    owner
  }
}
```

**Note:** When querying for a single entity, the `id` field is required and it must be a string.

Query all `Token` entities:

```graphql
{
  tokens {
    id
    owner
  }
}
```

### Sorting

When querying a collection, the `orderBy` parameter may be used to sort by a specific attribute. Additionally, the `orderDirection` can be used to specify the sort direction, `asc` for ascending or `desc` for descending.

#### Example

```graphql
{
  tokens(orderBy: price, orderDirection: asc) {
    id
    owner
  }
}
```

### Pagination

When querying a collection, the `first` parameter can be used to paginate from the beginning of the collection. It is worth noting that the default sort order is by ID in ascending alphanumeric order, not by creation time.

Further, the `skip` parameter can be used to skip entities and paginate. e.g. `first:100` shows the first 100 entities and `first:100, skip:100` shows the next 100 entities.

Queries should avoid using very large `skip` values since they generally perform poorly. For retrieving a large number of items, it is much better to page through entities based on an attribute as shown in the last example.

#### Example using `first`

Query the first 10 tokens:

```graphql
{
  tokens(first: 10) {
    id
    owner
  }
}
```

To query for groups of entities in the middle of a collection, the `skip` parameter may be used in conjunction with the `first` parameter to skip a specified number of entities starting at the beginning of the collection.

#### Example using `first` and `skip`

Query 10 `Token` entities, offset by 10 places from the beginning of the collection:

```graphql
{
  tokens(first: 10, skip: 10) {
    id
    owner
  }
}
```

#### Example using `first` and `id_ge`

If a client needs to retrieve a large number of entities, it is much more performant to base queries on an attribute and filter by that attribute. For example, a client would retrieve a large number of tokens using this query:

```graphql
query manyTokens($lastID: String) {
  tokens(first: 1000, where: { id_gt: $lastID }) {
    id
    owner
  }
}
```

The first time, it would send the query with `lastID = ""`, and for subsequent requests would set `lastID` to the `id` attribute of the last entity in the previous request. This approach will perform significantly better than using increasing `skip` values.

### Filtering

You can use the `where` parameter in your queries to filter for different properties. You can filter on mulltiple values within the `where` parameter.

#### Example using `where`

Query challenges with `failed` outcome:

```graphql
{
  challenges(where: { outcome: "failed" }) {
    challenger
    outcome
    application {
      id
    }
  }
}
```

You can use suffixes like `_gt`, `_lte` for value comparison:

#### Example for range filtering

```graphql
{
  applications(where: { deposit_gt: "10000000000" }) {
    id
    whitelisted
    deposit
  }
}
```

#### Example for block filtering

You can also filter entities by the `_change_block(number_gte: Int)` - this filters entities which were updated in or after the specified block.

This can be useful if you are looking to fetch only entities which have changed, for example since the last time you polled. Or alternatively it can be useful to investigate or debug how entities are changing in your subgraph (if combined with a block filter, you can isolate only entities that changed in a specific block).

```graphql
{
  applications(where: { _change_block: { number_gte: 100 }}) {
    id
    whitelisted
    deposit
  }
}
```

#### All Filters

Full list of parameter suffixes:

```
_not
_gt
_lt
_gte
_lte
_in
_not_in
_contains
_contains_nocase
_not_contains
_not_contains_nocase
_starts_with
_starts_with_nocase
_ends_with
_ends_with_nocase
_not_starts_with
_not_starts_with_nocase
_not_ends_with
_not_ends_with_nocase
```

> Please note that some suffixes are only supported for specific types. For example, `Boolean` only supports `_not`, `_in`, and `_not_in`.

In addition, the following global filters are available as part of `where` argument:

```gr
_change_block(number_gte: Int)
```


### Time-travel queries

You can query the state of your entities not just for the latest block, which is the by default, but also for an arbitrary block in the past. The block at which a query should happen can be specified either by its block number or its block hash by including a `block` argument in the toplevel fields of queries.

The result of such a query will not change over time, i.e., querying at a certain past block will return the same result no matter when it is executed, with the exception that if you query at a block very close to the head of the Ethereum chain, the result might change if that block turns out to not be on the main chain and the chain gets reorganized. Once a block can be considered final, the result of the query will not change.

Note that the current implementation is still subject to certain limitations that might violate these gurantees. The implementation can not always tell that a given block hash is not on the main chain at all, or that the result of a query by block hash for a block that can not be considered final yet might be influenced by a block reorganization running concurrently with the query. They do not affect the results of queries by block hash when the block is final and known to be on the main chain. [This issue](https://github.com/graphprotocol/graph-node/issues/1405) explains what these limitations are in detail.

#### Example

```graphql
{
  challenges(block: { number: 8000000 }) {
    challenger
    outcome
    application {
      id
    }
  }
}
```

This query will return `Challenge` entities, and their associated `Application` entities, as they existed directly after processing block number 8,000,000.

#### Example

```graphql
{
  challenges(block: { hash: "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c" }) {
    challenger
    outcome
    application {
      id
    }
  }
}
```

This query will return `Challenge` entities, and their associated `Application` entities, as they existed directly after processing the block with the given hash.

### Fulltext Search Queries

Fulltext search query fields provide an expressive text search API that can be added to the subgraph schema and customized. Refer to [Defining Fulltext Search Fields](/developer/create-subgraph-hosted#defining-fulltext-search-fields) to add fulltext search to your subgraph.

Fulltext search queries have one required field, `text`, for supplying search terms. Several special fulltext operators are available to be used in this `text` search field.

Fulltext search operators:

| Symbol | Operator | Description |
| --- | --- | --- |
| `&` | `And` | For combining multiple search terms into a filter for entities that include all of the provided terms |
| &#x7c; | `Or` | Queries with multiple search terms separated by the or operator will return all entities with a match from any of the provided terms |
| `<->` | `Follow by` | Specify the distance between two words. |
| `:*` | `Prefix` | Use the prefix search term to find words whose prefix match (2 characters required.) |

#### Examples

Using the `or` operator, this query will filter to blog entities with variations of either "anarchism" or "crumpet" in their fulltext fields.

```graphql
{
  blogSearch(text: "anarchism | crumpets") {
    id
    title
    body
    author
  }
}
```

The `follow by` operator specifies a words a specific distance apart in the fulltext documents. The following query will return all blogs with variations of "decentralize" followed by "philosophy"

```graphql
{
  blogSearch(text: "decentralized <-> philosophy") {
    id
    title
    body
    author
  }
}
```

Combine fulltext operators to make more complex filters. With a pretext search operator combined with a follow by this example query will match all blog entities with words that start with "lou" followed by "music".

```graphql
{
  blogSearch(text: "lou:* <-> music") {
    id
    title
    body
    author
  }
}
```

### Validation

Graph Node implements [specification-based](https://spec.graphql.org/October2021/#sec-Validation) validation of the GraphQL queries it receives using [graphql-tools-rs](https://github.com/dotansimha/graphql-tools-rs#validation-rules), which is based on the [graphql-js reference implementation](https://github.com/graphql/graphql-js/tree/main/src/validation). Queries which fail a validation rule do so with a standard error - visit the [GraphQL spec](https://spec.graphql.org/October2021/#sec-Validation) to learn more.

## Schema

The schema of your data source--that is, the entity types, values, and relationships that are available to query--are defined through the [GraphQL Interface Definition Langauge (IDL)](https://facebook.github.io/graphql/draft/#sec-Type-System).

GraphQL schemas generally define root types for `queries`, `subscriptions` and `mutations`. The Graph only supports `queries`. The root `Query` type for your subgraph is automatically generated from the GraphQL schema that's included in your subgraph manifest.

> **Note:** Our API does not expose mutations because developers are expected to issue transactions directly against the underlying blockchain from their applications.

### Entities

All GraphQL types with `@entity` directives in your schema will be treated as entities and must have an `ID` field.

> **Note:** Currently, all types in your schema must have an `@entity` directive. In the future, we will treat types without an `@entity` directive as value objects, but this is not yet supported.
