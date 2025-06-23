"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Message {
  role: 'user' | 'godself';
  content: string;
  timestamp: Date;
  energyLevel?: number;
}

interface DialogueSession {
  id: string;
  date: Date;
  messages: Message[];
  progress: number;
  insights: string[];
}

export const GodselfHistory: React.FC = () => {
  const [sessions, setSessions] = useState<DialogueSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<DialogueSession | null>(null);

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('godselfSessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      // Convert string dates back to Date objects
      parsedSessions.forEach((session: any) => {
        session.date = new Date(session.date);
        session.messages.forEach((msg: any) => {
          msg.timestamp = new Date(msg.timestamp);
        });
      });
      setSessions(parsedSessions);
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('godselfSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  const handleExportSession = (session: DialogueSession) => {
    const sessionData = {
      ...session,
      date: session.date.toISOString(),
      messages: session.messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `godself-dialogue-${session.date.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Dialogue History</h3>
        <p className="text-muted-foreground">
          Review your past transformative dialogues
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Past Sessions</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sessions.map(session => (
              <Card
                key={session.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedSession?.id === session.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      Session {session.date.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.messages.length} messages
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportSession(session);
                      }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(session.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Progress</span>
                    <span>{session.progress}%</span>
                  </div>
                  <Progress value={session.progress} className="h-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {selectedSession && (
          <div className="space-y-4">
            <h4 className="font-medium">Session Details</h4>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {selectedSession.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
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

            {selectedSession.insights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Insights</h4>
                <div className="space-y-2">
                  {selectedSession.insights.map((insight, index) => (
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
          </div>
        )}
      </div>
    </Card>
  );
}; 