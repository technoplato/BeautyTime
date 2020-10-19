export type ServiceId = string

// export type RootState = {
//   all: ServiceCatalog
//   selected: SelectedServices
//   ordering: ServiceId[]
// }

export type SelectedServices = {
  [id: string]: BeautyService
}

export type ServiceCatalog = {
  [id: string]: BeautyCatalogItem
}

export type BeautyCatalogItem = {
  id: string
  name: string
  type: ServiceType
  modifiable?: boolean
  options: BeautyServiceOption[]
  setupInstructions?: SetupInstruction[]
}

export type BeautyService = {
  id: string
  name: string
  type: ServiceType
  modifiable?: boolean
  option: BeautyServiceOption
  optionApproved: boolean
  setupInstructions?: SetupInstruction[]
}

export type BeautyServiceOption = {
  name?: string
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
