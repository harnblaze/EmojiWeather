import { describe, it, expect } from 'vitest'
import { getClothingEmoji } from '../clothing'
import { testWeatherScenarios } from '../testWeatherData'

describe('Clothing Display Integration Tests', () => {
  it('should display correct winter clothing for Moscow winter', () => {
    const result = getClothingEmoji(testWeatherScenarios.moscowWinter)
    expect(result).toBe('🧥🧣🧤❄️')
  })

  it('should display correct rain gear for London rain', () => {
    const result = getClothingEmoji(testWeatherScenarios.londonRain)
    expect(result).toBe('🧥☔')
  })

  it('should display correct summer clothing for Dubai heat', () => {
    const result = getClothingEmoji(testWeatherScenarios.dubaiHot)
    expect(result).toBe('🩳👒')
  })

  it('should display correct cloudy weather gear for Berlin', () => {
    const result = getClothingEmoji(testWeatherScenarios.berlinCloudy)
    expect(result).toBe('🧥🌫️')
  })

  it('should display correct mild weather clothing for Paris', () => {
    const result = getClothingEmoji(testWeatherScenarios.parisMild)
    expect(result).toBe('👕')
  })

  it('should display correct tropical rain gear for Singapore', () => {
    const result = getClothingEmoji(testWeatherScenarios.singaporeTropical)
    expect(result).toBe('🩳👒☔')
  })

  it('should handle all test scenarios without errors', () => {
    const scenarios = Object.values(testWeatherScenarios)

    scenarios.forEach(scenario => {
      expect(() => getClothingEmoji(scenario)).not.toThrow()
      const result = getClothingEmoji(scenario)
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })
})
