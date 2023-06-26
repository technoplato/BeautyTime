import { ServiceId, Step, StepSegmentProgress } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { useServiceInAppointmentById } from "./useServiceInAppointmentById";

type UseStepForSegmentByServiceIdProps = (
  serviceId: ServiceId,
  segment: "left" | "right" | "both"
) => {
  step?: Step;
  progress: StepSegmentProgress;
};
export const useStepForSegmentByServiceId: UseStepForSegmentByServiceIdProps = (
  serviceId: ServiceId,
  segment: "left" | "right" | "both"
) => {
  const progress = useSelector<RootState, StepSegmentProgress>(
    (state) =>
      // @ts-ignore
      state.appointment.progress.for.service[serviceId].segments[segment]
  )!;
  const service = useServiceInAppointmentById(serviceId)!;
  const step = service.steps[progress.stepIndex];

  return {
    step,
    progress,
  };
};
