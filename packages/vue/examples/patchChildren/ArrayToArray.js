import { h, ref } from '../../dist/my-vue.esm.js'

// 1.1 左侧对比
// (A B) C
// (A B) D E
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'E' }, 'E'), */
/* ] */

// 1.2 右侧对比
// A (B C)
// D E (B C)
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/* ] */

// 2. 新的比旧的长
// 2.1 左侧
// (A B)
// (A B) C D
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/* ] */
// 2.2 右侧
// (A B)
// C (A B) 
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/* ] */

// 3. 旧的比新的长
// 3.1 左侧
// (A B) C
// (A B) 
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/* ] */
// 3.2 右侧
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/* ] */

// 4.1 中间对比
// A B (C D) F G
// A B (E C) F G
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C', id: 'c-prev' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'C', id: 'c-next' }, 'C'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
// 4.2 优化
// A B (C E D) F G
// A B (E C) F G
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C', id: 'c-prev' }, 'C'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'C', id: 'c-next' }, 'C'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
// 4.3. 
// A B (C D E) F G
// A B (E C D) F G
// 最长子序列 【1，2】
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'F' }, 'F'), */
/* ] */
/*   h('p', { key: 'G' }, 'G'), */

// 4.4 包含新节点
// A B (C E) F G
// A B (E C D) F G
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */


// 4.4 综合例子
// A B (C D E Z) F G
// A B (D C Y E) F G
/* const prevChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'Z' }, 'Z'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */
/* const nextChildren = [ */
/*   h('p', { key: 'A' }, 'A'), */
/*   h('p', { key: 'B' }, 'B'), */
/*   h('p', { key: 'D' }, 'D'), */
/*   h('p', { key: 'C' }, 'C'), */
/*   h('p', { key: 'Y' }, 'Y'), */
/*   h('p', { key: 'E' }, 'E'), */
/*   h('p', { key: 'F' }, 'F'), */
/*   h('p', { key: 'G' }, 'G'), */
/* ] */

// fix
const prevChildren = [
  h('p', { key: 'A' }, 'A'),
  h('p', {}, 'C'),
  h('p', { key: 'B' }, 'B'),
  h('p', { key: 'D' }, 'D'),
]
const nextChildren = [
  h('p', { key: 'A' }, 'A'),
  h('p', { key: 'B' }, 'B'),
  h('p', {}, 'C'),
  h('p', { key: 'D' }, 'D'),
]

export default {
  name: "ArrayToArray",
  setup() {
    const array2array = ref(false)
    window.array2array = array2array

    return {
      isChange: array2array
    }
  },

  render() {
    const self = this

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  }
}
