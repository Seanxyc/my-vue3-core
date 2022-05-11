/*
 * @Author: seanchen
 * @Date: 2022-05-04 22:17:56
 * @LastEditTime: 2022-05-04 22:29:08
 * @LastEditors: seanchen
 * @Description: reactivity
 */
import { track, trigger } from "./effect";
import { mutableHandler, readonlyHandler } from './baseHandlers'

export function reactive(raw) {
  return new Proxy(raw, mutableHandler);
}

export function readonly(raw) {
  return new Proxy(raw, readonlyHandler)
}
