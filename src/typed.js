import {zip, assert} from './util.js'
import tostr from 'tostr'
import {constructs} from './checks.js'

// TODO type this
function mkTypedFn(argTypes, retType, fn) {
  const typedFn = function(...args) {
    // TODO variadic params
    assert(argTypes.length === args.length,
        `expected ${argTypes.length} parameters, got ${args.length}`)
    zip(argTypes, args).forEach(
      ([type, obj]) =>
          assert(constructs(type, obj),
              `expected parameter ${tostr(obj)} to be a ${tostr(type)}`)
    )

    const ret = fn(...args)
    assert(constructs(retType, ret),
        `expected return value ${tostr(ret)} to be a ${tostr(retType)}`)
    return ret
  }
  typedFn.constructor = {argTypes, retType}
  // TODO fix this
  // for (const k of Object.getOwnPropertyNames(fn.constructor.prototype)) {
  //   const v = fn.constructor.prototype[k]
  //   typedFn.constructor.prototype[k] = typeof v === 'function' ? v.bind(fn) : v
  // }
  return typedFn
}

// TODO ftype these functions
export default function typed(...argTypes) {
  return function(retType) {
    return function(targetOrFn, propOrNone, descriptorOrNone) {
      const fn = descriptorOrNone ? descriptorOrNone.value : targetOrFn
      const typedFn = mkTypedFn(argTypes, retType, fn)
      if (propOrNone) {
        assert(descriptorOrNone)
        const target = assert(targetOrFn)
        const prop = propOrNone
        target[prop] = typedFn
      }
      return typedFn
    }
  }
}
