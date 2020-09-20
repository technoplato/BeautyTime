import {
  createSlice,
  createSelector,
  OutputSelector,
} from '@reduxjs/toolkit'
import {
  BeautyService,
  RootState,
  ServiceCatalog,
  ServiceId,
  ServiceSelections,
  ServiceType,
} from '../Types/Types'
import {
  CATALOG,
  DEFAULT_ORDERING,
} from '../../BEAUTY_SERVICES'

export const INITIAL_STATE: RootState = {
  catalog: {
    ordering: DEFAULT_ORDERING,
    services: CATALOG,
  },
  session: {},
}

const selectSession = state => state.session
const selectServices = createSelector<
  RootState,
  ServiceSelections,
  BeautyService[]
>(selectSession, session =>
  Object.keys(session).map(id => CATALOG[id]),
)

export const selectNextService = createSelector<
  RootState,
  ServiceSelections,
  BeautyService[],
  string
>([selectSession, selectServices], (session, services) => {
  return services
    .filter(service => service.modifiable)
    .map(service => service.id)
    .find(id => session[id] === null)
})

type NextButtonStatus = {
  text: string
  enabled: boolean
}

export const selectNextButtonStatus = createSelector<
  RootState,
  BeautyService[],
  NextButtonStatus
>(selectServices, services => {
  const noSelections = services.length === 0

  const noModifiableServices = !services.some(
    service => service.modifiable,
  )

  if (noSelections) {
    return {
      enabled: false,
      text: 'Please Select at Least One Service',
    }
  } else if (noModifiableServices) {
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

const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_STATE.session,
  reducers: {
    toggleServiceSelected(state, action) {
      const {
        payload: { id },
      } = action
      const service = state[id]
      if (service) {
        delete state[id]
      } else {
        state[id] = {}
      }
    },
  },
})

export const {
  toggleServiceSelected,
} = sessionSlice.actions

export default sessionSlice.reducer
