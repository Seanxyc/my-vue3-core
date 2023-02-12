import { h, getCurrentInstance } from '../../dist/my-vue.esm.js'

export const Foo = {
  name: "Foo",

  render() {
    return h('div', {}, 'Foo')
  },

  setup() {
    const instance = getCurrentInstance()
    console.log("Foo:", instance)
    return {}
  }
}
