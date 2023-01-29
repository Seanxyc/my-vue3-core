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
    el.setAttribute(key, nextVal)
  }
}

function insert(el, parent) {
  parent.append(el)
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '../runtime-core'
