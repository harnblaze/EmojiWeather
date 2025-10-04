type WeatherData = {
  main: {
    temp: number
  }
  weather: Array<{
    main: string
    description: string
  }>
}

export function getClothingEmoji(weather: WeatherData): string {
  const temp = weather.main.temp
  const weatherMain = weather.weather[0]?.main.toLowerCase() || ''
  const weatherDesc = weather.weather[0]?.description.toLowerCase() || ''

  let clothing = ''

  // Основная одежда по температуре
  if (temp < 0) {
    clothing = '🧥🧣🧤' // Зимняя одежда
  } else if (temp >= 0 && temp < 15) {
    clothing = '🧥' // Куртка
  } else if (temp >= 15 && temp < 25) {
    clothing = '👕' // Футболка
  } else if (temp >= 25) {
    clothing = '🩳👒' // Летняя одежда
  }

  // Дополнительные аксессуары по погоде
  if (weatherMain === 'rain' || weatherDesc.includes('rain') || weatherDesc.includes('дождь')) {
    clothing += '☔' // Зонт
  }

  if (weatherMain === 'snow' || weatherDesc.includes('snow') || weatherDesc.includes('снег')) {
    clothing += '❄️' // Снежинка
  }

  if (weatherMain === 'clouds' && temp < 15) {
    clothing += '🌫️' // Туман/облачность
  }

  return clothing || '👕' // Дефолт - футболка
}
