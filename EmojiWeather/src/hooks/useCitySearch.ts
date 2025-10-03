import { useQuery } from '@tanstack/react-query'
import { searchCities } from '@/api/geocodingApi'
import { useDebouncedValue } from './useDebouncedValue'

export function useCitySearch(query: string) {
  const debouncedQuery = useDebouncedValue(query, 300)

  return useQuery({
    queryKey: ['cities', debouncedQuery],
    queryFn: () => searchCities(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}
