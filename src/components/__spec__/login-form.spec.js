import React from 'react'
import { shallow } from 'enzyme'

import { TextField } from 'react-native-material-textfield'

import LoginForm from '../login-form'


describe('<LoginForm/>', () => {
  let wrapper
  const onSubmit = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<LoginForm onSubmit={onSubmit} />)
  })

  it('renders 2 text fields', () => {
    expect(wrapper.find(TextField).length).toEqual(2)
  })

  describe('#getValues', () => {
    it('has values set to empty strings', () => {
      expect(wrapper.instance().getValues()).toEqual({
        password: '',
        email: '',
      })
    })
  })

  describe('#valid', () => {
    it('is not valid by default', () => {
      expect(wrapper.instance().valid()).toEqual(false)
    })
  })

  describe('#handleSubmit', () => {
    beforeEach(() => {
      wrapper.instance().handleSubmit()
    })

    it('calls onSubmit', () => {
      expect(onSubmit.mock.calls.length).toEqual(1)
    })

    it('changes loading state', () => {
      expect(wrapper.state('loading')).toEqual(true)
    })

    it('changes loading state back when error occures', () => {
      onSubmit.mockImplementation(() => {
        throw new Error('some error')
      })
      wrapper.instance().handleSubmit()
      expect(wrapper.state('loading')).toEqual(false)
    })
  })

  describe('#togglePassword', () => {
    it('toggles state of the showPassword flag', () => {
      expect(wrapper.state('showPassword')).toEqual(false)
      wrapper.instance().togglePassword()
      expect(wrapper.state('showPassword')).toEqual(true)
    })
  })

  describe('#updateField', () => {
    const email = 'some@email.com'
    it('changes state of given field', async () => {
      await wrapper.instance().updateField('email', email)
      expect(wrapper.state('email')).toMatchObject({ value: email })
    })

    it('validates data', async () => {
      await wrapper.instance().updateField('email', 'somewrongemail')
      expect(wrapper.state('email')).toMatchObject({ valid: false })
    })
  })
})
