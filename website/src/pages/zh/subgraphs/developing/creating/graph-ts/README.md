# 图形类型脚本库 (graph-ts)

[![npm (scoped)](https://img.shields.io/npm/v/@graphprotocol/graph-ts.svg)](https://www.npmjs.com/package/@graphprotocol/graph-ts)
[![Build Status](https://travis-ci.org/graphprotocol/graph-ts.svg?branch=master)](https://travis-ci.org/graphprotocol/graph-ts)

要部署到
[The Graph](https://github.com/graphprotocol/graph-node)写入子图的 TypeScript/AssemblyScript 库。

## 使用方法

关于如何创建子图的详细指南，请参阅
[GraphCLI 文档](https://github.com/graphprotocol/graph-cli)。

创建子图的步骤是编写将处理区块链事件的映射，并将实体
写入存储。 这些映射都以 TypeScript/AssemblyScript 编写。

`graph-ts`库提供 API，访问the Graph节点存储、区块链数据、智能
合约、IPFS数据、加密功能等数据。 若要使用它，您必须做的就是添加一个
依赖于它：

```sh
npm install --dev @graphprotocol/graph-ts # NPM
yarn add --dev @graph/graph-ts # Yarn
```

然后，您可以在您的映射中导入这个库的 `store` API 和其他功能。
几个例子：

```typescript
import { crypto, store } from '@graphprotocol/graph-ts'
// This is just an example event type generated by `graph-cli`
// from an Ethereum smart contract ABI
import { NameRegistered } from './types/abis/SomeContract'
// This is an example of an entity type generated from a
// subgraph's GraphQL schema
import { Domain } from './types/schema'

function handleNameRegistered(event: NameRegistered) {
  // Example use of a crypto function
  let id = crypto.keccak256(name).toHexString()

  // Example use of the generated `Entry` class
  let domain = new Domain()
  domain.name = name
  domain.owner = event.params.owner
  domain.timeRegistered = event.block.timestamp

  // Example use of the store API
  store.set('Name', id, entity)
}
```

## AssemblyScript 的辅助函数

参考
[这个](https://github.com/graphprotocol/graph-tooling/blob/main/packages/ts/helper-functions.ts)
版本库用于一些共同的函数的`助手函数`，这些函数有助于在 AssemblyScript 库顶端上建构， 例如
字节数组会合等。

## API

API 上的文档可以在[这里](https://thegraph.com/docs/en/developer/assemblyscript-api/)找到
。

对于所用的`graph-ts`的示例，请看下面的子图之一：

- https://github.com/graphprotocol/ens-subgraph
- https://github.com/graphprotocol/decentraland-subgraph
- https://github.com/graphprotocol/adchain-subgraph
- https://github.com/graphprotocol/0x-subgraph
- https://github.com/graphprotocol/aragon-subgraph
- https://github.com/graphprotocol/dharma-subgraph

## 许可协议

版权所有 &copy; 2018 Graph协议、 公司和贡献者。

GraphTypeScript 库是
[MIT license](https://github.com/graphprotocol/graph-tooling/blob/main/LICENSE-MIT) 和
[Apache License, 版本 2.0](https://github.com/graphprotocol/graph-tooling/blob/main/LICENSE-APACHE)的双向授权。

除非适用法律要求或书面同意，否则根据许可证分发的软件
按“原样”分发，不附带任何明示或明示的保证或条件
暗指的。有关管理许可和限制的特定语言，请参阅许可证
许可证。
