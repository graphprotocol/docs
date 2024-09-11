---
title: Getting Started with Substreams
---

## Getting Started

The easiest way to get started with Substreams is by using one of the auto-generation tools. The Substreams CLI provides the `substreams init` command, which will allow you to initialize your Substreams project for several blockchains (EVM, Solana, Injective...).

The Substreams CLI is pretty similar to The Graph CLI: you install it in your computer and execution the different commands available.

### The Development Environment

To facilitate the development of Substreams-powered Subgraphs, a local development environment for VSCode is available, the [substreams-starter](https://github.com/streamingfast/substreams-starter) project.

The development environment is a VSCode extension that spins up all the necessary dependencies in Docker containers:
- A terminal-based environment with the Substreams CLI pre-installed, so you don't have to install 
- A Graph Node instance, which you can uses to test your subgraph locally.
- A PostgreSQL instance, which is used by the Graph Node to store all the necessary data for your subgraphs.
- An IPFS instance, which is used by the Graph Node to store the _build_ files of the subgraph.

You can run the development environment locally (you need both VSCode and Docker) or remotely through GitHub codespaces.

#### Run the Development Environment Locally

To run it locally, simply open the [substreams-starter](https://github.com/streamingfast/substreams-starter) in your local VSCode application.

#### Run the Development Environment Remotely

To run it in GitHub codespace, open [this link](https://github.com/codespaces/new/streamingfast/substreams-starter?machine=standardLinux32gb) (`https://github.com/codespaces/new/streamingfast/substreams-starter?machine=standardLinux32gb`) in your browser. Log in with GitHub and you will get access to a VSCode instance in your browser.

### Initialize Your Substreams Project

In the development environment, you will have access to the `substreams init` command. Depending on the type of project that you want to initialize, the flow will be different. Choose which blockchain you want to index:




