import AuthBaseScreen from './auth-base'
import { Alert } from 'react-native'
import ApiClient from '../services/api-client'
import AuthTokenStore from '../store/auth-token-store'

export default class LoginScreen extends AuthBaseScreen {
  constructor(props) {
    super(props)
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
        const response = await this.api.signIn(form.getValues())
        this.store.save(response.data.token)
      } catch (error) {
        switch(error.response.status){
        case 403:
          errorMessage = 'Wrong email and/or password'
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
}