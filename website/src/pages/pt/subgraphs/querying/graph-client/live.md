# Queries `@live` no `graph-client`

O Graph-Client implementa uma diretiva personalizada `@live` que pode fazer cada query do GraphQL funcionar com dados em tempo real.

## Como Começar

Comece a adicionar a seguinte configuração ao seu arquivo `.graphclientrc.yml`:

```yaml
plugins:
  - pollingLive:
      defaultInterval: 1000
```

## Uso

Defina o intervalo padrão de atualizações que deseja usar. Em seguida, você pode aplicar o seguinte `@directive` da GraphQL sobre os seus queries GraphQL:

```graphql
query ExampleQuery @live {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
    blockNumber
    timestamp
  }
}
```

Ou, você pode especificar um intervalo por query:

```graphql
query ExampleQuery @live(interval: 5000) {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
  }
}
```

## Integrações

Since the entire network layer (along with the `@live` mechanism) is implemented inside `graph-client` core, you can use Live queries with every GraphQL client (such as Urql or Apollo-Client), as long as it supports streame responses (`AsyncIterable`).

Não é necessário fazer mais configurações para atualizações de cache de clientes da GraphQL.
