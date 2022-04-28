---
title: Migrating an Existing Subgraph to The Graph Network
---

## Introduction

This is a guide on how to migrate your subgraph from the Hosted Service to The Graph Network. The migration to The Graph Network has been successful for projects like Opyn, UMA, mStable, Audius, PoolTogether, Livepeer, RAI, Enzyme, DODO, Opyn, Pickle, and BadgerDAO all of which are relying on data served by Indexers on the network. There are now over 200 subgraphs live on The Graph Network, generating query fees and actively indexing web3 data.

The process of migration is quick and your subgraphs will forever benefit from the reliability and performance that you can only get on The Graph Network.

### When not to Migrate?

If your subgraph is:

- Indexing [IPFS](https://ipfs.io/).
- Using [full-text search fields](/developer/create-subgraph-hosted/#defining-fulltext-search-fields).
- Indexing chains other than Ethereum mainnet.

### Migrating an Existing Subgraph to The Graph Network

1. Get the latest version of the graph-cli installed:

```sh
npm install -g @graphprotocol/graph-cli
```

```sh
yarn global add @graphprotocol/graph-cli
```

2. Create a subgraph on the [Subgraph Studio](https://thegraph.com/studio/). Guides on how to do that can be found in the [Subgraph Studio docs](/studio/subgraph-studio) and in [this video tutorial](https://www.youtube.com/watch?v=HfDgC2oNnwo).
3. Inside the main project subgraph repository, authenticate the subgraph to deploy and build on the studio:

```sh
graph auth --studio <DEPLOY_KEY>
```

4. Generate files and build the subgraph:

```sh
graph codegen && graph build
```

5. Deploy the subgraph to the Studio. You can find your `<SUBGRAPH_SLUG>` in the Studio UI, which is based on the name of your subgraph.

```sh
 graph deploy --studio <SUBGRAPH_SLUG>
```

6. Test queries on the Studio's playground. Here are some examples for the [Sushi - Mainnet Exchange Subgraph](https://thegraph.com/explorer/subgraph?id=0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0&view=Playground):

```sh
{
  users(first: 5) {
    id
    liquidityPositions {
      id
    }
  }
  bundles(first: 5) {
    id
    ethPrice
  }
}
```

7. Fill in the description and the details of your subgraph and choose up to 3 categories. Upload a project image in the Studio if you'd like as well.
8. Publish the subgraph on The Graph's Network by hitting the "Publish" button.

- Remember that publishing is an on-chain action and will require gas to be paid for in Ethereum - see an example transaction [here](https://etherscan.io/tx/0xd0c3fa0bc035703c9ba1ce40c1862559b9c5b6ea1198b3320871d535aa0de87b). Prices are roughly around 0.0425 ETH at 100 gwei.
- Any time you need to upgrade your subgraph, you will be charged an upgrade fee. Remember, upgrading is just publishing another version of your existing subgraph on-chain. Because this incurs a cost, it is highly recommended to deploy and test your subgraph on Rinkeby before deploying to mainnet. It can, in some cases, also require some GRT if there is no signal on that subgraph. In the case there is signal/curation on that subgraph version (using auto-migrate), the taxes will be split.

And that's it! After you are done publishing, you'll be able to view your subgraphs live on the network via [The Graph Explorer](https://thegraph.com/explorer).

Feel free to leverage the [#Curators channel](https://discord.gg/rC8rBuRtbH) on Discord to let Curators know that your subgraph is ready to be signaled. It would also be helpful if you share your expected query volume with them. Therefore, they can estimate how much GRT they should signal on your subgraph.

### Upgrading a Subgraph on the Network

If you would like to upgrade an existing subgraph on the network, you can do this by deploying a new version of your subgraph to the Subgraph Studio using the Graph CLI.

1. Make changes to your current subgraph. A good idea is to test small fixes on the Subgraph Studio by publishing to Rinkeby.
2. Deploy the following and specify the new version in the command (eg. v0.0.1, v0.0.2, etc):

```sh
graph deploy --studio <SUBGRAPH_SLUG>
```

3. Test the new version in the Subgraph Studio by querying in the playground
4. Publish the new version on The Graph Network. Remember that this requires gas (as described in the section above).

### Owner Upgrade Fee: Deep Dive

An upgrade requires GRT to be migrated from the old version of the subgraph to the new version. This means that for every upgrade, a new bonding curve will be created (more on bonding curves [here](/curating#bonding-curve-101)).

The new bonding curve charges the 2.5% curation tax on all GRT being migrated to the new version. The owner must pay 50% of this or 1.25%. The other 1.25% is absorbed by all the curators as a fee. This incentive design is in place to prevent an owner of a subgraph from being able to drain all their curator's funds with recursive upgrade calls. If there is no curation activity, you will have to pay a minimum of 100 GRT in order to signal your own subgraph.

Let's make an example, this is only the case if your subgraph is being actively curated on:

- 100,000 GRT is signaled using auto-migrate on v1 of a subgraph
- Owner upgrades to v2. 100,000 GRT is migrated to a new bonding curve, where 97,500 GRT get put into the new curve and 2,500 GRT is burned
- The owner then has 1250 GRT burned to pay for half the fee. The owner must have this in their wallet before the upgrade, otherwise, the upgrade will not succeed. This happens in the same transaction as the upgrade.

_While this mechanism is currently live on the network, the community is currently discussing ways to reduce the cost of upgrades for subgraph developers._

### Maintaining a Stable Version of a Subgraph

If you're making a lot of changes to your subgraph, it is not a good idea to continually upgrade it and front the upgrade costs. Maintaining a stable and consistent version of your subgraph is critical, not only from the cost perspective but also so that Indexers can feel confident in their syncing times. Indexers should be flagged when you plan for an upgrade so that Indexer syncing times do not get impacted. Feel free to leverage the [#Indexers channel](https://discord.gg/rC8rBuRtbH) on Discord to let Indexers know when you're versioning your subgraphs.

Subgraphs are open APIs that external developers are leveraging. Open APIs need to follow strict standards so that they do not break external developers' applications. In The Graph Network, a subgraph developer must consider Indexers and how long it takes them to sync a new subgraph **as well as** other developers who are using their subgraphs.

### Updating the Metadata of a Subgraph

You can update the metadata of your subgraphs without having to publish a new version. The metadata includes the subgraph name, image, description, website URL, source code URL, and categories. Developers can do this by updating their subgraph details in the Subgraph Studio where you can edit all applicable fields.

Make sure **Update Subgraph Details in Explorer** is checked and click on **Save**. If this is checked, an on-chain transaction will be generated that updates subgraph details in the Explorer without having to publish a new version with a new deployment.

## Best Practices for Deploying a Subgraph to The Graph Network

1. Leveraging an ENS name for Subgraph Development:

- Set up your ENS: [https://app.ens.domains/](https://app.ens.domains/)
- Add your ENS name to your settings [here](https://thegraph.com/explorer/settings?view=display-name).

2. The more filled out your profiles are, the better the chances for your subgraphs to be indexed and curated.

## Deprecating a Subgraph on The Graph Network

Follow the steps [here](/developer/deprecating-a-subgraph) to deprecate your subgraph and remove it from The Graph Network.

## Querying a Subgraph + Billing on The Graph Network

The Hosted Service was set up to allow developers to deploy their subgraphs without any restrictions.

In order for The Graph Network to truly be decentralized, query fees have to be paid as a core part of the protocol's incentives. For more information on subscribing to APIs and paying the query fees, check out billing documentation [here](/studio/billing).

### Estimate Query Fees on the Network

While this is not a live feature in the product UI, you can set your maximum budget per query by taking the amount you're willing to pay per month and dividing it by your expected query volume.

While you get to decide on your query budget, there is no guarantee that an Indexer will be willing to serve queries at that price. If a Gateway can match you to an Indexer willing to serve a query at, or lower than, the price you are willing to pay, you will pay the delta/difference of your budget **and** their price. As a consequence, a lower query price reduces the pool of Indexers available to you, which may affect the quality of service you receive. It's beneficial to have high query fees, as that may attract curation and big-name Indexers to your subgraph.

Remember that it's a dynamic and growing market, but how you interact with it is in your control. There is no maximum or minimum price specified in the protocol or the Gateways. For example, you can look at the price paid by a few of the dapps on the network (on a per-week basis), below. See the last column, which shows query fees in GRT. For example, [Pickle Finance](https://www.pickle.finance/) has 8 requests per second and paid 2.4 GRT for one week.

![QueryFee](/img/QueryFee.png)

## Additional Resources

If you're still confused, fear not! Check out the following resources or watch our video guide on migrating subgraphs to the decentralized network below:

<figure className="video-container">
  <iframe
    className="video-iframe"
    src="https://www.youtube.com/embed/CzdQ3dFFrjo"
    title="YouTube video player"
    frameBorder="0"
    allowFullScreen
  ></iframe>
</figure>

- [The Graph Network Contracts](https://github.com/graphprotocol/contracts)
- [Curation Contract](https://github.com/graphprotocol/contracts/blob/dev/contracts/curation/Curation.sol) - the underlying contract that the GNS wraps around
  - Address - `0x8fe00a685bcb3b2cc296ff6ffeab10aca4ce1538`
- [Subgraph Studio documentation](/studio/subgraph-studio)
