import { useQuery } from '@tanstack/react-query'
import { getCurrentWeatherByCity } from '@/api/weatherApi'

export type Units = 'metric' | 'imperial'

/**
 * Хук для получения текущей погоды по городу с кешированием.
 */
export function useWeather(city: string, units: Units = 'metric') {
  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: () => getCurrentWeatherByCity(city, units),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 2, // 2 минуты
    gcTime: 1000 * 60 * 30, // 30 минут
    retry: 1,
  })
}
