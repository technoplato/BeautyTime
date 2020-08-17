export type Session = {
  services: BeautyService[];
};

export type BeautyService = {
  name: string;
  type: ServiceType;
  modifiable: boolean;
  options: BeautyServiceOption[];
  steps: ServiceStep[];
  setupInstructions?: SetupInstruction[];
};

export type BeautyServiceOption = {
  name: string;
  steps: ServiceStep[];
};

export type ServiceStep = {
  description: string;
  leftRightSeparate: boolean;
  howToComplete: CompletionOption;
  duration?: number;
  repeatAfterCompletion: boolean;
};

export type j = "timer" | "click" | "any";
export enum CompletionOption {
  TIMER,
  CLICK,
  ANY,
}

export enum ServiceType {
  FACIAL,
  BROWS,
  LASHES,
}

export type SetupInstruction = {
  title: string;
};

/**
 * OLD IS BELOW
 */

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
