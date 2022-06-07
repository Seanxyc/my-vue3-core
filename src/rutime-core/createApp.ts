import { render } from './renderer'
import { createVNode } from './vnode'

export function createApp(rootComponent: any) {
  return {
    mount(rootContainer: any) {
      // 先转换成vnode
      // 所有的逻辑操作都会基于vnode做处理
      // component -> vnode
      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    },
  }
}
