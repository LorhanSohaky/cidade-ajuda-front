import apisauce from 'apisauce'

const BASE_URL = 'https://cidade-ajuda.herokuapp.com'

const responseWrapper = async response => {
  if (response.ok) {
    return response
  }

  throw new Error(response)
}

const bindToken = token => async request => {
  if (token) {
    request.headers.Authorization = `Token ${token}`
  }
}

const API = {}

export const create = (input = {}) => {
  const config = {
    baseURL: input.baseURL || BASE_URL,
    token: input.token || undefined
  }
  const api = apisauce.create({ baseURL: config.baseURL })

  api.addAsyncRequestTransform(bindToken(config.token))
  api.addAsyncResponseTransform(responseWrapper)

  API.login = ({ username, password }) =>
    api.post('/api-token-auth/', { username, password })

  API.getMe = () => api.get('/api/usuarios/me/')

  API.postIncident = data => api.post('api/ocorrencias/', data)
  API.listIncidents = data => api.get('api/ocorrencias/', data)
}

export default API
