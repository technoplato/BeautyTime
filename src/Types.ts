export type BeautyService = {
  title: string;
  selected: boolean;
  index: number;
  options?: BeautyServiceOption[];
  // True if only one single option can be selected
  singleOption: boolean;
  defaultOptions?: BeautyServiceOption[];
  // Indicates whether a separate timer is needed for left and right side
  leftRight: boolean;
};

export type BeautyServiceOption = {
  title: string;
  // Times that must run in the order they are in the array
  sequential: Timing[];
  selected: boolean;
};

export type Timing = {
  title: string;
  seconds: number;
};

export const REPEAT_UNTIL_DONE_SIGNIFIER = "*";
