export interface DayContent {
  id: number;
  title: string;
  description: string;
  sessions: {
    title: string;
    duration: number;
    description: string;
  }[];
  realWorldIntegration: {
    title: string;
    actions: {
      id: string;
      description: string;
      impact: string;
    }[];
    impact: string;
  };
  affirmations: string[];
}

export const days: DayContent[] = [
  {
    id: 1,
    title: "Quantum Awakening",
    description: "Begin your journey into quantum consciousness and self-discovery.",
    sessions: [
      {
        title: "Quantum Field Meditation",
        duration: 900, // 15 minutes
        description: "Connect with your higher self and open your quantum field"
      },
      {
        title: "Consciousness Expansion",
        duration: 600, // 10 minutes
        description: "Expand your awareness beyond physical limitations"
      }
    ],
    realWorldIntegration: {
      title: "Field Awareness",
      actions: [
        {
          id: "1",
          description: "Observe synchronicities in your daily life",
          impact: "Strengthen your connection to the quantum field"
        },
        {
          id: "2",
          description: "Practice conscious intention setting",
          impact: "Begin manifesting your desired reality"
        }
      ],
      impact: "Develop awareness of quantum field interactions"
    },
    affirmations: [
      "I am a conscious creator of my reality",
      "My quantum field is expanding and strengthening",
      "I am connected to the infinite possibilities of the universe"
    ]
  },
  {
    id: 2,
    title: "Field Resonance",
    description: "Deepen your connection with the quantum field and explore resonance patterns.",
    sessions: [
      {
        title: "Quantum Resonance Meditation",
        duration: 1200, // 20 minutes
        description: "Harmonize your energy field with universal consciousness"
      },
      {
        title: "Field Synchronization",
        duration: 900, // 15 minutes
        description: "Align your personal field with the quantum field"
      }
    ],
    realWorldIntegration: {
      title: "Resonance Practice",
      actions: [
        {
          id: "1",
          description: "Practice conscious intention setting",
          impact: "Strengthen your ability to manifest"
        },
        {
          id: "2",
          description: "Observe field interactions in relationships",
          impact: "Develop deeper quantum connections"
        }
      ],
      impact: "Enhance your ability to create resonant fields"
    },
    affirmations: [
      "I am in perfect resonance with the quantum field",
      "My intentions create powerful waves of manifestation",
      "I am a master of quantum field interactions"
    ]
  }
]; 