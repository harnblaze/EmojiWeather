// Тестовые данные для проверки различных погодных условий

export const testWeatherScenarios = {
  // Зимние условия
  moscowWinter: {
    name: 'Moscow',
    main: { temp: -5, humidity: 85 },
    weather: [{ main: 'Snow', description: 'light snow', icon: '13d' }],
    wind: { speed: 3.2 },
  },

  // Дождливая погода
  londonRain: {
    name: 'London',
    main: { temp: 12, humidity: 90 },
    weather: [{ main: 'Rain', description: 'moderate rain', icon: '10d' }],
    wind: { speed: 4.5 },
  },

  // Жаркая погода
  dubaiHot: {
    name: 'Dubai',
    main: { temp: 38, humidity: 45 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 2.1 },
  },

  // Прохладная облачная погода
  berlinCloudy: {
    name: 'Berlin',
    main: { temp: 8, humidity: 75 },
    weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
    wind: { speed: 3.8 },
  },

  // Умеренная погода
  parisMild: {
    name: 'Paris',
    main: { temp: 18, humidity: 65 },
    weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
    wind: { speed: 2.5 },
  },

  // Тропический дождь
  singaporeTropical: {
    name: 'Singapore',
    main: { temp: 28, humidity: 95 },
    weather: [{ main: 'Rain', description: 'heavy rain', icon: '09d' }],
    wind: { speed: 5.2 },
  },
}

// Функция для получения тестовых данных по городу
export function getTestWeatherData(cityName: string) {
  const scenarios = Object.values(testWeatherScenarios)
  return scenarios.find(scenario => scenario.name.toLowerCase() === cityName.toLowerCase()) || null
}
