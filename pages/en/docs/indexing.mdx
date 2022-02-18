---
title: Indexer
---

import { Difficulty } from '@/components'

Indexers are node operators in The Graph Network that stake Graph Tokens (GRT) in order to provide indexing and query processing services. Indexers earn query fees and indexing rewards for their services. They also earn from a Rebate Pool that is shared with all network contributors proportional to their work, following the Cobbs-Douglas Rebate Function.

GRT that is staked in the protocol is subject to a thawing period and can be slashed if Indexers are malicious and serve incorrect data to applications or if they index incorrectly. Indexers can also be delegated stake from Delegators, to contribute to the network.

Indexers select subgraphs to index based on the subgraph’s curation signal, where Curators stake GRT in order to indicate which subgraphs are high-quality and should be prioritized. Consumers (eg. applications) can also set parameters for which Indexers process queries for their subgraphs and set preferences for query fee pricing.

<Difficulty level="ADVANCED" />

## FAQ

### What is the minimum stake required to be an indexer on the network?

The minimum stake for an indexer is currently set to 100K GRT.

### What are the revenue streams for an indexer?

**Query fee rebates** - Payments for serving queries on the network. These payments are mediated via state channels between an indexer and a gateway. Each query request from a gateway contains a payment and the corresponding response a proof of query result validity.

**Indexing rewards** - Generated via a 3% annual protocol wide inflation, the indexing rewards are distributed to indexers who are indexing subgraph deployments for the network.

### How are rewards distributed?

Indexing rewards come from protocol inflation which is set to 3% annual issuance. They are distributed across subgraphs based on the proportion of all curation signal on each, then distributed proportionally to indexers based on their allocated stake on that subgraph. **An allocation must be closed with a valid proof of indexing (POI) that meets the standards set by the arbitration charter in order to be eligible for rewards.**

Numerous tools have been created by the community for calculating rewards; you'll find a collection of them organized in the [Community Guides collection](https://www.notion.so/Community-Guides-abbb10f4dba040d5ba81648ca093e70c). You can also find an up to date list of tools in the #delegators and #indexers channels on the [Discord server](https://discord.gg/vtvv7FP).

### What is a proof of indexing (POI)?

POIs are used in the network to verify that an indexer is indexing the subgraphs they have allocated on. A POI for the first block of the current epoch must be submitted when closing an allocation for that allocation to be eligible for indexing rewards. A POI for a block is a digest for all entity store transactions for a specific subgraph deployment up to and including that block.

### When are indexing rewards distributed?

Allocations are continuously accruing rewards while they're active. Rewards are collected by the indexers, and distributed whenever their allocations are closed. That happens either manually, whenever the indexer wants to force close them, or after 28 epochs a delegator can close the allocation for the indexer, but this results in no rewards being minted. 28 epochs is the max allocation lifetime (right now, one epoch lasts for ~24h).

### Can pending indexer rewards be monitored?

The RewardsManager contract has a read-only [getRewards](https://github.com/graphprotocol/contracts/blob/master/contracts/rewards/RewardsManager.sol#L317) function that can be used to check the pending rewards for a specific allocation.

Many of the community-made dashboards include pending rewards values and they can be easily checked manually by following these steps:

1. Query the [mainnet subgraph](https://thegraph.com/hosted-service/subgraph/graphprotocol/graph-network-mainnet) to get the IDs for all active allocations:

```graphql
query indexerAllocations {
  indexer(id: "<INDEXER_ADDRESS>") {
    allocations {
      activeForIndexer {
        allocations {
          id
        }
      }
    }
  }
}
```

Use Etherscan to call `getRewards()`:

- Navigate to [Etherscan interface to Rewards contract](https://etherscan.io/address/0x9Ac758AB77733b4150A901ebd659cbF8cB93ED66#readProxyContract)

* To call `getRewards()`:
  - Expand the **10. getRewards** dropdown.
  - Enter the **allocationID** in the input.
  - Click the **Query** button.

### What are disputes and where can I view them?

Indexer's queries and allocations can both be disputed on The Graph during the dispute period. The dispute period varies, depending on the type of dispute. Queries/attestations have 7 epochs dispute window, whereas allocations have 56 epochs. After these periods pass, disputes cannot be opened against either of allocations or queries. When a dispute is opened, a deposit of a minimum of 10,000 GRT is required by the Fishermen, which will be locked until the dispute is finalized and a resolution has been given. Fisherman are any network participants that open disputes.

Disputes have **three** possible outcomes, so does the deposit of the Fishermen.

- If the dispute is rejected, the GRT deposited by the Fishermen will be burned, and the disputed Indexer will not be slashed.
- If the dispute is settled as a draw, the Fishermen's deposit will be returned, and the disputed Indexer will not be slashed.
- If the dispute is accepted, the GRT deposited by the Fishermen will be returned, the disputed Indexer will be slashed and the Fishermen will earn 50% of the slashed GRT.

Disputes can be viewed in the UI in an Indexer's profile page under the `Disputes` tab.

### What are query fee rebates and when are they distributed?

Query fees are collected by the gateway whenever an allocation is closed and accumulated in the subgraph's query fee rebate pool. The rebate pool is designed to encourage Indexers to allocate stake in rough proportion to the amount of query fees they earn for the network. The portion of query fees in the pool that are allocated to a particular indexer is calculated using the Cobbs-Douglas Production Function; the distributed amount per indexer is a function of their contributions to the pool and their allocation of stake on the subgraph.

Once an allocation has been closed and the dispute period has passed the rebates are available to be claimed by the indexer. Upon claiming, the query fee rebates are distributed to the indexer and their delegators based on the query fee cut and the delegation pool proportions.

### What is query fee cut and indexing reward cut?

The `queryFeeCut` and `indexingRewardCut` values are delegation parameters that the Indexer may set along with cooldownBlocks to control the distribution of GRT between the indexer and their delegators. See the last steps in [Staking in the Protocol](/indexing#stake-in-the-protocol) for instructions on setting the delegation parameters.

- **queryFeeCut** - the % of query fee rebates accumulated on a subgraph that will be distributed to the indexer. If this is set to 95%, the indexer will receive 95% of the query fee rebate pool when an allocation is claimed with the other 5% going to the delegators.

- **indexingRewardCut** - the % of indexing rewards accumulated on a subgraph that will be distributed to the indexer. If this is set to 95%, the indexer will receive 95% of the indexing rewards pool when an allocation is closed and the delegators will split the other 5%.

### How do indexers know which subgraphs to index?

Indexers may differentiate themselves by applying advanced techniques for making subgraph indexing decisions but to give a general idea we'll discuss several key metrics used to evaluate subgraphs in the network:

- **Curation signal** - The proportion of network curation signal applied to a particular subgraph is a good indicator of the interest in that subgraph, especially during the bootstrap phase when query voluming is ramping up.

- **Query fees collected** - The historical data for volume of query fees collected for a specific subgraph is a good indicator of future demand.

- **Amount staked** - Monitoring the behavior of other indexers or looking at proportions of total stake allocated towards specific subgraphs can allow an indexer to monitor the supply side for subgraph queries to identify subgraphs that the network is showing confidence in or subgraphs that may show a need for more supply.

- **Subgraphs with no indexing rewards** - Some subgraphs do not generate indexing rewards mainly because they are using unsupported features like IPFS or because they are querying another network outside of mainnet. You will see a message on a subgraph if it is not generating indexing rewards.

### What are the hardware requirements?

- **Small** - Enough to get started indexing several subgraphs, will likely need to be expanded.
- **Standard** - Default setup, this is what is used in the example k8s/terraform deployment manifests.
- **Medium** - Production indexer supporting 100 subgraphs and 200-500 requests per second.
- **Large** - Prepared to index all currently used subgraphs and serve requests for the related traffic.

| Setup | Postgres<br />(CPUs) | Postgres<br />(memory in GBs) | Postgres<br />(disk in TBs) | VMs<br />(CPUs) | VMs<br />(memory in GBs) |
| --- | :-: | :-: | :-: | :-: | :-: |
| Small | 4 | 8 | 1 | 4 | 16 |
| Standard | 8 | 30 | 1 | 12 | 48 |
| Medium | 16 | 64 | 2 | 32 | 64 |
| Large | 72 | 468 | 3.5 | 48 | 184 |

### What are some basic security precautions an indexer should take?

- **Operator wallet** - Setting up an operator wallet is an important precaution because it allows an indexer to maintain separation between their keys that control stake and those that are in control of day-to-day operations. See [Stake in Protocol](/indexing#stake-in-the-protocol) for instructions.

- **Firewall** - Only the indexer service needs to be exposed publicly and particular attention should be paid to locking down admin ports and database access: the Graph Node JSON-RPC endpoint (default port: 8030), the indexer management API endpoint (default port: 18000), and the Postgres database endpoint (default port: 5432) should not be exposed.

## Infrastructure

At the center of an indexer's infrastructure is the Graph Node which monitors Ethereum, extracts and loads data per a subgraph definition and serves it as a [GraphQL API](/about/introduction#how-the-graph-works). The Graph Node needs to be connected to Ethereum EVM node endpoints, and IPFS node for sourcing data; a PostgreSQL database for its store; and indexer components which facilitate its interactions with the network.

- **PostgreSQL database** - The main store for the Graph Node, this is where subgraph data is stored. The indexer service and agent also use the database to store state channel data, cost models, and indexing rules.

- **Ethereum endpoint** - An endpoint that exposes an Ethereum JSON-RPC API. This may take the form of a single Ethereum client or it could be a more complex setup that load balances across multiple. It's important to be aware that certain subgraphs will require particular Ethereum client capabilities such as archive mode and the tracing API.

- **IPFS node (version less than 5)** - Subgraph deployment metadata is stored on the IPFS network. The Graph Node primarily accesses the IPFS node during subgraph deployment to fetch the subgraph manifest and all linked files. Network indexers do not need to host their own IPFS node, an IPFS node for the network is hosted at https://ipfs.network.thegraph.com.

- **Indexer service** - Handles all required external communications with the network. Shares cost models and indexing statuses, passes query requests from gateways on to a Graph Node, and manages the query payments via state channels with the gateway.

- **Indexer agent** - Facilitates the indexers interactions on chain including registering on the network, managing subgraph deployments to its Graph Node/s, and managing allocations.

- **Prometheus metrics server** - The Graph Node and Indexer components log their metrics to the metrics server.

Note: To support agile scaling, it is recommended that query and indexing concerns are separated between different sets of nodes: query nodes and index nodes.

### Ports overview

> **Important**: Be careful about exposing ports publicly - **administration ports** should be kept locked down. This includes the the Graph Node JSON-RPC and the indexer management endpoints detailed below.

#### Graph Node

| Port | Purpose | Routes | CLI Argument | Environment Variable |
| --- | --- | --- | --- | --- |
| 8000 | GraphQL HTTP server<br />(for subgraph queries) | /subgraphs/id/...<br />/subgraphs/name/.../... | --http-port | - |
| 8001 | GraphQL WS<br />(for subgraph subscriptions) | /subgraphs/id/...<br />/subgraphs/name/.../... | --ws-port | - |
| 8020 | JSON-RPC<br />(for managing deployments) | / | --admin-port | - |
| 8030 | Subgraph indexing status API | /graphql | --index-node-port | - |
| 8040 | Prometheus metrics | /metrics | --metrics-port | - |

#### Indexer Service

| Port | Purpose | Routes | CLI Argument | Environment Variable |
| --- | --- | --- | --- | --- |
| 7600 | GraphQL HTTP server<br />(for paid subgraph queries) | /subgraphs/id/...<br />/status<br />/channel-messages-inbox | --port | `INDEXER_SERVICE_PORT` |
| 7300 | Prometheus metrics | /metrics | --metrics-port | - |

#### Indexer Agent

| Port | Purpose                | Routes | CLI Argument              | Environment Variable                    |
| ---- | ---------------------- | ------ | ------------------------- | --------------------------------------- |
| 8000 | Indexer management API | /      | --indexer-management-port | `INDEXER_AGENT_INDEXER_MANAGEMENT_PORT` |

### Setup server infrastructure using Terraform on Google Cloud

#### Install prerequisites

- Google Cloud SDK
- Kubectl command line tool
- Terraform

#### Create a Google Cloud Project

- Clone or navigate to the indexer repository.

- Navigate to the ./terraform directory, this is where all commands should be executed.

```sh
cd terraform
```

- Authenticate with Google Cloud and create a new project.

```sh
gcloud auth login
project=<PROJECT_NAME>
gcloud projects create --enable-cloud-apis $project
```

- Use the Google Cloud Console's billing page to enable billing for the new project.

- Create a Google Cloud configuration.

```sh
proj_id=$(gcloud projects list --format='get(project_id)' --filter="name=$project")
gcloud config configurations create $project
gcloud config set project "$proj_id"
gcloud config set compute/region us-central1
gcloud config set compute/zone us-central1-a
```

- Enable required Google Cloud APIs.

```sh
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
gcloud services enable servicenetworking.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

- Create a service account.

```sh
svc_name=<SERVICE_ACCOUNT_NAME>
gcloud iam service-accounts create $svc_name \
  --description="Service account for Terraform" \
  --display-name="$svc_name"
gcloud iam service-accounts list
# Get the email of the service account from the list
svc=$(gcloud iam service-accounts list --format='get(email)'
--filter="displayName=$svc_name")
gcloud iam service-accounts keys create .gcloud-credentials.json \
  --iam-account="$svc"
gcloud projects add-iam-policy-binding $proj_id \
  --member serviceAccount:$svc \
  --role roles/editor
```

- Enable peering between database and Kubernetes cluster that will be created in the next step.

```sh
gcloud compute addresses create google-managed-services-default \
  --prefix-length=20 \
  --purpose=VPC_PEERING \
  --network default \
  --global \
  --description 'IP Range for peer networks.'
gcloud services vpc-peerings connect \
  --network=default \
  --ranges=google-managed-services-default
```

- Create minimal terraform configuration file (update as needed).

```sh
indexer=<INDEXER_NAME>
cat > terraform.tfvars <<EOF
project = "$proj_id"
indexer = "$indexer"
database_password = "<database passowrd>"
EOF
```

#### Use Terraform to create infrastructure

Before running any commands, read through [variables.tf](https://github.com/graphprotocol/indexer/blob/main/terraform/variables.tf) and create a file `terraform.tfvars` in this directory (or modify the one we created in the last step). For each variable where you want to override the default, or where you need to set a value, enter a setting into `terraform.tfvars`.

- Run the following commands to create the infrastructure.

```sh
# Install required plugins
terraform init

# View plan for resources to be created
terraform plan

# Create the resources (expect it to take up to 30 minutes)
terraform apply
```

Download credentials for the new cluster into `~/.kube/config` and set it as your default context.

```sh
gcloud container clusters get-credentials $indexer
kubectl config use-context $(kubectl config get-contexts --output='name'
| grep $indexer)
```

#### Creating the Kubernetes components for the indexer

- Copy the directory `k8s/overlays` to a new directory `$dir,` and adjust the `bases` entry in `$dir/kustomization.yaml` so that it points to the directory `k8s/base`.

- Read through all the files in `$dir` and adjust any values as indicated in the comments.

Deploy all resources with `kubectl apply -k $dir`.

### Graph Node

[Graph Node](https://github.com/graphprotocol/graph-node) is an open source Rust implementation that event sources the Ethereum blockchain to deterministically update a data store that can be queried via the GraphQL endpoint. Developers use subgraphs to define their schema, and a set of mappings for transforming the data sourced from the block chain and the Graph Node handles syncing the entire chain, monitoring for new blocks, and serving it via a GraphQL endpoint.

#### Getting started from source

#### Install prerequisites

- **Rust**

- **PostgreSQL**

- **IPFS**

- **Additional Requirements for Ubuntu users** - To run a Graph Node on Ubuntu a few additional packages may be needed.

```sh
sudo apt-get install -y clang libpg-dev libssl-dev pkg-config
```

#### Setup

1. Start a PostgreSQL database server

```sh
initdb -D .postgres
pg_ctl -D .postgres -l logfile start
createdb graph-node
```

2. Clone [Graph Node](https://github.com/graphprotocol/graph-node) repo and build the source by running `cargo build`

3. Now that all the dependencies are setup, start the Graph Node:

```sh
cargo run -p graph-node --release -- \
  --postgres-url postgresql://[USERNAME]:[PASSWORD]@localhost:5432/graph-node \
  --ethereum-rpc [NETWORK_NAME]:[URL] \
  --ipfs https://ipfs.network.thegraph.com
```

#### Getting started using Docker

#### Prerequisites

- **Ethereum node** - By default, the docker compose setup will use mainnet: [http://host.docker.internal:8545](http://host.docker.internal:8545) to connect to the Ethereum node on your host machine. You can replace this network name and url by updating `docker-compose.yaml`.

#### Setup

1. Clone Graph Node and navigate to the Docker directory:

```sh
git clone http://github.com/graphprotocol/graph-node
cd graph-node/docker
```

2. For linux users only - Use the host IP address instead of `host.docker.internal` in the `docker-compose.yaml `using the included script:

```sh
./setup.sh
```

3. Start a local Graph Node that will connect to your Ethereum endpoint:

```sh
docker-compose up
```

### Indexer components

To successfully participate in the network requires almost constant monitoring and interaction, so we've built a suite of Typescript applications for facilitating an Indexers network participation. There are three indexer components:

- **Indexer agent** - The agent monitors the network and the indexer's own infrastructure and manages which subgraph deployments are indexed and allocated towards on chain and how much is allocated towards each.

- **Indexer service** - The only component that needs to be exposed externally, the service passes on subgraph queries to the graph node, manages state channels for query payments, shares important decision making information to clients like the gateways.

- **Indexer CLI** - The command line interface for managing the indexer agent. It allows indexers to manage cost models and indexing rules.

#### Getting started

The indexer agent and indexer service should be co-located with your Graph Node infrastructure. There are many ways to setup virtual execution environments for you indexer components; here we'll explain how to run them on baremetal using NPM packages or source, or via kubernetes and docker on the Google Cloud Kubernetes Engine. If these setup examples do not translate well to your infrastructure there will likely be a community guide to reference, come say hi on [Discord](https://thegraph.com/discord)! Remember to [stake in the protocol](/indexing#stake-in-the-protocol) before starting up your indexer components!

#### From NPM packages

```sh
npm install -g @graphprotocol/indexer-service
npm install -g @graphprotocol/indexer-agent

# Indexer CLI is a plugin for Graph CLI, so both need to be installed:
npm install -g @graphprotocol/graph-cli
npm install -g @graphprotocol/indexer-cli

# Indexer service
graph-indexer-service start ...

# Indexer agent
graph-indexer-agent start ...

# Indexer CLI
#Forward the port of your agent pod if using Kubernetes
kubectl port-forward pod/POD_ID 18000:8000
graph indexer connect http://localhost:18000/
graph indexer ...
```

#### From source

```sh
# From Repo root directory
yarn

# Indexer Service
cd packages/indexer-service
./bin/graph-indexer-service start ...

# Indexer agent
cd packages/indexer-agent
./bin/graph-indexer-service start ...

# Indexer CLI
cd packages/indexer-cli
./bin/graph-indexer-cli indexer connect http://localhost:18000/
./bin/graph-indexer-cli indexer ...
```

#### Using docker

- Pull images from the registry

```sh
docker pull ghcr.io/graphprotocol/indexer-service:latest
docker pull ghcr.io/graphprotocol/indexer-agent:latest
```

Or build images locally from source

```sh
# Indexer service
docker build \
  --build-arg NPM_TOKEN=<npm-token> \
  -f Dockerfile.indexer-service \
  -t indexer-service:latest \
# Indexer agent
docker build \
  --build-arg NPM_TOKEN=<npm-token> \
  -f Dockerfile.indexer-agent \
  -t indexer-agent:latest \
```

- Run the components

```sh
docker run -p 7600:7600 -it indexer-service:latest ...
docker run -p 18000:8000 -it indexer-agent:latest ...
```

**NOTE**: After starting the containers, the indexer service should be accessible at [http://localhost:7600](http://localhost:7600) and the indexer agent should be exposing the indexer management API at [http://localhost:18000/](http://localhost:18000/).

#### Using K8s and Terraform

See the [Setup Server Infrastructure Using Terraform on Google Cloud](/indexing#setup-server-infrastructure-using-terraform-on-google-cloud) section

#### Usage

> **NOTE**: All runtime configuration variables may be applied either as parameters to the command on startup or using environment variables of the format `COMPONENT_NAME_VARIABLE_NAME`(ex. `INDEXER_AGENT_ETHEREUM`).

#### Indexer agent

```sh
graph-indexer-agent start \
  --ethereum <MAINNET_ETH_ENDPOINT> \
  --ethereum-network mainnet \
  --mnemonic <MNEMONIC> \
  --indexer-address <INDEXER_ADDRESS> \
  --graph-node-query-endpoint http://localhost:8000/ \
  --graph-node-status-endpoint http://localhost:8030/graphql \
  --graph-node-admin-endpoint http://localhost:8020/ \
  --public-indexer-url http://localhost:7600/ \
  --indexer-geo-coordinates <YOUR_COORDINATES> \
  --index-node-ids default \
  --indexer-management-port 18000 \
  --metrics-port 7040 \
  --network-subgraph-endpoint https://gateway.network.thegraph.com/network \
  --default-allocation-amount 100 \
  --register true \
  --inject-dai true \
  --postgres-host localhost \
  --postgres-port 5432 \
  --postgres-username <DB_USERNAME> \
  --postgres-password <DB_PASSWORD> \
  --postgres-database indexer \
  | pino-pretty
```

#### Indexer service

```sh
SERVER_HOST=localhost \
SERVER_PORT=5432 \
SERVER_DB_NAME=is_staging \
SERVER_DB_USER=<DB_USERNAME> \
SERVER_DB_PASSWORD=<DB_PASSWORD> \
graph-indexer-service start \
  --ethereum <MAINNET_ETH_ENDPOINT> \
  --ethereum-network mainnet \
  --mnemonic <MNEMONIC> \
  --indexer-address <INDEXER_ADDRESS> \
  --port 7600 \
  --metrics-port 7300 \
  --graph-node-query-endpoint http://localhost:8000/ \
  --graph-node-status-endpoint http://localhost:8030/graphql \
  --postgres-host localhost \
  --postgres-port 5432 \
  --postgres-username <DB_USERNAME> \
  --postgres-password <DB_PASSWORD> \
  --postgres-database is_staging \
  --network-subgraph-endpoint https://gateway.network.thegraph.com/network \
  | pino-pretty
```

#### Indexer CLI

The Indexer CLI is a plugin for [`@graphprotocol/graph-cli`](https://www.npmjs.com/package/@graphprotocol/graph-cli) accessible in the terminal at `graph indexer`.

```sh
graph indexer connect http://localhost:18000
graph indexer status
```

#### Indexer management using indexer CLI

The indexer agent needs input from an indexer in order to autonomously interact with the network on the behalf of the indexer. The mechanism for defining indexer agent behavior are the **indexing rules**. Using **indexing rules** an indexer can apply their specific strategy for picking subgraphs to index and serve queries for. Rules are managed via a GraphQL API served by the agent and known as the Indexer Management API. The suggested tool for interacting with the **Indexer Management API** is the **Indexer CLI**, an extension to the **Graph CLI**.

#### Usage

The **Indexer CLI** connects to the indexer agent, typically through port-forwarding, so the CLI does not need to run on the same server or cluster. To help you get started, and to provide some context, the CLI will briefly be described here.

- `graph indexer connect <url>` - Connect to the indexer management API. Typically the connection to the server is opened via port forwarding, so the CLI can be easily operated remotely. (Example: `kubectl port-forward pod/<indexer-agent-pod> 8000:8000`)

- `graph indexer rules get [options] <deployment-id< [<key1> ...]` - Get one or more indexing rules using `all` as the `<deployment-id>` to get all rules, or `global` to get the global defaults. An additional argument `--merged` can be used to specify that deployment specific rules are merged with the global rule. This is how they are applied in the indexer agent.

- `graph indexer rules set [options] <deployment-id> <key1> <value1> ...` - Set one or more indexing rules.

- `graph indexer rules start [options] <deployment-id>` - Start indexing a subgraph deployment if available and set its `decisionBasis` to `always`, so the indexer agent will always choose to index it. If the global rule is set to always then all available subgraphs on the network will be indexed.

- `graph indexer rules stop [options] <deployment-id>` - Stop indexing a deployment and set its `decisionBasis` to never, so it will skip this deployment when deciding on deployments to index.

- `graph indexer rules maybe [options] <deployment-id>` — Set `thedecisionBasis` for a deployment to `rules`, so that the indexer agent will use indexing rules to decide whether to index this deployment.

All commands which display rules in the output can choose between the supported output formats (`table`, `yaml`, and `json`) using the `-output` argument.

#### Indexing rules

Indexing rules can either be applied as global defaults or for specific subgraph deployments using their IDs. The `deployment` and `decisionBasis` fields are mandatory, while all other fields are optional. When an indexing rule has `rules` as the `decisionBasis`, then the indexer agent will compare non-null threshold values on that rule with values fetched from the network for the corresponding deployment. If the subgraph deployment has values above (or below) any of the thresholds it will be chosen for indexing.

For example, if the global rule has a `minStake` of **5** (GRT), any subgraph deployment which has more than 5 (GRT) of stake allocated to it will be indexed. Threshold rules include `maxAllocationPercentage`, `minSignal`, `maxSignal`, `minStake`, and `minAverageQueryFees`.

Data model:

```graphql
type IndexingRule {
  deployment: string
  allocationAmount: string | null
  parallelAllocations: number | null
  decisionBasis: IndexingDecisionBasis
  maxAllocationPercentage: number | null
  minSignal: string | null
  maxSignal: string | null
  minStake: string | null
  minAverageQueryFees: string | null
  custom: string | null
}

IndexingDecisionBasis {
  rules
  never
  always
}
```

#### Cost models

Cost models provide dynamic pricing for queries based on market and query attributes. The Indexer Service shares a cost model with the gateways for each subgraph for which they intend to respond to queries. The gateways, in turn, use the cost model to make indexer selection decisions per query and to negotiate payment with chosen indexers.

#### Agora

The Agora language provides a flexible format for declaring cost models for queries. An Agora price model is a sequence of statements that execute in order for each top-level query in a GraphQL query. For each top-level query, the first statement which matches it determines the price for that query.

A statement is comprised of a predicate, which is used for matching GraphQL queries, and a cost expression which when evaluated outputs a cost in decimal GRT. Values in the named argument position of a query may be captured in the predicate and used in the expression. Globals may also be set and substituted in for placeholders in an expression.

Example cost model:

```
# This statement captures the skip value,
# uses a boolean expression in the predicate to match specific queries that use `skip`
# and a cost expression to calculate the cost based on the `skip` value and the SYSTEM_LOAD global
query { pairs(skip: $skip) { id } } when $skip > 2000 => 0.0001 * $skip * $SYSTEM_LOAD;

# This default will match any GraphQL expression.
# It uses a Global substituted into the expression to calculate cost
default => 0.1 * $SYSTEM_LOAD;
```

Example query costing using the above model:

| Query                                                                        | Price   |
| ---------------------------------------------------------------------------- | ------- |
| &#123; pairs(skip: 5000) &#123; id &#125; &#125;                             | 0.5 GRT |
| &#123; tokens &#123; symbol &#125; &#125                                     | 0.1 GRT |
| &#123; pairs(skip: 5000) &#123; id &#123; tokens &#125; symbol &#125; &#125; | 0.6 GRT |

#### Applying the cost model

Cost models are applied via the Indexer CLI, which passes them to the Indexer Management API of the indexer agent for storing in the database. The Indexer Service will then pick them up and serve the cost models to gateways whenever they ask for them.

```sh
indexer cost set variables '{ "SYSTEM_LOAD": 1.4 }'
indexer cost set model my_model.agora
```

## Interacting with the network

### Stake in the protocol

The first steps to participating in the network as an Indexer are to approve the protocol, stake funds, and (optionally) set up an operator address for day-to-day protocol interactions. _ **Note**: For the purposes of these instructions Remix will be used for contract interaction, but feel free to use your tool of choice ([OneClickDapp](https://oneclickdapp.com/), [ABItopic](https://abitopic.io/), and [MyCrypto](https://www.mycrypto.com/account) are a few other known tools)._

Once an indexer has staked GRT in the protocol, the [indexer components](/indexing#indexer-components) can be started up and begin their interactions with the network.

#### Approve tokens

1. Open the [Remix app](https://remix.ethereum.org/) in a browser

2. In the `File Explorer` create a file named **GraphToken.abi** with the [token ABI](https://raw.githubusercontent.com/graphprotocol/contracts/mainnet-deploy-build/build/abis/GraphToken.json).

3. With `GraphToken.abi` selected and open in the editor, switch to the Deploy and `Run Transactions` section in the Remix interface.

4. Under environment select `Injected Web3` and under `Account` select your indexer address.

5. Set the GraphToken contract address - Paste the GraphToken contract address (`0xc944E90C64B2c07662A292be6244BDf05Cda44a7`) next to `At Address` and click the `At address` button to apply.

6. Call the `approve(spender, amount)` function to approve the Staking contract. Fill in `spender` with the Staking contract address (`0xF55041E37E12cD407ad00CE2910B8269B01263b9`) and `amount` with the tokens to stake (in wei).

#### Stake tokens

1. Open the [Remix app](https://remix.ethereum.org/) in a browser

2. In the `File Explorer` create a file named **Staking.abi** with the staking ABI.

3. With `Staking.abi` selected and open in the editor, switch to the `Deploy` and `Run Transactions` section in the Remix interface.

4. Under environment select `Injected Web3` and under `Account` select your indexer address.

5. Set the Staking contract address - Paste the Staking contract address (`0xF55041E37E12cD407ad00CE2910B8269B01263b9`) next to `At Address` and click the `At address` button to apply.

6. Call `stake()` to stake GRT in the protocol.

7. (Optional) Indexers may approve another address to be the operator for their indexer infrastructure in order to separate the keys that control the funds from those that are performing day to day actions such as allocating on subgraphs and serving (paid) queries. In order to set the operator call `setOperator()` with the operator address.

8. (Optional) In order to control the distribution of rewards and strategically attract delegators indexers can update their delegation parameters by updating their indexingRewardCut (parts per million), queryFeeCut (parts per million), and cooldownBlocks (number of blocks). To do so call `setDelegationParameters()`. The following example sets the queryFeeCut to distribute 95% of query rebates to the indexer and 5% to delegators, set the indexingRewardCutto distribute 60% of indexing rewards to the indexer and 40% to delegators, and set `thecooldownBlocks` period to 500 blocks.

```
setDelegationParameters(950000, 600000, 500)
```

### The life of an allocation

After being created by an indexer a healthy allocation goes through four states.

- **Active** - Once an allocation is created on-chain ([allocateFrom()](https://github.com/graphprotocol/contracts/blob/master/contracts/staking/Staking.sol#L873)) it is considered **active**. A portion of the indexer's own and/or delegated stake is allocated towards a subgraph deployment, which allows them to claim indexing rewards and serve queries for that subgraph deployment. The indexer agent manages creating allocations based on the indexer rules.

- **Closed** - An indexer is free to close an allocation once 1 epoch has passed ([closeAllocation()](https://github.com/graphprotocol/contracts/blob/master/contracts/staking/Staking.sol#L873)) or their indexer agent will automatically close the allocation after the **maxAllocationEpochs** (currently 28 days). When an allocation is closed with a valid proof of indexing (POI) their indexing rewards are distributed to the indexer and its delegators (see "how are rewards distributed?" below to learn more).

- **Finalized** - Once an allocation has been closed there is a dispute period after which the allocation is considered **finalized** and it's query fee rebates are available to be claimed (claim()). The indexer agent monitors the network to detect **finalized** allocations and claims them if they are above a configurable (and optional) threshold, **—-allocation-claim-threshold**.

- **Claimed** - The final state of an allocation; it has run its course as an active allocation, all eligible rewards have been distributed and its query fee rebates have been claimed.
