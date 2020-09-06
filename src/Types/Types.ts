export type ServiceId = string

export type RootState = {
  catalog: { services: ServiceCatalog; ordering: ServiceId[] }
  session: ServiceId[]
}

export type ServiceCatalog = {
  [id: string]: BeautyService
}

export type BeautyService = {
  id: string
  name: string
  type: ServiceType
  modifiable?: boolean
  options: BeautyServiceOption[]
  setupInstructions?: SetupInstruction[]
}

export type BeautyServiceOption = {
  name: string
  steps: ServiceStep[]
}

export type ServiceStep = {
  description: string
  completesBy: CompletionOption
  duration?: number
  combineLeftRight?: boolean
  repeatAfterCompletion?: boolean
}

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
  title: string
}
