import { type APIContext, type AstroCookieSetOptions } from 'astro'

const defaultSetCookieOptions: AstroCookieSetOptions = {
  httpOnly: true,
  maxAge: 60 * 10,
  secure: true,
  path: '/',
  sameSite: 'lax'
}

const setCookie = (
  context: APIContext,
  name: string,
  value: string,
  options: Partial<AstroCookieSetOptions> = {}
): void => {
  const opts = {
    ...defaultSetCookieOptions,
    ...options
  }

  context.cookies.set(name, value, opts)
}

export default setCookie
export { defaultSetCookieOptions }
