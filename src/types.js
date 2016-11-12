import {assert, isDef, zip} from './util.js'
import {constructs, isSuperType} from './checks.js'
import tostr from 'tostr'

export const Any = {
  constructs: isDef,
  isSuperType: isDef}

export const Type = {
  constructs: isDef,
  isSuperType: type => type === Type, // Type is only a supertype of itself
}

export function Nullable(type) {
  return {
    constructs: obj => !isDef(obj) || constructs(type, obj),
    isSuperType: subType => !isDef(subType) || isSuperType(type, subType),
  }
}

// TODO type this
function FunctionType(argTypes, retType, fn) {
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
