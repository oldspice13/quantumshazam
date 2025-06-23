"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  progress: number;
  onHelp: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  progress,
  onHelp
}) => {
  const views = [
    { id: 'tutorial', label: 'Tutorial', icon: '📚' },
    { id: 'meditation', label: 'Meditation', icon: '🧘' },
    { id: 'debate', label: 'Debate', icon: '💭' },
    { id: 'journal', label: 'Journal', icon: '📝' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'challenges', label: 'Challenges', icon: '🎯' },
    { id: 'evidence', label: 'Evidence', icon: '✨' }
  ];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Godself Journey</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onHelp}
          >
            Help
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {views.map(view => (
            <Button
              key={view.id}
              variant={currentView === view.id ? 'default' : 'outline'}
              className="flex flex-col items-center justify-center h-20"
              onClick={() => onViewChange(view.id)}
            >
              <span className="text-xl mb-1">{view.icon}</span>
              <span className="text-xs">{view.label}</span>
            </Button>
          ))}
        </nav>

        <div className="text-sm text-muted-foreground text-center">
          <p>Current Stage: {views.find(v => v.id === currentView)?.label}</p>
        </div>
      </div>
    </Card>
  );
}; 