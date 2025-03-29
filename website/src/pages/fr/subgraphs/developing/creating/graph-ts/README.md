# La bibliothèque Graph TypeScript (graph-ts)

[ ![npm (cadré)](https://img.shields.io/npm/v/@graphprotocol/graph-ts.svg)](https://www.npmjs.com/package/@graphprotocol/graph-ts)
[ ![État de la construction](https://travis-ci.org/graphprotocol/graph-ts.svg?branch=master)](https://travis-ci.org/graphprotocol/graph-ts)

Bibliothèque TypeScript/AssemblyScript pour l'écriture de mappages de Subgraphs à déployer sur
[The Graph](https://github.com/graphprotocol/graph-node).

## Usage

Pour un guide détaillé sur la création d'un Subgraph, veuillez consulter le document suivant
[Graph CLI docs](https://github.com/graphprotocol/graph-cli).

Une étape de la création du Subgraph consiste à écrire des mappages qui traiteront les événements de la blockchain et écriront des entités dans le magasin.
écrire des entités dans le store. Ces mappages sont écrits en TypeScript/AssemblyScript.

La bibliothèque `graph-ts` fournit des API pour accéder au store Graph Node, aux données de la blockchain, aux contrats intelligents, aux données sur IPFS, aux fonctions cryptographiques et plus encore. Pour l'utiliser, tout ce que vous avez à faire est d'ajouter une dépendance
une dépendance sur cette bibliothèque :

```sh
npm install --dev @graphprotocol/graph-ts # NPM
yarn add --dev @graphprotocol/graph-ts    # Yarn
```

Ensuite, vous pouvez importer l'API `store` et d'autres fonctionnalités de cette bibliothèque dans vos mappages. Quelques exemples :

```typescript
import { crypto, store } from '@graphprotocol/graph-ts'
// Ceci est juste un exemple de type d'événement généré par `graph-cli`
// à partir d'un contrat intelligent Ethereum ABI
import { NameRegistered } from './types/abis/SomeContract'
// Voici un exemple de type d'entité généré à partir du schéma GraphQL d'un subgraph.
// schéma GraphQL d'un subgraph
import { Domain } from './types/schema'

function handleNameRegistered(event: NameRegistered) {
  // Exemple d'utilisation d'une fonction crypto
  let id = crypto.keccak256(name).toHexString()

  // Exemple d'utilisation de la classe `Entry` générée
  let domain = new Domain()
  domain.name = name
  domain.owner = event.params.owner
  domain.timeRegistered = event.block.timestamp

  // Exemple d'utilisation du store API 
  store.set('Name', id, entity)
}
```

## Helper Functions for AssemblyScript

Refer to the `helper-functions.ts` file in
[this](https://github.com/graphprotocol/graph-tooling/blob/main/packages/ts/helper-functions.ts)
repository for a few common functions that help build on top of the AssemblyScript library, such as
byte array concatenation, among others.

## API

Documentation on the API can be found
[here](https://thegraph.com/docs/en/developer/assemblyscript-api/).

For examples of `graph-ts` in use take a look at one of the following subgraphs:

- https://github.com/graphprotocol/ens-subgraph
- https://github.com/graphprotocol/decentraland-subgraph
- https://github.com/graphprotocol/adchain-subgraph
- https://github.com/graphprotocol/0x-subgraph
- https://github.com/graphprotocol/aragon-subgraph
- https://github.com/graphprotocol/dharma-subgraph

## License

Copyright &copy; 2018 Graph Protocol, Inc. and contributors.

The Graph TypeScript library is dual-licensed under the
[MIT license](https://github.com/graphprotocol/graph-tooling/blob/main/LICENSE-MIT) and the
[Apache License, Version 2.0](https://github.com/graphprotocol/graph-tooling/blob/main/LICENSE-APACHE).

Unless required by applicable law or agreed to in writing, software distributed under the License is
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing permissions and limitations under the
License.
