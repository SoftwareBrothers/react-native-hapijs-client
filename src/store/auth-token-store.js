import { AsyncStorage } from 'react-native'

export default class AuthTokenStore {
  constructor() {
    this.key = 'jwtToken'
  }

  async save(token) {
    await AsyncStorage.setItem(this.key, token)
  }

  async load() {
    return AsyncStorage.getItem(this.key)
  }

  async clear() {
    return AsyncStorage.removeItem(this.key)
  }
}
