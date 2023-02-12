// 最简单的情况
// template 只有一个 interpolation
// export default {
//   name: "App",
//   template: `<div>hi,{{msg}}</div>`,
//   setup() {
//     return {
//       msg: "vue3 - compiler",
//     };
//   },
// };


// 复杂一点
// template 包含 element 和 interpolation 
import { ref } from '../../lib/my-vue3-core.esm.js'
export default {
  template: `<div>{{msg}}{{count}}</div>`,
  setup() {
    const count = window.count = ref(1)
    return {
      msg: "vue3 - compiler",
      count
    };
  },
};