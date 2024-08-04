import type { AstroGlobal } from 'astro'
import jwt from 'jsonwebtoken'

const getAuth = (astro: AstroGlobal): { apiKey: string | undefined, username: string | undefined } => {
  const token = astro.cookies.get('auth')?.value ?? ''
  const auth = { apiKey: undefined, username: undefined }
  try {
    // @ts-ignore
    const data = jwt.verify(token, import.meta.env.JWT_SECRET ?? '') as jwt.JwtPayload
    auth.apiKey = data.apiKey
    auth.username = data.username
    return auth
  } catch {
    return auth
  }
}

export default getAuth
