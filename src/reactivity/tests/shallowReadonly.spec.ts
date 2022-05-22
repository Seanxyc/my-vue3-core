/*
 * @Author: seanchen
 * @Date: 2022-05-22 15:21:21
 * @LastEditTime: 2022-05-22 17:06:36
 * @LastEditors: seanchen
 * @Description:
 */
import { isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reacctive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });
});
