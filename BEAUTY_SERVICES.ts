import {
  CompletionOption,
  ServiceCatalog,
  ServiceType,
} from './src/Types/Types'

export const ServiceIds = {
  MICROBLADING: '1',
  BROW_LAMINATION: '2',
  LASH_LIFT_AND_TINT: '3',
  LASH_EXTENSIONS: '4',
  FACIAL: '5',
}

export const DEFAULT_ORDERING = [
  ServiceIds.MICROBLADING,
  ServiceIds.BROW_LAMINATION,
  ServiceIds.LASH_LIFT_AND_TINT,
  ServiceIds.LASH_EXTENSIONS,
  ServiceIds.FACIAL,
]

export const CATALOG: ServiceCatalog = {
  [ServiceIds.MICROBLADING]: {
    id: ServiceIds.MICROBLADING,
    name: 'Microblading',
    type: ServiceType.BROWS,

    options: [
      {
        steps: [
          {
            description: 'Ink Soak',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Numbing Gel',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Ink Soak',
            duration: 600,
            completesBy: CompletionOption.ANY,
            repeatAfterCompletion: true,
          },
        ],
      },
    ],
  },

  [ServiceIds.BROW_LAMINATION]: {
    id: ServiceIds.MICROBLADING,
    name: 'Brow lamination',
    type: ServiceType.BROWS,
    modifiable: true,
    options: [
      {
        name: 'Very fine brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            completesBy: CompletionOption.ANY,
            duration: 240,
          },
          {
            description: 'Apply Packet #2',
            completesBy: CompletionOption.ANY,
            duration: 300,
          },
          {
            description: 'Apply Tint & Wax Brows',
            completesBy: CompletionOption.ANY,
            duration: 180,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },

      {
        name: 'Fine or tinted brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Natural healthy brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Coarse healthy brows',
        steps: [
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 420,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint & Wax Brows',
            duration: 180,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
    ],
  },

  [ServiceIds.LASH_LIFT_AND_TINT]: {
    id: ServiceIds.LASH_LIFT_AND_TINT,
    type: ServiceType.LASHES,
    name: 'Lash lift + tint',
    modifiable: true,
    options: [
      {
        name: 'Very fine lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Fine or tinted lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Natural healthy lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 480,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
      {
        name: 'Coarse healthy lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Bonder',
            completesBy: CompletionOption.CLICK,
          },
          {
            description: 'Apply Packet #1',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #2',
            duration: 360,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Tint',
            duration: 300,
            completesBy: CompletionOption.ANY,
          },
          {
            description: 'Apply Packet #3',
            completesBy: CompletionOption.CLICK,
          },
        ],
      },
    ],
  },

  [ServiceIds.LASH_EXTENSIONS]: {
    id: ServiceIds.LASH_EXTENSIONS,
    name: 'Lash extensions',
    type: ServiceType.LASHES,
    modifiable: true,
    options: [
      {
        name: 'Lash extensions - Replace Glue',
        steps: [
          {
            description: 'Replace Glue',
            repeatAfterCompletion: true,
            duration: 1200,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
    ],
  },

  [ServiceIds.FACIAL]: {
    id: ServiceIds.FACIAL,
    type: ServiceType.FACIAL,
    name: 'Facial',
    modifiable: false,
    options: [
      {
        steps: [
          {
            description: 'Mask',
            duration: 720,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        steps: [
          {
            description: 'LED Light',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        steps: [
          {
            description: 'Arm rub',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
    ],
  },
}
