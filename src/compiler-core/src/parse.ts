import { NodeTypes } from "./ast"

const enum TagType {
  Start,
  End
}

export function baseParse(content: string) {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []
  let node
  const s = context.source

  if (s.startsWith("{{")) {
    node = parseInterpolation(context)
  } else if (s.startsWith("<")) {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context)
    }
  }

  if (!node) {
    node = parseText(context)
  }

  nodes.push(node)

  return nodes
}

/**
 * @description: 解析插值
 * @param {any} context
 */
function parseInterpolation(context) {
  // {{message}}
  const openDelimiter = "{{"
  const closeDelimiter = "}}"

  const closeIndex = context.source.indexOf(closeDelimiter, closeDelimiter.length)

  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  const rawContent: any = parseTextData(context, rawContentLength)
  // const rawContent = context.source.slice(0, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSTION,
      content: content
    }
  }
}

/**
 * @description: 解析element
 * @param {any} context
 */
function parseElement(context: any) {
  const element = parseTag(context, TagType.Start)
  parseTag(context, TagType.End)
  return element
}

/**
 * @description: 解析tag
 * @param {any} context
 */
function parseTag(context: any, type: TagType) {
  // 1. 解析tag
  const match: any = /^<\/?([a-z]*)/i.exec(context.source)
  const tag = match[1]
  // 2. 删除处理完成的内容
  advanceBy(context, match[0].length)
  advanceBy(context, 1)

  if (type === TagType.End) return

  return {
    type: NodeTypes.ElEMEMT,
    tag: 'div'
  }
}

function parseText(context: any) {
  parseTextData(context, context.source.length)

  return {
    type: NodeTypes.TEXT,
    content: 'this is text'
  }
}

function parseTextData(context: any, length: number) {
  // 1. 获取content
  const content = context.source.slice(0, length)
  // 2. 删除处理完成的内容
  advanceBy(context, content.length)

  return content
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



