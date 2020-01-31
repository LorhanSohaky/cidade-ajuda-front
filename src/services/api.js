import { create } from 'apisauce'

const responseWrapper = async response => {
  if (response.ok) {
    return response
  }

  throw new Error(response)
}

const BASE_URL = 'https://cidade-ajuda.herokuapp.com'

const api = create({ baseURL: BASE_URL })

api.addAsyncResponseTransform(responseWrapper)

const API = {}

API.login = ({ username, password }) =>
  api.post('/api-token-auth/', { username, password })
export default API
