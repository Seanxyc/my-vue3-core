import { isObject } from "../shared/index"
import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode: any, container: any) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // ShapeFlags   element | stateful component
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) { // 与运算比较
    // 处理element类型
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 处理组件类型
    propcessComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  // vnode -> element
  const el = (vnode.el = document.createElement(vnode.type)) // string | array
  const { children, props, shapeFlag } = vnode

  // text children | array children
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag * ShapeFlags.ARRAY_CHILDREN) {
    // 每个child调用patch
    mountChildren(children, el)
  }

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const element = props[key];
      el.setAttribute(key, element)
    }
  }

  container.append(el)
}



/**
 * @description 处理数组类型children
 */
function mountChildren(vnode: any, container: any) {
  vnode.forEach(v => {
    patch(v, container)
  });
}

/**
 * @description 处理组件类型
 */
function propcessComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

/**
  * @description 组件初始化
  */
function mountComponent(initialVNode: any, container: any) {
  // 创建实例
  const instance = createComponentInstance(initialVNode)

  // 执行setup
  setupComponent(instance)

  // 调用render
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode: any, container: any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy) // 虚拟节点树

  patch(subTree, container)

  initialVNode.el = subTree.el

  // TODO: 
  // vnode -> patch
  // vnode -> vnode -> element -> mountElement
}

