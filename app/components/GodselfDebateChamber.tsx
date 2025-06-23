"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { generateGodselfResponse } from '@/services/godselfService';
import { GodselfTutorial } from './GodselfTutorial';
import { GodselfJournal } from './GodselfJournal';
import { GodselfHistory } from './GodselfHistory';
import { MeditationTimer } from './MeditationTimer';
import { useToast } from '@/contexts/ToastContext';

interface Message {
  role: 'user' | 'godself';
  content: string;
  timestamp: Date;
  energyLevel?: number;
}

interface DebateSession {
  id: string;
  topic: string;
  messages: Message[];
  progress: number;
  insights: string[];
  lastActive: Date;
}

type View = 'tutorial' | 'meditation' | 'debate' | 'journal' | 'history';

interface GodselfDebateChamberProps {
  onDebateComplete?: (insights: string[]) => void;
}

export const GodselfDebateChamber: React.FC<GodselfDebateChamberProps> = ({ onDebateComplete }) => {
  const { showToast } = useToast();
  const [currentView, setCurrentView] = useState<View>('tutorial');
  const [session, setSession] = useState<DebateSession>(() => {
    // Try to load existing session from localStorage
    const savedSession = localStorage.getItem('currentGodselfSession');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      return {
        ...parsed,
        lastActive: new Date(parsed.lastActive),
        messages: parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      };
    }
    // Create new session if none exists
    return {
      id: Date.now().toString(),
      topic: '',
      messages: [],
      progress: 0,
      insights: [],
      lastActive: new Date()
    };
  });
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [streakDays, setStreakDays] = useState(0);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentGodselfSession', JSON.stringify({
      ...session,
      lastActive: session.lastActive.toISOString(),
      messages: session.messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))
    }));
  }, [session]);

  // Check and update streak
  useEffect(() => {
    const lastActive = new Date(session.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      setStreakDays(prev => prev + 1);
      showToast({
        title: 'Debate Streak!',
        description: `You've maintained your practice for ${streakDays + 1} days.`,
        type: 'success'
      });
    } else if (diffDays > 1) {
      setStreakDays(0);
      showToast({
        title: 'Streak Reset',
        description: 'Your debate streak has been reset. Start a new session to begin again.',
        type: 'default'
      });
    }
  }, [session.lastActive]);

  // Generate avatar based on user's energy signature
  useEffect(() => {
    // This would be replaced with actual avatar generation logic
    setAvatarUrl('/avatars/godself-default.png');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    try {
      // Add user message
      setSession(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        lastActive: new Date()
      }));

      // Get context from previous messages
      const context = session.messages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content);

      // Get AI response
      const response = await generateGodselfResponse(userInput, context);
      
      const godselfMessage: Message = {
        role: 'godself',
        content: response.response,
        timestamp: new Date(),
        energyLevel: response.energyLevel
      };

      // Add AI response and update progress
      setSession(prev => {
        const newSession = {
          ...prev,
          messages: [...prev.messages, godselfMessage],
          progress: Math.min(prev.progress + 10, 100),
          insights: [...prev.insights, response.insight],
          lastActive: new Date()
        };

        // Call onDebateComplete when progress reaches 100%
        if (newSession.progress === 100 && onDebateComplete) {
          onDebateComplete(newSession.insights);
          showToast({
            title: 'Debate Complete!',
            description: 'You have completed this transformative dialogue.',
            type: 'success'
          });
        }

        return newSession;
      });

      setUserInput('');
    } catch (error) {
      console.error('Error in debate:', error);
      showToast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        type: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'tutorial':
        return (
          <GodselfTutorial
            onComplete={() => setCurrentView('meditation')}
          />
        );
      case 'meditation':
        return (
          <MeditationTimer
            onComplete={() => setCurrentView('debate')}
          />
        );
      case 'journal':
        return <GodselfJournal />;
      case 'history':
        return <GodselfHistory />;
      case 'debate':
      default:
        return (
          <Card className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <img
                  src={avatarUrl}
                  alt="Your Godself"
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Godself Debate Chamber</h3>
                <p className="text-muted-foreground">
                  Engage in transformative dialogue with your higher self
                </p>
                {streakDays > 0 && (
                  <p className="text-sm text-green-500">
                    🔥 {streakDays} day streak
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Transformation Progress</span>
                <span className="text-sm text-muted-foreground">{session.progress}%</span>
              </div>
              <Progress value={session.progress} />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {session.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.energyLevel !== undefined && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">Energy:</span>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${message.energyLevel}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Share your limitation or challenge..."
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Engaging...' : 'Engage with Godself'}
              </Button>
            </form>

            {session.insights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Insights</h4>
                <div className="space-y-2">
                  {session.insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted rounded-lg text-sm"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button
          variant={currentView === 'debate' ? 'default' : 'outline'}
          onClick={() => setCurrentView('debate')}
        >
          Debate
        </Button>
        <Button
          variant={currentView === 'journal' ? 'default' : 'outline'}
          onClick={() => setCurrentView('journal')}
        >
          Journal
        </Button>
        <Button
          variant={currentView === 'history' ? 'default' : 'outline'}
          onClick={() => setCurrentView('history')}
        >
          History
        </Button>
      </div>

      {renderView()}
    </div>
  );
}; 