const publicPropertiesMap = {
  $el: i => i.vnode.el
  // $data:
}


export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // 1. key in setupState
    const { setupState } = instance
    if (key in setupState) {
      return setupState[key]
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
