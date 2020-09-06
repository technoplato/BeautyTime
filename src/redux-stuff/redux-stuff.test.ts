import servicesReducer, { toggleServiceSelected } from './serviceSlice'
import { DEFAULT_SERVICES } from '../../BEAUTY_SERVICES'
import { RootState, ServiceId } from '../Types/Types'

describe('Session reducer', () => {
  describe('when a service is selected', () => {
    it('should be added to the session', () => {
      const initialState: ServiceId[] = []

      const serviceClicked = '1'
      expect(
        servicesReducer(initialState, toggleServiceSelected(serviceClicked)),
      ).toEqual([serviceClicked])
    })

    it('should be removed from the session', () => {
      const serviceId = '1'
      const initialState: ServiceId[] = [serviceId]

      expect(
        servicesReducer(initialState, toggleServiceSelected(serviceId)),
      ).toEqual([])
    })
  })

  describe('The next button should update be disabled if no selections are made', () => {
    const services = []
    const nextButtonStatus = selectNextButtonStatus(services)

    expect(nextButtonStatus).toEqual({ text: null, enabled: false })
  })

  describe('Beauty Services', () => {
    describe('Microblading', () => {
      it('should not allow modifications', () => {
        const microblading = Object.values(DEFAULT_SERVICES).find(
          service => service.name === 'Microblading',
        )

        expect(microblading.modifiable).toBeFalsy()
        expect(microblading.options.length).toBe(1)
      })
    })

    describe('Brow laminations', () => {
      it('Should allow configurations', () => {
        const browLamination = Object.values(DEFAULT_SERVICES).find(
          service => service.name === 'Brow lamination',
        )

        expect(browLamination.modifiable).toBeTruthy()
        expect(browLamination.options.length).toBeGreaterThan(1)
      })
    })
  })
})
