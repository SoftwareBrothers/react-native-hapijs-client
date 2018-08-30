import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import AuthTokenStore from '../store/auth-token-store'
import PropTypes from 'prop-types'

const propTypes = {
  navigation: PropTypes.func.isRequired
}

export default class AuthLoadingScreen extends React.Component {
  constructor(props){
    super(props)
    this.store = new AuthTokenStore()
    this._bootstrapAsync()
  }

  async _bootstrapAsync(){
    const token = await this.store.load()
    this.props.navigation.navigate(token ? 'Home': 'Auth')
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/>
        <Text>Auth loading...</Text>
      </View>
    )
  }
}

AuthLoadingScreen.propTypes = propTypes