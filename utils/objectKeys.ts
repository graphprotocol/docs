// Source: https://lookout.dev/rules/better-types-when-extracting-the-keys-and-entries-from-an-object-or-an-enum
// TODO: Consider moving to `@edgeandnode/common`

export function objectKeys<T extends object>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>
}
