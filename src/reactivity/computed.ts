import { ReactiveEffect } from "./effect"


class ComputedRefImpl {
  private _getter: any
  private _value: any
  private _dirty: boolean = true
  private _effect: any

  constructor(getter) {
    this._getter = getter

    this._effect = new ReactiveEffect(getter, () => {
      // scheduler 控制getter重复调用，并且在触发fn.run()时将dirty改为true
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }

  get value() {
    // dirty控制避免重复计算
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }

    return this._value
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter)
}
