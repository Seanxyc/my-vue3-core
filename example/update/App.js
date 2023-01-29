import { h, ref } from '../../lib/my-vue3-core.esm.js'

export const App = {
  name: "App",

  setup() {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }

    const props = ref({
      foo: 'foo',
      bar: 'bar'
    })

    const onChangePropsDemo1 = () => {
      console.log(123)
      props.value.foo = 'new-foo'
    }

    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }

    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo'
      }
    }

    return {
      count,
      onClick,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
      props
    }
  },

  render() {
    return h(
      'div',
      {
        id: 'root',
        ...this.props
      },
      [
        h('div', {}, 'count' + this.count),
        h(
          'button',
          {
            onClick: this.onClick
          },
          'click'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDemo1
          },
          '1.值改变了 - 修改'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDemo1
          },
          '2.值变成了undefined - 删除'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDemo1
          },
          '3. 属性在新的里面没了 - 删除'
        ),
      ]
    )
  }
}
