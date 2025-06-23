"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TutorialStep {
  title: string;
  description: string;
  example?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Your Godself Debate Chamber",
    description: "This is a sacred space for transformative dialogue with your higher self. Here, you'll engage in profound conversations that help you transcend limitations and discover your true potential.",
  },
  {
    title: "Starting Your Dialogue",
    description: "Begin by sharing a limitation or challenge you're facing. Be honest and specific about what's holding you back.",
    example: "I feel stuck in my career and afraid to make changes."
  },
  {
    title: "Understanding the Energy Level",
    description: "Each response from your Godself comes with an energy level indicator. Higher energy (more green) suggests more transformative insights. Pay attention to responses that resonate deeply with you.",
  },
  {
    title: "Tracking Progress",
    description: "The progress bar at the top shows your transformation journey. Each meaningful exchange increases your progress. Don't rush - focus on the quality of your dialogue.",
  },
  {
    title: "Capturing Insights",
    description: "Key insights from your dialogue appear at the bottom. These are profound realizations worth reflecting on. You can save them to your journal for later review.",
  },
  {
    title: "Regular Practice",
    description: "For best results, engage with your Godself regularly. Start with 5-10 minute sessions and build up to longer dialogues as you become more comfortable.",
  }
];

export const GodselfTutorial: React.FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Tutorial Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{tutorialSteps[currentStep].title}</h3>
        <p className="text-muted-foreground">{tutorialSteps[currentStep].description}</p>
        
        {tutorialSteps[currentStep].example && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Example:</p>
            <p className="text-sm italic">{tutorialSteps[currentStep].example}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
        >
          {currentStep === tutorialSteps.length - 1 ? 'Begin Your Journey' : 'Next'}
        </Button>
      </div>
    </Card>
  );
}; 