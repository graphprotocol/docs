---
title: Distributed Systems
---

The Graph is a protocol implemented as a distributed system.

Connections fail. Requests arrive out of order. Different computers with out-of-sync clocks and states process related requests. Servers restart. Re-orgs happen between requests. These problems are inherent to all distributed systems but are exacerbated in systems operating at a global scale.

Consider this example of what may occur if a client polls an Indexer for the latest data during a re-org.

1. Indexer ingests block 8
2. Request served to the client for block 8
3. Indexer ingests block 9
4. Indexer ingests block 10A
5. Request served to the client for block 10A
6. Indexer detects reorg to 10B and rolls back 10A
7. Request served to the client for block 9
8. Indexer ingests block 10B
9. Indexer ingests block 11
10. Request served to the client for block 11

From the point of view of the Indexer, things are progressing forward logically. Time is moving forward, though we did have to roll back an uncle block and play the block under consensus forward on top of it. Along the way, the Indexer serves requests using the latest state it knows about at that time.

From the point of view of the client, however, things appear chaotic. The client observes that the responses were for blocks 8, 10, 9, and 11 in that order. We call this the "block wobble" problem. When a client experiences block wobble, data may appear to contradict itself over time. The situation worsens when we consider that Indexers do not all ingest the latest blocks simultaneously, and your requests may be routed to multiple Indexers.

It is the responsibility of the client and server to work together to provide consistent data to the user. Different approaches must be used depending on the desired consistency as there is no one right program for every problem.

Reasoning through the implications of distributed systems is hard, but the fix may not be! We've established APIs and patterns to help you navigate some common use-cases. The following examples illustrate those patterns but still elide details required by production code (like error handling and cancellation) to not obfuscate the main ideas.

## Polling for updated data

The Graph provides the `block: { number_gte: $minBlock }` API, which ensures that the response is for a single block equal or higher to `$minBlock`. If the request is made to a `graph-node` instance and the min block is not yet synced, `graph-node` will return an error. If `graph-node` has synced min block, it will run the response for the latest block. If the request is made to an Edge & Node Gateway, the Gateway will filter out any Indexers that have not yet synced min block and make the request for the latest block the Indexer has synced.

We can use `number_gte` to ensure that time never travels backward when polling for data in a loop. Here is an example:

```javascript
/// Updates the protocol.paused variable to the latest
/// known value in a loop by fetching it using The Graph.
async function updateProtocolPaused() {
  // It's ok to start with minBlock at 0. The query will be served
  // using the latest block available. Setting minBlock to 0 is the
  // same as leaving out that argument.
  let minBlock = 0

  for (;;) {
    // Schedule a promise that will be ready once
    // the next Ethereum block will likely be available.
    const nextBlock = new Promise((f) => {
      setTimeout(f, 14000)
    })

    const query = `
        query GetProtocol($minBlock: Int!) {
            protocol(block: { number_gte: $minBlock }  id: "0") {
              paused
            }
            _meta {
                block {
                    number
                }
            }
        }`

    const variables = { minBlock }
    const response = await graphql(query, variables)
    minBlock = response._meta.block.number

    // TODO: Do something with the response data here instead of logging it.
    console.log(response.protocol.paused)

    // Sleep to wait for the next block
    await nextBlock
  }
}
```

## Fetching a set of related items

Another use-case is retrieving a large set or, more generally, retrieving related items across multiple requests. Unlike the polling case (where the desired consistency was to move forward in time), the desired consistency is for a single point in time.

Here we will use the `block: { hash: $blockHash }` argument to pin all of our results to the same block.

```javascript
/// Gets a list of domain names from a single block using pagination
async function getDomainNames() {
  // Set a cap on the maximum number of items to pull.
  let pages = 5
  const perPage = 1000

  // The first query will get the first page of results and also get the block
  // hash so that the remainder of the queries are consistent with the first.
  const listDomainsQuery = `
    query ListDomains($perPage: Int!) {
        domains(first: $perPage) {
            name
            id
        }
        _meta {
            block {
                hash
            }
        }
    }`

  let data = await graphql(listDomainsQuery, { perPage })
  let result = data.domains.map((d) => d.name)
  let blockHash = data._meta.block.hash

  let query
  // Continue fetching additional pages until either we run into the limit of
  // 5 pages total (specified above) or we know we have reached the last page
  // because the page has fewer entities than a full page.
  while (data.domains.length == perPage && --pages) {
    let lastID = data.domains[data.domains.length - 1].id
    query = `
        query ListDomains($perPage: Int!, $lastID: ID!, $blockHash: Bytes!) {
            domains(first: $perPage, where: { id_gt: $lastID }, block: { hash: $blockHash }) {
                name
                id
            }
        }`

    data = await graphql(query, { perPage, lastID, blockHash })

    // Accumulate domain names into the result
    for (domain of data.domains) {
      result.push(domain.name)
    }
  }
  return result
}
```

Note that in case of a re-org, the client will need to retry from the first request to update the block hash to a non-uncle block.
