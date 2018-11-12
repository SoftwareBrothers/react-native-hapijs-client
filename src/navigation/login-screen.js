import React from 'react'
import { View, StyleSheet } from 'react-native'
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
})

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.api = new ApiClient()
    this.store = new AuthTokenStore()
  }

  async submit(values) {
    const response = await this.api.signIn(values)
    this.store.save(response.data.token)
    this.props.navigation.navigate('AuthLoading')
  }

  render() {
    return (
      <View style={style.container}>
        <LoginForm onSubmit={values => this.submit(values)} />
      </View>
    )
  }
}

LoginScreen.propTypes = propTypes
