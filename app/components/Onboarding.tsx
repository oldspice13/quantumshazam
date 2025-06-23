import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';

interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { showToast } = useToast();

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to Godself Debate Chamber",
      description: "Let's get you started with your transformative journey.",
      component: (
        <div className="space-y-4">
          <p>This platform helps you engage in meaningful dialogue with your higher self.</p>
          <p>You'll learn to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Challenge limiting beliefs</li>
            <li>Track your transformation</li>
            <li>Document evidence of change</li>
            <li>Build your desired identity</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Define Your Identity",
      description: "Let's start by understanding your current and desired identity.",
      component: (
        <div className="space-y-4">
          <p>Take a moment to reflect on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Who you are now</li>
            <li>Who you want to become</li>
            <li>What's holding you back</li>
            <li>What traits you want to develop</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Voice Integration",
      description: "Learn how to use voice features for deeper dialogue.",
      component: (
        <div className="space-y-4">
          <p>You can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Record your thoughts and questions</li>
            <li>Listen to AI responses</li>
            <li>Save important insights</li>
            <li>Track your progress</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Evidence Tracking",
      description: "Learn how to document your transformation.",
      component: (
        <div className="space-y-4">
          <p>Track your progress by:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Recording real-world evidence</li>
            <li>Documenting synchronicities</li>
            <li>Measuring impact</li>
            <li>Celebrating breakthroughs</li>
          </ul>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      showToast({
        title: "Onboarding Complete!",
        description: "You're ready to begin your journey.",
        type: "success",
      });
      // Handle completion
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          <Progress value={(currentStep / (steps.length - 1)) * 100} />

          <div className="min-h-[200px]">
            {steps[currentStep].component}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 