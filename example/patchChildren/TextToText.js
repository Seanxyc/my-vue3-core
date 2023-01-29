
import { h, ref } from '../../lib/my-vue3-core.esm.js'

const nextChildren = 'newText'
const prevChildren = 'oldText'

export default {
  name: "TextToText",
  setup() {
    const text2text = ref(false)
    window.text2text = text2text

    return {
      isChange: text2text
    }
  },

  render() {
    const self = this

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  }
}
