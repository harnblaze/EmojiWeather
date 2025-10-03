import { api } from '@/lib/api'
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL, assertOpenWeatherEnv } from '@/config'

type OpenWeatherCurrent = {
  weather: { id: number; main: string; description: string; icon: string }[]
  main: { temp: number; humidity: number }
  wind: { speed: number }
  name: string
}

export async function getCurrentWeatherByCity(
  city: string,
  units: 'metric' | 'imperial' = 'metric'
) {
  assertOpenWeatherEnv()
  const url = `${OPENWEATHER_BASE_URL}/weather`
  const { data } = await api.get<OpenWeatherCurrent>(url, {
    baseURL: undefined, // используем абсолютный url
    params: {
      q: city,
      units,
      appid: OPENWEATHER_API_KEY,
      lang: 'ru',
    },
  })
  return data
}
