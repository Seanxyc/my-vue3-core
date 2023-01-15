'use strict';

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
        el: null
    };
    return vnode;
}

/*
 * @Author: seanchen
 * @Date: 2022-05-22 16:33:53
 * @LastEditTime: 2022-05-22 17:06:22
 * @LastEditors: seanchen
 * @Description:
 */
var isObject = function (val) {
    return val !== null && typeof val === "object";
};

var publicPropertiesMap = {
    $el: function (i) { return i.vnode.el; }
    // $data:
};
var PublicInstanceProxyHandlers = {
    get: function (_a, key) {
        var instance = _a._;
        // 1. key in setupState
        var setupState = instance.setupState;
        if (key in setupState) {
            return setupState[key];
        }
        // 2. key = $el, $data ...
        // if (key === '$el') {
        //   return instance.vnode.el
        // }
        var publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

/**
* @description 创建实例对象，存储组件的属性(props, slots...)
*/
function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {}
    };
    return component;
}
/**
* @description setup 处理props, slots, 调用组件实例的setup(返回可能是Object或Function)
*/
function setupComponent(instance) {
    // TODO:
    // initProps()
    // initSlots()
    // 处理有状态的组件
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.type;
    // ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    var setup = Component.setup;
    // 如果组件实例定义了setup
    if (setup) {
        var setupResult = setup(); // Function/Object
        handleSetupResult(instance, setupResult);
    }
}
/**
  * @description 处理setup结果
  * @param {*} instance
  * @param {Function, Object} setupResult
  */
function handleSetupResult(instance, setupResult) {
    // Function Object
    // TODO: function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    // 如果组件实例定义了render
    if (Component.render) {
        instance.render = Component.render;
    }
}

function render(vnode, container) {
    // patch
    patch(vnode, container);
}
function patch(vnode, container) {
    if (typeof vnode.type === 'string') {
        // 处理element类型
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        // 处理组件类型
        propcessComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    // vnode -> element
    var el = (vnode.el = document.createElement(vnode.type)); // string | array
    var children = vnode.children, props = vnode.props;
    if (typeof children === "string") {
        el.textContent = children;
        // props
    }
    else if (Array.isArray(children)) {
        // 每个child调用patch
        mountChildren(children, el);
    }
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            var element = props[key];
            el.setAttribute(key, element);
        }
    }
    container.append(el);
}
/**
 * @description 处理数组类型children
 */
function mountChildren(vnode, container) {
    vnode.forEach(function (v) {
        patch(v, container);
    });
}
/**
 * @description 处理组件类型
 */
function propcessComponent(vnode, container) {
    mountComponent(vnode, container);
}
/**
  * @description 组件初始化
  */
function mountComponent(initialVNode, container) {
    // 创建实例
    var instance = createComponentInstance(initialVNode);
    // 执行setup
    setupComponent(instance);
    // 调用render
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    var proxy = instance.proxy;
    var subTree = instance.render.call(proxy); // 虚拟节点树
    patch(subTree, container);
    initialVNode.el = subTree.el;
    // TODO: 
    // vnode -> patch
    // vnode -> vnode -> element -> mountElement
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先转换成vnode
            // component -> vnode
            // 所有的逻辑操作都会基于vnode做处理
            var vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
