import { isEvent, isObject } from "../shared/index"
import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment, Text } from "./vnode"

/**
* @description
* @param createElement
* @param patchProp 
* @param insert 
*/
export function createRender(options) {

  const {
    createElement,
    patchProp,
    insert
  } = options

  function render(vnode: any, container: any) {
    // patch
    patch(vnode, container, null)
  }

  function patch(vnode: any, container: any, parentComponent: any) {
    // ShapeFlags   element | stateful component
    const { type, shapeFlag } = vnode

    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent)
        break;

      case Text:
        processText(vnode, container)
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) { // 与运算比较
          // 处理element类型
          processElement(vnode, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理组件类型
          propcessComponent(vnode, container, parentComponent)
        }
        break;
    }
  }

  function processFragment(vnode: any, container: any, parentComponent: any) {
    mountChildren(vnode, container, parentComponent)
  }

  function processText(vnode: any, container: any) {
    const { children } = vnode
    const textNode = document.createTextNode(children)
    container.append(textNode)
  }

  function processElement(vnode: any, container: any, parentComponent: any) {
    mountElement(vnode, container, parentComponent)
  }

  function mountElement(vnode: any, container: any, parentComponent: any) {
    // vnode -> element

    // 基于DOM
    // const el = (vnode.el = document.createElement(vnode.type)) // string | array
    // 自定义渲染
    const el = (vnode.el = createElement(vnode.type)) // string | array
    const { children, props, shapeFlag } = vnode

    // text children | array children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 每个child调用patch
      mountChildren(vnode, el, parentComponent)
    }

    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const val = props[key];
        // 基于DOM
        // if (isEvent(key)) {
        //   const event = key.slice(2).toLowerCase()
        //   el.addEventListener(event, val)
        // } else {
        //   el.setAttribute(key, val)
        // }
        // 自定义渲染
        patchProp(el, key, val)
      }
    }

    // 基于DOM
    // container.append(el)
    // 自定义渲染
    insert(el, container)
  }

  /**
   * @description 处理数组类型children
   */
  function mountChildren(vnode: any, container: any, parentComponent) {
    vnode.children.forEach(v => {
      patch(v, container, parentComponent)
    });
  }

  /**
   * @description 处理组件类型
   */
  function propcessComponent(vnode: any, container: any, parentComponent: any) {
    mountComponent(vnode, container, parentComponent)
  }

  /**
    * @description 组件初始化
    */
  function mountComponent(initialVNode: any, container: any, parentComponent: any) {
    // 创建实例
    const instance = createComponentInstance(initialVNode, parentComponent)

    // 执行setup
    setupComponent(instance)

    // 调用render
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance: any, initialVNode: any, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy) // 虚拟节点树

    patch(subTree, container, instance)

    initialVNode.el = subTree.el

    // TODO: 
    // vnode -> patch
    // vnode -> vnode -> element -> mountElement
  }

  return {
    createApp: createAppAPI(render)
  }
}
