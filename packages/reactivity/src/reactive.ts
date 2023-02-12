/*
 * @Author: seanchen
 * @Date: 2022-05-04 22:17:56
 * @LastEditTime: 2023-02-12 17:49:58
 * @LastEditors: Seanxyc seanxyc41@gmail.com
 * @Description: reactivity
 */
import { isObject } from "@my-vue/shared";
import {
  mutableHandler,
  readonlyHandler,
  shallowReadonlyHandler,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandler);
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandler);
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandler);
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    console.log("target ${target} has to be an object");
    return
  }
  return new Proxy(target, baseHandler);
}
