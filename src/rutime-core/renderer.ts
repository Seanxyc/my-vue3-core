import { createComponentInstance, setupComponent } from "./component"

export function render(vnode: any, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件类型
  propcessComponent(vnode, container)
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
  const subTree = instance.render() // 虚拟节点树

  patch(subTree, container)

  // TODO: 
  // vnode -> patch
  // vnode -> vnode -> element -> mountElement
}
