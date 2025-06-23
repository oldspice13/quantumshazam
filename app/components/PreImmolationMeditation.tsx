import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/sounds';

interface MeditationStep {
  id: string;
  title: string;
  duration: number;
  instruction: string;
  sound?: string;
}

const MEDITATION_STEPS: MeditationStep[] = [
  {
    id: 'breath',
    title: 'Centering Breath',
    duration: 60,
    instruction: 'Take three deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.',
    sound: 'breath',
  },
  {
    id: 'acknowledge',
    title: 'Acknowledge the Old Self',
    duration: 120,
    instruction: 'Acknowledge the patterns and beliefs that have served their purpose. Thank them for their service.',
    sound: 'acknowledge',
  },
  {
    id: 'release',
    title: 'Release Attachment',
    duration: 120,
    instruction: 'Feel the weight of these patterns. Visualize them as chains that you are ready to release.',
    sound: 'release',
  },
  {
    id: 'prepare',
    title: 'Prepare for Transformation',
    duration: 60,
    instruction: 'Feel the space that will be created. The void that will be filled with your new self.',
    sound: 'prepare',
  },
];

export function PreImmolationMeditation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const step = MEDITATION_STEPS[currentStep];
    setTimeRemaining(step.duration);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (currentStep < MEDITATION_STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
          } else {
            setIsActive(false);
            onComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, isActive, onComplete]);

  const startMeditation = () => {
    setIsActive(true);
    soundManager.play('meditation-start');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-2">
            Pre-Immolation Meditation
          </h2>
          <p className="text-muted-foreground">
            Prepare your mind and body for the transformation ahead.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {MEDITATION_STEPS[currentStep].title}
              </h3>
              <p className="text-muted-foreground">
                {MEDITATION_STEPS[currentStep].instruction}
              </p>
            </div>

            {isActive && (
              <div className="space-y-2">
                <Progress
                  value={
                    (timeRemaining /
                      MEDITATION_STEPS[currentStep].duration) *
                    100
                  }
                />
                <p className="text-center text-2xl font-mono">
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {!isActive && (
          <div className="flex justify-center">
            <Button
              onClick={startMeditation}
              size="lg"
              className="w-full max-w-xs"
            >
              Begin Meditation
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
} 