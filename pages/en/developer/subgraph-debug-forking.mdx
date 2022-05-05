---
title: Quick and easy subgraph debugging using forks
---

As with many systems processing large amounts of data, The Graph's Indexers (Graph nodes) may take quite some time to sync-up your subgraph with the target blockchain. The discrepancy between quick changes with the purpose of debugging and long wait times needed for indexing is extremely counterproductive and we are well aware of that. This is why we are introducing **subgraph forking**, developed by [LimeChain](https://limechain.tech/), and in this article I will show you how this feature can be used to substantially speed-up subgraph debugging!

## Ok, what is it?

**Subgraph forking** is the process of lazily fetching entities from _another_ subgraph's store (usually a remote one).

In the context of debugging, **subgraph forking** allows you to debug your failed subgraph at block _X_ without needing to wait to sync-up to block _X_.

## What?! How?

When you deploy a subgraph to a remote Graph node for indexing and it fails at block _X_, the good news is that the Graph node will still serve GraphQL queries using its store, which is synced-up to block _X_. That's great! This means we can take advantage of this "up-to-date" store to fix the bugs arising when indexing block _X_.

In a nutshell, we are going to _fork the failing subgraph_ from a remote Graph node that is guaranteed to have the subgraph indexed up to block _X_ in order to provide the locally deployed subgraph being debugged at block _X_ an up-to-date view of the indexing state.

## Please, show me some code!

To stay focused on subgraph debugging, let's keep things simple and run along with the [example-subgraph](https://github.com/graphprotocol/example-subgraph) indexing the Ethereum Gravity smart contract.

Here are the handlers defined for indexing `Gravatar`s, with no bugs whatsoever:

```tsx
export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex().toString())
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let gravatar = Gravatar.load(event.params.id.toI32().toString())
  if (gravatar == null) {
    log.critical('Gravatar not found!', [])
    return
  }
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}
```

Oops, how unfortunate, when I deploy my perfect looking subgraph to the [Hosted Service](https://thegraph.com/hosted-service/) it fails with the _"Gravatar not found!"_ error.

The usual way to attempt a fix is:

1. Make a change in the mappings source, which you believe will solve the issue (while I know it won't).
2. Re-deploy the subgraph to the [Hosted Service](https://thegraph.com/hosted-service/) (or another remote Graph node).
3. Wait for it to sync-up.
4. If it breaks again go back to 1, otherwise: Hooray!

It is indeed pretty familiar to an ordinary debug process, but there is one step that horribly slows down the process: _3. Wait for it to sync-up._

Using **subgraph forking** we can essentially eliminate this step. Here is how it looks:

0. Spin-up a local Graph node with the **_appropriate fork-base_** set.
1. Make a change in the mappings source, which you believe will solve the issue.
2. Deploy to the local Graph node, **_forking the failing subgraph_** and **_starting from the problematic block_**.
3. If it breaks again, go back to 1, otherwise: Hooray!

Now, you may have 2 questions:

1. fork-base what???
2. Forking who?!

And I answer:

1. `fork-base` is the "base" URL, such that when the _subgraph id_ is appended the resulting URL (`<fork-base>/<subgraph-id>`) is a valid GraphQL endpoint for the subgraph's store.
2. Forking is easy, no need to sweat:

```bash
$ graph deploy <subgraph-name> --debug-fork <subgraph-id> --ipfs http://localhost:5001 --node http://localhost:8020
```

Also, don't forget to set the `dataSources.source.startBlock` field in the subgraph manifest to the number of the problematic block, so you can skip indexing unnecessary blocks and take advantage of the fork!

So, here is what I do:

0. I spin-up a local graph node ([here is how to do it](https://github.com/graphprotocol/graph-node#running-a-local-graph-node)) with the `fork-base` option set to: `https://api.thegraph.com/subgraphs/id/`, since I will fork a subgraph, the buggy one I deployed earlier, from the [HostedService](https://thegraph.com/hosted-service/).

```
$ cargo run -p graph-node --release -- \
    --postgres-url postgresql://USERNAME[:PASSWORD]@localhost:5432/graph-node \
    --ethereum-rpc NETWORK_NAME:[CAPABILITIES]:URL \
    --ipfs 127.0.0.1:5001
    --fork-base https://api.thegraph.com/subgraphs/id/
```

1. After careful inspection I notice that there is a mismatch in the `id` representations used when indexing `Gravatar`s in my two handlers. While `handleNewGravatar` converts it to a hex (`event.params.id.toHex()`), `handleUpdatedGravatar` uses an int32 (`event.params.id.toI32()`) which causes the `handleUpdatedGravatar` to panic with "Gravatar not found!". I make them both convert the `id` to a hex.
2. After I made the changes I deploy my subgraph to the local Graph node, **_forking the failing subgraph_** and setting `dataSources.source.startBlock` to `6190343` in `subgraph.yaml`:

```bash
  $ graph deploy gravity --debug-fork QmNp169tKvomnH3cPXTfGg4ZEhAHA6kEq5oy1XDqAxqHmW --ipfs http://localhost:5001 --node http://localhost:8020
```

3. I inspect the logs produced by the local Graph node and, Hooray!, everything seems to be working.
4. I deploy my now bug-free subgraph to a remote Graph node and live happily ever after! (no potatoes tho)
5. The end...
