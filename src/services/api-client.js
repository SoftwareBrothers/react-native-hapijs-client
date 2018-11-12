import axios from 'axios'

export class ApiError extends Error {
  constructor(axiosError) {
    // when there is no response it means that Axios
    // cannot connect with the server
    if (!axiosError.response) {
      super('Could not connect with the server')
    } else {
      super(axiosError.response.data.message || 'Api error')
      this.code = axiosError.response.status
    }
    this.name = 'ApiError'
  }
}

export default class ApiClient {
  constructor(jwtToken) {
    this.host = process.env.API_URL || 'http://localhost:8080'
    this.api = axios.create({
      baseURL: this.host,
      timeout: 1000,
      headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
    })
  }

  async signUp({ email, password }) {
    try {
      return await this.api.post('/users', { email, password })
    } catch (error) {
      throw new ApiError(error)
    }
  }

  async signIn({ email, password }) {
    try {
      return await this.api.post('/users/auth', { email, password })
    } catch (error) {
      throw new ApiError(error)
    }
  }

  async getUser() {
    try {
      return await this.api.get('/me')
    } catch (error) {
      throw new ApiError(error)
    }
  }
}
