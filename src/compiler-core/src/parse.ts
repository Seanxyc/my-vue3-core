import { NodeTypes } from "./ast"

export function baseParse(content: string) {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []
  let node

  if (context.source.startsWith("{{")) {
    node = parseInterpolation(context)
  }

  nodes.push(node)

  return nodes
}

/**
 * @description: 解析插值
 */
function parseInterpolation(context) {
  // {{message}}
  const openDelimiter = "{{"
  const closeDelimiter = "}}"

  const closeIndex = context.source.indexOf(closeDelimiter, closeDelimiter.length)

  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  const rawContent = context.source.slice(0, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, rawContentLength + closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSTION,
      content: content
    }
  }
}

function createRoot(children: any) {
  return {
    children
  }
}

function createParseContext(content: string): any {
  return {
    source: content
  }
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length)
}

