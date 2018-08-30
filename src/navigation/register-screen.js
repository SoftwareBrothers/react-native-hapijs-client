import React from 'react'
import AuthBaseScreen from './auth-base'
import { StyleSheet, Text, Alert } from 'react-native'
import ApiClient from '../services/api-client'
import AuthTokenStore from '../store/auth-token-store'

export default class RegisterScreen extends AuthBaseScreen {
  constructor(props) {
    super(props)
    this.buttonLabel = 'Register'
    this.api = new ApiClient()
    this.store = new AuthTokenStore()
  }
  
  async submit(form) {
    if (form.valid()) {
      this.setState(Object.assign(this.state, {
        loading: true
      }))
      let errorMessage = null
      try {
        const response = await this.api.signUp(form.getValues())
        this.store.save(response.data.token)
      } catch (error) {
        switch(error.response.status){
        case 409:
          errorMessage = 'User already exists'
          break
        default:
          errorMessage = 'Api error'
        }
      }
      this.setState(Object.assign(this.state, {
        loading: false
      }))

      if (errorMessage) {
        Alert.alert(errorMessage)
      } else {
        this.props.navigation.navigate('AuthLoading')
      }
    }
  }

  renderTerms() {
    return (
      <Text style={style.terms}>
        By signing up, you are agreeing to the 
        Terms & Conditions and Privacy Policy
      </Text>
    )
  }
}

const style = StyleSheet.create({
  terms: {
    paddingTop: 20,
    color: 'rgba(0, 0, 0, .8)',
    fontSize: 16,
    textAlign: 'center'
  }
})