import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  city: string
  temperature: string
  description: string
  iconUrl?: string | null
}

export function WeatherCard({ city, temperature, description, iconUrl }: Props) {
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
      </CardContent>
    </Card>
  )
}
