/*
 * @Author: seanchen
 * @Date: 2022-05-04 22:28:00
 * @LastEditTime: 2023-02-19 22:16:33
 * @LastEditors: Seanxyc seanxyc41@gmail.com
 * @Description:
 */
import { extend } from '@my-vue/shared'

let activeEffect
const effectStack: any[] = []
const trackStack: boolean[] = []

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

    cleanupEffect(this)

    trackStack.push(true)
    activeEffect = this
    effectStack.push(this)

    const result = this._fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]

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

let targetMap = new WeakMap()
export function track(target, key) {
  if (!isTracking()) return

  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, depsMap = new Map())

  let deps = depsMap.get(key)
  if (!deps) depsMap.set(key, deps = new Set())

  if (deps.has(activeEffect)) return // 已经在dep中，不需要重复收集

  trackEffects(deps)
}

export function trackEffects(dep) {
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return trackStack[trackStack.length - 1] && activeEffect !== undefined
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const deps = depsMap.get(key)
  const effectsToRun = new Set(deps)  // 避免无限执行

  triggerEffects(effectsToRun)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect !== activeEffect) {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
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
