const getHref = (doc: DocumentFragment, selector: string): string | undefined => {
  const link = doc.querySelector(selector)
  return link?.getAttribute('href') ?? undefined
}

export default getHref
