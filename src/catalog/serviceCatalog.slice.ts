import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialServicesCatalog } from "./defaultServices";
import { Service } from "../types";

const initialState = {
  services: initialServicesCatalog,
  /*
   * Services that a user may have archived from their collection.
   */
  archivedServices: [] as Array<Service>,
} as const;

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    editService: (state, action: PayloadAction<Service>) => {
      // Replace the current instance of the service with the new one
      state.services = state.services.map((service) =>
        service.id === action.payload.id ? action.payload : service
      );
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    archiveService: (state, action: PayloadAction<Service>) => {
      // Remove the service from the catalog
      state.services = state.services.filter(
        (service) => service.id !== action.payload.id
      );
      // Add the service to the archive
      state.archivedServices.push(action.payload);
    },
  },
});

export const { editService, addService, archiveService } = catalogSlice.actions;

export default catalogSlice.reducer;
