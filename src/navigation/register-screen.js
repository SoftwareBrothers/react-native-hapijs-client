import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import LoginForm from '../components/login-form'
import ApiClient from '../services/api-client'
import AuthTokenStore from '../store/auth-token-store'

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    flex: 1,
  },
  terms: {
    paddingTop: 20,
    paddingBottom: 20,
    color: 'rgba(0, 0, 0, .8)',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.api = new ApiClient()
    this.store = new AuthTokenStore()
  }

  async submit(values) {
    const response = await this.api.signUp(values)
    this.store.save(response.data.token)
    this.props.navigation.navigate('AuthLoading')
  }

  render() {
    return (
      <View style={style.container}>
        <LoginForm onSubmit={values => this.submit(values)} submitLabel="Register">
          <Text style={style.terms}>
            By signing up, you are agreeing to the
            Terms & Conditions and Privacy Policy
          </Text>
        </LoginForm>
      </View>
    )
  }
}

RegisterScreen.propTypes = propTypes
