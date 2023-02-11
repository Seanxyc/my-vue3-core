import { NodeTypes } from "../ast";
import { CREATE_ELEMENT_VNODE } from "../runtimeHelpers";

export function transformElement(node: any, context: any) {
  if (node.type === NodeTypes.ElEMEMT) {
    context.helper(CREATE_ELEMENT_VNODE)
  }
}