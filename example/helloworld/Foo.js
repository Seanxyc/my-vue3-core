import { h } from '../../lib/my-vue3-core.esm.js'

export const Foo = {
  setup(props) {
    console.log(props)
    props.count++
    console.log(props)
  },
  render() {
    return h('div', {}, "foo: " + this.count)
  }
}
