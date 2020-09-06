import { createSlice, createSelector } from '@reduxjs/toolkit'
import {
  RootState,
  ServiceCatalog,
  ServiceId,
  ServiceType,
} from '../Types/Types'
import { DEFAULT_SERVICES, DEFAULT_ORDERING } from '../../BEAUTY_SERVICES'

export const INITIAL_STATE: RootState = {
  catalog: { ordering: DEFAULT_ORDERING, services: DEFAULT_SERVICES },
  session: [],
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_STATE.session,
  reducers: {
    toggleServiceSelected(state, action) {
      const { payload } = action
      const serviceIndex = state.findIndex(service => {
        return service === payload
      })
      if (serviceIndex === -1) {
        state.push(payload)
      } else {
        state.splice(serviceIndex)
      }
    },
  },
})

export const { toggleServiceSelected } = sessionSlice.actions

export default sessionSlice.reducer
