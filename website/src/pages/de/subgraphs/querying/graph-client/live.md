# Live"-Abfragen im “Graph-Client

Graph-Client implementiert eine benutzerdefinierte `@live`-Direktive, mit der jede GraphQL-Abfrage mit Echtzeitdaten arbeiten kann.

## Erste Schritte

Beginnen Sie, indem Sie die folgende Konfiguration zu Ihrer `.graphclientrc.yml`-Datei hinzufügen:

```yaml
plugins:
  - pollingLive:
      defaultInterval: 1000
```

## Verwendung

Legen Sie das standardmäßige Aktualisierungsintervall fest, das Sie verwenden möchten, und wenden Sie dann die folgende GraphQL-@directive“ auf Ihre GraphQL-Abfragen an:

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

Da die gesamte Netzwerkschicht (zusammen mit dem `@live`-Mechanismus) innerhalb des `graph-client`-Kerns implementiert ist, können Sie Live-Abfragen mit jedem GraphQL-Client (wie z. B. Urql oder Apollo-Client) verwenden, solange dieser Streame-Antworten (`AsyncIterable`) unterstützt.

Für die Cache-Aktualisierung von GraphQL-Clients ist keine zusätzliche Einrichtung erforderlich.
