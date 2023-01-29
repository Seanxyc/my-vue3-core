import { effect } from "../reactivity/effect"
import { EMPTY_OBJ, isEvent, isObject } from "../shared/index"
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
export function createRenderer(options) {

  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert
  } = options

  function render(vnode: any, container: any) {
    // patch
    patch(null, vnode, container, null)
  }

  /**
   * @description patch
   * @param n1 旧VNode
   * @param n2 新VNode
   * @param container 
   * @param parentComponent 
   */
  function patch(n1: any, n2: any, container: any, parentComponent: any) {
    // ShapeFlags   element | stateful component
    const { type, shapeFlag } = n2

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break;

      case Text:
        processText(n1, n2, container)
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) { // 与运算比较
          // 处理element类型
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理组件类型
          propcessComponent(n1, n2, container, parentComponent)
        }
        break;
    }
  }

  function processFragment(n1: any, n2: any, container: any, parentComponent: any) {
    mountChildren(n2, container, parentComponent)
  }

  function processText(n1: any, n2: any, container: any) {
    const { children } = n2
    const textNode = document.createTextNode(children)
    container.append(textNode)
  }

  function processElement(n1: any, n2: any, container: any, parentComponent: any) {
    if (!n1) {
      // 初始化
      mountElement(n2, container, parentComponent)
    } else {
      patchElement(n1, n2, container)
    }
  }

  /**
    * @description
    * @param n1 oldVNode
    * @param n2 newVNode 
    * @param container
    */
  function patchElement(n1: any, n2: any, container: any) {
    // TODO: 
    // props
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    const el = (n2.el = n1.el)
    patchProps(el, oldProps, newProps)
    // children
  }

  /**
  * @description 遍历新props和旧props对比
  * @param el
  * @param oldProps
  * @param newProps
  */
  function patchProps(el: any, oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(vnode: any, container: any, parentComponent: any) {
    // vnode -> element

    // 基于DOM
    // const el = (vnode.el = document.createElement(vnode.type)) // string | array
    // 自定义渲染
    const el = (vnode.el = hostCreateElement(vnode.type)) // string | array
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
        hostPatchProp(el, key, null, val)
      }
    }

    // 基于DOM
    // container.append(el)
    // 自定义渲染
    hostInsert(el, container)
  }

  /**
   * @description 处理数组类型children
   */
  function mountChildren(vnode: any, container: any, parentComponent) {
    vnode.children.forEach(v => {
      patch(null, v, container, parentComponent)
    });
  }

  /**
   * @description 处理组件类型
   */
  function propcessComponent(n1: any, n2: any, container: any, parentComponent: any) {
    mountComponent(n2, container, parentComponent)
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

  /**
    * @description 生成虚拟节点
    */
  function setupRenderEffect(instance: any, initialVNode: any, container: any) {
    effect(() => {

      if (!instance.isMounted) {
        // init
        const { proxy } = instance
        const subTree = instance.subTree = instance.render.call(proxy) // 虚拟节点树

        patch(null, subTree, container, instance)

        initialVNode.el = subTree.el

        instance.isMounted = true
      } else {
        // update
        const { proxy } = instance
        const subTree = instance.render.call(proxy) // 虚拟节点树
        const prevSubTree = instance.subTree
        // 更新subTree
        instance.subTree = subTree

        patch(prevSubTree, subTree, container, instance)
      }
    })
  }

  return {
    createApp: createAppAPI(render)
  }
}
