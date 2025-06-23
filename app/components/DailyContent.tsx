"use client"

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DailySession } from './DailySession';
import { RealWorldIntegration } from './RealWorldIntegration';
import { EvidenceUpload } from './EvidenceUpload';
import { HelpText } from './HelpText';
import { DayContent } from '@/data/days';
import { useAuth } from '@/contexts/AuthContext';
import { ConceptsGuide } from './ConceptsGuide';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Flame } from 'lucide-react';

interface DailyContentProps {
  content: DayContent;
  onComplete: () => void;
}

interface Evidence {
  description: string;
  impact: string;
}

export const DailyContent: React.FC<DailyContentProps> = ({
  content,
  onComplete
}) => {
  const { user, updateProgress } = useAuth();
  const isCompleted = user?.progress.completedDays.includes(content.id);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [integrationProgress, setIntegrationProgress] = useState(0);
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [showEvidenceRequired, setShowEvidenceRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  // Calculate streak
  useEffect(() => {
    if (user?.progress.completedDays) {
      const completedDays = user.progress.completedDays.sort();
      let currentStreak = 0;
      
      // Check if today's content is completed
      const todayCompleted = completedDays.includes(content.id);
      
      // Calculate streak from completed days
      for (let i = completedDays.length - 1; i >= 0; i--) {
        const dayId = completedDays[i];
        if (dayId === content.id - currentStreak - 1) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      // Add today if completed
      if (todayCompleted) {
        currentStreak++;
      }
      
      setStreak(currentStreak);
    }
  }, [user?.progress.completedDays, content.id]);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`daily-progress-${content.id}`);
      if (savedProgress) {
        const { session, integration } = JSON.parse(savedProgress);
        setSessionProgress(session);
        setIntegrationProgress(integration);
      }
    } catch (err) {
      console.error('Error loading saved progress:', err);
    }
  }, [content.id]);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`daily-progress-${content.id}`, JSON.stringify({
        session: sessionProgress,
        integration: integrationProgress
      }));
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  }, [sessionProgress, integrationProgress, content.id]);

  const totalProgress = (sessionProgress + integrationProgress) / 2;

  const handleComplete = async () => {
    if (!evidence) {
      setShowEvidenceRequired(true);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await updateProgress(content.id, evidence);
      // Clear saved progress after successful completion
      localStorage.removeItem(`daily-progress-${content.id}`);
      onComplete();
    } catch (err) {
      setError('Failed to save progress. Please try again.');
      console.error('Error saving progress:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (evidence) {
      setShowEvidenceRequired(false);
    }
  }, [evidence]);

  return (
    <div className="space-y-8 daily-content">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <HelpText
          title={content.title}
          content={content.description}
          tooltip="This is your daily journey into quantum consciousness. Each day builds upon the previous, strengthening your connection to the quantum field."
        />
        <div className="flex items-center space-x-4">
          {streak > 0 && (
            <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {streak} Day{streak !== 1 ? 's' : ''} Streak
              </span>
            </div>
          )}
          <div className="concepts-guide">
            <ConceptsGuide />
          </div>
        </div>
      </div>

      <Card className="p-6">
        <HelpText
          title="Overall Progress"
          content="Track your completion of today's consciousness sessions and real-world integration tasks."
          tooltip="Progress is calculated based on your completion of meditation sessions and real-world integration tasks."
        />
        
        <div className="mb-4 mt-6">
          <div className="flex justify-between items-center mb-2 mt-2">
            <span className="text-sm font-medium">Completion</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(totalProgress)}%
            </span>
          </div>
          <Progress value={totalProgress} />
        </div>

        <div className="space-y-6">
          {/* Sessions Section */}
          <div className="consciousness-sessions">
            <HelpText
              title="Consciousness Sessions"
              content="Complete these guided sessions to strengthen your connection with the quantum field."
              tooltip="Each session builds specific aspects of your quantum consciousness."
            />
            <div className="space-y-4 mt-4">
              {content.sessions.map((session, index) => (
                <DailySession
                  key={index}
                  title={session.title}
                  duration={session.duration}
                  description={session.description}
                  onComplete={() => {
                    const newProgress = ((index + 1) * 100) / content.sessions.length;
                    setSessionProgress(newProgress);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Real World Integration Section */}
          <div className="real-world-integration">
            <HelpText
              title="Real World Integration"
              content="Apply your quantum consciousness in daily life through these practical exercises."
              tooltip="These activities help you manifest your quantum consciousness in the physical world."
            />
            <div className="mt-4">
              <RealWorldIntegration
                title={content.realWorldIntegration.title}
                actions={content.realWorldIntegration.actions}
                onComplete={() => setIntegrationProgress(100)}
              />
            </div>
          </div>

          {/* Evidence Upload Section */}
          <div className="evidence-upload">
            <HelpText
              title="Evidence Upload"
              content="Document your journey with photos, videos, and notes."
              tooltip="Upload evidence of your manifestations and progress."
            />
            <div className="mt-4">
              <EvidenceUpload
                onEvidenceSubmit={setEvidence}
              />
              {showEvidenceRequired && (
                <p className="text-red-500 mt-2">
                  Please provide evidence of your integration before completing the day.
                </p>
              )}
            </div>
          </div>

          {/* Affirmations Section */}
          <div className="daily-affirmations">
            <HelpText
              title="Daily Affirmations"
              content="Reinforce your quantum consciousness with these powerful affirmations."
              tooltip="Repeat these affirmations throughout the day to strengthen your connection."
            />
            <div className="mt-4 space-y-2">
              {content.affirmations.map((affirmation, index) => (
                <p key={index} className="text-muted-foreground">
                  {affirmation}
                </p>
              ))}
            </div>
          </div>

          {/* Completion Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleComplete}
              disabled={isCompleted || totalProgress < 100 || isLoading}
              className={isCompleted ? 'bg-green-500' : ''}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isCompleted ? (
                'Completed'
              ) : (
                'Mark as Complete'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 