import { hasChanged } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"


class RefImpl {
  private _value: any
  public dep

  constructor(value) {
    this._value = value
    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // same value should not trigger
    if (hasChanged(this._value, newValue)) {
      this._value = newValue
      triggerEffects(this.dep)
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}
