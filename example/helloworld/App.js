import { h } from '../../lib/my-vue3-core.esm.js'

export const App = {
  // .vue
  // <template></template>
  // render
  render() {
    return h('div', {
      id: "root",
      class: ["red", "hard"]
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
