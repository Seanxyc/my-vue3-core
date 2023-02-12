export * from './toDisplayString'

export const extend = Object.assign;

export const EMPTY_OBJ = {}

export const isObject = val => {
  return val !== null && typeof val === "object";
};

export const isString = val => typeof val === 'string'

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal);
};

export const isEvent = (key: string) => /^on[A-Z]/.test(key)

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

/**
 * @description 首字母大写
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description 字符串前加上'on'
 */
export const toHandleKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}

/**
 * @description keybabcase to camelcase
 */
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => c ? c.toUpperCase() : '')
}
