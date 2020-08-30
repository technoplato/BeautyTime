import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState, ServiceType } from "../Types";

export const INITIAL_STATE: RootState = { catalog: {}, session: [] };

const sessionFacialSelector = (state) =>
  state.services.find((s) => s.type === ServiceType.FACIAL);

const sessionHasFacial = createSelector(
  sessionFacialSelector,
  (facial) => facial !== null
);

const sessionSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {
    toggleServiceSelected(state, action) {
      const { payload } = action;
      const { browsAndLashes } = state;
      const serviceIndex = browsAndLashes.findIndex(
        (service) => service === payload
      );
      if (serviceIndex === -1) {
        browsAndLashes.push(payload);
      } else {
        browsAndLashes.splice(serviceIndex);
      }
    },
  },
});

export const { toggleServiceSelected } = sessionSlice.actions;

export default sessionSlice.reducer;
