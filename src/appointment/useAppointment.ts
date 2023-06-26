import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { Service } from "../types";

export const useAppointment = () => {
  const servicesInAppointment = useSelector<RootState, Service[]>(
    (state) => state.appointment.servicesInAppointment
  );

  return {
    services: servicesInAppointment,
  };
};
