import { h } from '../../lib/my-vue3-core.esm.js'
import { Foo } from './Foo.js'

window.self = null
export const App = {
  // .vue
  // <template></template>
  // render
  name: "App",

  render() {
    window.self = this
    return h('div', {
      id: "root",
      class: ["red", "hard"],
      // onClick: () => {
      //  console.log('click')
      // },
      // onMousedown: () => {
      // console.log('mousedown')
      // }
    },
      // setupState
      // this.$el
      // 'hello, ' + this.msg
      // [
      //   h("p", { class: 'pink' }, "hi"),
      //   h("p", { class: 'skyblue' }, "mini-vue")
      // ]
      [
        h("div", {}, "hi," + this.msg),
        h(Foo, {
          count: 1,
          onEmit: (a, b) => {
            console.log(a, b)
          },
          onEmitFoo: () => {
            console.log('emit foo')
          }
        })
      ]
    )
  },

  setup() {
    return {
      msg: 'vue3-core',
    }
  },
}
