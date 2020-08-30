import { CompletionOption, ServiceMap, ServiceType } from "./src/Types";
// Everything has a manual next button
// Everything that is currenetly set at 5 seconds does not show time (find more elegant solution)
// Clicking next goes to the next step for both sides

const ORDERING = [1, 2, 3, 4, 5];

const ALL_SERVICES: ServiceMap = {
  1: {
    id: "1",
    name: "Microblading",
    type: ServiceType.BROWS,

    options: [
      {
        name: "default",
        steps: [
          {
            description: "Ink Soak",
            duration: 600,
            howToComplete: CompletionOption.ANY,
          },
          {
            description: "Numbing Gel",
            duration: 600,
            howToComplete: CompletionOption.ANY,
          },
          {
            description: "Ink Soak",
            duration: 600,
            howToComplete: CompletionOption.ANY,
            repeatAfterCompletion: true,
          },
        ],
      },
    ],
  },
  2: {
    id: "2",
    name: "Brow lamination",
    type: ServiceType.BROWS,
    modifiable: true,
    options: [
      {
        name: "Very fine brows",
        steps: [
          {
            description: "Apply Bonder",
            howToComplete: CompletionOption.CLICK,
          },
          {
            description: "Apply Packet #1",
            howToComplete: CompletionOption.ANY,
            duration: 240,
          },
          {
            description: "Apply Packet #2",
            howToComplete: CompletionOption.ANY,
            duration: 300,
          },
          {
            description: "Apply Tint & Wax Brows",
            howToComplete: CompletionOption.ANY,
            duration: 180,
          },
          {
            description: "Apply Packet #3",
            howToComplete: CompletionOption.CLICK,
          },
        ],
      },
    ],
  },
};
// 2: {
//   id: "2",
//   name: "Brow lamination",
//   type: ServiceType.BROWS,
//
//   singleOption: true,
//   leftRight: true,
//   options: [
//     {
//       name: "Very fine brows",
//       selected: false,
//       steps: [
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 240 },
//         { name: "Apply Packet #2", seconds: 300 },
//         { name: "Apply Tint & Wax Brows", seconds: 180 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Fine or tinted brows",
//       selected: false,
//       steps: [
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 300 },
//         { name: "Apply Packet #2", seconds: 300 },
//         { name: "Apply Tint & Wax Brows", seconds: 180 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Natural healthy brows",
//       selected: false,
//       steps: [
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 360 },
//         { name: "Apply Packet #2", seconds: 360 },
//         { name: "Apply Tint & Wax Brows", seconds: 180 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Coarse healthy brows",
//       selected: false,
//       steps: [
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 420 },
//         { name: "Apply Packet #2", seconds: 360 },
//         { name: "Apply Tint & Wax Brows", seconds: 180 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//   ],
// },
//
// "lash lift + tint": {
//   index: 2,
//   completed: false,
//   selected: false,
//   name: "Lash lift + tint",
//   singleOption: true,
//   leftRight: true,
//   options: [
//     {
//       name: "Very fine lashes",
//       selected: false,
//       steps: [
//         {
//           name: "Apply Undereye Pads",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 300 },
//         { name: "Apply Packet #2", seconds: 300 },
//         { name: "Apply Tint", seconds: 300 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Fine or tinted lashes",
//       selected: false,
//       steps: [
//         {
//           name: "Apply Undereye Pads",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 360 },
//         { name: "Apply Packet #2", seconds: 300 },
//         { name: "Apply Tint", seconds: 300 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Natural healthy lashes",
//       selected: false,
//       steps: [
//         {
//           name: "Apply Undereye Pads",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 480 },
//         { name: "Apply Packet #2", seconds: 360 },
//         { name: "Apply Tint", seconds: 300 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//     {
//       name: "Coarse healthy lashes",
//       selected: false,
//       steps: [
//         {
//           name: "Apply Undereye Pads",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//         { name: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
//         { name: "Apply Packet #1", seconds: 600 },
//         { name: "Apply Packet #2", seconds: 360 },
//         { name: "Apply Tint", seconds: 300 },
//         {
//           name: "Apply Packet #3",
//           seconds: 0,
//           modifier: HIDE_TIME_MODIFIER,
//         },
//       ],
//     },
//   ],
// },
// "lash extensions": {
//   index: 3,
//   completed: false,
//   selected: false,
//   name: "Lash extensions",
//   leftRight: false,
//   singleOption: true,
//   options: [
//     {
//       name: "Lash extensions - Replace Glue",
//       selected: true,
//       isDefault: true,
//       steps: [
//         {
//           name: "Replace Glue",
//           modifier: REPEAT_UNTIL_DONE_MODIFIER,
//           seconds: 1200,
//         },
//       ],
//     },
//   ],
// },
// facial: {
//   index: 4,
//   completed: false,
//   selected: false,
//   leftRight: false,
//   name: "Facial",
//   options: [
//     {
//       name: "Mask",
//       selected: false,
//       steps: [{ name: "Mask", seconds: 720 }],
//     },
//     {
//       name: "LED Light",
//       selected: false,
//       steps: [{ name: "LED Light", seconds: 600 }],
//     },
//     {
//       name: "Complete Session",
//       selected: false,
//       steps: [{ name: "Complete Session", seconds: 3600 }],
//     },
//   ],
//   singleOption: false,
// },
// };

export default ALL_SERVICES;
