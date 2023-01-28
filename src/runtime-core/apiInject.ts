import { getCurrentInstance } from "./component";

export function provide(key: string, value: any) {
  const currentInstance: any = getCurrentInstance()

  if (currentInstance) {
    let { provides } = currentInstance
    const parentProvides = currentInstance.parent.provides

    if (provides === parentProvides) { // 只在初始化时执行一次
      // 当前provides的原型指向父级provides（原型链）
      provides = currentInstance.provides = Object.create(parentProvides)
    }

    provides[key] = value
  }
}

export function inject(key: string, defaultValue: any) {
  const currentInstance: any = getCurrentInstance()

  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides

    if (key in parentProvides) {
      return parentProvides[key]
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') return defaultValue()
      return defaultValue
    }
  }
}
