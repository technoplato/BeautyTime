import { createSelector, createSlice } from '@reduxjs/toolkit'
import {
  BeautyCatalogItem,
  BeautyService,
  BeautyServiceOption,
  CompletionOption,
  SelectedServices,
  ServiceCatalog,
  ServiceType,
} from '../Types/Types'
import { RootState } from './reducers'
import { ServiceIds } from '../../BEAUTY_SERVICES'

export const selectCatalog = (state: RootState) => state.services.all
export const selectSession = (state: RootState): SelectedServices =>
  state.services.selected

export const selectNextServiceToConfigure = createSelector<
  RootState,
  SelectedServices,
  BeautyService | null
>(selectSession, session => {
  const beautyServices = Object.keys(session)
    .sort()
    .map(id => session[id])
  const found = beautyServices.find(
    service => service.modifiable && !service.optionApproved,
  )
  return found
})

type NextButtonStatus = {
  text: string
  enabled: boolean
}

export const selectNextButtonStatus = createSelector<
  RootState,
  SelectedServices,
  NextButtonStatus
>(selectSession, servicesMap => {
  const ids = Object.keys(servicesMap)
  const noSelections = ids.length === 0
  const services = ids.sort().map(id => servicesMap[id])

  const noUnconfiguredServices = !services.find(
    service => service.option === null,
  )

  if (noSelections) {
    return {
      enabled: false,
      text: 'Please Select at Least One Service',
    }
  } else if (noUnconfiguredServices) {
    return {
      enabled: true,
      text: 'Start Session',
    }
  } else {
    return {
      enabled: true,
      text: 'NEXT: Select Options for Services',
    }
  }
})

export const mapCatalogToServiceItem = ({
  modifiable,
  options,
  id,
  name,
  setupInstructions,
  type,
}: BeautyCatalogItem) => {
  const option: BeautyServiceOption = options[0]
  const service: BeautyService = {
    modifiable,
    option,
    id,
    name,
    setupInstructions,
    type,
    optionApproved: !modifiable,
  }
  return service
}

export const DEFAULT_ORDERING = [
  ServiceIds.MICROBLADING,
  ServiceIds.BROW_LAMINATION,
  ServiceIds.LASH_LIFT_AND_TINT,
  ServiceIds.LASH_EXTENSIONS,
  ServiceIds.FACIAL,
]
export const DEFAULT_SELECTED = {}

export const CATALOG: ServiceCatalog = {
  [ServiceIds.MICROBLADING]: {
    id: ServiceIds.MICROBLADING,
    name: 'Microblading',
    type: ServiceType.BROWS,
    modifiable: false,
    options: [
      {
        steps: [
          {
            description: 'Ink Soak',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Numbing Gel',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Ink Soak',
            duration: 600,
            completesBy: CompletionOption.ANY,
            repeatAfterCompletion: true,
          },
        ],
      },
    ],
  },

  [ServiceIds.BROW_LAMINATION]: {
    id: ServiceIds.MICROBLADING,
    name: 'Brow lamination',
    type: ServiceType.BROWS,
    modifiable: true,
    options: [
      {
        name: 'Very fine brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            completesBy: CompletionOption.ANY,
            duration: 240,
          },
          {
            description: 'Apply Packet #2',
            completesBy: CompletionOption.ANY,
            duration: 300,
          },
          {
            description: 'Apply Tint & Wax Brows',
            completesBy: CompletionOption.ANY,
            duration: 180,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },

      {
        name: 'Fine or tinted brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Natural healthy brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Coarse healthy brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 420,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
    ],
  },

  [ServiceIds.LASH_LIFT_AND_TINT]: {
    id: ServiceIds.LASH_LIFT_AND_TINT,
    type: ServiceType.LASHES,
    name: 'Lash lift + tint',
    modifiable: true,
    options: [
      {
        name: 'Very fine lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Fine or tinted lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Natural healthy lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 480,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Coarse healthy lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
    ],
  },

  [ServiceIds.LASH_EXTENSIONS]: {
    id: ServiceIds.LASH_EXTENSIONS,
    name: 'Lash extensions',
    type: ServiceType.LASHES,
    modifiable: true,
    options: [
      {
        name: 'Lash extensions - Replace Glue',
        steps: [
          {
            description: 'Replace Glue',
            repeatAfterCompletion: true,
            duration: 1200,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
    ],
  },

  [ServiceIds.FACIAL]: {
    id: ServiceIds.FACIAL,
    type: ServiceType.FACIAL,
    name: 'Facial',
    modifiable: false,
    options: [
      {
        steps: [
          {
            description: 'Mask',
            duration: 720,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        steps: [
          {
            description: 'LED Light',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        steps: [
          {
            description: 'Arm rub',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
    ],
  },
}

export type ServicesState = {
  all: ServiceCatalog
  selected: SelectedServices
}

export const INITIAL_SERVICE_STATE: ServicesState = {
  all: CATALOG,
  selected: DEFAULT_SELECTED,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState: INITIAL_SERVICE_STATE,
  reducers: {
    toggleService(state, { payload: { id } }) {
      const catalog = state.all
      const session = state.selected
      const service = session[id]

      if (service) {
        delete session[id]
      } else {
        const service: BeautyCatalogItem = catalog[id]
        session[id] = mapCatalogToServiceItem(service)
      }
    },

    chooseOption(state, action) {
      // const {
      //   payload: { serviceId, optionName },
      // } = action
      //
      // state[serviceId] = CATALOG[serviceId].options.find(
      //   option => option.name === optionName,
      // )
    },
  },
})

export const { toggleService, chooseOption } = servicesSlice.actions

export default servicesSlice.reducer
