# L'architecture The Graph Client

Pour répondre à la nécessité de prendre en charge un réseau distribué, nous prévoyons de prendre plusieurs mesures pour faire en sorte que The Graph client fournisse tout ce dont l'application a besoin :

1. Composer plusieurs subgraphs (côté client)
2. Repli sur plusieurs Indexeurs/sources/services hébergés
3. Stratégie de prélèvement automatique/manuel à la source
4. Agnostic core, with the ability to run integrate with any GraphQL client

## Mode Standalone

```mermaid
graph LR;
    c[Browser/Node]-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Avec n'importe quel client GraphQL

```mermaid
graph LR;
    c[Any GraphQL Client]-->|fetch/Urql Exchange/Apollo Link|l[Compatibility Layer];
    l-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Composition d'un subgraph

Pour permettre une composition simple et efficace côté client, nous allons utiliser [`graphql-tools`](https://graphql-tools.com) pour créer un schéma / Executor distant, qui peut ensuite être accroché au client GraphQL.

L'API peut être soit des transformateurs `graphql-tools` bruts, soit l'utilisation de l'[API déclarative GraphQL-Mesh](https://graphql-mesh.com/docs/transforms/transforms-introduction) pour composer le schéma.

```mermaid
graph LR;
    g[GraphQL Schema/Executor]-->m{Composer};
    m-->s1[Subgraph A GraphQL schema];
    m-->s2[Subgraph B GraphQL schema];
    m-->s3[Subgraph C GraphQL schema];
```

## Stratégies d'exécution des subgraphs

Within every Subgraph defined as source, there will be a way to define it's source(s) indexer and the querying strategy, here are a few options:

```mermaid
graph LR;
    subgraph race
    req(Outgoing Query)-->sA[Subgraph A];
    sA-->d{RaceStrategy};
    d-->s1[Source 1];
    d-->s2[Source 2];
    s1-->d;
    s2-->d;
    end

    subgraph fallback
    req2(Outgoing Query)-->sA2[Subgraph A];
    sA2-->d2{FallbackStrategy};
    d2-->s3[Source 1];
    s3-->|error|s4[Source 2];
    s4-->|ok|d2;
    s3-->|ok|d2;
    end

    subgraph retry
    req3(Outgoing Query)-->sA3[Subgraph A];
    sA3-->d3{RetryStrategy};
    d3-->s5[Source 1];
    s5-->|error|s5;
    s5-->|ok|d3;
    end

    subgraph highestValue
    req4(Outgoing Query)-->sA4[Subgraph A];
    sA4-->d4{HighestValueStrategy};
    d4-->s14[Source 1];
    d4-->s24[Source 2];
    s14-->synced4["process"]
    s24-->synced4
    synced4-->|"max(_meta.block_number)"|d4
    end
```

> We can ship a several built-in strategies, along with a simple interfaces to allow developers to write their own.

Pour pousser le concept de stratégies à l'extrême, nous pouvons même construire une couche magique qui fait de l'abonnement en tant que requête, avec n'importe quel crochet, et fournit un DX fluide pour les dapps :

```mermaid
graph LR;
    app[App]-->|subscription somedata|c;
    c[Any GraphQL Client]-->l[Compatibility Layer];
    l-->|executes|g[GraphQL Schema/Executor];
    g-->op[Orchestrator]
    op-->|query somedata|sA[Subgraph];
    sc[Smart Contract]-->|change event|op;
```

Avec ce mécanisme, les développeurs peuvent écrire et exécuter des `subscriptions` GraphQL, mais sous le capot, nous exécuterons une `requête` GraphQL vers les Indexeurs de The Graph, et nous permettrons de connecter n'importe quel hook/probe externe pour ré-exécuter l'opération.
De cette façon, nous pouvons surveiller les changements sur le Smart Contract lui-même, et le client GraphQL comblera l'écart sur le besoin de changements en temps réel de The Graph.
