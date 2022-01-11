// Source: https://lookout.dev/rules/better-types-when-extracting-the-keys-and-entries-from-an-object-or-an-enum
// TODO: Consider moving to `@edgeandnode/common`

export function objectEntries<O extends object, K = keyof O, V = O extends { [key: string]: infer L } ? L : never>(
  object: O
): Array<[K, V]> {
  return Object.entries(object) as unknown as Array<[K, V]>
}
