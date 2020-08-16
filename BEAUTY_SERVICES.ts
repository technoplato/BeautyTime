import {
  Service,
  REPEAT_UNTIL_DONE_MODIFIER,
  HIDE_TIME_MODIFIER
} from "./src/Types";
// Everything has a manual next button
// Everything that is currenetly set at 5 seconds does not show time (find more elegant solution)
// Clicking next goes to the next step for both sides

const ALL_SERVICES: Service[] = [
  {
    index: 0,
    completed: false,
    selected: false,
    title: "Microblading",
    singleOption: true,
    leftRight: false,
    options: [
      {
        title: "Microblading Ink and Numbing Gel",
        selected: true,
        isDefault: true,
        steps: [
          {
            title: "Ink Soak",
            seconds: 600
          },
          {
            title: "Numbing Gel",
            seconds: 600
          },
          {
            title: "Ink Soak",
            seconds: 600,
            modifier: REPEAT_UNTIL_DONE_MODIFIER
          }
        ]
      }
    ]
  },
  {
    index: 1,
    completed: false,
    selected: false,
    title: "Brow lamination",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine brows",
        selected: false,
        steps: [
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 240 },
          { title: "Apply Packet #2", seconds: 300 },
          { title: "Apply Tint & Wax Brows", seconds: 180 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Fine or tinted brows",
        selected: false,
        steps: [
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 300 },
          { title: "Apply Packet #2", seconds: 300 },
          { title: "Apply Tint & Wax Brows", seconds: 180 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Natural healthy brows",
        selected: false,
        steps: [
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 360 },
          { title: "Apply Packet #2", seconds: 360 },
          { title: "Apply Tint & Wax Brows", seconds: 180 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Coarse healthy brows",
        selected: false,
        steps: [
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 420 },
          { title: "Apply Packet #2", seconds: 360 },
          { title: "Apply Tint & Wax Brows", seconds: 180 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      }
    ]
  },

  {
    index: 2,
    completed: false,
    selected: false,
    title: "Lash lift + tint",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine lashes",
        selected: false,
        steps: [
          {
            title: "Apply Undereye Pads",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          },
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 300 },
          { title: "Apply Packet #2", seconds: 300 },
          { title: "Apply Tint", seconds: 300 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Fine or tinted lashes",
        selected: false,
        steps: [
          {
            title: "Apply Undereye Pads",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          },
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 360 },
          { title: "Apply Packet #2", seconds: 300 },
          { title: "Apply Tint", seconds: 300 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Natural healthy lashes",
        selected: false,
        steps: [
          {
            title: "Apply Undereye Pads",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          },
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 480 },
          { title: "Apply Packet #2", seconds: 360 },
          { title: "Apply Tint", seconds: 300 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      },
      {
        title: "Coarse healthy lashes",
        selected: false,
        steps: [
          {
            title: "Apply Undereye Pads",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          },
          { title: "Apply Bonder", seconds: 0, modifier: HIDE_TIME_MODIFIER },
          { title: "Apply Packet #1", seconds: 600 },
          { title: "Apply Packet #2", seconds: 360 },
          { title: "Apply Tint", seconds: 300 },
          {
            title: "Apply Packet #3",
            seconds: 0,
            modifier: HIDE_TIME_MODIFIER
          }
        ]
      }
    ]
  },
  {
    index: 3,
    completed: false,
    selected: false,
    title: "Lash extensions",
    leftRight: false,
    singleOption: true,
    options: [
      {
        title: "Lash extensions - Replace Glue",
        selected: true,
        isDefault: true,
        steps: [
          {
            title: "Replace Glue",
            modifier: REPEAT_UNTIL_DONE_MODIFIER,
            seconds: 1200
          }
        ]
      }
    ]
  },
  {
    index: 4,
    completed: false,
    selected: false,
    leftRight: false,
    title: "Facial",
    options: [
      {
        title: "Mask",
        selected: false,
        steps: [{ title: "Mask", seconds: 720 }]
      },
      {
        title: "LED Light",
        selected: false,
        steps: [{ title: "LED Light", seconds: 600 }]
      },
      {
        title: "Complete Session",
        selected: false,
        steps: [{ title: "Complete Session", seconds: 3600 }]
      }
    ],
    singleOption: false
  }
];

export default ALL_SERVICES;
