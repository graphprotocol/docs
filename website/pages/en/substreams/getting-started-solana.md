

Getting started with a Solana Substreams-powered Subgraph is really easy by using the auto-generation tools contained in the `substreams init` command. Essentially it requires two steps: creating a Substreams project and creating a Subgraph project based on that Substreams project.

> **Note**: It is recommended that you run everything inside the Substreams Development Environment. Take a look at the [Getting Started page](./getting-started.md) or directly clone the [substreams-starter](https://github.com/streamingfast/substreams-starter) repository.

## Generate the Substreams Project

The first step is creating a Substreams project and generating a Substreams package (`.spkg` file) that the subgraph can use as data source.

1. Run `substreams init`, which will show the different options to intialize your project.

// image

2. Choose the preferred option to initialize your Solana project:

- `sol-minimal`: will create a very simple Substreams, just extracting raw data from the block (it will generate Rust code).
- `sol-transactions`: will create a Substreams that extracts Solana transactions filtered by one or several Program IDs. (it will NOT generate Rust code, as it relies on the Solana Foundational Modules).

3. Complete the rest of information needed, such as the project name or the Program IDs that you want to use to filter the transactions.

4. Once you are done answering all the questions, a Substreams project will be generated in the specified folder.

// image

5. Follow the instructions provided to authenticate, build and run the Substreams project.

To build the project and **generate the Substreams package (`.spkg`)**:

```bash
substreams build
```

To autenthicate with one of the Substreams providers:

```bash
substreams auth
```

To run the Substreams in your command-line terminal:

```bash
substreams gui
```

## Generate the Subgraph Project

From the Substreams `.spkg` file, which contains all the data that you want to extract from the blockchain, you can generate a subgraph project.

1. Run `substreams codegen subgraph`.
A new folder, `subgraph`, will be created.

2. The generated project is standard subgraph project, where the `subgraph.yaml` file uses the Substreams package as data source. By default, the code contained in the `mappings.ts` file is pretty simple. It is up to you to decide what entities you want to create with the data extracted from the Substreams.

3. Follow the instructions provided to build your subgraph.

To install the Node modules:

```bash
npm install
```

To generate the GraphQL schema of the subgraph (i.e. the output of the subgraph):

```bash
npm run codegen
```

To generate Protobuf schema of the Substreams (i.e. the output of the Substreams and the input of the subgraph):

```bash
npm run protogen
```

To build your subgraph:

```bash
npm run build
```

(All the previous command starting with `npm run` are wrappers defined in the `package.json` file).

6. If you have a Graph Node instance running locally, you can deploy and test your subgraph.
It is recommended that you run everything inside the [substreams-starter environment](https://github.com/streamingfast/substreams-starter).

> **Note**: To run the following command, you need a working Substreams Developer Environment. If you are running Graph Node outside of the Developer Environment, take a look at the `package.json` file of the project to review the Graph CLI command executed.

To create the subgraph:

```bash
npm run create-local
```

To deploy the subgraph:

```bash
npm run deploy-local
```