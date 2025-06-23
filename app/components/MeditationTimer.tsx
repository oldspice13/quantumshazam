"use client"

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  onComplete: () => void;
}

export const MeditationTimer: React.FC<TimerProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsComplete(true);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(300);
    setIsComplete(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((300 - timeLeft) / 300) * 100;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Meditation Timer</h3>
        <p className="text-muted-foreground">
          Prepare your mind for the Godself dialogue
        </p>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-mono mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isActive && timeLeft > 0 && !isComplete && (
            <Button onClick={handleStart}>
              Start Meditation
            </Button>
          )}
          {isActive && (
            <Button variant="outline" onClick={handlePause}>
              Pause
            </Button>
          )}
          {!isActive && timeLeft < 300 && (
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>

        {isComplete && (
          <div className="text-center space-y-2">
            <p className="text-green-500 font-medium">
              Meditation Complete
            </p>
            <p className="text-sm text-muted-foreground">
              Your mind is now prepared for the Godself dialogue
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Meditation Guide</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Find a quiet, comfortable space</p>
          <p>2. Sit with your back straight but relaxed</p>
          <p>3. Focus on your breath</p>
          <p>4. Let thoughts pass without judgment</p>
          <p>5. Open yourself to higher wisdom</p>
        </div>
      </div>
    </Card>
  );
}; 