import axios from 'axios'

class ResolverError extends Error {
  public statusCode: number

  constructor (message: string, statusCode: number = 500) {
    super(message)
    this.name = 'ResolverError'
    this.statusCode = statusCode
  }
}

const instance = axios.create()

instance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      throw error
    }

    const {config: { method, url }, status, data} = error.response
    const message = JSON.stringify({ method, status, url, data }, null, 2)
    throw new ResolverError(message, status)
  },
)

export default instance
