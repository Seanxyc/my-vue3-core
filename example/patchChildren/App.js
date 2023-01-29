import { h } from '../../lib/my-vue3-core.esm.js'

/* import ArrayToArray from './ArrayToArray' */
import ArrayToText from './ArrayToText.js'
import TextToArray from './TextToArray.js'
import TextToText from './TextToText.js'

export default {
  name: 'App',

  setup() {

  },

  render() {
    return h('div', { tId: 1 }, [
      h('p', {}, "home"),
      h(ArrayToText),
      h(TextToText),
      h(TextToArray),
      /* h(ArrayToArray) */
    ])
  }
}
