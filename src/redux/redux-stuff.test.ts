import { produce } from 'immer'

import servicesReducer, {
  INITIAL_SERVICE_STATE,
  mapCatalogToServiceItem,
  selectCatalog,
  selectNextButtonStatus,
  selectNextServiceToConfigure,
  ServicesState,
  toggleService,
} from './serviceSlice'

import { ServiceIds } from '../../BEAUTY_SERVICES'
import {
  BeautyService,
  SelectedServices,
  ServiceId,
} from '../Types/Types'
import { RootState } from './reducers'

export const INITIAL_STATE = { services: INITIAL_SERVICE_STATE }

describe('Service reducer', () => {
  describe('when a service is selected', () => {
    it('should be added to the session', () => {
      const id: ServiceId = ServiceIds.MICROBLADING
      const actual: ServicesState = servicesReducer(
        INITIAL_SERVICE_STATE,
        toggleService({
          id,
        }),
      )
      expect(actual.selected[id]).toBeDefined()
    })

    it('should be removed from the session', () => {
      const id: ServiceId = ServiceIds.MICROBLADING
      const microblading = selectCatalog(INITIAL_STATE)[id]

      const stateWithMicroblading = produce(
        INITIAL_SERVICE_STATE,
        draft => {
          draft.selected[id] = mapCatalogToServiceItem(microblading)
        },
      )
      const actual: ServicesState = servicesReducer(
        stateWithMicroblading,
        toggleService({
          id,
        }),
      )
      expect(actual.selected[id]).not.toBeDefined()
    })
  })

  describe('Next Button', () => {
    it('should be disabled and have the correct text with no services selected', () => {
      const nextButtonStatus = selectNextButtonStatus(INITIAL_STATE)

      expect(nextButtonStatus).toEqual({
        text: 'Please Select at Least One Service',
        enabled: false,
      })
    })

    it('should say start session if only Micbroblading is selected', () => {
      const id: ServiceId = ServiceIds.MICROBLADING
      const microblading = selectCatalog(INITIAL_STATE)[id]
      const stateWithMicroblading = produce(INITIAL_STATE, draft => {
        draft.services.selected[id] = mapCatalogToServiceItem(
          microblading,
        )
      })
      const nextButtonStatus = selectNextButtonStatus(
        stateWithMicroblading,
      )

      expect(nextButtonStatus).toEqual({
        text: 'Start Session',
        enabled: true,
      })
    })

    function makeStateWithSelections(
      ids: ServiceId[],
      mockApproveAction = false,
    ) {
      const selected: SelectedServices = ids
        .map(id => selectCatalog(INITIAL_STATE)[id])
        .map(mapCatalogToServiceItem)
        .reduce((selected, service) => {
          selected[service.id] = {
            ...service,
            optionApproved: mockApproveAction,
          }

          return selected
        }, {})
      const state: RootState = produce(INITIAL_STATE, draft => {
        draft.services.selected = selected
      })
      return state
    }

    it('should select the correct next service to configure', () => {
      const stateWithSelections = makeStateWithSelections([
        ServiceIds.MICROBLADING,
        ServiceIds.LASH_EXTENSIONS,
      ])

      const nextService = selectNextServiceToConfigure(
        stateWithSelections,
      )
      expect(nextService).toEqual(
        stateWithSelections.services.selected[
          ServiceIds.LASH_EXTENSIONS
        ],
      )
    })

    it('selectNextServices should return undefined if no more services need selections', () => {
      const mockApproveOption = true
      const stateWithSelections = makeStateWithSelections(
        [ServiceIds.MICROBLADING, ServiceIds.LASH_EXTENSIONS],
        mockApproveOption,
      )

      const nextService = selectNextServiceToConfigure(
        stateWithSelections,
      )

      expect(nextService).toEqual(undefined)
    })
  })

  describe('Beauty Services', () => {
    describe('Microblading', () => {
      it('should not allow modifications', () => {
        const microblading = selectCatalog(INITIAL_STATE)[
          ServiceIds.MICROBLADING
        ]

        expect(microblading.modifiable).toBeFalsy()
        expect(microblading.options.length).toBe(1)
      })
    })

    describe('Brow laminations', () => {
      it('Should allow configurations', () => {
        const browLamination = selectCatalog(INITIAL_STATE)[
          ServiceIds.BROW_LAMINATION
        ]

        expect(browLamination.modifiable).toBeTruthy()
        expect(browLamination.options.length).toBeGreaterThan(1)
      })
    })
  })

  describe('Beauty Catalog Mapper', () => {
    it('should map modifiable catalog items', () => {
      const modifiableService = selectCatalog(INITIAL_STATE)[
        ServiceIds.LASH_EXTENSIONS
      ]
      const expectedMappedService: BeautyService = {
        id: modifiableService.id,
        name: modifiableService.name,
        type: modifiableService.type,
        setupInstructions: modifiableService.setupInstructions,
        option: modifiableService.options[0],
        modifiable: true,
        optionApproved: false,
      }

      const actualMappedService = mapCatalogToServiceItem(
        modifiableService,
      )

      expect(actualMappedService).toStrictEqual(expectedMappedService)
    })

    it('should map non-modifiable catalog items', () => {
      const nonModifiableService = selectCatalog(INITIAL_STATE)[
        ServiceIds.MICROBLADING
      ]

      const expectedMappedService: BeautyService = {
        id: nonModifiableService.id,
        name: nonModifiableService.name,
        type: nonModifiableService.type,
        setupInstructions: nonModifiableService.setupInstructions,
        option: nonModifiableService.options[0],
        modifiable: false,
        optionApproved: true,
      }

      const actualMappedService = mapCatalogToServiceItem(
        nonModifiableService,
      )

      expect(actualMappedService).toStrictEqual(expectedMappedService)
    })
  })
})
