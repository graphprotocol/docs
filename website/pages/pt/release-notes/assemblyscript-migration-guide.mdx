---
title: AssemblyScript Migration Guide
---

Up until now, subgraphs have been using one of the [first versions of AssemblyScript](https://github.com/AssemblyScript/assemblyscript/tree/v0.6) (v0.6). Finally we've added support for the [newest one available](https://github.com/AssemblyScript/assemblyscript/tree/v0.19.10) (v0.19.10)! 🎉

That will enable subgraph developers to use newer features of the AS language and standard library.

This guide is applicable for anyone using `graph-cli`/`graph-ts` below version `0.22.0`. If you're already at a higher than (or equal) version to that, you've already been using version `0.19.10` of AssemblyScript 🙂

> Note: As of `0.24.0`, `graph-node` can support both versions, depending on the `apiVersion` specified in the subgraph manifest.

## Features

### New functionality

- `TypedArray`s can now be built from `ArrayBuffer`s by using the [new `wrap` static method](https://www.assemblyscript.org/stdlib/typedarray.html#static-members) ([v0.8.1](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.8.1))
- New standard library functions: `String#toUpperCase`, `String#toLowerCase`, `String#localeCompare`and `TypedArray#set` ([v0.9.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.0))
- Added support for x instanceof GenericClass ([v0.9.2](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.2))
- Added `StaticArray<T>`, a more efficient array variant ([v0.9.3](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.3))
- Added `Array<T>#flat` ([v0.10.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.10.0))
- Implemented `radix` argument on `Number#toString` ([v0.10.1](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.10.1))
- Added support for separators in floating point literals ([v0.13.7](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.13.7))
- Added support for first class functions ([v0.14.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.14.0))
- Add builtins: `i32/i64/f32/f64.add/sub/mul` ([v0.14.13](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.14.13))
- Implement `Array/TypedArray/String#at` ([v0.18.2](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.2))
- Added support for template literal strings ([v0.18.17](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.17))
- Add `encodeURI(Component)` and `decodeURI(Component)` ([v0.18.27](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.27))
- Add `toString`, `toDateString` and `toTimeString` to `Date` ([v0.18.29](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.29))
- Add `toUTCString` for `Date` ([v0.18.30](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.30))
- Add `nonnull/NonNullable` builtin type ([v0.19.2](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.19.2))

### Optimizations

- `Math` functions such as `exp`, `exp2`, `log`, `log2` and `pow` have been replaced by faster variants ([v0.9.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.0))
- Slightly optimize `Math.mod` ([v0.17.1](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.17.1))
- Cache more field accesses in std Map and Set ([v0.17.8](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.17.8))
- Optimize for powers of two in `ipow32/64` ([v0.18.2](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.18.2))

### Other

- The type of an array literal can now be inferred from its contents ([v0.9.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.0))
- Updated stdlib to Unicode 13.0.0 ([v0.10.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.10.0))

## How to upgrade?

1. Change your mappings `apiVersion` in `subgraph.yaml` to `0.0.6`:

```yaml
...
dataSources:
  ...
    mapping:
      ...
      apiVersion: 0.0.6
      ...
```

2. Update the `graph-cli` you're using to the `latest` version by running:

```bash
# if you have it globally installed
npm install --global @graphprotocol/graph-cli@latest

# or in your subgraph if you have it as a dev dependency
npm install --save-dev @graphprotocol/graph-cli@latest
```

3. Do the same for `graph-ts`, but instead of installing globally, save it in your main dependencies:

```bash
npm install --save @graphprotocol/graph-ts@latest
```

4. Follow the rest of the guide to fix the language breaking changes.
5. Run `codegen` and `deploy` again.

## Breaking changes

### Nullability

On the older version of AssemblyScript, you could create code like this:

```typescript
function load(): Value | null { ... }

let maybeValue = load();
maybeValue.aMethod();
```

However on the newer version, because the value is nullable, it requires you to check, like this:

```typescript
let maybeValue = load()

if (maybeValue) {
  maybeValue.aMethod() // `maybeValue` is not null anymore
}
```

Or force it like this:

```typescript
let maybeValue = load()! // breaks in runtime if value is null

maybeValue.aMethod()
```

If you are unsure which to choose, we recommend always using the safe version. If the value doesn't exist you might want to just do an early if statement with a return in you subgraph handler.

### Variable Shadowing

Before you could do [variable shadowing](https://en.wikipedia.org/wiki/Variable_shadowing) and code like this would work:

```typescript
let a = 10
let b = 20
let a = a + b
```

However now this isn't possible anymore, and the compiler returns this error:

```typescript
ERROR TS2451: Cannot redeclare block-scoped variable 'a'

 let a = a + b;
 ~~~~~~~~~~~~~
in assembly/index.ts(4,3)
```

You'll need to rename your duplicate variables if you had variable shadowing.

### Null Comparisons

By doing the upgrade on your subgraph, sometimes you might get errors like these:

```typescript
ERROR TS2322: Type '~lib/@graphprotocol/graph-ts/common/numbers/BigInt | null' is not assignable to type '~lib/@graphprotocol/graph-ts/common/numbers/BigInt'.
     if (decimals == null) {
                     ~~~~
 in src/mappings/file.ts(41,21)
```

To solve you can simply change the `if` statement to something like this:

```typescript
  if (!decimals) {

  // or

  if (decimals === null) {
```

The same applies if you're doing != instead of ==.

### Casting

The common way to do casting before was to just use the `as` keyword, like this:

```typescript
let byteArray = new ByteArray(10)
let uint8Array = byteArray as Uint8Array // equivalent to: <Uint8Array>byteArray
```

However this only works in two scenarios:

- Primitive casting (between types such as `u8`, `i32`, `bool`; eg: `let b: isize = 10; b as usize`);
- Upcasting on class inheritance (subclass → superclass)

Examples:

```typescript
// primitive casting
let a: usize = 10
let b: isize = 5
let c: usize = a + (b as usize)
```

```typescript
// upcasting on class inheritance
class Bytes extends Uint8Array {}

let bytes = new Bytes(2)
// <Uint8Array>bytes // same as: bytes as Uint8Array
```

There are two scenarios where you may want to cast, but using `as`/`<T>var` **isn't safe**:

- Downcasting on class inheritance (superclass → subclass)
- Between two types that share a superclass

```typescript
// downcasting on class inheritance
class Bytes extends Uint8Array {}

let uint8Array = new Uint8Array(2)
// <Bytes>uint8Array // breaks in runtime :(
```

```typescript
// between two types that share a superclass
class Bytes extends Uint8Array {}
class ByteArray extends Uint8Array {}

let bytes = new Bytes(2)
// <ByteArray>bytes // breaks in runtime :(
```

For those cases, you can use the `changetype<T>` function:

```typescript
// downcasting on class inheritance
class Bytes extends Uint8Array {}

let uint8Array = new Uint8Array(2)
changetype<Bytes>(uint8Array) // works :)
```

```typescript
// between two types that share a superclass
class Bytes extends Uint8Array {}
class ByteArray extends Uint8Array {}

let bytes = new Bytes(2)
changetype<ByteArray>(bytes) // works :)
```

If you just want to remove nullability, you can keep using the `as` operator (or `<T>variable`), but make sure you know that value can't be null, otherwise it will break.

```typescript
// remove nullability
let previousBalance = AccountBalance.load(balanceId) // AccountBalance | null

if (previousBalance != null) {
  return previousBalance as AccountBalance // safe remove null
}

let newBalance = new AccountBalance(balanceId)
```

For the nullability case we recommend taking a look at the [nullability check feature](https://www.assemblyscript.org/basics.html#nullability-checks), it will make your code cleaner 🙂

Also we've added a few more static methods in some types to ease casting, they are:

- Bytes.fromByteArray
- Bytes.fromUint8Array
- BigInt.fromByteArray
- ByteArray.fromBigInt

### Nullability check with property access

To use the [nullability check feature](https://www.assemblyscript.org/basics.html#nullability-checks) you can use either `if` statements or the ternary operator (`?` and `:`) like this:

```typescript
let something: string | null = 'data'

let somethingOrElse = something ? something : 'else'

// or

let somethingOrElse

if (something) {
  somethingOrElse = something
} else {
  somethingOrElse = 'else'
}
```

However that only works when you're doing the `if` / ternary on a variable, not on a property access, like this:

```typescript
class Container {
  data: string | null
}

let container = new Container()
container.data = 'data'

let somethingOrElse: string = container.data ? container.data : 'else' // doesn't compile
```

Which outputs this error:

```typescript
ERROR TS2322: Type '~lib/string/String | null' is not assignable to type '~lib/string/String'.

   let somethingOrElse: string = container.data ? container.data : "else";
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

To fix this issue, you can create a variable for that property access so that the compiler can do the nullability check magic:

```typescript
class Container {
  data: string | null
}

let container = new Container()
container.data = 'data'

let data = container.data

let somethingOrElse: string = data ? data : 'else' // compiles just fine :)
```

### Operator overloading with property access

If you try to sum (for example) a nullable type (from a property access) with a non nullable one, the AssemblyScript compiler instead of giving a compile time error warning that one of the values is nullable, it just compiles silently, giving chance for the code to break at runtime.

```typescript
class BigInt extends Uint8Array {
  @operator('+')
  plus(other: BigInt): BigInt {
    // ...
  }
}

class Wrapper {
  public constructor(public n: BigInt | null) {}
}

let x = BigInt.fromI32(2)
let y: BigInt | null = null

x + y // give compile time error about nullability

let wrapper = new Wrapper(y)

wrapper.n = wrapper.n + x // doesn't give compile time errors as it should
```

We've opened a issue on the AssemblyScript compiler for this, but for now if you do these kind of operations in your subgraph mappings, you should change them to do a null check before it.

```typescript
let wrapper = new Wrapper(y)

if (!wrapper.n) {
  wrapper.n = BigInt.fromI32(0)
}

wrapper.n = wrapper.n + x // now `n` is guaranteed to be a BigInt
```

### Value initialization

If you have any code like this:

```typescript
var value: Type // null
value.x = 10
value.y = 'content'
```

It will compile but break at runtime, that happens because the value hasn't been initialized, so make sure your subgraph has initialized their values, like this:

```typescript
var value = new Type() // initialized
value.x = 10
value.y = 'content'
```

Also if you have nullable properties in a GraphQL entity, like this:

```graphql
type Total @entity {
  id: Bytes!
  amount: BigInt
}
```

And you have code similar to this:

```typescript
let total = Total.load('latest')

if (total === null) {
  total = new Total('latest')
}

total.amount = total.amount + BigInt.fromI32(1)
```

You'll need to make sure to initialize the `total.amount` value, because if you try to access like in the last line for the sum, it will crash. So you either initialize it first:

```typescript
let total = Total.load('latest')

if (total === null) {
  total = new Total('latest')
  total.amount = BigInt.fromI32(0)
}

total.tokens = total.tokens + BigInt.fromI32(1)
```

Or you can just change your GraphQL schema to not use a nullable type for this property, then we'll initialize it as zero on the `codegen` step 😉

```graphql
type Total @entity {
  id: Bytes!
  amount: BigInt!
}
```

```typescript
let total = Total.load('latest')

if (total === null) {
  total = new Total('latest') // already initializes non-nullable properties
}

total.amount = total.amount + BigInt.fromI32(1)
```

### Class property initialization

If you export any classes with properties that are other classes (declared by you or by the standard library) like this:

```typescript
class Thing {}

export class Something {
  value: Thing
}
```

The compiler will error because you either need to add an initializer for the properties that are classes, or add the `!` operator:

```typescript
export class Something {
  constructor(public value: Thing) {}
}

// or

export class Something {
  value: Thing

  constructor(value: Thing) {
    this.value = value
  }
}

// or

export class Something {
  value!: Thing
}
```

### Array initialization

The `Array` class still accepts a number to initialize the length of the list, however you should take care because operations like `.push` will actually increase the size instead of adding to the beginning, for example:

```typescript
let arr = new Array<string>(5) // ["", "", "", "", ""]

arr.push('something') // ["", "", "", "", "", "something"] // size 6 :(
```

Depending on the types you're using, eg nullable ones, and how you're accessing them, you might encounter a runtime error like this one:

```
ERRO Handler skipped due to execution failure, error: Mapping aborted at ~lib/array.ts, line 110, column 40, with message: Element type must be nullable if array is holey  wasm backtrace:     0: 0x19c4 - <unknown>!~lib/@graphprotocol/graph-ts/index/format         1: 0x1e75 - <unknown>!~lib/@graphprotocol/graph-ts/common/collections/Entity#constructor        2: 0x30b9 - <unknown>!node_modules/@graphprotocol/graph-ts/global/global/id_of_type
```

To actually push at the beginning you should either, initialize the `Array` with size zero, like this:

```typescript
let arr = new Array<string>(0) // []

arr.push('something') // ["something"]
```

Or you should mutate it via index:

```typescript
let arr = new Array<string>(5) // ["", "", "", "", ""]

arr[0] = 'something' // ["something", "", "", "", ""]
```

### GraphQL schema

This is not a direct AssemblyScript change, but you may have to update your `schema.graphql` file.

Now you no longer can define fields in your types that are Non-Nullable Lists. If you have a schema like this:

```graphql
type Something @entity {
  id: Bytes!
}

type MyEntity @entity {
  id: Bytes!
  invalidField: [Something]! # no longer valid
}
```

You'll have to add an `!` to the member of the List type, like this:

```graphql
type Something @entity {
  id: Bytes!
}

type MyEntity @entity {
  id: Bytes!
  invalidField: [Something!]! # valid
}
```

This changed because of nullability differences between AssemblyScript versions, and it's related to the `src/generated/schema.ts` file (default path, you might have changed this).

### Other

- Aligned `Map#set` and `Set#add` with the spec, returning `this` ([v0.9.2](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.9.2))
- Arrays no longer inherit from ArrayBufferView, but are now distinct ([v0.10.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.10.0))
- Classes initialized from object literals can no longer define a constructor ([v0.10.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.10.0))
- The result of a `**` binary operation is now the common denominator integer if both operands are integers. Previously, the result was a float as if calling `Math/f.pow` ([v0.11.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.11.0))
- Coerce `NaN` to `false` when casting to `bool` ([v0.14.9](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.14.9))
- When shifting a small integer value of type `i8`/`u8` or `i16`/`u16`, only the 3 respectively 4 least significant bits of the RHS value affect the result, analogous to the result of an `i32.shl` only being affected by the 5 least significant bits of the RHS value. Example: `someI8 << 8` previously produced the value `0`, but now produces `someI8` due to masking the RHS as `8 & 7 = 0` (3 bits) ([v0.17.0](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.17.0))
- Bug fix of relational string comparisons when sizes differ ([v0.17.8](https://github.com/AssemblyScript/assemblyscript/releases/tag/v0.17.8))
