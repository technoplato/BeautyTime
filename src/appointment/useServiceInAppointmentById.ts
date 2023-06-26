import { Service, ServiceId } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../../App";

type UseServiceInAppointmentById = (serviceId: ServiceId) => Service;
export const useServiceInAppointmentById: UseServiceInAppointmentById = (
  serviceId: ServiceId
) => {
  return useSelector<RootState, Service>(
    (state) =>
      state.appointment.servicesInAppointment.find((s) => s.id === serviceId)!
  );
};
