export const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined
export const OPENWEATHER_BASE_URL =
  (import.meta.env.VITE_OPENWEATHER_BASE_URL as string | undefined) ??
  'https://api.openweathermap.org/data/2.5'

export function assertOpenWeatherEnv(): asserts OPENWEATHER_API_KEY is string {
  if (!OPENWEATHER_API_KEY) {
    console.warn('[config] VITE_OPENWEATHER_API_KEY не задан. Установите его в .env.local')
  }
}
