---
title: Deploy a Subgraph to the Hosted Service
---

If you have not checked out already, check out how to write the files that make up a [subgraph manifest](/developer/create-subgraph-hosted#the-subgraph-manifest) and how to install the [Graph CLI](https://github.com/graphprotocol/graph-cli) to generate code for your subgraph. Now, it's time to deploy your subgraph to the Hosted Service, also known as the Hosted Service.

## Create a Hosted Service account

Before using the Hosted Service, create an account in our Hosted Service. You will need a [Github](https://github.com/) account for that; if you don't have one, you need to create that first. Then, navigate to the [Hosted Service](https://thegraph.com/hosted-service/), click on the _'Sign up with Github'_ button, and complete Github's authorization flow.

## Store the Access Token

After creating an account, navigate to your [dashboard](https://thegraph.com/hosted-service/dashboard). Copy the access token displayed on the dashboard and run `graph auth --product hosted-service <ACCESS_TOKEN>`. This will store the access token on your computer. You only need to do this once, or if you ever regenerate the access token.

## Create a Subgraph on the Hosted Service

Before deploying the subgraph, you need to create it in The Graph Explorer. Go to the [dashboard](https://thegraph.com/hosted-service/dashboard) and click on the _'Add Subgraph'_ button and fill in the information below as appropriate:

**Image** - Select an image to be used as a preview image and thumbnail for the subgraph.

**Subgraph Name** - Together with the account name that the subgraph is created under, this will also define the `account-name/subgraph-name`-style name used for deployments and GraphQL endpoints. _This field cannot be changed later._

**Account** - The account that the subgraph is created under. This can be the account of an individual or organization. _Subgraphs cannot be moved between accounts later._

**Subtitle** - Text that will appear in subgraph cards.

**Description** - Description of the subgraph, visible on the subgraph details page.

**GitHub URL** - Link to the subgraph repository on GitHub.

**Hide** - Switching this on hides the subgraph in the Graph Explorer.

After saving the new subgraph, you are shown a screen with help on how to install the Graph CLI, how to generate the scaffolding for a new subgraph, and how to deploy your subgraph. The first two steps were covered in the [Define a Subgraph section](/developer/define-subgraph-hosted).

## Deploy a Subgraph on the Hosted Service

Deploying your subgraph will upload the subgraph files that you've built with `yarn build` to IPFS and tell the Graph Explorer to start indexing your subgraph using these files.

You deploy the subgraph by running `yarn deploy`

After deploying the subgraph, the Graph Explorer will switch to showing the synchronization status of your subgraph. Depending on the amount of data and the number of events that need to be extracted from historical Ethereum blocks, starting with the genesis block, syncing can take from a few minutes to several hours. The subgraph status switches to `Synced` once the Graph Node has extracted all data from historical blocks. The Graph Node will continue inspecting Ethereum blocks for your subgraph as these blocks are mined.

## Redeploying a Subgraph

When making changes to your subgraph definition, for example, to fix a problem in the entity mappings, run the `yarn deploy` command above again to deploy the updated version of your subgraph. Any update of a subgraph requires that Graph Node reindexes your entire subgraph, again starting with the genesis block.

If your previously deployed subgraph is still in status `Syncing`, it will be immediately replaced with the newly deployed version. If the previously deployed subgraph is already fully synced, Graph Node will mark the newly deployed version as the `Pending Version`, sync it in the background, and only replace the currently deployed version with the new one once syncing the new version has finished. This ensures that you have a subgraph to work with while the new version is syncing.

## Deploying the subgraph to multiple Ethereum networks

In some cases, you will want to deploy the same subgraph to multiple Ethereum networks without duplicating all of its code. The main challenge that comes with this is that the contract addresses on these networks are different.

### graph-cli >=0.29.0

From version `0.29.0` the `build` command accepts two new options:

```sh
graph build [options] [<subgraph-manifest>]

Options:

      ...
      --network <name>          Network to use from networks.json
      --network-file <path>     Networks file (default: "./networks.json")
```

You can use the `--network` option to specify a network configuration from a `json` standard file (defaults to `networks.json`) to easily update your subgraph during development.

**Note:** The `init` command will now auto-generate a `networks.json` based on the provided information. You will then be able to update existing or add additional networks.

If you don't have a `networks.json` file, you'll need to manually create one with the follwing structure:

```json
{
    "network1": { // the network name
        "dataSource1": { // the dataSource name
            "address": "0xabc...", // the contract address (optional)
            "startBlock": 123456 // the startBlock (optional)
        },
        "dataSource2": {
            "address": "0x123...",
            "startBlock": 123444
        }
    },
    "network2": {
        "dataSource1": {
            "address": "0x987...",
            "startBlock": 123
        },
        "dataSource2": {
            "address": "0xxyz..",
            "startBlock": 456
        }
    },
    ...
}
```
**Note:** You don't have to specify any of the `templates` (if you have any) in the config file, only the `dataSources`. If there are any `templates` declared in the `subgraph.yaml` file, their network will be automatically updated to the one specified with the `--network` option.

Now, let's assume you want to be able to deploy your subgraph to the `mainnet` and `ropsten` networks, and this is your `subgraph.yaml`:

```yaml
# ...
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    source:
      address: '0x123...'
      abi: Gravity
    mapping:
      kind: ethereum/events
```

This is what your networks config file should look like:

```json
{
    "mainnet": {
        "Gravity": {
            "address": "0x123..."
        }
    },
    "ropsten": {
        "Gravity": {
            "address": "0xabc..."
        }
    }
}
```

Now we can run the following command:

```sh
# Using default networks.json file
yarn build --network ropsten

# Using custom named file
yarn build --network ropsten --network-file path/to/config
```

The `build` command will update your `subgraph.yaml` with the `ropsten` configuration and then re-compile the subgraph. Your `subgraph.yaml` file now should look like this:

```yaml
# ...
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: ropsten
    source:
      address: '0xabc...'
      abi: Gravity
    mapping:
      kind: ethereum/events
```

Now you are ready to `yarn deploy`

### graph-cli \<0.29.0

One solution for older graph-cli versions that allows to parameterize aspects like contract addresses is to generate parts of it using a templating system like [Mustache](https://mustache.github.io/) or [Handlebars](https://handlebarsjs.com/).

To illustrate this approach, let's assume a subgraph should be deployed to mainnet and Ropsten using different contract addresses. You could then define two config files providing the addresses for each network:

```json
{
  "network": "mainnet",
  "address": "0x123..."
}
```

and

```json
{
  "network": "ropsten",
  "address": "0xabc..."
}
```

Along with that, you would substitute the network name and addresses in the manifest with variable placeholders `{{network}}` and `{{address}}` and rename the manifest to e.g. `subgraph.template.yaml`:

```yaml
# ...
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    network: {{network}}
    source:
      address: '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'
      address: '{{address}}'
      abi: Gravity
    mapping:
      kind: ethereum/events
```

In order to generate a manifest to either network, you could add two additional commands to `package.json` along with a dependency on `mustache`:

```json
{
  ...
  "scripts": {
    ...
    "prepare:mainnet": "mustache config/mainnet.json subgraph.template.yaml > subgraph.yaml",
    "prepare:ropsten": "mustache config/ropsten.json subgraph.template.yaml > subgraph.yaml"
  },
  "devDependencies": {
    ...
    "mustache": "^3.1.0"
  }
}
```

To deploy this subgraph for mainnet or Ropsten you would now simply run one of the two following commands:

```sh
# Mainnet:
yarn prepare:mainnet && yarn deploy

# Ropsten:
yarn prepare:ropsten && yarn deploy
```

A working example of this can be found [here](https://github.com/graphprotocol/example-subgraph/tree/371232cf68e6d814facf5e5413ad0fef65144759).

**Note:** This approach can also be applied to more complex situations, where it is necessary to substitute more than contract addresses and network names or where generating mappings or ABIs from templates as well.

## Checking subgraph health

If a subgraph syncs successfully, that is a good sign that it will continue to run well forever. However, new triggers on the chain might cause your subgraph to hit an untested error condition or it may start to fall behind due to performance issues or issues with the node operators.

Graph Node exposes a graphql endpoint which you can query to check the status of your subgraph. On the Hosted Service, it is available at `https://api.thegraph.com/index-node/graphql`. On a local node, it is available on port `8030/graphql` by default. The full schema for this endpoint can be found [here](https://github.com/graphprotocol/graph-node/blob/master/server/index-node/src/schema.graphql). Here is an example query that checks the status of the current version of a subgraph:

```graphql
{
  indexingStatusForCurrentVersion(subgraphName: "org/subgraph") {
    synced
    health
    fatalError {
      message
      block {
        number
        hash
      }
      handler
    }
    chains {
      chainHeadBlock {
        number
      }
      latestBlock {
        number
      }
    }
  }
}
```

This will give you the `chainHeadBlock` which you can compare with the `latestBlock` on your subgraph to check if it is running behind. `synced` informs if the subgraph has ever caught up to the chain. `health` can currently take the values of `healthy` if no errors occurred, or `failed` if there was an error which halted the progress of the subgraph. In this case, you can check the `fatalError` field for details on this error.
## Subgraph archive policy

The Hosted Service is a free Graph Node indexer. Developers can deploy subgraphs indexing a range of networks, which will be indexed, and made available to query via graphQL.

To improve the performance of the service for active subgraphs, the Hosted Service will archive subgraphs that are inactive.

**A subgraph is defined as "inactive" if it was deployed to the Hosted Service more than 45 days ago, and if it has received 0 queries in the last 30 days.**

Developers will be notified by email if one of their subgraphs has been marked as inactive 7 days before it is removed. If they wish to "activate" their subgraph, they can do so by making a query in their subgraph's Hosted Service graphQL playground. Developers can always redeploy an archived subgraph if it is required again.
