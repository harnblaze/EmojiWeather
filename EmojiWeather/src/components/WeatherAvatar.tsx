import { getClothingEmoji } from '@/utils/clothing'

type Props = {
  weatherData?: {
    main: { temp: number }
    weather: Array<{ main: string; description: string }>
  }
}

export function WeatherAvatar({ weatherData }: Props) {
  const clothingEmoji = weatherData ? getClothingEmoji(weatherData) : '👕'

  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl">🙂</span>
      <span className="text-2xl">{clothingEmoji}</span>
    </div>
  )
}
