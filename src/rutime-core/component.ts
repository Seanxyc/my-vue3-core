/**
* @description 创建实例对象，存储组件的属性(props, slots...)
*/
export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type
  }

  return component
}

/**
* @description setup 处理props, slots, 调用组件实例的setup(返回可能是Object或Function)
*/
export function setupComponent(instance: any) {
  // TODO:
  // initProps()
  // initSlots()

  // 处理有状态的组件
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type

  const { setup } = Component

  // 如果组件实例定义了setup
  if (setup) {
    const setupResult = setup() // Function/Object

    handleSetupResult(instance, setupResult)
  }
}

/**
  * @description 处理setup结果
  * @param {*} instance
  * @param {Function, Object} setupResult
  */
function handleSetupResult(instance: any, setupResult: any) {
  // Function Object
  // TODO: function

  if (typeof setupResult === 'object') {
    instance.setupResult = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  // 如果组件实例定义了render
  if (Component.render) {
    instance.render = Component.render
  }
}
