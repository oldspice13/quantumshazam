import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { Flame, Calendar, CheckCircle2 } from 'lucide-react';

interface StreakDay {
  date: string;
  completed: boolean;
  coherenceLevel: number; // 0-100
  notes?: string;
}

export function CoherenceStreak() {
  const [streak, setStreak] = useState<StreakDay[]>([]);
  const [currentDay, setCurrentDay] = useState<StreakDay | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      // TODO: Load from Firestore
      const today = new Date().toISOString().split('T')[0];
      const mockData: StreakDay[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString().split('T')[0],
          completed: i > 0,
          coherenceLevel: i > 0 ? Math.floor(Math.random() * 100) : 0,
        };
      }).reverse();

      setStreak(mockData);
      setCurrentDay(mockData.find(day => day.date === today) || null);
    } catch (error) {
      console.error('Error loading streak data:', error);
      showToast({
        title: 'Error',
        description: 'Failed to load coherence streak data.',
        type: 'destructive',
      });
    }
  };

  const handleCompleteDay = async () => {
    if (!currentDay) return;

    try {
      const updatedDay = {
        ...currentDay,
        completed: true,
        coherenceLevel: 100, // For now, set to 100 when completed
      };

      // TODO: Save to Firestore
      setCurrentDay(updatedDay);
      setStreak(prev => prev.map(day => 
        day.date === currentDay.date ? updatedDay : day
      ));

      showToast({
        title: 'Day Completed',
        description: 'Your coherence streak continues!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error completing day:', error);
      showToast({
        title: 'Error',
        description: 'Failed to update coherence streak.',
        type: 'destructive',
      });
    }
  };

  const isEligibleForDissolution = streak.filter(day => day.completed).length >= 7;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Coherence Streak</h2>
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold">
              {streak.filter(day => day.completed).length}/7 Days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {streak.map((day) => (
            <Card
              key={day.date}
              className={`p-2 text-center ${
                day.completed ? 'bg-green-500/10' : 'bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              {day.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
              ) : (
                <Calendar className="h-5 w-5 text-gray-400 mx-auto" />
              )}
              <div className="text-xs text-muted-foreground">
                {day.coherenceLevel}%
              </div>
            </Card>
          ))}
        </div>

        {currentDay && !currentDay.completed && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Coherence</span>
                <span>{currentDay.coherenceLevel}%</span>
              </div>
              <Progress value={currentDay.coherenceLevel} />
            </div>
            <Button
              onClick={handleCompleteDay}
              className="w-full"
            >
              Complete Today's Practice
            </Button>
          </div>
        )}

        {isEligibleForDissolution && (
          <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Chamber Unlocked
            </h3>
            <p className="text-sm text-green-600/80">
              You have completed 7 days of coherence. The Ego Dissolution Chamber is now available.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
} 