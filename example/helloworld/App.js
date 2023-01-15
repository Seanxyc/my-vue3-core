import { h } from '../../lib/my-vue3-core.esm.js'

window.self = null
export const App = {
  // .vue
  // <template></template>
  // render
  render() {
    window.self = this
    return h('div', {
      id: "root",
      class: ["red", "hard"],
      onClick: () => {
        console.log('click')
      },
      onMousedown: () => {
        console.log('mousedown')
      }
    },
      // setupState
      // this.$el
      'hello, ' + this.msg
      // [
      //   h("p", { class: 'pink' }, "hi"),
      //   h("p", { class: 'skyblue' }, "mini-vue")
      // ]
    )
  },

  setup() {
    return {
      msg: 'vue3-core',
    }
  },
}
