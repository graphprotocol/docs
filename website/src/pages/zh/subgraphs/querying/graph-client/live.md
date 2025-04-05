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

因为整个网络图层 (与 `@live` 机制一起) 是在 `graph-client` 核心内实现的， 您可以使用每个GraphQL客户端的实时查询(例如Urql 或 Apollo-Client)，只要它支持流回应(`AsyncIterable`)。

GraphQL客户端缓存更新不需要额外设置。
