import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useWeatherQuery } from '@/api/weather'

function App() {
  const [city, setCity] = useState('Moscow')
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setCoords({ lat: 55.7558, lon: 37.6173 }) // Москва по умолчанию
    )
  }, [])

  const { data, isLoading } = useWeatherQuery(coords?.lat ?? null, coords?.lon ?? null)

  const temperature = data?.current_weather?.temperature
    ? units === 'metric'
      ? `${Math.round(data.current_weather.temperature)}°C`
      : `${Math.round((data.current_weather.temperature * 9) / 5 + 32)}°F`
    : '—'
  const wind = data?.current_weather?.windspeed
    ? units === 'metric'
      ? `${Math.round(data.current_weather.windspeed)} m/s`
      : `${Math.round(data.current_weather.windspeed * 2.237)} mph`
    : '—'
  const condition = '—'
  const humidity = '—'

  const outfitEmoji = '🧥🧢' // пример: прохладно и дождь

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
            <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Город" />
            <Select value={units} onValueChange={v => setUnits(v as 'metric' | 'imperial')}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Единицы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">°C, м/с</SelectItem>
                <SelectItem value="imperial">°F, mph</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={isLoading}>Обновить</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Температура</div>
              <div className="text-2xl font-medium">{temperature}</div>
              <div className="text-sm text-muted-foreground">{condition}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Ветер</div>
              <div className="text-xl font-medium">{wind}</div>
              <div className="text-sm text-muted-foreground">Влажность {humidity}</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-sm text-muted-foreground">Рекомендуемая одежда</div>
            <div className="text-3xl">{outfitEmoji}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
