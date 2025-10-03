import { useQuery } from '@tanstack/react-query'
import { getCurrentWeatherByCity } from './weatherApi'

type CurrentWeather = Awaited<ReturnType<typeof getCurrentWeatherByCity>>

export function useWeatherQuery(city: string, units: 'metric' | 'imperial') {
  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: async (): Promise<CurrentWeather> => getCurrentWeatherByCity(city, units),
    enabled: Boolean(city),
  })
}
