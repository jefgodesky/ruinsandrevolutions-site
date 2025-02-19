import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions
} from 'astro/container'
import reactRenderer from '@astrojs/react/server.js'

type AstroComponentFactory = Parameters<AstroContainer["renderToString"]>[0]

const render = async (
  Component: AstroComponentFactory,
  options: ContainerRenderOptions = {},
  renderReact: boolean = false
): Promise<DocumentFragment> => {
  const container = await AstroContainer.create()
  if (renderReact) container.addServerRenderer({ renderer: reactRenderer, name: 'React' })
  const result = await container.renderToString(Component, options)

  const tpl = document.createElement('template')
  tpl.innerHTML = result
  return tpl.content
}

export default render
