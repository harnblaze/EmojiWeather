import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getClothingEmoji } from '@/utils/clothing'

type Props = {
  city: string
  temperature: string
  description: string
  iconUrl?: string | null
  weatherData?: {
    main: { temp: number }
    weather: Array<{ main: string; description: string }>
  }
}

export function WeatherCard({ city, temperature, description, iconUrl, weatherData }: Props) {
  const clothingEmoji = weatherData ? getClothingEmoji(weatherData) : '👕'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Погода</CardTitle>
        <CardDescription>{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {iconUrl ? (
            <img src={iconUrl} alt={description} className="h-16 w-16" />
          ) : (
            <div className="h-16 w-16" />
          )}
          <div className="space-y-1">
            <div className="text-3xl font-semibold leading-none tracking-tight">{temperature}</div>
            <div className="text-sm text-muted-foreground capitalize">{description || '—'}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="text-sm text-muted-foreground">Рекомендуемая одежда</div>
          <div className="text-2xl mt-1">{clothingEmoji}</div>
        </div>
      </CardContent>
    </Card>
  )
}
