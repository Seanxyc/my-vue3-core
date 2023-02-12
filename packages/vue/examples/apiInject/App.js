// 组件provide，inject功能
import { h, provide, inject } from '../../dist/my-vue.esm.js'

const Provider = {
  name: "Provider",

  setup() {
    provide('foo', "fooVal")
    provide('bar', "barVal")
  },

  render() {
    return h('div', {}, [h('p', {}, "Provider"), h(Provider2)])
  }
}

const Provider2 = {
  name: "Provider2",

  setup() {
    provide('foo', 'fooVal2')
    provide('bar2', 'bar2Val')
    const foo = inject('foo')

    return {
      foo
    }
  },

  render() {
    return h('div', {}, [h('p', {}, `Provider2: foo - ${this.foo}`), h(Consumer)])
  }
}

const Consumer = {
  name: 'Consumer',

  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    const fooBar = inject('fooBar', 'defaultValue')

    return {
      foo,
      bar,
      fooBar
    }
  },

  render() {
    return h('div', {}, `Consumer: - ${this.foo} - ${this.bar} - ${this.fooBar}`)
  }
}

export default {
  name: "App",
  setup() { },
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)])
  }
}
