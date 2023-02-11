import { createVNodeCall, NodeTypes } from "../ast";
import { CREATE_ELEMENT_VNODE } from "../runtimeHelpers";

export function transformElement(node: any, context: any) {
  if (node.type === NodeTypes.ElEMEMT) {
    return () => {

      // tag
      const vnodeTag = `"${node.tag}"`

      // props
      let vnodeProps

      const { children } = node
      let vnodeChildren = children[0]

      node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren)
    }
  }
}