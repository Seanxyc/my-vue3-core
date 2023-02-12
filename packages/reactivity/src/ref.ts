/*
 * @Author: seanchen
 * @Date: 2022-05-22 17:02:13
 * @LastEditTime: 2023-02-12 17:30:38
 * @LastEditors: Seanxyc seanxyc41@gmail.com
 * @Description:
 */
import { hasChanged, isObject } from "@my-vue/shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep;
  public __v_isRef = true;

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

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    // get -> 如果是ref类型，返回.value
    // 如果不是ref类型，返回本身
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },

    // set -> 如果是当前是ref类型:
    //    如果newValue不是ref，修改；newValue是ref，替换
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}
