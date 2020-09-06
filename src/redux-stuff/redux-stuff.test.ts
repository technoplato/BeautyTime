import servicesReducer, {
  toggleServiceSelected,
  INITIAL_STATE,
} from './serviceSlice'
import services from '../../BEAUTY_SERVICES'

describe('Getting started with Redux', () => {
  describe('services reducer', () => {
    it('should return the default state', () => {
      expect(servicesReducer(undefined, {})).toEqual(INITIAL_STATE)
    })
  })

  describe('Beauty Services', () => {
    describe('Microblading', () => {
      it('should not allow modifications', () => {
        const microblading = Object.values(services).find(
          service => service.name === 'Microblading',
        )

        expect(microblading.modifiable).toBeFalsy()
        expect(microblading.options.length).toBe(1)
      })
    })

    describe('Brow laminations', () => {
      it('Should allow configurations', () => {
        const browLaminations = Object.values(services).find(
          service => service.name === 'Brow lamination',
        )

        expect(browLaminations.modifiable).toBeTruthy()
        expect(browLaminations.options.length).toBeGreaterThan(1)
      })
    })
  })
})
