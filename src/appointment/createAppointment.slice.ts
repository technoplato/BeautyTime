import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppointmentProgressTracker,
  Client,
  LeftOrRight,
  ProductBrand,
  Service,
  ServiceBrandMap,
  ServiceId,
  ServiceName,
  ServiceVariant,
  StepProgress,
  StepSegmentProgress,
} from "../types";
import { tick } from "../timer/timer.slice";
import { initialServiceBrandMap } from "../catalog/defaultServices";

const DEBUG = false;

const initialState = {
  client: {} as Client,
  servicesInAppointment: [] as Service[],
  serviceBrandMap: initialServiceBrandMap,
  progress: {
    for: {
      service: {},
    },
  } as AppointmentProgressTracker,
} as const;

type ToggleVariant = {
  serviceId: ServiceId;
  variantName: string;
};

const createAppointmentSlice = createSlice({
  name: "createAppointment",
  initialState,
  reducers: {
    setClientForAppointment: (state, action: PayloadAction<Client>) => {
      const client = action.payload;
      const lastServices = client.lastServices;

      const lastBrandsUsedOnClient: ServiceBrandMap = lastServices.reduce(
        (acc, service) => ({
          ...acc,
          [service.name]: service.variants.find((variant) => variant.active)
            ?.brand,
        }),
        {} as ServiceBrandMap
      );

      state.serviceBrandMap = lastBrandsUsedOnClient;

      state.client = client;

      state.servicesInAppointment = lastServices.map((service) => {
        const hasNextStep = service.steps.length > 1;

        const durationForVariant = service.variants.find(
          (variant) => variant.active
        )!.durations[0];

        const defaultSegmentProgress: StepSegmentProgress = {
          remainingSeconds: durationForVariant,
          hasNextStep,
          status: "idle",
          stepIndex: 0,
        };

        const segmentKeys = ["left", "right"];
        const segments = segmentKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: defaultSegmentProgress,
          }),
          {} as { [key in LeftOrRight]: StepProgress }
        );

        state.progress.for.service[service.id] = {
          // @ts-ignore
          segments,
        };

        return {
          ...service,
          inCurrentAppointment: true,
        };
      });
    },

    updateClientForAppointment: (state, action: PayloadAction<Client>) => {
      const client = action.payload;
      state.client = client;
    },

    toggleBrandForService: (
      state,
      action: PayloadAction<{ serviceName: ServiceName; brand: ProductBrand }>
    ) => {
      const { serviceName, brand } = action.payload;
      state.serviceBrandMap[serviceName] = brand;
    },

    toggleServiceInAppointment: (state, action: PayloadAction<Service>) => {
      const service = action.payload;
      const wasInAppointment = service.inCurrentAppointment;

      if (wasInAppointment) {
        state.servicesInAppointment = state.servicesInAppointment.filter(
          (s) => s.id !== service.id
        );
        delete state.progress.for.service[service.id];
        delete state.serviceBrandMap[service.name];
      } else {
        state.servicesInAppointment.push({
          ...service,
          inCurrentAppointment: true,
        });

        const hasNextStep = service.steps.length > 1;

        const defaultSegmentProgress: StepSegmentProgress = {
          remainingSeconds: -1,
          hasNextStep,
          status: "idle",
          stepIndex: 0,
        };

        const segmentKeys = ["left", "right"];
        const segments = segmentKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: defaultSegmentProgress,
          }),
          {} as { [key in LeftOrRight]: StepProgress }
        );

        state.progress.for.service[service.id] = {
          // @ts-ignore
          segments,
        };

        // Default to the first brand for simplicity
        state.serviceBrandMap[service.name] = service.variants[0].brand;
      }
    },
    toggleVariantInAppointmentForService: (
      state,
      action: PayloadAction<ToggleVariant>
    ) => {
      const { serviceId, variantName } = action.payload;

      const service: Service = state.servicesInAppointment.find(
        (service) => service.id === serviceId
      )!;
      const variant: ServiceVariant = service.variants.find(
        (variant) => variant.name === variantName
      )!;

      const variantIsNowSelected = !variant.active;
      service.variants = service.variants.map((v) => {
        if (v.name === variantName) {
          return { ...v, active: !v.active };
        } else {
          return { ...v, active: false };
        }
      });

      if (variantIsNowSelected) {
        const defaultStepIndex = 0;
        const seconds = DEBUG ? 5 : variant.durations[defaultStepIndex];
        const defaultSegmentProgress: StepSegmentProgress = {
          remainingSeconds: seconds,
          status: "idle",
          stepIndex: defaultStepIndex,
          hasNextStep: true,
        };
        const segmentKeys = ["left", "right"];
        const segments = segmentKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: defaultSegmentProgress,
          }),
          {} as { [key in LeftOrRight]: StepProgress }
        );

        state.progress.for.service[service.id] = {
          // @ts-ignore
          segments,
        };
      }
    },
    serviceStepSegmentPressed: (
      state,
      action: PayloadAction<{
        serviceId: ServiceId;
        leftOrRight?: LeftOrRight;
      }>
    ) => {
      const { serviceId, leftOrRight } = action.payload;

      let segmentKey: LeftOrRight | "both";
      let tappedSegmentProgress: StepSegmentProgress;

      const segments = state.progress.for.service[serviceId].segments;
      segmentKey = leftOrRight as LeftOrRight;
      tappedSegmentProgress = segments[segmentKey as LeftOrRight];
      const { status, stepIndex } = tappedSegmentProgress;

      switch (status) {
        case "idle":
          tappedSegmentProgress.status = "running";
          break;
        case "running":
        /* Intentional fall through - running and completed case are identical */
        case "completed":
          // If the user clicks the segment while running or completed,
          // check if the service is complete and if it is, mark the service
          // as complete. Otherwise, mark the segment as completed and move
          // to the next step
          const service = state.servicesInAppointment.find(
            (service) => service.id === serviceId
          )!;

          const otherSide = segmentKey === "left" ? "right" : "left";
          const otherSideSegment: StepSegmentProgress = segments[otherSide];
          const isOtherSegmentComplete = otherSideSegment.status === "terminal";

          const isSegmentComplete = service.steps.length - 1 === stepIndex;

          const isServiceComplete = isOtherSegmentComplete && isSegmentComplete;

          if (isSegmentComplete) {
            tappedSegmentProgress = {
              status: "terminal",
              remainingSeconds: 0,
              stepIndex,
              hasNextStep: false,
            };

            if (isServiceComplete) {
              service.completed = true;
            }
          } else {
            const stepIncrement = 1;
            const nextStepIndex = stepIndex + stepIncrement;
            const activeVariant = service.variants.find((v) => v.active)!;
            const nextStepSeconds = DEBUG
              ? 5
              : activeVariant.durations[nextStepIndex];
            tappedSegmentProgress = {
              status: "idle",
              remainingSeconds: nextStepSeconds,
              stepIndex: nextStepIndex,
              hasNextStep: nextStepIndex < service.steps.length - 1,
            };
          }
      }

      // @ts-ignore
      state.progress.for.service[serviceId].segments[segmentKey] =
        tappedSegmentProgress;
    },

    markServiceAsComplete: (state, action: PayloadAction<ServiceId>) => {
      const service = state.servicesInAppointment.find(
        (service) => service.id === action.payload
      )!;
      service.completed = true;
      // Mark all progress related to the service as complete as well
      const segments = state.progress.for.service[service.id].segments;
      const segmentKeys = Object.keys(segments) as LeftOrRight[];
      segmentKeys.forEach((key) => {
        // @ts-ignore
        const segment = segments[key];
        segment.status = "terminal";
        segment.remainingSeconds = 0;
        segment.hasNextStep = false;
        segment.stepIndex = service.steps.length - 1;
      });
    },

    addSecondsToService: (
      state,
      action: PayloadAction<{ serviceId: ServiceId; seconds: number }>
    ) => {
      const { serviceId, seconds } = action.payload;

      const serviceProgress = state.progress.for.service[serviceId];
      const segmentKeys = Object.keys(
        serviceProgress.segments
      ) as LeftOrRight[];
      segmentKeys.forEach((key) => {
        const segment = serviceProgress.segments[key];
        if (segment.status === "running") {
          segment.remainingSeconds += seconds;
        }
      });
    },

    resetSelection: (state) => {
      // state.servicesInAppointment = [] as Service[];
      // state.progress.for.service = {};
      // state.serviceBrandMap = initialServiceBrandMap;
      state.servicesInAppointment = initialState.servicesInAppointment;
      state.progress = initialState.progress;
      state.serviceBrandMap = initialState.serviceBrandMap;
      state.client = initialState.client;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tick, (state) => {
      // On every tick, we need to update the progress of all services
      // that are in the 'running' status
      Object.keys(state.progress.for.service).forEach((serviceId) => {
        const serviceProgress = state.progress.for.service[serviceId];
        Object.keys(serviceProgress.segments).forEach((segmentKey) => {
          // @ts-ignore
          const stepProgress = serviceProgress.segments[segmentKey];
          if (stepProgress.status === "running") {
            stepProgress.remainingSeconds -= 1;
            if (stepProgress.remainingSeconds === 0) {
              stepProgress.status = "completed";
            }
          }
        });
      });
    });
  },
});

export const {
  setClientForAppointment,
  updateClientForAppointment,
  toggleServiceInAppointment,
  toggleBrandForService,
  toggleVariantInAppointmentForService,
  serviceStepSegmentPressed,
  markServiceAsComplete,
  resetSelection,
  addSecondsToService,
} = createAppointmentSlice.actions;

export default createAppointmentSlice.reducer;
