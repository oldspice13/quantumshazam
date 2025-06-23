import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  totalDays: number;
  completedDays: number;
  averageSessionDuration: number;
  evidenceCount: number;
  streakDays: number;
  lastActive: Date;
}

export function ProgressAnalytics() {
  const { user } = useAuth();
  
  // Calculate analytics data
  const analytics: AnalyticsData = {
    totalDays: 60, // Total days in the program
    completedDays: user?.progress.completedDays.length || 0,
    averageSessionDuration: 15, // Placeholder - implement actual calculation
    evidenceCount: Object.keys(user?.progress.evidence || {}).length,
    streakDays: 0, // Placeholder - implement streak calculation
    lastActive: new Date(), // Placeholder - implement last active tracking
  };

  const completionPercentage = (analytics.completedDays / analytics.totalDays) * 100;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Overall Progress</span>
            <span>{completionPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={completionPercentage} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-1">Completed Days</h3>
            <p className="text-2xl font-bold">{analytics.completedDays}</p>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-1">Evidence Collected</h3>
            <p className="text-2xl font-bold">{analytics.evidenceCount}</p>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-1">Current Streak</h3>
            <p className="text-2xl font-bold">{analytics.streakDays} days</p>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-1">Avg. Session</h3>
            <p className="text-2xl font-bold">{analytics.averageSessionDuration} min</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <div className="space-y-2">
            {user?.progress.completedDays.slice(-3).map((day) => (
              <div key={day} className="p-3 bg-secondary rounded-lg">
                <p className="font-medium">Completed Day {day}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 