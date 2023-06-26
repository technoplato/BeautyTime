export type ServiceId = string;

export type Service = {
  id: ServiceId;
  name: ServiceName;
  steps: Step[];
  // Given the step selected, the programmer will
  // index into the variants array to get the list of seconds each
  // individual step should run for
  variants: ServiceVariant[];
  // If this service has been selected to be in the current appointment
  inCurrentAppointment?: boolean;
  completed?: boolean;
};

export type ServiceVariant = {
  name: string;
  durations: number[];
  brand: ProductBrand;
  active?: boolean;
};

export const ServiceNames = {
  lashLiftAndTint: "Lash lift + tint",
  browLamination: "Brow lamination",
} as const;

export type ServiceName = typeof ServiceNames[keyof typeof ServiceNames];

export type ServiceBrandMap = {
  [key in ServiceName]: ProductBrand;
};

export type AppointmentProgressTracker = {
  for: {
    service: {
      [serviceId: ServiceId]: {
        segments: StepProgress;
        multi?: StepProgress[];
      };
    };
  };
};

export type Step = {
  title: string;
  completed?: boolean;
};
export type RightAndLeftProgress = {
  right: StepSegmentProgress;
  left: StepSegmentProgress;
};
export type StepProgress = RightAndLeftProgress;

export type StepSegmentProgress = {
  remainingSeconds: number;
  status: "idle" | "running" | "completed" | "terminal";
  stepIndex: number;
  hasNextStep: boolean;
};

export type LeftOrRight = "left" | "right";

export type Client = {
  id: string;
  name: string;
  lashShieldNote: string;
  notes: string;
  lastServices: Service[];
};

export const ProductBrands = {
  BeautifulBrowsAndLashes: "Beautiful Brows and Lashes",
  SarahMaxwell: "Sarah Maxwell",
  ElleeplexProFusion: "Elleeplex PROFUSION" /*brow lamination*/,
} as const;

export type ProductBrand = typeof ProductBrands[keyof typeof ProductBrands];
