import { h, renderSlots } from '../../lib/my-vue3-core.esm.js'

export const Foo = {
  name: "Foo",

  setup() {
    return {}
  },

  render() {
    const foo = h('p', {}, 'foo')

    console.log('slots', this.$slots)

    const age = 18
    return h('div', {}, [
      renderSlots(this.$slots, "header", {
        age
      }),
      foo,
      renderSlots(this.$slots, "footer")
    ])
  }
}
