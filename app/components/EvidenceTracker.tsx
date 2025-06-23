"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface Evidence {
  id: string;
  date: Date;
  insight: string;
  action: string;
  result: string;
  impact: number;
  synchronicities: string[];
}

export const EvidenceTracker: React.FC = () => {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [newEvidence, setNewEvidence] = useState<Partial<Evidence>>({
    insight: '',
    action: '',
    result: '',
    impact: 0,
    synchronicities: []
  });
  const [newSynchronicity, setNewSynchronicity] = useState('');

  // Load evidence from localStorage
  useEffect(() => {
    const savedEvidence = localStorage.getItem('evidenceTracker');
    if (savedEvidence) {
      const parsedEvidence = JSON.parse(savedEvidence);
      // Convert string dates back to Date objects
      parsedEvidence.forEach((item: any) => {
        item.date = new Date(item.date);
      });
      setEvidence(parsedEvidence);
    }
  }, []);

  // Save evidence to localStorage
  useEffect(() => {
    localStorage.setItem('evidenceTracker', JSON.stringify(evidence));
  }, [evidence]);

  const handleAddEvidence = () => {
    if (!newEvidence.insight || !newEvidence.action || !newEvidence.result) return;

    const evidenceItem: Evidence = {
      id: Date.now().toString(),
      date: new Date(),
      insight: newEvidence.insight,
      action: newEvidence.action,
      result: newEvidence.result,
      impact: newEvidence.impact || 0,
      synchronicities: newEvidence.synchronicities || []
    };

    setEvidence(prev => [...prev, evidenceItem]);
    setNewEvidence({
      insight: '',
      action: '',
      result: '',
      impact: 0,
      synchronicities: []
    });
  };

  const handleAddSynchronicity = (evidenceId: string) => {
    if (!newSynchronicity.trim()) return;

    setEvidence(prev =>
      prev.map(item =>
        item.id === evidenceId
          ? {
              ...item,
              synchronicities: [...item.synchronicities, newSynchronicity]
            }
          : item
      )
    );
    setNewSynchronicity('');
  };

  const calculateAverageImpact = () => {
    if (evidence.length === 0) return 0;
    const sum = evidence.reduce((acc, item) => acc + item.impact, 0);
    return sum / evidence.length;
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Evidence Tracker</h3>
        <p className="text-muted-foreground">
          Document your transformation journey
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Average Impact</span>
            <span className="text-2xl font-bold">{calculateAverageImpact().toFixed(1)}</span>
          </div>
          <Progress value={calculateAverageImpact() * 10} className="mt-2" />
        </div>

        <div className="space-y-4">
          {evidence.map(item => (
            <Card key={item.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Insight</p>
                    <p className="text-sm text-muted-foreground">{item.insight}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.date.toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Action Taken</p>
                  <p className="text-sm text-muted-foreground">{item.action}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Result</p>
                  <p className="text-sm text-muted-foreground">{item.result}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Impact</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.impact * 10} className="flex-1" />
                    <span className="text-sm">{item.impact}/10</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Synchronicities</p>
                  <div className="space-y-1">
                    {item.synchronicities.map((sync, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {sync}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={newSynchronicity}
                      onChange={(e) => setNewSynchronicity(e.target.value)}
                      placeholder="Add synchronicity..."
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleAddSynchronicity(item.id)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Add New Evidence</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Insight from Godself</label>
              <Input
                value={newEvidence.insight}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, insight: e.target.value }))}
                placeholder="What insight did you receive?"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Action Taken</label>
              <Input
                value={newEvidence.action}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, action: e.target.value }))}
                placeholder="What action did you take?"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Result</label>
              <Input
                value={newEvidence.result}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, result: e.target.value }))}
                placeholder="What was the result?"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Impact (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={newEvidence.impact}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, impact: parseInt(e.target.value) }))}
              />
            </div>
            <Button onClick={handleAddEvidence}>Add Evidence</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}; 