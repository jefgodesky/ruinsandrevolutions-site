import type { AstroGlobal } from 'astro'
import getAuth from './get-auth'
import { apiHeaders } from '../data'

const getHeaders = (astro: AstroGlobal): { [key: string]: string } => {
  const auth = getAuth(astro)
  return auth?.apiKey
    ? { ...apiHeaders, Authorization: `Bearer ${auth.apiKey}` }
    : apiHeaders
}

export default getHeaders
