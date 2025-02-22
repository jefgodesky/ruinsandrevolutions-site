/** @vitest-environment node */

import { expect, describe, it, vi } from 'vitest'
import { type APIContext } from 'astro'
import setCookie, { defaultSetCookieOptions } from './set-cookie.ts'

describe('setCookie', () => {
  const name = 'test'
  const value = 'This is a test.'
  const context = {
    cookies: {
      set: vi.fn()
    }
  } as unknown as APIContext

  it('sets the cookie', () => {
    setCookie(context, name, value)
    expect(context.cookies.set).toHaveBeenCalledWith(name, value, defaultSetCookieOptions)
  })

  it('can set other options', () => {
    const options = { maxAge: 60 * 5 }
    const expected = { ...defaultSetCookieOptions, ...options }
    setCookie(context, name, value, options)
    expect(context.cookies.set).toHaveBeenCalledWith(name, value, expected)
  })
})
