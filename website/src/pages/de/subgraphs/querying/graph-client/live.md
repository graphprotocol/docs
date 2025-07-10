# `@live`-Abfragen im `graph-client`

Graph-Client implementiert eine benutzerdefinierte `@live`-Direktive, mit der jede GraphQL-Abfrage mit Echtzeitdaten arbeiten kann.

## Erste Schritte

Beginnen Sie, indem Sie die folgende Konfiguration zu Ihrer `.graphclientrc.yml`-Datei hinzufügen:

```yaml
plugins:
  - pollingLive:
      defaultInterval: 1000
```

## Verwendung

Legen Sie das standardmäßige Aktualisierungsintervall fest, das Sie verwenden möchten, und wenden Sie dann die folgende GraphQL-`@directive` auf Ihre GraphQL-Abfragen an:

```graphql
query ExampleQuery @live {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
    blockNumber
    timestamp
  }
}
```

Sie können auch ein Intervall pro Abfrage festlegen:

```graphql
query ExampleQuery @live(interval: 5000) {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
  }
}
```

## Integrationen

Since the entire network layer (along with the `@live` mechanism) is implemented inside `graph-client` core, you can use Live queries with every GraphQL client (such as Urql or Apollo-Client), as long as it supports streamed responses (`AsyncIterable`).

Für die Cache-Aktualisierung von GraphQL-Clients ist keine zusätzliche Einrichtung erforderlich.
