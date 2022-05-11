import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return (target, key) => {
    const res = Reflect.get(target, key)

    if (!isReadonly) {
      // 收集依赖
      track(target, key)
    }

    return res
  }
}

function createSetter() {
  return (target, key, value) => {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key);
    return res
  }
}

export const mutableHandler = {
  get,
  set
}

export const readonlyHandler = {
  get: readonlyGet,

  set(target, key) {
    console.warn('key: ${key} cannot set readonly value!')
    return true
  }

}
