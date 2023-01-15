import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode: any, container: any) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  if (typeof vnode.type === 'string') {
    // 处理element类型
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    // 处理组件类型
    propcessComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type) // string | array
  const { children, props } = vnode

  if (typeof children === "string") {
    el.textContent = children
    // props
  } else if (Array.isArray(children)) {
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
function mountComponent(vnode: any, container: any) {
  // 创建实例
  const instance = createComponentInstance(vnode)

  // 执行setup
  setupComponent(instance)

  // 调用render
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container: any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy) // 虚拟节点树

  patch(subTree, container)

  // TODO: 
  // vnode -> patch
  // vnode -> vnode -> element -> mountElement
}

