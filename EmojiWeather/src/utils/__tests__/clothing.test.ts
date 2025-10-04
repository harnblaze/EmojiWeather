import { describe, it, expect } from 'vitest'
import { getClothingEmoji } from '../clothing'

describe('getClothingEmoji', () => {
  it('should return winter clothing for negative temperatures', () => {
    const weatherData = {
      main: { temp: -5 },
      weather: [{ main: 'Snow', description: 'light snow' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥🧣🧤❄️')
  })

  it('should return jacket for cold temperatures (0-15°C)', () => {
    const weatherData = {
      main: { temp: 10 },
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥🌫️')
  })

  it('should return t-shirt for moderate temperatures (15-25°C)', () => {
    const weatherData = {
      main: { temp: 20 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('👕')
  })

  it('should return summer clothing for hot temperatures (25°C+)', () => {
    const weatherData = {
      main: { temp: 30 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🩳👒')
  })

  it('should add umbrella for rain', () => {
    const weatherData = {
      main: { temp: 18 },
      weather: [{ main: 'Rain', description: 'moderate rain' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('👕☔')
  })

  it('should add umbrella for rain in Russian description', () => {
    const weatherData = {
      main: { temp: 12 },
      weather: [{ main: 'Rain', description: 'дождь' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥☔')
  })

  it('should add snowflake for snow', () => {
    const weatherData = {
      main: { temp: 5 },
      weather: [{ main: 'Snow', description: 'снег' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥❄️')
  })

  it('should add fog emoji for cloudy cold weather', () => {
    const weatherData = {
      main: { temp: 8 },
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥🌫️')
  })

  it('should combine multiple weather conditions', () => {
    const weatherData = {
      main: { temp: -2 },
      weather: [{ main: 'Snow', description: 'heavy snow' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('🧥🧣🧤❄️')
  })

  it('should return default t-shirt for unknown weather', () => {
    const weatherData = {
      main: { temp: 22 },
      weather: [{ main: 'Unknown', description: 'unknown weather' }],
    }

    const result = getClothingEmoji(weatherData)
    expect(result).toBe('👕')
  })

  it('should handle edge cases at temperature boundaries', () => {
    // Exactly 0°C
    const weatherData1 = {
      main: { temp: 0 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
    }
    expect(getClothingEmoji(weatherData1)).toBe('🧥')

    // Exactly 15°C
    const weatherData2 = {
      main: { temp: 15 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
    }
    expect(getClothingEmoji(weatherData2)).toBe('👕')

    // Exactly 25°C
    const weatherData3 = {
      main: { temp: 25 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
    }
    expect(getClothingEmoji(weatherData3)).toBe('🩳👒')
  })
})
