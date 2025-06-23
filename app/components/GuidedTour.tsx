import React, { useEffect } from 'react';
// @ts-ignore
import Shepherd from 'shepherd.js';
import type { StepOptions } from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: 'shepherd-theme-custom',
    scrollTo: true,
    cancelIcon: {
      enabled: true
    }
  }
});

const steps: StepOptions[] = [
  {
    id: 'welcome',
    text: [
      'Welcome to your Quantum Consciousness Journey!',
      'This app is designed to help you develop and strengthen your connection with the quantum field through daily practices and real-world applications.',
      'Let\'s explore how each component works together to support your growth.'
    ].join('\n\n'),
    attachTo: {
      element: 'body',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Start Tour',
        action: tour.next
      }
    ]
  },
  {
    id: 'daily-content',
    text: [
      'This is your daily content area, where you\'ll find everything you need for today\'s practice.',
      'Each day is carefully structured to build upon your previous experiences, creating a powerful foundation for your quantum consciousness journey.',
      'The content is organized into distinct sections that work together to create a complete practice.'
    ].join('\n\n'),
    attachTo: {
      element: '.daily-content',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  },
  {
    id: 'consciousness-sessions',
    text: [
      'Your consciousness sessions are the foundation of your practice.',
      'These guided meditations are designed to help you connect with the quantum field and develop your awareness. Each session builds specific aspects of your quantum consciousness:',
      '• Field Connection: Strengthens your link to the quantum field\n• Energy Work: Develops your ability to work with quantum energy\n• Integration: Helps you apply your expanded awareness in daily life'
    ].join('\n\n'),
    attachTo: {
      element: '.consciousness-sessions',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  },
  {
    id: 'real-world-integration',
    text: [
      'Real-world integration is where theory meets practice.',
      'These exercises help you apply your quantum consciousness in your daily life. They\'re designed to:',
      '• Create tangible manifestations of your quantum awareness\n• Strengthen your connection through practical application\n• Build evidence of your growing abilities\n• Develop confidence in your quantum consciousness'
    ].join('\n\n'),
    attachTo: {
      element: '.real-world-integration',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  },
  {
    id: 'evidence-upload',
    text: [
      'Documenting your journey is crucial for growth and validation.',
      'The evidence upload section allows you to:',
      '• Record photos and videos of your manifestations\n• Document synchronicities and quantum field interactions\n• Track your progress over time\n• Build confidence through tangible proof of your abilities',
      'This documentation helps strengthen your connection to the quantum field and provides valuable insights into your development.'
    ].join('\n\n'),
    attachTo: {
      element: '.evidence-upload',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  },
  {
    id: 'concepts-guide',
    text: [
      'Understanding the concepts is key to your success.',
      'The "Learn More" button provides detailed explanations of:',
      '• The quantum field and how it works\n• Consciousness sessions and their purpose\n• Real-world integration techniques\n• Evidence collection and its importance',
      'You can access this guide anytime you need clarification or want to deepen your understanding.'
    ].join('\n\n'),
    attachTo: {
      element: '.concepts-guide',
      on: 'auto'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Finish',
        action: tour.complete
      }
    ]
  }
];

export function GuidedTour() {
  useEffect(() => {
    // Add steps to the tour
    steps.forEach(step => tour.addStep(step));

    // Start the tour if it's the user's first visit
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      tour.start();
      localStorage.setItem('hasSeenTour', 'true');
    }

    return () => {
      tour.complete();
    };
  }, []);

  return null;
} 