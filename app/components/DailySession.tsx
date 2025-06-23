import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SessionProps {
  title: string;
  duration: number; // in minutes
  description: string;
  onComplete: () => void;
}

export const DailySession: React.FC<SessionProps> = ({
  title,
  duration,
  description,
  onComplete
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(duration * 60);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          setProgress(((duration * 60 - newTime) / (duration * 60)) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, duration, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeRemaining(duration * 60);
    setProgress(0);
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
          <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="flex space-x-2">
        {!isActive ? (
          <Button onClick={handleStart} className="flex-1">
            Start Session
          </Button>
        ) : (
          <Button onClick={handlePause} variant="outline" className="flex-1">
            Pause
          </Button>
        )}
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>
    </Card>
  );
}; 