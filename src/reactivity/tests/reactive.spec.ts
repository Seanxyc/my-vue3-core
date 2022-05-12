/*
 * @Author: seanchen
 * @Date: 2022-05-04 21:29:16
 * @LastEditTime: 2022-05-04 22:29:12
 * @LastEditors: seanchen
 * @Description:
 */
import { reactive, isReactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);

    // 1. observered !== original
    expect(observed).not.toBe(original);
    // 2. 调用foo时返回值
    expect(observed.foo).toBe(1);

    expect(isReactive(observed)).toBe(true)
  });
});
