import { NodeTypes } from "../src/ast"
import { baseParse } from "../src/parse"

describe('Parse', () => {
  describe('interpolation', () => {
    test('simple interpolation', () => {
      const ast = baseParse("{{ message }}")
      //root
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSTION,
          content: 'message'
        }
      })
    })
  })
})

describe('element', () => {
  it('simple element div', () => {
    const ast = baseParse('<div></div>')

    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ElEMEMT,
      tag: 'div'
    })
  })
})
