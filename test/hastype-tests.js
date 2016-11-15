import assert from 'assert'
import hasType from '../src/hastype'
import {Any} from '../src/types'
import {describe, it} from 'mocha'

describe('builtins', () => {
  it('boolean', () => assert(hasType(false, Boolean)))
  it('number', () => assert(hasType(5, Number)))
  it('string', () => assert(hasType('str', String)))
  it('null', () => assert(hasType(null, null)))
  it('undefined', () => assert(hasType(undefined, undefined)))
  it('null-undefined', () => assert(hasType(null, undefined)))
  it('undefined-null', () => assert(hasType(undefined, null)))
  it('object', () => assert(hasType({a: 5}, Object)))
  it('array', () => assert(hasType([5], Array)))
  // it('symbol', () => assert(hasType(Symbol(5), Symbol))) //TODO  support symbols in tests
})

describe('any', () => {
  it('boolean', () => assert(hasType(false, Any)))
  it('number', () => assert(hasType(5, Any)))
  it('string', () => assert(hasType('str', Any)))
  it('null', () => assert(hasType(null, Any)))
  it('undefined', () => assert(hasType(undefined, Any)))
  it('object', () => assert(hasType({a: 5}, Any)))
  it('array', () => assert(hasType([5], Any)))
  // it('symbol', () => assert(hasType(Symbol(5), Symbol))) //TODO  support symbols in tests
})

describe('referential equality', () => {
  //TODO
})

describe('deep equality', () => {
  //TODO
})

describe('deep equality with types', () => {
  //TODO
})

describe('class hierarchies', () => {
  //TODO(both instance and subclass relationships)
})

describe('hasInstance method', () => {
  //TODO
})

describe('collections', () => {
  //TODO
})

describe('binary tree', () => {
  // See bintree test at https://github.com/google/closure-library/blob/master/closure/goog/testing/asserts_test.js
})

describe('regexp', () => {
  //TODO
})

describe('cycles', () => {
  //TODO
})

describe('iterator', () => {
  //See description of var1['__iterator__'] in https://github.com/google/closure-library/blob/master/closure/goog/testing/asserts.js
})
