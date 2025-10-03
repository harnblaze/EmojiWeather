import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type WeatherResponse = {
  current_weather?: {
    temperature: number
    windspeed: number
    weathercode: number
  }
}

export function fetchWeatherByCoords(latitude: number, longitude: number) {
  return api.get<WeatherResponse>('/forecast', {
    params: {
      latitude,
      longitude,
      current_weather: true,
      timezone: 'auto',
    },
  })
}

export function useWeatherQuery(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: async () => {
      if (latitude == null || longitude == null) throw new Error('no-coords')
      const { data } = await fetchWeatherByCoords(latitude, longitude)
      return data
    },
    enabled: latitude != null && longitude != null,
  })
}
