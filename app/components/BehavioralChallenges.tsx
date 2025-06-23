"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  evidence: string[];
  reflections: string[];
}

export const BehavioralChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({
    title: '',
    description: '',
    difficulty: 5,
    duration: 7
  });
  const [newEvidence, setNewEvidence] = useState('');
  const [newReflection, setNewReflection] = useState('');

  // Load challenges from localStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem('behavioralChallenges');
    if (savedChallenges) {
      const parsedChallenges = JSON.parse(savedChallenges);
      // Convert string dates back to Date objects
      parsedChallenges.forEach((challenge: any) => {
        challenge.startDate = new Date(challenge.startDate);
        challenge.endDate = new Date(challenge.endDate);
      });
      setChallenges(parsedChallenges);
    }
  }, []);

  // Save challenges to localStorage
  useEffect(() => {
    localStorage.setItem('behavioralChallenges', JSON.stringify(challenges));
  }, [challenges]);

  const handleAddChallenge = () => {
    if (!newChallenge.title || !newChallenge.description) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (newChallenge.duration || 7));

    const challenge: Challenge = {
      id: Date.now().toString(),
      title: newChallenge.title,
      description: newChallenge.description,
      difficulty: newChallenge.difficulty || 5,
      duration: newChallenge.duration || 7,
      startDate,
      endDate,
      status: 'pending',
      evidence: [],
      reflections: []
    };

    setChallenges(prev => [...prev, challenge]);
    setNewChallenge({
      title: '',
      description: '',
      difficulty: 5,
      duration: 7
    });
  };

  const handleUpdateStatus = (id: string, status: Challenge['status']) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? { ...challenge, status }
          : challenge
      )
    );
  };

  const handleAddEvidence = (id: string) => {
    if (!newEvidence.trim()) return;

    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? {
              ...challenge,
              evidence: [...challenge.evidence, newEvidence]
            }
          : challenge
      )
    );
    setNewEvidence('');
  };

  const handleAddReflection = (id: string) => {
    if (!newReflection.trim()) return;

    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? {
              ...challenge,
              reflections: [...challenge.reflections, newReflection]
            }
          : challenge
      )
    );
    setNewReflection('');
  };

  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Behavioral Challenges</h3>
        <p className="text-muted-foreground">
          Embody your desired identity through action
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Challenge Title</label>
            <Input
              value={newChallenge.title}
              onChange={(e) => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's your challenge?"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Duration (days)</label>
            <Input
              type="number"
              min="1"
              value={newChallenge.duration}
              onChange={(e) => setNewChallenge(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Input
            value={newChallenge.description}
            onChange={(e) => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your challenge..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Difficulty (1-10)</label>
          <Input
            type="number"
            min="1"
            max="10"
            value={newChallenge.difficulty}
            onChange={(e) => setNewChallenge(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
          />
        </div>
        <Button onClick={handleAddChallenge}>Add Challenge</Button>
      </div>

      <div className="space-y-4">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(challenge.status)}`} />
                  <span className="text-sm capitalize">{challenge.status.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Start: {challenge.startDate.toLocaleDateString()}</span>
                <span>End: {challenge.endDate.toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(challenge.id, 'in_progress')}
                  disabled={challenge.status === 'in_progress'}
                >
                  Start
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(challenge.id, 'completed')}
                  disabled={challenge.status === 'completed'}
                >
                  Complete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(challenge.id, 'failed')}
                  disabled={challenge.status === 'failed'}
                >
                  Fail
                </Button>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Evidence</h5>
                <div className="space-y-1">
                  {challenge.evidence.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {item}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newEvidence}
                    onChange={(e) => setNewEvidence(e.target.value)}
                    placeholder="Add evidence..."
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleAddEvidence(challenge.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Reflections</h5>
                <div className="space-y-1">
                  {challenge.reflections.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {item}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newReflection}
                    onChange={(e) => setNewReflection(e.target.value)}
                    placeholder="Add reflection..."
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleAddReflection(challenge.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}; 