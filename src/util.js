const DEBUG = false

export function log(...args) {
  if (DEBUG) {
    /* global console */
    console.log(...args) // eslint-disable-line no-console
  }
}

export function zip(...arrs) {
  return arrs[0].map((_, i) => arrs.map(arr => arr[i]))
}

export function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed')
  return condition
}

export function isDef(obj) {
  return obj !== null && obj !== undefined
}

export const AbstractFn = function() {
 throw new Error('not implemented')
}
