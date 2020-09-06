import {
  CompletionOption,
  ServiceCatalog,
  ServiceType,
} from './src/Types/Types'
// Clicking next goes to the next step for both sides

const ORDERING = [1, 2, 3, 4, 5]

const ALL_SERVICES: ServiceCatalog = {
  1: {
    id: '1',
    name: 'Microblading',
    type: ServiceType.BROWS,

    options: [
      {
        name: 'default',
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

  2: {
    id: '2',
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

  3: {
    id: '3',
    name: 'Brow lamination',
    type: ServiceType.BROWS,

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
            duration: 240,
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
        name: 'Fine or tinted brows',
        steps: [
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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

  4: {
    id: '4',
    type: ServiceType.LASHES,
    name: 'Lash lift + tint',
    options: [
      {
        name: 'Very fine lashes',
        steps: [
          {
            description: 'Apply Undereye Pads',
            completesBy: CompletionOption.CLICK,
          },
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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
          { description: 'Apply Bonder', completesBy: CompletionOption.CLICK },
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

  5: {
    id: '5',
    name: 'Lash extensions',
    type: ServiceType.LASHES,
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

  6: {
    id: '6',
    type: ServiceType.FACIAL,
    name: 'Facial',
    options: [
      {
        name: 'Mask',
        steps: [
          {
            description: 'Mask',
            duration: 720,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        name: 'LED Light',
        steps: [
          {
            description: 'LED Light',
            duration: 600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
      {
        name: 'Complete Session',
        steps: [
          {
            description: 'Complete Session',
            duration: 3600,
            completesBy: CompletionOption.ANY,
          },
        ],
      },
    ],
  },
}

export default ALL_SERVICES
