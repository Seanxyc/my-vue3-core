import { hasOwn } from "@my-vue/shared"

const publicPropertiesMap = {
  $el: i => i.vnode.el,
  $slots: i => i.slots,
  $props: i => i.props
  // $data:
}


export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // 1. key in setupState
    const { setupState, props } = instance
    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }

    // 2. key = $el, $data ...
    // if (key === '$el') {
    //   return instance.vnode.el
    // }
    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}


