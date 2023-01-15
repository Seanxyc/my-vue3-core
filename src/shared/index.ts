/*
 * @Author: seanchen
 * @Date: 2022-05-22 16:33:53
 * @LastEditTime: 2022-05-22 17:06:22
 * @LastEditors: seanchen
 * @Description:
 */
export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal);
};

export const isEvent = (key: string) => /^on[A-Z]/.test(key)

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)
