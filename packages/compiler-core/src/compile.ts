import { generate } from "./codegen";
import { baseParse } from "./parse";
import { transform } from "./transform";
import { transformElement } from "./transforms/transformElement";
import { transformExpression } from "./transforms/transformExpression";
import { transformText } from "./transforms/transformText";

export function baseCompile(template: any) {
  // 1. 先把 template 也就是字符串 parse 成 ast
  const ast: any = baseParse(template)
  // 2. 给 ast 加点料（- -#）
  transform(ast, {
    nodeTransforms: [transformExpression, transformElement, transformText]
  })
  // 3. 生成 render 函数代码
  return generate(ast)
}