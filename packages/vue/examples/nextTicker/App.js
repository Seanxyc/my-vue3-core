import { h, ref, reactive, getCurrentInstance, nextTick } from '../../dist/my-vue.esm.js'

export default {
  name: "App",
  setup() {
    const count = ref(1)
    const instance = getCurrentInstance()

    function onClick() {
      for (let i = 0; i < 100; i++) {
        console.log('update')
        count.value = i
      }

      nextTick(() => {
        console.log('nextTick', instance)
      })
    }

    return {
      onClick,
      count
    }
  },

  render() {
    const btn = h(
      'button',
      {
        onClick: this.onClick
      },
      'update')

    const p = h('p', {}, 'count:' + this.count)

    return h('div', {}, [btn, p])
  },
};
