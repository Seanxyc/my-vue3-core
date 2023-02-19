/*
 * @Author: seanchen
 * @Date: 2022-05-04 22:11:41
 * @LastEditTime: 2023-02-19 19:01:19
 * @LastEditors: Seanxyc seanxyc41@gmail.com
 * @Description:
 */
import { reactive } from "../src/reactive";
import { effect, stop } from "../src/effect";
import { vi } from 'vitest'

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    // update
    user.age++;
    expect(nextAge).toBe(12);
  });

  // runer
  it("should return runner when call effect", () => {
    // effect(fn) -> function(runner) -> fn -> return
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });

    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe("foo");
  });

  // scheduler
  it("scheduler", () => {
    // 1. 通过effect的第二个参数给定一个scheduler的fn
    // 2. effect第一次执行的时候还会执行fn
    // 3. 当响应式对象set update 不会执行fn，而是执行scheduler
    // 4. 当执行runner的时候，会再次执行fn
    let dummy;
    let run: any;
    const scheduler = vi.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    // should be callsed on first trigger
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    // should not run yet
    expect(dummy).toBe(1);
    // manually run
    run();
    // should have run
    expect(dummy).toBe(2);
  });

  // stop
  it("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.prop = 3; // 仅触发set
    expect(dummy).toBe(2);
    obj.prop++; // obj.prop = obj.prop + 1 会触发get
    expect(dummy).toBe(2);

    // stopped effect should still be manually callable
    runner();
    expect(dummy).toBe(4);
  });

  // onStop
  it("onStop", () => {
    const obj = reactive({
      foo: 1,
    });
    const onStop = vi.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { onStop }
    );
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });

  // clean up
  it('cleanUp', () => {
    let dummy
    const obj = reactive({ ok: true, text: 'hello world' })
    const runner = vi.fn(() => {
      dummy = obj.ok ? obj.text : 'not'
    })
    effect(runner)
    expect(runner).toHaveBeenCalledOnce()
    expect(dummy).toBe('hello world')
    obj.ok = false
    expect(dummy).toBe('not')
    expect(runner).toHaveBeenCalledTimes(2)
    obj.text = 'hi, vue'
    expect(runner).toHaveBeenCalledTimes(2)
  })
});
