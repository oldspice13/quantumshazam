import React from 'react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}; 