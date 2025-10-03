import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL ?? 'https://api.open-meteo.com/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use(config => {
  // Здесь можно добавить ключ API, локализацию и пр.
  return config
})

api.interceptors.response.use(
  res => res,
  error => {
    // Унифицированная обработка ошибок
    return Promise.reject(error)
  }
)
