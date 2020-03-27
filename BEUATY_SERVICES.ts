import { BeautyService, REPEAT_UNTIL_DONE_SIGNIFIER } from "./src/Types";

const ALL_SERVICES: BeautyService[] = [
  {
    index: 0,
    selected: false,
    title: "Microblading",
    singleOption: true,
    leftRight: false,
    defaultOptions: [
      {
        title: "",
        selected: true,
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
    ]
  },
  {
    index: 1,
    selected: false,
    title: "Brow lamination",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine brows",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 240 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 60 }
        ]
      },
      {
        title: "Fine or tinted brows",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 300 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 120 }
        ]
      },
      {
        title: "Natural healthy brows",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 360 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 180 }
        ]
      },
      {
        title: "Coarse healthy brows",
        selected: false,
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
    selected: false,
    title: "Lash lift + tint",
    singleOption: true,
    leftRight: true,
    options: [
      {
        title: "Very fine lashes",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 300 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 180 }
        ]
      },
      {
        title: "Fine or tinted lashes",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 360 },
          { title: "Step 2 of 3", seconds: 300 },
          { title: "Step 3 of 3", seconds: 240 }
        ]
      },
      {
        title: "Natural healthy lashes",
        selected: false,
        sequential: [
          { title: "Step 1 of 3", seconds: 480 },
          { title: "Step 2 of 3", seconds: 360 },
          { title: "Step 3 of 3", seconds: 300 }
        ]
      },
      {
        title: "Coarse healthy lashes",
        selected: false,
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
    selected: false,
    title: "Lash extensions",
    leftRight: false,
    singleOption: true,
    defaultOptions: [
      {
        title: "",
        selected: true,
        sequential: [
          { title: "Replace Glue", seconds: 1200 },
          { title: REPEAT_UNTIL_DONE_SIGNIFIER, seconds: 0 }
        ]
      }
    ]
  },
  {
    index: 4,
    selected: false,
    leftRight: false,
    title: "Facial",
    options: [
      {
        title: "Mask",
        selected: false,
        sequential: [{ title: "Mask", seconds: 720 }]
      },
      {
        title: "LED Light",
        selected: false,
        sequential: [{ title: "LED Light", seconds: 600 }]
      },
      {
        title: "Complete Session",
        selected: false,
        sequential: [{ title: "Complete Session", seconds: 3600 }]
      }
    ],
    singleOption: false
  }
];

export default ALL_SERVICES;
