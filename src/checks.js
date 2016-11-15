import {log, zip, assert, isDef} from './util'
import tostr from 'tostr'

/**
 * @param superType a type
 * @param subType 
 * @return whether an instance of the subtype could be safely substituted for an instance of the supertype.
 */
export function isSuperType(superType, subType) {
  log(`  checking ${tostr(superType)} is supertype of ${tostr(subType)}`)
  // TODO class subtyping
  // TODO think about matching () => undefined
  if (superType === subType) {
    log('    equality')
    return true
  }
  if (superType && superType.isSuperType) {
    log('    using superType.isSuperType')
    return superType.isSuperType(subType)
  }
  // TODO  is this necessary?
  // if (typeof superType !== typeof subType) {
  //   log(`    mismatched types typeof superType: ${typeof superType}, ` +
  //       `typeof subType: ${typeof subType}`)
  //   return false
  // }
  // TODO deal with this case (e.g. where obj.prototype === undefined)
  assert(superType !== null && subType !== null)
  if (typeof superType !== 'object' && typeof superType !== 'function') {
    log(`    expected object or function, got '${typeof superType}' ${tostr(superType)}`)
    return false
  }
  if (superType.retType) {
    if (!subType.retType) {
      return false
    } else if (!isSuperType(superType.retType, subType.retType)) {
      return false
    }
  }
  if (superType.argTypes) {
    log(`    subType.argTypes: ${tostr(subType.argTypes)}`)
    log(`    superType.argTypes: ${tostr(superType.argTypes)}`)
    log('    zip(subType.argTypes, superType.argTypes): ' +
      `${tostr(zip(subType.argTypes, superType.argTypes))}`)
    if (!subType.argTypes) {
      return false
    } else if (subType.argTypes.length !== superType.argTypes.length) {
      return false
    } else if (!zip(subType.argTypes, superType.argTypes).every(
      ([subArgType, superArgType]) => isSuperType(subArgType, superArgType))) {
      return false
    }
  }
  return superType.retType !== undefined
}

export function constructs(type, obj) {
  // TODO return or throw a failure description
  // TODO curry
  log(`checking ${tostr(type)} constructs ${tostr(obj)} (typeof: ${typeof obj})`)
  if (type === undefined || type === null) {
    return obj === undefined || obj === null
  } else if (type.constructs) {
    log('  using type.constructs')
    return type.constructs(obj)
  }
  if (obj === null || obj === undefined) {
    log(`obj was ${obj}`)
    return false
  }
  log(`  checking constructor is superType ${obj.constructor}`)
  return isSuperType(type, obj.constructor)
}
