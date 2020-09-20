import servicesReducer, {
  toggleServiceSelected,
  selectNextButtonStatus,
  INITIAL_STATE,
  selectNextService,
} from './serviceSlice'

import { CATALOG, ServiceIds } from '../../BEAUTY_SERVICES'
import {
  BeautyService,
  RootState,
  ServiceId,
  ServiceSelections,
} from '../Types/Types'

describe('Session reducer', () => {
  describe('when a service is selected', () => {
    it('should be added to the session', () => {
      const initialState: ServiceSelections = {}

      const id = '1'
      expect(
        servicesReducer(
          initialState,
          toggleServiceSelected({
            id,
          }),
        ),
      ).toEqual({ [id]: {} })
    })

    it('should be removed from the session', () => {
      const id = '1'
      const initialState: ServiceSelections = { [id]: {} }

      expect(
        servicesReducer(
          initialState,
          toggleServiceSelected({ id }),
        ),
      ).toEqual({})
    })
  })

  describe('Next Button', () => {
    it('should be disabled and have the correct text with no services selected', () => {
      const session = {}
      const state: RootState = { ...INITIAL_STATE, session }

      const nextButtonStatus = selectNextButtonStatus(state)

      expect(nextButtonStatus).toEqual({
        text: 'Please Select at Least One Service',
        enabled: false,
      })
    })

    it('should say start session if only Micbroblading is selected', () => {
      const session = {
        [ServiceIds.MICROBLADING]: undefined,
      }
      const state: RootState = { ...INITIAL_STATE, session }

      const nextButtonStatus = selectNextButtonStatus(state)

      expect(nextButtonStatus).toEqual({
        text: 'Start Session',
        enabled: true,
      })
    })

    it('should select the correct next service to configure', () => {
      const session = {
        [ServiceIds.MICROBLADING]: null,
        [ServiceIds.LASH_EXTENSIONS]: null,
      }
      const state: RootState = { ...INITIAL_STATE, session }

      const nextService = selectNextService(state)

      expect(nextService).toEqual(
        ServiceIds.LASH_EXTENSIONS,
      )
    })

    it('selectNextServices should return undefined if no more services need selections', () => {
      const session = {
        [ServiceIds.MICROBLADING]: null,
        [ServiceIds.LASH_EXTENSIONS]:
          CATALOG[ServiceIds.LASH_EXTENSIONS].options[0],
      }
      const state: RootState = { ...INITIAL_STATE, session }

      const nextService = selectNextService(state)

      expect(nextService).toEqual(undefined)
    })
  })

  describe('Beauty Services', () => {
    describe('Microblading', () => {
      it('should not allow modifications', () => {
        const microblading = Object.values(CATALOG).find(
          service => service.name === 'Microblading',
        )

        expect(microblading.modifiable).toBeFalsy()
        expect(microblading.options.length).toBe(1)
      })
    })

    describe('Brow laminations', () => {
      it('Should allow configurations', () => {
        const browLamination = Object.values(CATALOG).find(
          service => service.name === 'Brow lamination',
        )

        expect(browLamination.modifiable).toBeTruthy()
        expect(
          browLamination.options.length,
        ).toBeGreaterThan(1)
      })
    })
  })
})
