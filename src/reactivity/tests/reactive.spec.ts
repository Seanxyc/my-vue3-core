/*
 * @Author: seanchen
 * @Date: 2022-02-21 23:01:58
 * @LastEditTime: 2022-02-21 23:54:11
 * @LastEditors: seanchen
 * @Description:
 */
import { reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });
});
