import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';
import { Clock, Layers, Zap, Target } from 'lucide-react';

interface TimelineState {
  superposition: number;
  coherence: number;
  resonance: number;
  collapse: number;
}

interface Timeline {
  id: string;
  description: string;
  probability: number;
  energy: number;
}

const INITIAL_TIMELINES: Timeline[] = [
  {
    id: 'timeline-1',
    description: 'Current Reality Stream',
    probability: 1.0,
    energy: 100
  },
  {
    id: 'timeline-2',
    description: 'Quantum Potential A',
    probability: 0.0,
    energy: 0
  },
  {
    id: 'timeline-3',
    description: 'Quantum Potential B',
    probability: 0.0,
    energy: 0
  }
];

export function TemporalCollapseProtocol() {
  const [state, setState] = useState<TimelineState>({
    superposition: 0,
    coherence: 0,
    resonance: 0,
    collapse: 0
  });
  const [timelines, setTimelines] = useState<Timeline[]>(INITIAL_TIMELINES);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const { showToast } = useToast();

  const phases = [
    {
      name: 'Superposition',
      duration: 300,
      target: 'superposition'
    },
    {
      name: 'Coherence',
      duration: 240,
      target: 'coherence'
    },
    {
      name: 'Resonance',
      duration: 180,
      target: 'resonance'
    },
    {
      name: 'Collapse',
      duration: 120,
      target: 'collapse'
    }
  ];

  const startProtocol = () => {
    setIsActive(true);
    setCurrentPhase(0);
    beginPhase(phases[0]);
  };

  const beginPhase = (phase: typeof phases[0]) => {
    const interval = setInterval(() => {
      setState(prev => {
        const newState = { ...prev };
        newState[phase.target as keyof TimelineState] = Math.min(
          prev[phase.target as keyof TimelineState] + 1,
          100
        );
        return newState;
      });

      // Update timeline probabilities
      setTimelines(prev => {
        return prev.map(timeline => {
          if (timeline.id === 'timeline-1') {
            return {
              ...timeline,
              probability: Math.max(0, timeline.probability - 0.01)
            };
          } else {
            return {
              ...timeline,
              probability: Math.min(1, timeline.probability + 0.005)
            };
          }
        });
      });
    }, phase.duration * 10);

    setTimeout(() => {
      clearInterval(interval);
      completePhase();
    }, phase.duration * 1000);
  };

  const completePhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1);
      beginPhase(phases[currentPhase + 1]);
      showToast({
        title: 'Phase Complete',
        description: `Moving to ${phases[currentPhase + 1].name} phase.`,
        type: 'success',
      });
    } else {
      setIsActive(false);
      showToast({
        title: 'Protocol Complete',
        description: 'Temporal collapse achieved.',
        type: 'success',
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Temporal Collapse Protocol</h2>
        <p className="text-muted-foreground">
          Merge quantum timelines through superposition and collapse
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Superposition</span>
          </div>
          <Progress value={state.superposition} />
          <span className="text-sm">{state.superposition}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Coherence</span>
          </div>
          <Progress value={state.coherence} />
          <span className="text-sm">{state.coherence}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Resonance</span>
          </div>
          <Progress value={state.resonance} />
          <span className="text-sm">{state.resonance}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-red-500" />
            <span className="text-sm">Collapse</span>
          </div>
          <Progress value={state.collapse} />
          <span className="text-sm">{state.collapse}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Timeline Probabilities</h3>
        {timelines.map(timeline => (
          <div key={timeline.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{timeline.description}</span>
              <span>{(timeline.probability * 100).toFixed(1)}%</span>
            </div>
            <Progress value={timeline.probability * 100} />
          </div>
        ))}
      </div>

      {isActive ? (
        <div className="text-center">
          <div className="text-xl font-bold mb-2">
            {phases[currentPhase].name} Phase
          </div>
          <Button
            variant="destructive"
            onClick={() => setIsActive(false)}
          >
            Abort Protocol
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={startProtocol}
          disabled={currentPhase === phases.length}
        >
          {currentPhase === phases.length
            ? 'Protocol Complete'
            : 'Begin Temporal Collapse'}
        </Button>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Phase {currentPhase + 1} of {phases.length}
      </div>
    </Card>
  );
} 