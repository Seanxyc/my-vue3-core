import { createVNode, Fragment } from '../vnode'

export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (slot) {
    if (typeof slot === 'function') {
      // children 不可以有 array
      return createVNode(Fragment, {}, slot(props))
    }
    // return createVNode('div', {}, slot)
  }
}
