# The Graph-Client-Architektur

Um der Notwendigkeit der Unterstützung eines verteilten Netzwerks gerecht zu werden, planen wir mehrere Maßnahmen, um sicherzustellen, dass der Graph-Client alles bietet, was eine App braucht:

1. Mehrere Subgraphen zusammenstellen (auf der Client-Seite)
2. Fallback auf mehrere Indexer/Quellen/gehostete Dienste
3. Automatische/manuelle Kommissionierstrategie
4. Agnostischer Kern, mit der Fähigkeit, die Integration mit jedem GraphQL-Client auszuführen

## Standalone-Modus

```mermaid
graph LR;
    c[Browser/Node]-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Mit jedem GraphQL-Client

```mermaid
graph LR;
    c[Any GraphQL Client]-->|fetch/Urql Exchange/Apollo Link|l[Compatibility Layer];
    l-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Subgraphen-Zusammensetzung

Um eine einfache und effiziente client-seitige Komposition zu ermöglichen, werden wir [`graphql-tools`](https://graphql-tools.com) verwenden, um ein entferntes Schema / Executor zu erstellen, das dann in den GraphQL-Client eingehängt werden kann.

API könnte entweder rohe `graphql-tools`-Transformatoren oder die Verwendung von [GraphQL-Mesh declarative API] (https://graphql-mesh.com/docs/transforms/transforms-introduction) für die Zusammenstellung des Schemas sein.

```mermaid
graph LR;
    g[GraphQL Schema/Executor]-->m{Composer};
    m-->s1[Subgraph A GraphQL schema];
    m-->s2[Subgraph B GraphQL schema];
    m-->s3[Subgraph C GraphQL schema];
```

## Strategien für die Ausführung von Subgraphen

Für jeden Subgraphen, der als Quelle definiert ist, gibt es eine Möglichkeit, seine(n) Quell-Indexer und die Abfragestrategie zu definieren, hier einige Optionen:

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

> Wir können mehrere eingebaute Strategien liefern, zusammen mit einfachen Schnittstellen, die es Entwicklern ermöglichen, ihre eigenen zu schreiben.

Um das Konzept der Strategien auf die Spitze zu treiben, können wir sogar eine magische Schicht aufbauen, die Abonnement-als-Abfrage mit einem beliebigen Hook durchführt und einen reibungslosen DX für Dapps bietet:

```mermaid
graph LR;
    app[App]-->|subscription somedata|c;
    c[Any GraphQL Client]-->l[Compatibility Layer];
    l-->|executes|g[GraphQL Schema/Executor];
    g-->op[Orchestrator]
    op-->|query somedata|sA[Subgraph];
    sc[Smart Contract]-->|change event|op;
```

Mit diesem Mechanismus können Entwickler GraphQL-Abonnements schreiben und ausführen, aber unter der Haube führen wir eine GraphQL-Abfrage an die The Graph-Indexer aus und ermöglichen den Anschluss eines externen Hooks/einer externen Probe zur erneuten Ausführung der Operation.
Auf diese Weise können wir auf Änderungen am Smart Contract selbst achten, und der GraphQL-Client füllt die Lücke, wenn Echtzeitänderungen von The Graph erforderlich sind.
