import typed from './typed.js'
import {constructs, isSuperType} from './checks.js'
import Type from './types.js'

// TODO type this
function gtyped(...genericTypes) {
  const expectedTypes = genericTypes.map(
    genericType => ({constructs: (concreteType => isSuperType(genericType, concreteType))}))
  return typed(expectedTypes)(Type)
}

export default gtyped
