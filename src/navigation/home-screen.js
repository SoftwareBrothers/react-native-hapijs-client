import React from 'react'
import { View, Button } from 'react-native'
import PropTypes from 'prop-types'
import AuthTokenStore from '../store/auth-token-store'

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.store = new AuthTokenStore()
  }

  handleSignOut() {
    this.store.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <Button
          title="Sign out"
          onPress={() => this.handleSignOut()}
        />
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Welcome Home',
}

HomeScreen.propTypes = propTypes
