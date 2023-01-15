import { h } from '../../lib/my-vue3-core.esm.js'

export const Foo = {
  setup(props, { emit }) {
    // props
    console.log(props)
    props.count++
    console.log(props)


    // emit
    const emitAdd = () => {
      emit("emit", 1, 2)
      emit('emit-foo')
    }
    return {
      emitAdd
    }
  },


  render() {
    const foo = h(
      "p",
      {
        onMousedown: () => {
          console.log('onMousedown')
        }
      },
      "foo: " + this.count
    )

    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'emitAdd'
    )

    return h('div', {}, [foo, btn])
  }
}
