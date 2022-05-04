/*
 * @Author: seanchen
 * @Date: 2022-05-04 21:29:16
 * @LastEditTime: 2022-05-04 22:29:12
 * @LastEditors: seanchen
 * @Description:
 */
import { reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observered = reactive(original);

    // 1. observered !== original
    expect(observered).not.toBe(original);
    // 2. 调用foo时返回值
    expect(observered.foo).toBe(1);
  });
});
