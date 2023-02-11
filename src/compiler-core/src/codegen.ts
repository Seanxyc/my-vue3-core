import { NodeTypes } from "./ast"
import { CREATE_ELEMENT_VNODE, helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers"

export function generate(ast: any) {
  const context = createCodegenContext()
  const { push } = context

  genFunctionPreamble(ast, context)

  const functionName = "render"
  const args = ['_ctx', "_cache"]
  const signature = args.join(", ")

  push(`function ${functionName}(${signature}){`)
  push('return ')
  genNode(ast.codegenNode, context)
  push('}')

  return {
    code: context.code
  }
}

/**
 * @description: 导入逻辑
 */
function genFunctionPreamble(ast: any, context: any) {
  const { push } = context
  const VueBinging = "Vue"
  const aliasHelper = s => `${helperMapName[s]}: _${helperMapName[s]}`
  if (ast.helpers.length > 0) {
    push(`const { ${ast.helpers.map(aliasHelper).join(", ")} } = ${VueBinging}`)
    push('\n')
  }
  push('return ')
}

function genNode(node: any, context: any) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(context, node)
      break;

    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break;

    case NodeTypes.SIMPLE_EXPRESSTION:
      genExpression(node, context)
      break;

    case NodeTypes.ElEMEMT:
      genElement(node, context)
      break;

    default:
      break;
  }
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    }
  }

  return context
}

function genText(context: any, node: any) {
  const { push } = context
  push(`'${node.content}'`)
}

function genInterpolation(node: any, context: any) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(')')
}

function genExpression(node: any, context: any) {
  const { push } = context
  push(`${node.content}`)
}

function genElement(node: any, context: any) {
  const { push, helper } = context
  const { tag } = node
  push(`${helper(CREATE_ELEMENT_VNODE)}("${tag}")`)
}