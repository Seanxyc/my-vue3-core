export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
  }

  return component
}

export function setupComponent(instance: any) {
  // TODO:
  // initProps()
  // initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const component = instance.type

  const { setup } = component

  if (setup) {
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // function / Object
  // TODO: function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  // 保证组建的render一定是有值的
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const component = instance.type

  if (component.render) {
    instance.render = component.render
  }
}
