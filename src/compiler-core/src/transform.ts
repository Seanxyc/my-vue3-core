import { NodeTypes } from "./ast"
import { TO_DISPLAY_STRING } from "./runtimeHelpers"

export function transform(root, options = {}) {

  const context = createTransformsContext(root, options)
  // 深度优先遍历
  traverseNode(root, context)
  createRootCodegen(root)

  root.helpers = [...context.helpers.keys()]
}

function traverseNode(node: any, context: any) {
  const { nodeTransforms } = context
  const exitFns: any = [] // TODO: ?
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i]
    const onExit = transform(node, context)
    if (onExit) exitFns.push(onExit)
  }

  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break;

    case NodeTypes.ROOT:
    case NodeTypes.ElEMEMT:
      traverseChildren(node, context)
      break;

    default:
      break;
  }

  // 后执行
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}

function traverseChildren(node: any, context: any) {
  const children = node.children

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i]
      traverseNode(node, context)
    }
  }
}

function createTransformsContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key) {
      context.helpers.set(key, 1)
    }
  }

  return context
}

function createRootCodegen(root: any) {
  const child = root.children[0]
  // TODO ?
  if (child.type === NodeTypes.ElEMEMT) {
    root.codegenNode = child.codegenNode
  } else {
    root.codegenNode = root.children[0]
  }
}

