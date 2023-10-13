declare module 'vitest' {
  import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

  interface CustomMatchers<R = unknown> {
    toMatchImageSnapshot(): R
  }

  interface Assertion<T = any> extends CustomMatchers<T> {}

  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
