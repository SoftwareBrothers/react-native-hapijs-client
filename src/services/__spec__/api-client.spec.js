import mockAxios from 'axios'
import ApiClient, { ApiError } from '../api-client'

describe('ApiClient', () => {
  const jwtToken = 'somejwttoken'
  const apiClient = new ApiClient(jwtToken)

  describe('#signUp', () => {
    const email = 'john@doe.com'
    const password = 'somepassword'

    it('calls the api one time', async () => {
      await apiClient.signUp({ email, password })
      expect(mockAxios.post).toHaveBeenCalledWith('/users', { email, password })
      expect(mockAxios.post).toHaveBeenCalledTimes(1)
    })

    it('throws an ApiError when error occures', async () => {
      const message = 'error message'
      const status = 'error message'
      mockAxios.post.mockImplementationOnce(() => {
        const error = new Error(message)
        error.response = { data: { message, status } }
        return Promise.reject(error)
      })
      expect(apiClient.signUp({ email, password })).rejects.toThrow(ApiError)
    })
  })
})
