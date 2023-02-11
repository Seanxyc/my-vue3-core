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
      tag: 'div',
      children: []
    })
  })
})

describe('text', () => {
  it('simple text', () => {
    const ast = baseParse('this is text')

    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.TEXT,
      content: 'this is text',
    })
  })
})

test('hello world', () => {
  const ast = baseParse('<p>hi,{{ message }}</p>')

  expect(ast.children[0]).toStrictEqual({
    type: NodeTypes.ElEMEMT,
    tag: 'p',
    children: [
      {
        type: NodeTypes.TEXT,
        content: 'hi,'
      },
      {
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSTION,
          content: 'message'
        }
      }
    ]
  })
});

test('nested element', () => {
  const ast = baseParse('<div><p>hi,</p>{{ message }}</div>')

  expect(ast.children[0]).toStrictEqual({
    type: NodeTypes.ElEMEMT,
    tag: 'div',
    children: [
      {
        type: NodeTypes.ElEMEMT,
        tag: 'p',
        children: [
          {
            type: NodeTypes.TEXT,
            content: 'hi,'
          },
        ]
      },
      {
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSTION,
          content: 'message'
        }
      }
    ]
  })
});

test('should throw error when there is no close tag', () => {
  expect(() => {
    baseParse("<div><span><p><span></p></span></div>")
  }).toThrow("no close tag: span")
});