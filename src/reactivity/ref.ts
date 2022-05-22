/*
 * @Author: seanchen
 * @Date: 2022-05-22 17:02:13
 * @LastEditTime: 2022-05-22 17:06:18
 * @LastEditors: seanchen
 * @Description:
 */
import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep;

  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    // same value should not trigger
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

/**
 * description: value为Object时通过reactive转换
 */
function convert(val) {
  return isObject(val) ? reactive(val) : val;
}

export function ref(value) {
  return new RefImpl(value);
}
