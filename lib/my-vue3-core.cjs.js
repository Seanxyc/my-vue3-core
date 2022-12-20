'use strict';

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children
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

/**
* @description 创建实例对象，存储组件的属性(props, slots...)
*/
function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type
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
        instance.setupResult = setupResult;
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
    patch(vnode);
}
function patch(vnode, container) {
    if (typeof vnode.type === 'string') ;
    else if (isObject(vnode.type)) {
        // 处理组件类型
        propcessComponent(vnode);
    }
}
/**
* @description 处理组件类型
*/
function propcessComponent(vnode, container) {
    mountComponent(vnode);
}
/**
  * @description 组件初始化
  */
function mountComponent(vnode, container) {
    // 创建实例
    var instance = createComponentInstance(vnode);
    // 执行setup
    setupComponent(instance);
    // 调用render
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render(); // 虚拟节点树
    patch(subTree);
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
            render(vnode);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
