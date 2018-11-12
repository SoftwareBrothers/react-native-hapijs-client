import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import AuthTokenStore from '../store/auth-token-store'

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.store = new AuthTokenStore()
    this.bootstrapAsync()
  }

  async bootstrapAsync() {
    const token = await this.store.load()
    this.props.navigation.navigate(token ? 'Home' : 'Auth')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Auth loading...</Text>
      </View>
    )
  }
}

AuthLoadingScreen.propTypes = propTypes
