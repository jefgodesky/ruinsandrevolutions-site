import { expect, describe, it } from 'vitest'
import capitalize from './capitalize.ts'

describe('capitalize', () => {
  it('capitalizes a string', async () => {
    expect(capitalize('test')).toBe('Test')
    expect(capitalize('Test')).toBe('Test')
    expect(capitalize('TEST')).toBe('TEST')
  })
})
