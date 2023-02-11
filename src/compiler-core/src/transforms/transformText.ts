import { NodeTypes } from "../ast";
import { isText } from "../utils";

export function transformText(node) {
  if (node.type === NodeTypes.ElEMEMT) {
    return () => {
      const { children } = node

      let currentContainer
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child)) {
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText(next)) {
              if (!currentContainer) {
                currentContainer = children[i] = {
                  type: NodeTypes.COMPOUND_EXPRESSION,
                  children: [child]
                }
              }

              currentContainer.children.push(" + ")
              currentContainer.children.push(next)

              children.splice(j--, 1)
            } else {
              // not text
              currentContainer = undefined
              break
            }
          }
        }
      }
    }
  }
}