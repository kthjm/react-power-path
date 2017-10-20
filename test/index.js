import assert from 'assert'
import sinon from 'sinon'
import React from 'react'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() })

import Path from '../src'

describe(`setTotalLength`, () => {
  // https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/setProps.md
  // enzyme.shallow().setProps()

  it(`constructor: !isD(d)`, () => {
    const causes = [undefined, null, false, '', 1, true, {}, []]
    causes.forEach(d => {
      const wrapper = enzyme.shallow(<Path {...{ d }} />)
      assert.deepStrictEqual(wrapper.instance().totalLength, undefined)
    })
  })

  it(`componentWillReceiveProps: this.props.d === nextProps.d`, () => {
    const totalLength = 1000
    const getTotalLengthStub = sinon.stub().returns(totalLength)
    const setAttributeSpy = sinon.spy()
    const createElementNSStub = sinon
      .stub(document, `createElementNS`)
      .returns({
        setAttribute: setAttributeSpy,
        getTotalLength: getTotalLengthStub
      })

    const d = `string`
    const wrapper = enzyme.shallow(<Path {...{ d }} />)
    wrapper.setProps({ d })

    assert.ok(getTotalLengthStub.calledOnce)
    assert.ok(setAttributeSpy.calledOnce)
    assert.ok(createElementNSStub.calledOnce)
    assert.deepStrictEqual(wrapper.instance().totalLength, totalLength)

    document.createElementNS.restore()
  })

  it(`componentWillReceiveProps: this.props.d !== nextProps.d`, () => {
    const totalLengthFirst = 1000
    const totalLengthSecond = 2000
    const getTotalLengthStub = sinon
      .stub()
      .onCall(0)
      .returns(totalLengthFirst)
      .onCall(1)
      .returns(totalLengthSecond)

    const setAttributeSpy = sinon.spy()
    const createElementNSStub = sinon
      .stub(document, `createElementNS`)
      .returns({
        setAttribute: setAttributeSpy,
        getTotalLength: getTotalLengthStub
      })

    const first = `first`
    const second = `second`
    const wrapper = enzyme.shallow(<Path {...{ d: first }} />)
    wrapper.setProps({ d: second })

    assert.ok(getTotalLengthStub.calledTwice)
    assert.ok(setAttributeSpy.calledTwice)
    assert.ok(createElementNSStub.calledTwice)
    assert.deepStrictEqual(wrapper.instance().totalLength, totalLengthSecond)

    document.createElementNS.restore()
  })
})

it(`ifIsFn => render`, () => {
  const totalLength = 2000
  const getTotalLengthStub = sinon.stub().returns(totalLength)
  const setAttributeSpy = sinon.spy()
  const createElementNSStub = sinon.stub(document, `createElementNS`).returns({
    setAttribute: setAttributeSpy,
    getTotalLength: getTotalLengthStub
  })

  const strokeDasharray = 1000
  const strokeDashoffsetStub = sinon.stub().returnsArg(0)

  const props = {
    d: 'willBeTotalLengthViaStub',
    style: {
      strokeDasharray,
      strokeDashoffset: strokeDashoffsetStub
    }
  }

  const wrapper = enzyme.shallow(<Path {...props} />)

  assert.ok(createElementNSStub.calledOnce)
  assert.ok(getTotalLengthStub.calledOnce)
  assert.ok(strokeDashoffsetStub.calledOnce)

  // https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/getNode.md
  // => Error: ShallowWrapper::getNode() is no longer supported. Use ShallowWrapper::getElement() instead
  assert.deepEqual(
    wrapper.getElement(),
    <path
      {...{
        d: 'willBeTotalLengthViaStub',
        style: {
          strokeDasharray: 1000,
          strokeDashoffset: 2000
        }
      }}
    />
  )

  createElementNSStub.restore()
})
