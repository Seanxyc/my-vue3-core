/*
 * @Author: seanchen
 * @Date: 2022-05-22 15:27:12
 * @LastEditTime: 2023-02-12 18:31:14
 * @LastEditors: Seanxyc seanxyc41@gmail.com
 * @Description:
 */
import { readonly, isReadonly, isProxy } from "../src/reactive";
import { vi } from 'vitest'

describe("readonly", () => {
  it("happy path", () => {
    // not set
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);

    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);

    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);

    // readonly嵌套
    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);

    // test isProxy
    expect(isProxy(wrapped)).toBe(true);
  });

  it("warn when call set", () => {
    console.warn = vi.fn();

    const user = readonly({
      age: 10,
    });

    user.age = 11;

    expect(console.warn).toBeCalled();
  });
});
