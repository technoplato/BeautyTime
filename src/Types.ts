export type RootState = {
  catalog: { services: ServiceMap; ordering: string[] };
  session: string[];
};

export type ServiceMap = {
  [name: string]: BeautyService;
};

export type BeautyService = {
  id: string;
  name: string;
  type: ServiceType;
  modifiable?: boolean;
  options: BeautyServiceOption[];
  setupInstructions?: SetupInstruction[];
};

export type BeautyServiceOption = {
  name: string;
  steps: ServiceStep[];
};

export type ServiceStep = {
  description: string;
  howToComplete: CompletionOption;
  duration?: number;
  combineLeftRight?: boolean;
  repeatAfterCompletion?: boolean;
  completed?: boolean;
};

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
