declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro'
  const Component: AstroComponentFactory<any>
  export default Component
}
