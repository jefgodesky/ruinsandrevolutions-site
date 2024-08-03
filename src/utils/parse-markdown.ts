import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'

const removeParagraphs = () => {
  return (tree: any) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'p') {
        if (parent && parent.children && Array.isArray(parent.children)) {
          parent.children.splice(index, 1, ...node.children)
        }
      }
    })
  }
}

const parseMarkdown = async (markdown: string, noParagraph: boolean = false): Promise<string> => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)

  if (noParagraph) processor.use(removeParagraphs)
  const html = await processor.process(markdown)
  return String(html)
}

export default parseMarkdown
