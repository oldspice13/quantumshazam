"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface IdentityTrait {
  id: string;
  trait: string;
  currentLevel: number;
  targetLevel: number;
  evidence: string[];
}

interface IdentityProfile {
  currentIdentity: string;
  desiredIdentity: string;
  traits: IdentityTrait[];
  limitingBeliefs: string[];
  breakthroughMoments: string[];
}

interface IdentityProfileProps {
  onUpdate: (profile: IdentityProfile) => void;
}

export const IdentityProfile: React.FC<IdentityProfileProps> = ({ onUpdate }) => {
  const [profile, setProfile] = useState<IdentityProfile>({
    currentIdentity: '',
    desiredIdentity: '',
    traits: [],
    limitingBeliefs: [],
    breakthroughMoments: []
  });

  const [newTrait, setNewTrait] = useState('');
  const [newBelief, setNewBelief] = useState('');
  const [newBreakthrough, setNewBreakthrough] = useState('');

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('identityProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage and notify parent
  useEffect(() => {
    localStorage.setItem('identityProfile', JSON.stringify(profile));
    onUpdate(profile);
  }, [profile, onUpdate]);

  const handleAddTrait = () => {
    if (!newTrait.trim()) return;

    const trait: IdentityTrait = {
      id: Date.now().toString(),
      trait: newTrait,
      currentLevel: 0,
      targetLevel: 10,
      evidence: []
    };

    setProfile(prev => ({
      ...prev,
      traits: [...prev.traits, trait]
    }));
    setNewTrait('');
  };

  const handleUpdateTraitLevel = (id: string, level: number, isCurrent: boolean) => {
    setProfile(prev => ({
      ...prev,
      traits: prev.traits.map(trait =>
        trait.id === id
          ? {
              ...trait,
              [isCurrent ? 'currentLevel' : 'targetLevel']: level
            }
          : trait
      )
    }));
  };

  const handleAddEvidence = (traitId: string, evidence: string) => {
    setProfile(prev => ({
      ...prev,
      traits: prev.traits.map(trait =>
        trait.id === traitId
          ? {
              ...trait,
              evidence: [...trait.evidence, evidence]
            }
          : trait
      )
    }));
  };

  const handleAddLimitingBelief = () => {
    if (!newBelief.trim()) return;
    setProfile(prev => ({
      ...prev,
      limitingBeliefs: [...prev.limitingBeliefs, newBelief]
    }));
    setNewBelief('');
  };

  const handleAddBreakthrough = () => {
    if (!newBreakthrough.trim()) return;
    setProfile(prev => ({
      ...prev,
      breakthroughMoments: [...prev.breakthroughMoments, newBreakthrough]
    }));
    setNewBreakthrough('');
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Identity Transformation</h3>
        <p className="text-muted-foreground">
          Define who you are becoming
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Current Identity</label>
          <Input
            value={profile.currentIdentity}
            onChange={(e) => setProfile(prev => ({ ...prev, currentIdentity: e.target.value }))}
            placeholder="Who are you now?"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Desired Identity</label>
          <Input
            value={profile.desiredIdentity}
            onChange={(e) => setProfile(prev => ({ ...prev, desiredIdentity: e.target.value }))}
            placeholder="Who are you becoming?"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Identity Traits</h4>
        <div className="space-y-4">
          {profile.traits.map(trait => (
            <Card key={trait.id} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{trait.trait}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Current: {trait.currentLevel}</span>
                    <span className="text-sm">Target: {trait.targetLevel}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>Current Level</span>
                    <span>{trait.currentLevel}</span>
                  </div>
                  <Progress value={(trait.currentLevel / trait.targetLevel) * 100} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>Target Level</span>
                    <span>{trait.targetLevel}</span>
                  </div>
                  <Progress value={100} className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Evidence</h5>
                  <div className="space-y-1">
                    {trait.evidence.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add evidence..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleAddEvidence(trait.id, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add evidence..."]') as HTMLInputElement;
                        if (input.value) {
                          handleAddEvidence(trait.id, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <div className="flex space-x-2">
            <Input
              value={newTrait}
              onChange={(e) => setNewTrait(e.target.value)}
              placeholder="Add new trait..."
            />
            <Button onClick={handleAddTrait}>Add Trait</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Limiting Beliefs</h4>
        <div className="space-y-2">
          {profile.limitingBeliefs.map((belief, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg text-sm">
              {belief}
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              value={newBelief}
              onChange={(e) => setNewBelief(e.target.value)}
              placeholder="Add limiting belief..."
            />
            <Button onClick={handleAddLimitingBelief}>Add</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Breakthrough Moments</h4>
        <div className="space-y-2">
          {profile.breakthroughMoments.map((moment, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg text-sm">
              {moment}
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              value={newBreakthrough}
              onChange={(e) => setNewBreakthrough(e.target.value)}
              placeholder="Add breakthrough moment..."
            />
            <Button onClick={handleAddBreakthrough}>Add</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}; 