import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import { startTimer, stopTimer } from "../timer/timer.slice";
import { useEffect } from "react";
import { secondsToTimeString } from "../utilities/formatTime";

export const useAppointmentTime = () => {
  const dispatch = useDispatch();
  const elapsedAppointmentTime = useSelector<RootState, number>(
    (state) => state.timer.elapsedSeconds
  );

  const stop = () => {
    dispatch(stopTimer());
  };

  const start = () => {
    dispatch(startTimer());
  };

  useEffect(() => {
    start();

    // return stop;
  }, []);

  return {
    stop,
    elapsedTime: secondsToTimeString(elapsedAppointmentTime),
  };
};
