export type Service = {
  title: string;
  selected: boolean;
  index: number;
  options?: Option[];
  // True if only one single option can be selected
  singleOption: boolean;
  // Indicates whether a separate timer is needed for left and right side
  leftRight: boolean;
  completed: boolean;
  partialCompletion?: object;
};

export type Option = {
  title: string;
  // Times that must run in the order they are in the array
  steps: Step[];
  selected: boolean;
  isDefault?: boolean;
};

export type Step = {
  title: string;
  seconds: number;
  completed?: boolean;
  modifier?: string;
};

// Any more and this needs to become an enum or something
export const REPEAT_UNTIL_DONE_MODIFIER = "*";
export const HIDE_TIME_MODIFIER = "**";
