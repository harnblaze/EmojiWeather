import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WeatherCard } from '@/components/WeatherCard'
import { testWeatherScenarios } from '@/utils/testWeatherData'

export function WeatherTestPanel() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)

  const scenarios = [
    { key: 'moscowWinter', label: 'Москва (зима, снег)' },
    { key: 'londonRain', label: 'Лондон (дождь)' },
    { key: 'dubaiHot', label: 'Дубай (жара)' },
    { key: 'berlinCloudy', label: 'Берлин (облачно)' },
    { key: 'parisMild', label: 'Париж (умеренно)' },
    { key: 'singaporeTropical', label: 'Сингапур (тропический дождь)' },
  ]

  const currentData = selectedScenario
    ? testWeatherScenarios[selectedScenario as keyof typeof testWeatherScenarios]
    : null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Тестирование погодных условий</CardTitle>
        <CardDescription>Выберите сценарий для проверки отображения</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {scenarios.map(scenario => (
            <Button
              key={scenario.key}
              variant={selectedScenario === scenario.key ? 'default' : 'outline'}
              onClick={() => setSelectedScenario(scenario.key)}
              className="text-sm"
            >
              {scenario.label}
            </Button>
          ))}
        </div>

        {currentData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Предварительный просмотр:</h3>
            <WeatherCard
              city={currentData.name}
              temperature={`${Math.round(currentData.main.temp)}°C`}
              description={currentData.weather[0].description}
              iconUrl={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
              weatherData={currentData}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
