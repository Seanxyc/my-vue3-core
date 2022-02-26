/*
 * @Author: seanchen
 * @Date: 2022-02-23 22:35:59
 * @LastEditTime: 2022-02-26 18:32:07
 * @LastEditors: seanchen
 * @Description:
 */

let activeEffect;

class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
}

const targetMap = new Map();
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  const dep = depsMap.get(key);
  for (const effect of dep) {
    effect.run();
  }
}

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  return _effect.run.bind(_effect);
}
