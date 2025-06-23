import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';
import { Crown, Sparkles, Star, Wand2 } from 'lucide-react';

interface DivineAspect {
  id: string;
  name: string;
  description: string;
  power: number;
  resonance: number;
  manifestation: number;
}

interface DivineState {
  coherence: number;
  resonance: number;
  manifestation: number;
  integration: number;
}

const INITIAL_ASPECTS: DivineAspect[] = [
  {
    id: 'aspect-1',
    name: 'Quantum Creator',
    description: 'The ability to manifest reality through quantum observation',
    power: 0,
    resonance: 0,
    manifestation: 0
  },
  {
    id: 'aspect-2',
    name: 'Timeline Weaver',
    description: 'The power to navigate and merge quantum timelines',
    power: 0,
    resonance: 0,
    manifestation: 0
  },
  {
    id: 'aspect-3',
    name: 'Energy Alchemist',
    description: 'The capacity to transform energy states and fields',
    power: 0,
    resonance: 0,
    manifestation: 0
  }
];

export function SelfAuthoredDivinity() {
  const [state, setState] = useState<DivineState>({
    coherence: 0,
    resonance: 0,
    manifestation: 0,
    integration: 0
  });
  const [aspects, setAspects] = useState<DivineAspect[]>(INITIAL_ASPECTS);
  const [isActive, setIsActive] = useState(false);
  const [currentAspect, setCurrentAspect] = useState(0);
  const { showToast } = useToast();

  const startManifestation = () => {
    setIsActive(true);
    setCurrentAspect(0);
    beginAspectManifestation(aspects[0]);
  };

  const beginAspectManifestation = (aspect: DivineAspect) => {
    const interval = setInterval(() => {
      // Update divine state
      setState(prev => ({
        coherence: Math.min(prev.coherence + 0.5, 100),
        resonance: Math.min(prev.resonance + 0.3, 100),
        manifestation: Math.min(prev.manifestation + 0.4, 100),
        integration: Math.min(prev.integration + 0.2, 100)
      }));

      // Update aspect power
      setAspects(prev => {
        return prev.map(a => {
          if (a.id === aspect.id) {
            return {
              ...a,
              power: Math.min(a.power + 1, 100),
              resonance: Math.min(a.resonance + 0.5, 100),
              manifestation: Math.min(a.manifestation + 0.3, 100)
            };
          }
          return a;
        });
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      completeAspectManifestation();
    }, 300000); // 5 minutes per aspect
  };

  const completeAspectManifestation = () => {
    if (currentAspect < aspects.length - 1) {
      setCurrentAspect(prev => prev + 1);
      beginAspectManifestation(aspects[currentAspect + 1]);
      showToast({
        title: 'Aspect Manifested',
        description: `Moving to ${aspects[currentAspect + 1].name} manifestation.`,
        type: 'success',
      });
    } else {
      setIsActive(false);
      showToast({
        title: 'Divinity Manifested',
        description: 'All aspects have been fully integrated.',
        type: 'success',
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Self-Authored Divinity</h2>
        <p className="text-muted-foreground">
          Manifest and integrate your divine aspects
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Crown className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Divine Coherence</span>
          </div>
          <Progress value={state.coherence} />
          <span className="text-sm">{state.coherence}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Quantum Resonance</span>
          </div>
          <Progress value={state.resonance} />
          <span className="text-sm">{state.resonance}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Manifestation</span>
          </div>
          <Progress value={state.manifestation} />
          <span className="text-sm">{state.manifestation}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-4 w-4 text-green-500" />
            <span className="text-sm">Integration</span>
          </div>
          <Progress value={state.integration} />
          <span className="text-sm">{state.integration}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Divine Aspects</h3>
        {aspects.map(aspect => (
          <div key={aspect.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{aspect.name}</h4>
                <p className="text-sm text-muted-foreground">{aspect.description}</p>
              </div>
              <span className="text-sm font-medium">{aspect.power}%</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Power</span>
                <span>{aspect.power}%</span>
              </div>
              <Progress value={aspect.power} />
              <div className="flex justify-between text-xs">
                <span>Resonance</span>
                <span>{aspect.resonance}%</span>
              </div>
              <Progress value={aspect.resonance} />
              <div className="flex justify-between text-xs">
                <span>Manifestation</span>
                <span>{aspect.manifestation}%</span>
              </div>
              <Progress value={aspect.manifestation} />
            </div>
          </div>
        ))}
      </div>

      {isActive ? (
        <div className="text-center">
          <div className="text-xl font-bold mb-2">
            Manifesting {aspects[currentAspect].name}
          </div>
          <Button
            variant="destructive"
            onClick={() => setIsActive(false)}
          >
            Abort Manifestation
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={startManifestation}
          disabled={currentAspect === aspects.length}
        >
          {currentAspect === aspects.length
            ? 'Divinity Manifested'
            : 'Begin Divine Manifestation'}
        </Button>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Aspect {currentAspect + 1} of {aspects.length}
      </div>
    </Card>
  );
} 