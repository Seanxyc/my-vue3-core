import { h, getCurrentInstance } from '../../lib/my-vue3-core.esm.js'

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
