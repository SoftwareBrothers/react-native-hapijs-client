import React from 'react'
import { View, Button } from 'react-native'
import AuthTokenStore from '../store/auth-token-store'

import PropTypes from 'prop-types'

const propTypes = {
  navigation: PropTypes.func.isRequired
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  
    this.store = new AuthTokenStore()
  }

  handleSignOut(){
    this.store.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <Button
          title='Sign out'
          onPress={() => this.handleSignOut()}
        />
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Welcome Home'
}

HomeScreen.propTypes = propTypes