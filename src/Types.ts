export type BeautyService = {
  title: string;
  selected: boolean;
  index: number;
  options?: BeautyServiceOption[];
  // True if only one single option can be selected
  singleOption: boolean;
  // Indicates whether a separate timer is needed for left and right side
  leftRight: boolean;
  completed: boolean;
  partialCompletion?: object;
  // Some services require the user to press a button to end the service.
  // Allow force will be true when that button should be shown.
  allowForce?: boolean;
};

export type BeautyServiceOption = {
  title: string;
  // Times that must run in the order they are in the array
  sequential: Timing[];
  selected: boolean;
  isDefault?: boolean;
};

export type Timing = {
  title: string;
  seconds: number;
};

export const REPEAT_UNTIL_DONE_SIGNIFIER = "*";
