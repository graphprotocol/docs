# Requêtes `@live` dans `graph-client`

Graph-Client implémente une directive personnalisée `@live` qui permet à chaque requête GraphQL de fonctionner avec des données en temps réel.

## Introduction

Commencez par ajouter la configuration suivante à votre fichier `.graphclientrc.yml` :

```yaml
plugins:
  - pollingLive:
      defaultInterval: 1000
```

## Usage

Définissez l'intervalle de mise à jour par défaut que vous souhaitez utiliser, puis vous pouvez appliquer la `@directive` GraphQL suivante à vos requêtes GraphQL :

```graphql
query ExampleQuery @live {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
    blockNumber
    timestamp
  }
}
```

Vous pouvez également spécifier un intervalle par requête :

```graphql
query ExampleQuery @live(interval: 5000) {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
  }
}
```

## Intégrations

Since the entire network layer (along with the `@live` mechanism) is implemented inside `graph-client` core, you can use Live queries with every GraphQL client (such as Urql or Apollo-Client), as long as it supports streame responses (`AsyncIterable`).

Aucune configuration supplémentaire n'est requise pour les mises à jour du cache des clients GraphQL.
