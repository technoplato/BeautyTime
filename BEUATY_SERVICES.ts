import { BeautyService, REPEAT_UNTIL_DONE_SIGNIFIER } from "./src/Types";

const ALL_SERVICES: BeautyService[] = [
  {
    index: 0,
    activeOptions: [],
    selected: false,
    title: "Microblading",
    singleOption: true,
    leftRight: false,
    sequential: [
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
        seconds: 600
      },
      {
        title: REPEAT_UNTIL_DONE_SIGNIFIER,
        seconds: 600
      }
    ]
  },
  {
    index: 1,
    activeOptions: [],
    selected: false,
    title: "Brow lamination",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine brows",
        sequential: [
          { title: "Step 1 of 3", seconds: 240 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 60 }
        ]
      },
      {
        title: "Fine or tinted brows",
        sequential: [
          { title: "Step 1 of 3", seconds: 300 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 120 }
        ]
      },
      {
        title: "Natural healthy brows",
        sequential: [
          { title: "Step 1 of 3", seconds: 360 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 180 }
        ]
      },
      {
        title: "Coarse healthy brows",
        sequential: [
          { title: "Step 1 of 3", seconds: 420 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 180 }
        ]
      }
    ]
  },
  {
    index: 2,
    activeOptions: [],
    selected: false,
    title: "Lash lift + tint",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine lashes",
        sequential: [
          { title: "Step 1 of 3", seconds: 300 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 180 }
        ]
      },
      {
        title: "Fine or tinted lashes",
        sequential: [
          { title: "Step 1 of 3", seconds: 360 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 240 }
        ]
      },
      {
        title: "Natural healthy lashes",
        sequential: [
          { title: "Step 1 of 3", seconds: 480 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 300 }
        ]
      },
      {
        title: "Coarse healthy lashes",
        sequential: [
          { title: "Step 1 of 3", seconds: 600 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 300 }
        ]
      }
    ]
  },
  {
    index: 3,
    activeOptions: [],
    selected: false,
    title: "Lash extensions",
    leftRight: true,
    singleOption: true,
    sequential: [
      { title: "Replace Glue", seconds: 1200 },
      { title: REPEAT_UNTIL_DONE_SIGNIFIER, seconds: 0 }
    ]
  },
  {
    index: 4,
    activeOptions: [],
    selected: false,
    leftRight: false,
    title: "Facial",
    options: [
      {
        title: "Mask",
        sequential: [{ title: "Mask", seconds: 720 }]
      },
      {
        title: "LED Light",
        sequential: [{ title: "LED Light", seconds: 600 }]
      },
      {
        title: "Complete Session",
        sequential: [{ title: "Complete Session", seconds: 3600 }]
      }
    ],
    singleOption: false,
    sequential: [
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
        seconds: 600
      },
      {
        title: REPEAT_UNTIL_DONE_SIGNIFIER,
        seconds: 600
      }
    ]
  }
];

export default ALL_SERVICES;
