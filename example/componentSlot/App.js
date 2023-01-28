import { createTextVNode, h } from '../../lib/my-vue3-core.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: "App",

  setup() {
    return {}
  },

  render() {
    const app = h('div', {}, 'App')
    const foo = h(Foo, {},
      {
        header: ({ age }) => [
          h('p', {}, 'header' + age),
          createTextVNode("this is header")
        ],
        footer: () => h('p', {}, 'footer')
      }
    )

    return h('div', {}, [app, foo])
  },
}
