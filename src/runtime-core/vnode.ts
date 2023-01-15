import { ShapeFlags } from "../shared/ShapeFlags"

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
    el: null
  }

  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN // 或运算
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  // slots children 类型
  // 满足 自身时组件 + children = object
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }

  return vnode
}

function getShapeFlag(type) {
  return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
