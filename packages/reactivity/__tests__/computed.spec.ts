import { computed } from '../src/computed'
import { reactive } from '../src/reactive'
import { vi } from 'vitest'
import { effect } from '../src/effect'

describe('computed', () => {
  it('happy path', () => {
    const user = reactive({
      age: 1,
    })

    const age = computed(() => {
      return user.age
    })

    expect(age.value).toBe(1)
  })

  it('should compute lazily', () => {
    const value = reactive({
      foo: 1,
    })
    const getter = vi.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)

    // lazy
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(1)

    // should not computed until needed
    value.foo = 2
    expect(getter).toHaveBeenCalledTimes(1) // 不再次调用getter

    // now it should compute
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)
  })

  it('nested computed', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    let dummy = computed(() => obj.foo + obj.bar)

    const runner = vi.fn(() => {
      console.log(dummy.value)
    })
    effect(runner)

    expect(runner).toHaveBeenCalledOnce()
    expect(dummy.value).toBe(3)

    obj.foo++

    expect(runner).toHaveBeenCalledTimes(2)
    expect(dummy.value).toBe(4)
  })
})
