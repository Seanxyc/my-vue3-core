/*
 * @Author: seanchen
 * @Date: 2022-05-04 21:29:16
 * @LastEditTime: 2022-05-04 22:29:12
 * @LastEditors: seanchen
 * @Description:
 */
import { reactive, isReactive, isProxy } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);

    // 1. observered !== original
    expect(observed).not.toBe(original);
    // 2. 调用foo时返回值
    expect(observed.foo).toBe(1);

    expect(isReactive(observed)).toBe(true)

    // test isProxy
    expect(isProxy(observed)).toBe(true)
  });

  test("nested reactive", () => {
    const original = {
      nested: {
        foo: 1
      },
      array: [{ bar: 2 }]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
});

