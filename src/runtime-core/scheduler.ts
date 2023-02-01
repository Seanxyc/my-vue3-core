const queue: any[] = []

let isFlushPending = false
const p = Promise.resolve()

/**
 * @description nextTick
 * @param fn
 */
export function nextTick(fn: Function) {
  // return fn ? Promise.resolve().then(fn()) : Promise.resolve()
  return fn ? p.then(fn()) : p
}

export function queueJobs(job: any) {
  if (!queue.includes(job)) {
    queue.push(job)
  }

  queueFlush()
}

function queueFlush() {
  if (isFlushPending) return
  isFlushPending = true
  // 微任务
  nextTick(flushJobs)
  // Promise.resolve().then(() => {
  //   isFlushPending = false
  //   let job
  //   while (job = queue.shift()) {
  //     job && job()
  //   }
  // })
}

function flushJobs() {
  isFlushPending = false
  let job
  while (job = queue.shift()) {
    job && job()
  }
}
