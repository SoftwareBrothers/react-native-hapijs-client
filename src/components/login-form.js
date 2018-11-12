import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Button,
  Alert,
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { ApiError } from '../services/api-client'

const password = { min: 6, max: 40 }

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().max(password.max).min(password.min),
})

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  submitLabel: 'Login',
  children: null,
}

const style = StyleSheet.create({
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .4)',
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    marginTop: 20,
  },
})

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: {
        error: '',
        value: '',
        valid: false,
      },
      password: {
        error: '',
        value: '',
        valid: false,
      },
      showPassword: false,
      loading: false,
    }
  }

  getValues() {
    return {
      email: this.state.email.value,
      password: this.state.password.value,
    }
  }

  async handleSubmit() {
    this.setState(prevState => (
      Object.assign({}, prevState, { loading: true })
    ))
    try {
      await this.props.onSubmit.call(this, this.getValues())
    } catch (error) {
      // on successfull execution onSubmit, form wrapped component,
      // should redirect user to the correct screen
      this.setState(prevState => (
        Object.assign({}, prevState, { loading: false })
      ))
      if (error.name === ApiError.name) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    }
  }

  togglePassword() {
    const newState = Object.assign(this.state)
    newState.showPassword = !newState.showPassword
    this.setState(newState)
  }

  valid() {
    return this.state.email.valid && this.state.password.valid
  }

  async updateField(fieldName, value) {
    const newState = Object.assign(this.state)
    let valid
    let error
    try {
      valid = await yup.reach(schema, fieldName).validate(value)
    } catch (e) {
      [error] = e.errors
    }

    newState[fieldName] = { value, error, valid: !!valid }
    this.setState(newState)
  }

  render() {
    return (
      <View style={style.form}>
        <TextField
          label="E-mail"
          onChangeText={value => this.updateField('email', value)}
          error={this.state.email.error}
        />
        <TextField
          secureTextEntry={!this.state.showPassword}
          label="Password"
          onChangeText={value => this.updateField('password', value)}
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
        <View>
          <Button
            style={style.button}
            title={this.props.submitLabel}
            onPress={() => this.handleSubmit()}
            disabled={!this.state.email.valid || !this.state.password.valid}
          />
        </View>
        {this.state.loading && (<ActivityIndicator size="large" />)}
      </View>
    )
  }
}

LoginForm.propTypes = propTypes
LoginForm.defaultProps = defaultProps
