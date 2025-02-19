const getInnerHTML = (
  doc: DocumentFragment,
  selector: string,
  index: number = 0
): string | undefined => {
  const el = doc.querySelectorAll(selector)[index]
  return el?.innerHTML
}

export default getInnerHTML
