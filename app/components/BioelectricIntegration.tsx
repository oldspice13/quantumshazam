import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';
import { Heart, Brain, Zap, Activity } from 'lucide-react';

interface BioelectricState {
  heartCoherence: number;
  cnsEntrainment: number;
  energyField: number;
  resonance: number;
}

interface EntrainmentPattern {
  frequency: number;
  duration: number;
  target: 'alpha' | 'theta' | 'delta' | 'gamma';
}

const ENTRAINMENT_PATTERNS: EntrainmentPattern[] = [
  { frequency: 10, duration: 300, target: 'alpha' },
  { frequency: 6, duration: 420, target: 'theta' },
  { frequency: 4, duration: 600, target: 'delta' },
  { frequency: 40, duration: 480, target: 'gamma' }
];

export function BioelectricIntegration() {
  const [state, setState] = useState<BioelectricState>({
    heartCoherence: 0,
    cnsEntrainment: 0,
    energyField: 0,
    resonance: 0
  });
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { showToast } = useToast();
  const timerRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    // Initialize audio context for entrainment
    audioContextRef.current = new AudioContext();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const startEntrainment = async () => {
    const pattern = ENTRAINMENT_PATTERNS[currentPattern];
    setTimeRemaining(pattern.duration);
    setIsActive(true);

    // Start binaural beats
    await startBinauralBeats(pattern.frequency);

    // Start biofeedback simulation
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          completePattern();
          return 0;
        }
        return prev - 1;
      });

      // Update biofeedback
      updateBiofeedback(pattern.target);
    }, 1000);
  };

  const startBinauralBeats = async (frequency: number) => {
    if (!audioContextRef.current) return;

    const oscillator1 = audioContextRef.current.createOscillator();
    const oscillator2 = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator1.frequency.value = frequency;
    oscillator2.frequency.value = frequency + 10;
    gainNode.gain.value = 0.1;

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator1.start();
    oscillator2.start();
  };

  const updateBiofeedback = (target: string) => {
    setState(prev => ({
      heartCoherence: Math.min(prev.heartCoherence + (Math.random() - 0.5) * 2, 100),
      cnsEntrainment: Math.min(prev.cnsEntrainment + 1, 100),
      energyField: Math.min(prev.energyField + (Math.random() - 0.5) * 2, 100),
      resonance: Math.min(prev.resonance + 0.5, 100)
    }));
  };

  const completePattern = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);

    if (currentPattern < ENTRAINMENT_PATTERNS.length - 1) {
      setCurrentPattern(prev => prev + 1);
      showToast({
        title: 'Pattern Complete',
        description: 'Moving to next entrainment pattern.',
        type: 'success',
      });
    } else {
      showToast({
        title: 'Integration Complete',
        description: 'Bioelectric field fully entrained.',
        type: 'success',
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Bioelectric Integration</h2>
        <p className="text-muted-foreground">
          Entrain your bioelectric field for quantum coherence
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm">Heart Coherence</span>
          </div>
          <Progress value={state.heartCoherence} />
          <span className="text-sm">{state.heartCoherence}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-purple-500" />
            <span className="text-sm">CNS Entrainment</span>
          </div>
          <Progress value={state.cnsEntrainment} />
          <span className="text-sm">{state.cnsEntrainment}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Energy Field</span>
          </div>
          <Progress value={state.energyField} />
          <span className="text-sm">{state.energyField}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Quantum Resonance</span>
          </div>
          <Progress value={state.resonance} />
          <span className="text-sm">{state.resonance}%</span>
        </div>
      </div>

      {isActive ? (
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">
            {formatTime(timeRemaining)}
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsActive(false);
            }}
          >
            End Pattern
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={startEntrainment}
          disabled={currentPattern === ENTRAINMENT_PATTERNS.length}
        >
          {currentPattern === ENTRAINMENT_PATTERNS.length
            ? 'Integration Complete'
            : `Begin ${ENTRAINMENT_PATTERNS[currentPattern].target.toUpperCase()} Entrainment`}
        </Button>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Pattern {currentPattern + 1} of {ENTRAINMENT_PATTERNS.length}
      </div>
    </Card>
  );
} 