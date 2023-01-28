import { createRender } from '../runtime-core'
import { isEvent } from '../shared'

function createElement(type: any) {
  return document.createElement(type)
}

function patchProp(el, key, val) {
  if (isEvent(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, val)
  } else {
    el.setAttribute(key, val)
  }
}

function insert(el, parent) {
  parent.append(el)
}

const renderer: any = createRender({
  createElement,
  patchProp,
  insert
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '../runtime-core'
