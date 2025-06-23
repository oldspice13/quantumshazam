import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Brain, Zap, Infinity } from 'lucide-react';
import { soundManager } from '@/lib/sounds';
import { ParticleEffect } from '@/components/ParticleEffect';

interface RitualPhase {
  id: string;
  title: string;
  description: string;
  duration: number;
  geometry: string;
  frequency: number;
  biofeedback: {
    heartRate: number;
    brainWave: string;
    energyField: number;
  };
}

const RITUAL_PHASES: RitualPhase[] = [
  {
    id: 'preparation',
    title: 'Quantum Preparation',
    description: 'Align your bioelectric field with sacred geometry',
    duration: 300,
    geometry: 'merkaba',
    frequency: 432,
    biofeedback: {
      heartRate: 60,
      brainWave: 'alpha',
      energyField: 0
    }
  },
  {
    id: 'dissolution',
    title: 'Field Dissolution',
    description: 'Dissolve your current reality matrix',
    duration: 420,
    geometry: 'flower-of-life',
    frequency: 528,
    biofeedback: {
      heartRate: 65,
      brainWave: 'theta',
      energyField: 0
    }
  },
  {
    id: 'void',
    title: 'Void Integration',
    description: 'Merge with the quantum void',
    duration: 600,
    geometry: 'metatron-cube',
    frequency: 741,
    biofeedback: {
      heartRate: 70,
      brainWave: 'delta',
      energyField: 0
    }
  },
  {
    id: 'rebirth',
    title: 'Quantum Rebirth',
    description: 'Emerge as your new quantum self',
    duration: 480,
    geometry: 'tree-of-life',
    frequency: 963,
    biofeedback: {
      heartRate: 75,
      brainWave: 'gamma',
      energyField: 0
    }
  }
];

export function QuantumDeathRitual() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [biofeedback, setBiofeedback] = useState(RITUAL_PHASES[0].biofeedback);
  const [energyField, setEnergyField] = useState(0);
  const { showToast } = useToast();
  const timerRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    // Initialize audio context for binaural beats
    audioContextRef.current = new AudioContext();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const startPhase = async () => {
    const phase = RITUAL_PHASES[currentPhase];
    setTimeRemaining(phase.duration);
    setIsActive(true);
    
    // Start binaural beats
    await startBinauralBeats(phase.frequency);
    
    // Start biofeedback simulation
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          completePhase();
          return 0;
        }
        return prev - 1;
      });
      
      // Update biofeedback
      updateBiofeedback();
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

  const updateBiofeedback = () => {
    setBiofeedback(prev => ({
      heartRate: Math.min(prev.heartRate + (Math.random() - 0.5) * 2, 100),
      brainWave: prev.brainWave,
      energyField: Math.min(prev.energyField + 1, 100)
    }));
  };

  const completePhase = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    
    if (currentPhase < RITUAL_PHASES.length - 1) {
      setCurrentPhase(prev => prev + 1);
      showToast({
        title: 'Phase Complete',
        description: 'Prepare for the next phase of your quantum transformation.',
        type: 'success',
      });
    } else {
      showToast({
        title: 'Ritual Complete',
        description: 'Your quantum death and rebirth is complete.',
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
        <h2 className="text-2xl font-bold mb-2">Quantum Death Ritual</h2>
        <p className="text-muted-foreground">
          {RITUAL_PHASES[currentPhase].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm">Heart Rate</span>
          </div>
          <Progress value={biofeedback.heartRate} />
          <span className="text-sm">{biofeedback.heartRate} BPM</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Brain Wave</span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: `${(currentPhase + 1) * 25}%` }}
            />
          </div>
          <span className="text-sm">{biofeedback.brainWave}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Energy Field</span>
          </div>
          <Progress value={biofeedback.energyField} />
          <span className="text-sm">{biofeedback.energyField}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Infinity className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Quantum Coherence</span>
          </div>
          <Progress value={energyField} />
          <span className="text-sm">{energyField}%</span>
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
            End Phase
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={startPhase}
          disabled={currentPhase === RITUAL_PHASES.length}
        >
          {currentPhase === RITUAL_PHASES.length
            ? 'Ritual Complete'
            : `Begin ${RITUAL_PHASES[currentPhase].title}`}
        </Button>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Phase {currentPhase + 1} of {RITUAL_PHASES.length}
      </div>
    </Card>
  );
} 