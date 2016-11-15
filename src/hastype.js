import {isDef} from './util'

export default function hasType(obj, type, objStack = [], typeStack = []) {
  if (obj === type) return true

  if (!isDef(type)) return !isDef(obj)

  if (!isDef(obj)) return false

  if (obj.constructor === type) return true

  if (Object.getPrototypeOf(obj) === type) return true

  if(hasType(type, RegExp) && hasType(obj, String)) return type.test(obj)

  // TODO look into making this a typed Function
  if (hasType(type.hasInstance, Function)) {
    return type.hasInstance(obj)
  }

  // Cycle detection.
  // We could use the teleporting turtle algorithm here, but it's
  // not so good for objects with a high branching factor
  // (see https://github.com/google/closure-library/commit/0ff140c96774bf25593880934ac312f4c00d317b).
  for (const i in objStack) { // eslint-disable-line guard-for-in
    const matchObj = obj === objStack[i]
    const matchType = type === typeStack[i]
    if (matchObj || matchType) {
      // Cycle detected. Objects are only equal if the
      // same cycle occurs in both.
      return matchObj && matchType
    }
  }

  function hasTypeInner(obj, type) {
    objStack.push(obj)
    typeStack.push(type)
    const matches = hasType(obj, type.prototype, objStack, typeStack)
    objStack.pop()
    typeStack.pop()
    return matches
  }

  let matches = Object.getOwnPropertyNames(type)
      .every(prop => hasTypeInner(obj[prop], type[prop]))

  // Try to match with the type prototype.
  return matches || hasTypeInner(obj, type.prototype)
}
