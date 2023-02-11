export function transform(root, options = {}) {

  const context = createTransformsContext(root, options)
  // 深度优先遍历
  traverseNode(root, context)

  createRootCodegen(root)
  // root.codegenNode
}

function traverseNode(node: any, context: any) {
  const { nodeTransforms } = context
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i]
    transform(node)
  }

  traverseChildren(node, context)
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
    nodeTransforms: options.nodeTransforms || []
  }

  return context
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0]
}

