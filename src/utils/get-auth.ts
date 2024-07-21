import type { AstroGlobal } from 'astro'
import jwt from 'jsonwebtoken'

const getAuth = (astro: AstroGlobal): { apiKey: string, username: string } | null => {
  const token = astro.cookies.get('auth')?.value ?? ''
  try {
    // @ts-ignore
    const data = jwt.verify(token, import.meta.env.JWT_SECRET ?? '') as jwt.JwtPayload
    return { apiKey: data.apiKey ?? '', username: data.username ?? '' }
  } catch {
    return null
  }
}

export default getAuth
