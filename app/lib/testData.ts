export const TEST_DATA = {
  coherenceStreak: {
    days: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: true,
      coherenceLevel: 100,
      notes: 'Test completion',
    })),
    isEligibleForDissolution: true,
  },
  egoDissolution: {
    isCompleted: false,
    purgeData: {
      fears: 'Test fears content...',
      beliefs: 'Test beliefs content...',
      memories: 'Test memories content...',
      name: 'Test Old Self',
    },
  },
  godselfDebate: {
    isUnlocked: false,
    lastSession: null,
  },
};

// Development mode helper
export const DEV_MODE = {
  skipCoherenceStreak: true,
  skipEgoDissolution: false,
  enableTestData: true,
}; 