import React from 'react'
import { shallow } from 'enzyme'

import LoginForm from '../login-form'

let wrapper

describe('<LoginForm/>', function() {
  beforeEach(function() {
    this.onValueChange = function() {}
    wrapper = shallow(<LoginForm onValueChange={this.onValueChange}/>)
  })

  describe('#getValues', function() {
    it('has values set to empty strings', function() {
      expect(wrapper.instance().getValues()).toEqual({
        password: '',
        email: ''
      })
    })
  })
})
