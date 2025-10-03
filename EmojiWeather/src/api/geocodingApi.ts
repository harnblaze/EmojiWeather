import { api } from '@/lib/api'
import { OPENWEATHER_API_KEY } from '@/config'

type GeocodingResult = {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export async function searchCities(query: string, limit = 5) {
  if (!query.trim()) return []

  const { data } = await api.get<GeocodingResult[]>(
    `https://api.openweathermap.org/geo/1.0/direct`,
    {
      baseURL: undefined,
      params: {
        q: query,
        limit,
        appid: OPENWEATHER_API_KEY,
      },
    }
  )

  return data.map(city => ({
    value: `${city.name}, ${city.country}`,
    label: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`,
    lat: city.lat,
    lon: city.lon,
  }))
}
