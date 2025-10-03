import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WeatherCard } from '@/components/WeatherCard'
import { WeatherCardSkeleton } from '@/components/WeatherCardSkeleton'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useWeather } from '@/hooks/useWeather'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

function App() {
  const [city, setCity] = useState('Moscow')
  const [query, setQuery] = useState('Moscow')
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const debouncedCity = useDebouncedValue(city, 500)
  const { data, isLoading, error, isFetching } = useWeather(debouncedCity, units)
  const loading = isLoading || isFetching

  const temperature =
    typeof data?.main?.temp === 'number'
      ? `${Math.round(data.main.temp)}${units === 'metric' ? '°C' : '°F'}`
      : '—'
  const condition = data?.weather?.[0]?.description ?? '—'

  return (
    <div className="mx-auto max-w-xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">EmojiWeather</h1>
        <Avatar>
          <AvatarFallback>🙂</AvatarFallback>
        </Avatar>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Погода</CardTitle>
          <CardDescription>Эмодзи-гардероб под текущие условия</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && query.trim()) setCity(query.trim())
              }}
              placeholder="Город"
            />
            <Select value={units} onValueChange={v => setUnits(v as 'metric' | 'imperial')}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Единицы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">°C, м/с</SelectItem>
                <SelectItem value="imperial">°F, mph</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={loading || !query.trim()} onClick={() => setCity(query.trim())}>
              Искать
            </Button>
          </div>

          {isLoading || isFetching ? (
            <WeatherCardSkeleton />
          ) : error ? (
            <Card>
              <CardHeader>
                <CardTitle>Погода</CardTitle>
                <CardDescription>{city}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-destructive">Не удалось загрузить данные</div>
              </CardContent>
            </Card>
          ) : (
            <WeatherCard
              city={data?.name || city}
              temperature={temperature}
              description={condition}
              iconUrl={
                data?.weather?.[0]?.icon
                  ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                  : null
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
