import { h, ref } from '../../dist/my-vue.esm.js'

const nextChildren = 'array2text'
const prevChildren = [h('div', {}, "A"), h('div', {}, 'B')]

export default {
  name: "ArrayToText",
  setup() {
    const array2text = ref(false)
    window.array2text = array2text

    return {
      isChange: array2text
    }
  },

  render() {
    const self = this

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  }
}
