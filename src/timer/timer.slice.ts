import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    running: false,
    elapsedSeconds: 0,
  },
  reducers: {
    startTimer: (state) => {
      state.running = true;
      state.elapsedSeconds = 0;
    },
    stopTimer: (state) => {
      state.running = false;
    },
    tick: (state) => {
      if (state.running) {
        state.elapsedSeconds += 1;
      }
    },
  },
});

export const { startTimer, stopTimer, tick } = timerSlice.actions;
export default timerSlice.reducer;
