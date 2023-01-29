import { createRenderer } from '../runtime-core'
import { isEvent } from '../shared'

function createElement(type: any) {
  return document.createElement(type)
}

function patchProp(el, key, prevVal, nextVal) {
  if (isEvent(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, nextVal)
  } else {
    if (nextVal === undefined || nextVal === null) {
      // 更新props为null或undefined时删除属性
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextVal)
    }
  }
}

/**
 * @description 添加dom元素 
 * @param child
 * @param parent
 * @param anchor
 */
function insert(child, parent, anchor) {
  // parent.append(el)
  parent.insertBefore(child, anchor || null)
}

function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText
})


export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '../runtime-core'
