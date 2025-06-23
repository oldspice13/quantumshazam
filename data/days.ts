export interface DayContent {
  id: number;
  title: string;
  description: string;
  level: number;
  element: string;
  sessions: {
    title: string;
    duration: number;
    description: string;
  }[];
  realWorldIntegration: {
    title: string;
    actions: string[];
    impact: number;
  };
  affirmations: string[];
}

export const days: DayContent[] = [
  {
    id: 1,
    title: "Foundation: Earth Awakening",
    description: "Begin your journey by grounding yourself in the quantum field through Earth element practices.",
    level: 1,
    element: "Earth",
    sessions: [
      {
        title: "Earth Grounding Meditation",
        duration: 8,
        description: "Connect with Earth's quantum field through deep grounding meditation."
      },
      {
        title: "Energy Recalibration",
        duration: 3,
        description: "Balance your energy field with Earth's natural frequencies."
      },
      {
        title: "Field Integration",
        duration: 9,
        description: "Integrate Earth's quantum field into your consciousness."
      }
    ],
    realWorldIntegration: {
      title: "Earth Connection Practice",
      actions: [
        "Walk barefoot on natural ground for 10 minutes",
        "Touch and observe a living plant",
        "Practice deep breathing while visualizing Earth's energy"
      ],
      impact: 5
    },
    affirmations: [
      "I am grounded in Earth's quantum field",
      "My energy flows in harmony with Earth's frequencies",
      "I am a conduit for Earth's consciousness"
    ]
  },
  {
    id: 2,
    title: "Foundation: Water Flow",
    description: "Harness the fluid nature of quantum consciousness through Water element practices.",
    level: 1,
    element: "Water",
    sessions: [
      {
        title: "Water Flow Meditation",
        duration: 8,
        description: "Flow with the quantum field like water, adapting and transforming."
      },
      {
        title: "Energy Recalibration",
        duration: 3,
        description: "Balance your energy field with Water's natural frequencies."
      },
      {
        title: "Field Integration",
        duration: 9,
        description: "Integrate Water's quantum field into your consciousness."
      }
    ],
    realWorldIntegration: {
      title: "Water Connection Practice",
      actions: [
        "Drink water mindfully, feeling its energy",
        "Observe water in nature for 10 minutes",
        "Practice fluid movements while visualizing Water's energy"
      ],
      impact: 5
    },
    affirmations: [
      "I flow with the quantum field like water",
      "My consciousness adapts and transforms effortlessly",
      "I am fluid in my quantum manifestations"
    ]
  },
  // ... Add more days following this pattern
]; 