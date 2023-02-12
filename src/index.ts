export * from './runtime-dom'
import { registerRuntimeCompiler } from './runtime-dom'

import * as runtimeDom from './runtime-dom'
import { baseCompile } from './compiler-core/src'

function compileToFunction(template: any) {
  const { code } = baseCompile(template)
  // 调用 compile 得到的代码在给封装到函数内，
  // 这里会依赖 runtimeDom 的一些函数，所以在这里通过参数的形式注入进去
  const render = new Function("Vue", code)(runtimeDom)

  return render
}

registerRuntimeCompiler(compileToFunction)