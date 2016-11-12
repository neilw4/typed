import assert from 'assert'
import typed from '../src/typed'
import {describe, it} from 'mocha'

const myStrFn = typed(String)(String)(str => str || null)

describe('directly typed function', () => {
  it('accepts a string', () => {
    assert.equal(
        myStrFn('str'),
        'str')
  })

  it('rejects invalid params', () => {
    assert.throws(
      () => myStrFn(7),
      Error,
      /^expected parameter/)
  })

  it('rejects no params', () => {
    assert.throws(
      () => myStrFn(),
      Error,
      /^expected 1 parameter.*got 0/)
  })

  it('rejects too many params', () => {
    assert.throws(
      () => myStrFn('str', 'str2'),
      Error,
      /^expected 1 parameter.*got 2/)
  })

  it('rejects invalid return value', () => {
    assert.throws(
      () => myStrFn(''),
      Error,
      /^expected return value/)
  })
})

describe.skip('higher-order directly typed function', () => {
  const myHigherFn = typed(
    Number, {argTypes: [String], retType: String})(Number)(
    (x, fn) => parseInt(fn(x.toString(10)), 10))

  it('accepts correct params', () => {
    assert.equals(
      myHigherFn(5, myStrFn),
      5)
  })

  it('rejects incorrect params', () => {
    assert.throws(
      () => myHigherFn('str', myStrFn),
      Error,
      /^expected parameter/
    )
  })
})
