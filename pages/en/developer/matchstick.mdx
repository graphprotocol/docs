---
title: Unit Testing Framework
---

Matchstick is a unit testing framework, developed by [LimeChain](https://limechain.tech/), that enables subgraph developers to test their mapping logic in a sandboxed environment and deploy their subgraphs with confidence!

## Getting Started

### Install dependencies

In order to use the test helper methods and run the tests, you will need to install the following dependencies:

```sh
yarn add --dev matchstick-as
```

❗ `graph-node` depends on PostgreSQL, so if you don't already have it, you will need to install it. We highly advise using the commands below as adding it in any other way may cause unexpected errors!

#### MacOS

Postgres installation command:

```sh
brew install postgresql
```

#### Linux

Postgres installation command (depends on your distro):

```sh
sudo apt install postgresql
```

### OS-specific release binaries

The release binary comes in two flavours - for **МacOS** and **Linux**. To add **Matchstick** to your subgraph project just open up a terminal, navigate to the root folder of your project and simply run `graph test` - it downloads the latest **Matchstick** binary and runs the specified test or all tests in a test folder (or all existing tests if no datasource flag is specified). Example usage: `graph test gravity`.

### Docker

From `graph-cli 0.25.2`, the `graph test` command supports running `matchstick` in a docker container with the `-d` flag. The docker implementation uses [bind mount](https://docs.docker.com/storage/bind-mounts/) so it does not have to rebuild the docker image every time the `graph test -d` command is executed. Alternatively you can follow the instructions from the [matchstick](https://github.com/LimeChain/matchstick#docker-) repository to run docker manually.

❗ If you have previously ran `graph test` you may encounter the following error during docker build:

```
  error from sender: failed to xattr node_modules/binary-install-raw/bin/binary-<platform>: permission denied
```

In this case create a `.dockerignore` in the root folder and add `node_modules/binary-install-raw/bin`

### Configuration

Matchstick can be configured to use a custom tests and libs folder via `matchstick.yaml` config file:

```yaml
testsFolder: ./folderName
libsFolder: path/to/libs
```

### Demo subgraph

You can try out and play around with the examples from this guide by cloning the [Demo Subgraph repo](https://github.com/LimeChain/demo-subgraph)

### Video tutorials

Also you can check out the video series on ["How to use Matchstick to write unit tests for your subgraphs"](https://www.youtube.com/playlist?list=PLTqyKgxaGF3SNakGQwczpSGVjS_xvOv3h)

## Write a Unit Test

Let's see how a simple unit test would look like using the Gravatar examples in the [Demo Subgraph](https://github.com/LimeChain/demo-subgraph/blob/main/src/gravity.ts).

Assuming we have the following handler function (along with two helper functions to make our life easier):

```typescript
export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex())
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleNewGravatars(events: NewGravatar[]): void {
  events.forEach((event) => {
    handleNewGravatar(event)
  })
}

export function createNewGravatarEvent(
  id: i32,
  ownerAddress: string,
  displayName: string,
  imageUrl: string
): NewGravatar {
  let mockEvent = newMockEvent()
  let newGravatarEvent = new NewGravatar(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  )
  newGravatarEvent.parameters = new Array()
  let idParam = new ethereum.EventParam('id', ethereum.Value.fromI32(id))
  let addressParam = new ethereum.EventParam(
    'ownderAddress',
    ethereum.Value.fromAddress(Address.fromString(ownerAddress))
  )
  let displayNameParam = new ethereum.EventParam('displayName', ethereum.Value.fromString(displayName))
  let imageUrlParam = new ethereum.EventParam('imageUrl', ethereum.Value.fromString(imageUrl))

  newGravatarEvent.parameters.push(idParam)
  newGravatarEvent.parameters.push(addressParam)
  newGravatarEvent.parameters.push(displayNameParam)
  newGravatarEvent.parameters.push(imageUrlParam)

  return newGravatarEvent
}
```

We first have to create a test file in our project. This is an example of how that might look like:

```typescript
import { clearStore, test, assert } from 'matchstick-as/assembly/index'
import { Gravatar } from '../../generated/schema'
import { NewGravatar } from '../../generated/Gravity/Gravity'
import { createNewGravatarEvent, handleNewGravatars } from '../mappings/gravity'

test('Can call mappings with custom events', () => {
  // Create a test entity and save it in the store as initial state (optional)
  let gravatar = new Gravatar('gravatarId0')
  gravatar.save()

  // Create mock events
  let newGravatarEvent = createNewGravatarEvent(12345, '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 'cap', 'pac')
  let anotherGravatarEvent = createNewGravatarEvent(3546, '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 'cap', 'pac')

  // Call mapping functions passing the events we just created
  handleNewGravatars([newGravatarEvent, anotherGravatarEvent])

  // Assert the state of the store
  assert.fieldEquals('Gravatar', 'gravatarId0', 'id', 'gravatarId0')
  assert.fieldEquals('Gravatar', '12345', 'owner', '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7')
  assert.fieldEquals('Gravatar', '3546', 'displayName', 'cap')

  // Clear the store in order to start the next test off on a clean slate
  clearStore()
})

test('Next test', () => {
  //...
})
```

That's a lot to unpack! First off, an important thing to notice is that we're importing things from `matchstick-as`, our AssemblyScript helper library (distributed as an npm module). You can find the repository [here](https://github.com/LimeChain/matchstick-as). `matchstick-as` provides us with useful testing methods and also defines the `test()` function which we will use to build our test blocks. The rest of it is pretty straightforward - here's what happens:

- We're setting up our initial state and adding one custom Gravatar entity;
- We define two `NewGravatar` event objects along with their data, using the `createNewGravatarEvent()` function;
- We're calling out handler methods for those events - `handleNewGravatars()` and passing in the list of our custom events;
- We assert the state of the store. How does that work? - We're passing a unique combination of Entity type and id. Then we check a specific field on that Entity and assert that it has the value we expect it to have. We're doing this both for the initial Gravatar Entity we added to the store, as well as the two Gravatar entities that gets added when the handler function is called;
- And lastly - we're cleaning the store using `clearStore()` so that our next test can start with a fresh and empty store object. We can define as many test blocks as we want.

There we go - we've created our first test! 👏

Now in order to run our tests you simply need to run the following in your subgraph root folder:

`graph test Gravity`

And if all goes well you should be greeted with the following:

![Matchstick saying “All tests passed!”](/img/matchstick-tests-passed.png)

## Common test scenarios

### Hydrating the store with a certain state

Users are able to hydrate the store with a known set of entities. Here's an example to initialise the store with a Gravatar entity:

```typescript
let gravatar = new Gravatar('entryId')
gravatar.save()
```

### Calling a mapping function with an event

A user can create a custom event and pass it to a mapping function that is bound to the store:

```typescript
import { store } from 'matchstick-as/assembly/store'
import { NewGravatar } from '../../generated/Gravity/Gravity'
import { handleNewGravatars, createNewGravatarEvent } from './mapping'

let newGravatarEvent = createNewGravatarEvent(12345, '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 'cap', 'pac')

handleNewGravatar(newGravatarEvent)
```

### Calling all of the mappings with event fixtures

Users can call the mappings with test fixtures.

```typescript
import { NewGravatar } from '../../generated/Gravity/Gravity'
import { store } from 'matchstick-as/assembly/store'
import { handleNewGravatars, createNewGravatarEvent } from './mapping'

let newGravatarEvent = createNewGravatarEvent(12345, '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 'cap', 'pac')

let anotherGravatarEvent = createNewGravatarEvent(3546, '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 'cap', 'pac')

handleNewGravatars([newGravatarEvent, anotherGravatarEvent])
```

```
export function handleNewGravatars(events: NewGravatar[]): void {
    events.forEach(event => {
        handleNewGravatar(event);
    });
}
```

### Mocking contract calls

Users can mock contract calls:

```typescript
import { addMetadata, assert, createMockedFunction, clearStore, test } from 'matchstick-as/assembly/index'
import { Gravity } from '../../generated/Gravity/Gravity'
import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'

let contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7')
let expectedResult = Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947')
let bigIntParam = BigInt.fromString('1234')
createMockedFunction(contractAddress, 'gravatarToOwner', 'gravatarToOwner(uint256):(address)')
  .withArgs([ethereum.Value.fromSignedBigInt(bigIntParam)])
  .returns([ethereum.Value.fromAddress(Address.fromString('0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947'))])

let gravity = Gravity.bind(contractAddress)
let result = gravity.gravatarToOwner(bigIntParam)

assert.equals(ethereum.Value.fromAddress(expectedResult), ethereum.Value.fromAddress(result))
```

As demonstrated, in order to mock a contract call and hardcore a return value, the user must provide a contract address, function name, function signature, an array of arguments, and of course - the return value.

Users can also mock function reverts:

```typescript
let contractAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7')
createMockedFunction(contractAddress, 'getGravatar', 'getGravatar(address):(string,string)')
  .withArgs([ethereum.Value.fromAddress(contractAddress)])
  .reverts()
```

### Mocking IPFS files (from matchstick 0.4.1)

Users can mock IPFS files by using `mockIpfsFile(hash, filePath)` function. The function accepts two arguments, the first one is the IPFS file hash/path and the second one is the path to a local file.

NOTE: When testing `ipfs.map/ipfs.mapJSON`, the callback function must be exported from the test file in order for matchstck to detect it, like the `processGravatar()` function in the test example bellow:

`.test.ts` file:

```typescript
import { assert, test, mockIpfsFile } from 'matchstick-as/assembly/index'
import { ipfs } from '@graphprotocol/graph-ts'
import { gravatarFromIpfs } from './utils'

// Export ipfs.map() callback in order for matchstck to detect it
export { processGravatar } from './utils'

test('ipfs.cat', () => {
  mockIpfsFile('ipfsCatfileHash', 'tests/ipfs/cat.json')

  assert.entityCount(GRAVATAR_ENTITY_TYPE, 0)

  gravatarFromIpfs()

  assert.entityCount(GRAVATAR_ENTITY_TYPE, 1)
  assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '1', 'imageUrl', 'https://i.ytimg.com/vi/MELP46s8Cic/maxresdefault.jpg')

  clearStore()
})

test('ipfs.map', () => {
  mockIpfsFile('ipfsMapfileHash', 'tests/ipfs/map.json')

  assert.entityCount(GRAVATAR_ENTITY_TYPE, 0)

  ipfs.map('ipfsMapfileHash', 'processGravatar', Value.fromString('Gravatar'), ['json'])

  assert.entityCount(GRAVATAR_ENTITY_TYPE, 3)
  assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '1', 'displayName', 'Gravatar1')
  assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '2', 'displayName', 'Gravatar2')
  assert.fieldEquals(GRAVATAR_ENTITY_TYPE, '3', 'displayName', 'Gravatar3')
})
```

`utils.ts` file:

```typescript
import { Address, ethereum, JSONValue, Value, ipfs, json, Bytes } from "@graphprotocol/graph-ts"
import { Gravatar } from "../../generated/schema"

...

// ipfs.map callback
export function processGravatar(value: JSONValue, userData: Value): void {
  // See the JSONValue documentation for details on dealing
  // with JSON values
  let obj = value.toObject()
  let id = obj.get('id')

  if (!id) {
    return
  }

  // Callbacks can also created entities
  let gravatar = new Gravatar(id.toString())
  gravatar.displayName = userData.toString() + id.toString()
  gravatar.save()
}

// function that calls ipfs.cat
export function gravatarFromIpfs(): void {
  let rawData = ipfs.cat("ipfsCatfileHash")

  if (!rawData) {
    return
  }

  let jsonData = json.fromBytes(rawData as Bytes).toObject()

  let id = jsonData.get('id')
  let url = jsonData.get("imageUrl")

  if (!id || !url) {
    return
  }

  let gravatar = new Gravatar(id.toString())
  gravatar.imageUrl = url.toString()
  gravatar.save()
}
```

### Asserting the state of the store

Users are able to assert the final (or midway) state of the store through asserting entities. In order to do this, the user has to supply an Entity type, the specific ID of an Entity, a name of a field on that Entity, and the expected value of the field. Here's a quick example:

```typescript
import { assert } from 'matchstick-as/assembly/index'
import { Gravatar } from '../generated/schema'

let gravatar = new Gravatar('gravatarId0')
gravatar.save()

assert.fieldEquals('Gravatar', 'gravatarId0', 'id', 'gravatarId0')
```

Running the assert.fieldEquals() function will check for equality of the given field against the given expected value. The test will fail and an error message will be outputted if the values are **NOT** equal. Otherwise the test will pass successfully.

### Interacting with Event metadata

Users can use default transaction metadata, which could be returned as an ethereum.Event by using the `newMockEvent()` function. The following example shows how you can read/write to those fields on the Event object:

```typescript
// Read
let logType = newGravatarEvent.logType

// Write
let UPDATED_ADDRESS = '0xB16081F360e3847006dB660bae1c6d1b2e17eC2A'
newGravatarEvent.address = Address.fromString(UPDATED_ADDRESS)
```

### Asserting variable equality

```typescript
assert.equals(ethereum.Value.fromString("hello"); ethereum.Value.fromString("hello"));
```

### Asserting that an Entity is **not** in the store

Users can assert that an entity does not exist in the store. The function takes an entity type and an id. If the entity is in fact in the store, the test will fail with a relevant error message. Here's a quick example of how to use this functionality:

```typescript
assert.notInStore('Gravatar', '23')
```

### Printing the whole store (for debug purposes)

You can print the whole store to the console using this helper function:

```typescript
import { logStore } from 'matchstick-as/assembly/store'

logStore()
```

### Expected failure

Users can have expected test failures, using the shouldFail flag on the test() functions:

```typescript
test(
  'Should throw an error',
  () => {
    throw new Error()
  },
  true
)
```

If the test is marked with shouldFail = true but DOES NOT fail, that will show up as an error in the logs and the test block will fail. Also, if it's marked with shouldFail = false (the default state), the test executor will crash.

### Logging

Having custom logs in the unit tests is exactly the same as logging in the mappings. The difference is that the log object needs to be imported from matchstick-as rather than graph-ts. Here's a simple example with all non-critical log types:

```typescript
import { test } from "matchstick-as/assembly/index";
import { log } from "matchstick-as/assembly/log";

test("Success", () => {
    log.success("Success!". []);
});
test("Error", () => {
    log.error("Error :( ", []);
});
test("Debug", () => {
    log.debug("Debugging...", []);
});
test("Info", () => {
    log.info("Info!", []);
});
test("Warning", () => {
    log.warning("Warning!", []);
});
```

Users can also simulate a critical failure, like so:

```typescript
test('Blow everything up', () => {
  log.critical('Boom!')
})
```

Logging critical errors will stop the execution of the tests and blow everything up. After all - we want to make sure you're code doesn't have critical logs in deployment, and you should notice right away if that were to happen.

### Testing derived fields

Testing derived fields is a feature which (as the example below shows) allows the user to set a field in a certain entity and have another entity be updated automatically if it derives one of its fields from the first entity. Important thing to note is that the first entity needs to be reloaded as the automatic update happens in the store in rust of which the AS code is agnostic.

```typescript
test('Derived fields example test', () => {
  let mainAccount = new GraphAccount('12')
  mainAccount.save()
  let operatedAccount = new GraphAccount('1')
  operatedAccount.operators = ['12']
  operatedAccount.save()
  let nst = new NameSignalTransaction('1234')
  nst.signer = '12'
  nst.save()

  assert.assertNull(mainAccount.get('nameSignalTransactions'))
  assert.assertNull(mainAccount.get('operatorOf'))

  mainAccount = GraphAccount.load('12')!

  assert.i32Equals(1, mainAccount.nameSignalTransactions.length)
  assert.stringEquals('1', mainAccount.operatorOf[0])
})
```

### Testing dynamic data sources

Testing dynamic data sources can be be done by mocking the return value of the context(), address() and network() functions of the dataSource namespace. These functions currently return the following: context - returns an empty entity (DataSourceContext), address - returns "0x0000000000000000000000000000000000000000", network - returns "mainnet". The create(...) and createWithContext(...) functions are mocked to do nothing so they don't need to be called in the tests at all. Changes to the return values can be done through the functions of the dataSourceMock namespace in matchstick-as (version 0.3.0+). Example below: First we have the following event handler (which has been intentionally repurposed to showcase datasource mocking):

```typescript
export function handleApproveTokenDestinations(event: ApproveTokenDestinations): void {
  let tokenLockWallet = TokenLockWallet.load(dataSource.address().toHexString())!
  if (dataSource.network() == 'rinkeby') {
    tokenLockWallet.tokenDestinationsApproved = true
  }
  let context = dataSource.context()
  if (context.get('contextVal')!.toI32() > 0) {
    tokenLockWallet.setBigInt('tokensReleased', BigInt.fromI32(context.get('contextVal')!.toI32()))
  }
  tokenLockWallet.save()
}
```

And then we have the test using one of the methods in the dataSourceMock namespace to set a new return value for all of the dataSource functions:

```typescript
import { assert, test, newMockEvent, dataSourceMock } from 'matchstick-as/assembly/index'
import { BigInt, DataSourceContext, Value } from '@graphprotocol/graph-ts'

import { handleApproveTokenDestinations } from '../../src/token-lock-wallet'
import { ApproveTokenDestinations } from '../../generated/templates/GraphTokenLockWallet/GraphTokenLockWallet'
import { TokenLockWallet } from '../../generated/schema'

test('Data source simple mocking example', () => {
  let addressString = '0xA16081F360e3847006dB660bae1c6d1b2e17eC2A'
  let address = Address.fromString(addressString)

  let wallet = new TokenLockWallet(address.toHexString())
  wallet.save()
  let context = new DataSourceContext()
  context.set('contextVal', Value.fromI32(325))
  dataSourceMock.setReturnValues(addressString, 'rinkeby', context)
  let event = changetype<ApproveTokenDestinations>(newMockEvent())

  assert.assertTrue(!wallet.tokenDestinationsApproved)

  handleApproveTokenDestinations(event)

  wallet = TokenLockWallet.load(address.toHexString())!
  assert.assertTrue(wallet.tokenDestinationsApproved)
  assert.bigIntEquals(wallet.tokensReleased, BigInt.fromI32(325))

  dataSourceMock.resetValues()
})
```

Notice that dataSourceMock.resetValues() is called at the end. That's because the values are remembered when they are changed and need to be reset if you want to go back to the default values.

## Test Coverage

Using **Matchstick**, subgraph developers are able to run a script that will calculate the test coverage of the written unit tests. The tool only works on **Linux** and **MacOS**, but when we add support for Docker (see progress on that [here](https://github.com/LimeChain/matchstick/issues/222)) users should be able to use it on any machine and almost any OS.

The test coverage tool is really simple - it takes the compiled test `wasm` binaries and converts them to `wat` files, which can then be easily inspected to see whether or not the handlers defined in `subgraph.yaml` have actually been called. Since code coverage (and testing as whole) is in very early stages in AssemblyScript and WebAssembly, **Matchstick** cannot check for branch coverage. Instead we rely on the assertion that if a given handler has been called, the event/function for it have been properly mocked.

### Prerequisites

To run the test coverage functionality provided in **Matchstick**, there are a few things you need to prepare beforehand:

#### Export your handlers

In order for **Matchstick** to check which handlers are being run, those handlers need to be exported from the **test file**. So for instance in our example, in our gravity.test.ts file we have the following handler being imported:

```ts
import { handleNewGravatar } from '../../src/gravity'
```

In order for that function to be visible (for it to be included in the `wat` file **by name**) we need to also export it, like this:

```ts
export { handleNewGravatar }
```

### Usage

Once that's all set up, to run the test coverage tool, simply run:

```sh
graph test -- -c
```

You could also add a custom `coverage` command to your `package.json` file, like so:

```ts
 "scripts": {
    /.../
    "coverage": "graph test -- -c"
  },
```

Hopefully that should execute the coverage tool without any issues. You should see something like this in the terminal:

```sh
$ graph test -c
Skipping download/install step because binary already exists at /Users/petko/work/demo-subgraph/node_modules/binary-install-raw/bin/0.4.0

___  ___      _       _         _   _      _
|  \/  |     | |     | |       | | (_)    | |
| .  . | __ _| |_ ___| |__  ___| |_ _  ___| | __
| |\/| |/ _` | __/ __| '_ \/ __| __| |/ __| |/ /
| |  | | (_| | || (__| | | \__ \ |_| | (__|   <
\_|  |_/\__,_|\__\___|_| |_|___/\__|_|\___|_|\_\

Compiling...

Running in coverage report mode.
 ️
Reading generated test modules... 🔎️

Generating coverage report 📝

Handlers for source 'Gravity':
Handler 'handleNewGravatar' is tested.
Handler 'handleUpdatedGravatar' is not tested.
Handler 'handleCreateGravatar' is tested.
Test coverage: 66.7% (2/3 handlers).

Handlers for source 'GraphTokenLockWallet':
Handler 'handleTokensReleased' is not tested.
Handler 'handleTokensWithdrawn' is not tested.
Handler 'handleTokensRevoked' is not tested.
Handler 'handleManagerUpdated' is not tested.
Handler 'handleApproveTokenDestinations' is not tested.
Handler 'handleRevokeTokenDestinations' is not tested.
Test coverage: 0.0% (0/6 handlers).

Global test coverage: 22.2% (2/9 handlers).
```

### Test run time duration in the log output

The log output includes the test run duration. Here's an example:

`[Thu, 31 Mar 2022 13:54:54 +0300] Program executed in: 42.270ms.`

## Common compiler errors

> Critical: Could not create WasmInstance from valid module with context: unknown import: wasi_snapshot_preview1::fd_write has not been defined

This means you have used `console.log` in your code, which is not supported by AssemblyScript. Please consider using the [Logging API](http://localhost:3000/en/developer/assemblyscript-api/#logging-api)

> ERROR TS2554: Expected ? arguments, but got ?.
>
> return new ethereum.Block(defaultAddressBytes, defaultAddressBytes, defaultAddressBytes, defaultAddress, defaultAddressBytes, defaultAddressBytes, defaultAddressBytes, defaultBigInt, defaultBigInt, defaultBigInt, defaultBigInt, defaultBigInt, defaultBigInt, defaultBigInt, defaultBigInt);
>
> in ~lib/matchstick-as/assembly/defaults.ts(18,12)
>
> ERROR TS2554: Expected ? arguments, but got ?.
>
> return new ethereum.Transaction(defaultAddressBytes, defaultBigInt, defaultAddress, defaultAddress, defaultBigInt, defaultBigInt, defaultBigInt, defaultAddressBytes, defaultBigInt);
>
> in ~lib/matchstick-as/assembly/defaults.ts(24,12)

The mismatch in arguments is caused by mismatch in `graph-ts` and `matchstick-as`. The best way to fix issues like this one is to update everything to the latest released version.

## Feedback

If you have any questions, feedback, feature requests or just want to reach out, the best place would be The Graph Discord where we have a dedicated channel for Matchstick, called 🔥| unit-testing.
