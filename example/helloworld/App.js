import { h } from '../../lib/my-vue3-core.esm.js'

export const App = {
  // .vue
  // <template></template>
  // render
  render() {
    return h('div', 'hello, ' + this.msg)
  },

  setup() {
    return {
      msg: 'vue3-core',
    }
  },
}
