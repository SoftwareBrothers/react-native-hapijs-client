import axios from 'axios'

export default class ApiClient {
  constructor(jwtToken) {
    this.host = process.env.API_URL || 'http://localhost:8080'
    this.api = axios.create({
      baseURL: this.host,
      timeout: 1000,
      headers: jwtToken ? {'Authorization': 'Bearer ' + jwtToken} : {}
    })
  }

  async signUp ({email, password}) {
    return await this.api.post('/users', {email, password})
  }

  async signIn ({email, password}) {
    return await this.api.post('/users/auth', {email, password})
  }

  async getUser () {
    return await this.api.get('/me')
  }
}