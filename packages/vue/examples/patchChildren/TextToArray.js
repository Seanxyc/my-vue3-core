import { h, ref } from '../../dist/my-vue.esm.js'

const prevChildren = 'oldText'
const nextChildren = [h('div', {}, "A"), h('div', {}, 'B')]

export default {
  name: "ArrayToText",
  setup() {
    const text2array = ref(false)
    window.text2array = text2array

    return {
      isChange: text2array
    }
  },

  render() {
    const self = this

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  }

}
