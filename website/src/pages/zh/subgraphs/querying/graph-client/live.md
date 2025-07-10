# `@live`查询`graph-client`

Graph-客户端实现了一个自定义 `@live` 指令，可以让每个GraphQL 查询都与实时数据兼容。

## 开始

首先将以下配置添加到您的`.graphclientrc.yml`文件中：

```yaml
plugins:
  - pollingLive:
      defaultInterval: 1000
```

## 使用方法

设置您想要使用的默认更新间隔，然后您可以在 GraphQL 查询中应用下面的 GraphQL `@directive` ：

```graphql
query ExampleQuery @live {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
    blockNumber
    timestamp
  }
}
```

或者，您可以指定每个查询间隔：

```graphql
query ExampleQuery @live(interval: 5000) {
  transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
    id
  }
}
```

## 集成

Since the entire network layer (along with the `@live` mechanism) is implemented inside `graph-client` core, you can use Live queries with every GraphQL client (such as Urql or Apollo-Client), as long as it supports streamed responses (`AsyncIterable`).

GraphQL客户端缓存更新不需要额外设置。
