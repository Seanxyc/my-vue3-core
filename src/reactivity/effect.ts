/*
 * @Author: seanchen
 * @Date: 2022-05-04 22:28:00
 * @LastEditTime: 2022-05-22 17:06:28
 * @LastEditors: seanchen
 * @Description:
 */
import { extend } from '../shared'

let activeEffect
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  public scheduler: Function | undefined
  onStop?: () => void
  deps = []
  active = true

  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this
    const result = this._fn()

    // reset
    shouldTrack = false

    return result
  }

  stop() {
    // 判断是否需要清空deps
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

let targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return

  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 初始化
    depsMap = new Map()
    // 建立映射关系
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (dep.has(activeEffect)) return // 已经在dep中，不需要重复收集

  trackEffects(dep)
}

export function trackEffects(dep) {
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  triggerEffects(dep)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop(runner) {
  runner.effect.stop()
}

// 清空deps
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect

  // fn 返回值
  return runner
}
