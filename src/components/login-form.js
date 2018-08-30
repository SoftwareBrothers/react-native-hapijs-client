import React from 'react'
import { Text, View, StyleSheet, Switch, ViewPropTypes } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import * as yup from 'yup'
import PropTypes from 'prop-types'

const password = {min: 6, max: 40}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().max(password.max).min(password.min)
})

const propTypes = {
  onValueChange: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: {
        error: '',
        value: '',
        valid: false
      },
      password: {
        error: '',
        value: '',
        valid: false
      },
      showPassword: false
    }
  }

  togglePassword(){
    let newState = Object.assign(this.state)
    newState.showPassword = !newState.showPassword
    this.setState(newState)
  }

  valid(){
    return this.state.email.valid && this.state.password.valid
  }

  getValues(){
    return {
      email: this.state.email.value,
      password: this.state.password.value
    }
  }

  async updateField(fieldName, value) {
    let newState = Object.assign(this.state)
    let valid, error = null
    try {
      valid = await yup.reach(schema, fieldName).validate(value)
    } catch (e) {
      error = e.errors[0]
    }

    newState[fieldName] = {value, error, valid: !!valid}
    this.setState(newState)
    this.props.onValueChange.call(this,this.getValues())
  }

  render() {
    return (
      <View style={this.props.style}>
        <TextField
          label='E-mail'
          onChangeText={ (value) => this.updateField('email', value) }
          error={this.state.email.error}
        />
        <TextField
          secureTextEntry={!this.state.showPassword}
          label='Password'
          onChangeText={ (value) => this.updateField('password', value) }
          error={this.state.password.error}
        />
        <View>
          <Text style={style.label}>Show password</Text>
          <Switch 
            value={this.state.showPassword}
            onValueChange={() => this.togglePassword()}
          />
        </View>
        {this.props.children}
      </View>
    )
  }
}

LoginForm.propTypes = propTypes

const style = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .4)',
    paddingTop: 20,
    paddingBottom: 10
  }
})