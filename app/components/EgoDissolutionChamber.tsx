import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Loader2 } from 'lucide-react';
import { soundManager } from '@/lib/sounds';
import { ParticleEffect } from '@/components/ParticleEffect';
import { PreImmolationMeditation } from '@/components/PreImmolationMeditation';

interface PurgeStep {
  id: string;
  title: string;
  prompt: string;
  minLength: number;
}

const PURGE_STEPS: PurgeStep[] = [
  {
    id: 'fears',
    title: 'The Fears',
    prompt: 'List every fear that has held you back.',
    minLength: 200,
  },
  {
    id: 'beliefs',
    title: 'The Beliefs',
    prompt: 'List every limiting belief you have about yourself and your reality.',
    minLength: 200,
  },
  {
    id: 'memories',
    title: 'The Memories',
    prompt: 'List every memory where you felt powerless.',
    minLength: 200,
  },
  {
    id: 'name',
    title: 'The Name',
    prompt: 'Give this old identity a name.',
    minLength: 10,
  },
];

export function EgoDissolutionChamber() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState('');
  const [isImmolating, setIsImmolating] = useState(false);
  const [countdown, setCountdown] = useState(11);
  const [isBurning, setIsBurning] = useState(false);
  const { showToast } = useToast();
  const countdownRef = useRef<NodeJS.Timeout>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showMeditation, setShowMeditation] = useState(false);
  const [burningText, setBurningText] = useState('');

  useEffect(() => {
    // Check if user has completed 7-day coherence streak
    const checkEligibility = async () => {
      try {
        // TODO: Implement coherence streak check
        const isEligible = true; // Placeholder
        if (isEligible) {
          setIsActive(true);
        }
      } catch (error) {
        console.error('Error checking eligibility:', error);
      }
    };

    checkEligibility();
  }, []);

  const handleNext = () => {
    if (content.length < PURGE_STEPS[currentStep].minLength) {
      showToast({
        title: 'Incomplete Purge',
        description: `Please provide more detail. Minimum ${PURGE_STEPS[currentStep].minLength} characters required.`,
        type: 'destructive',
      });
      return;
    }

    if (currentStep < PURGE_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setContent('');
    } else {
      setIsImmolating(true);
    }
  };

  const handleImmolationStart = () => {
    if (countdownRef.current) return;
    
    soundManager.play('countdown');
    
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleImmolationComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleImmolationEnd = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      setCountdown(11);
      soundManager.stop('countdown');
    }
  };

  const handleImmolationComplete = async () => {
    setIsBurning(true);
    soundManager.play('immolation');
    
    // Collect all purge text
    const allText = PURGE_STEPS.map(step => `${step.title}\n${step.prompt}`).join('\n\n');
    setBurningText(allText);
    
    // Simulate burning animation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    soundManager.play('burning');
    
    try {
      // TODO: Implement data deletion from Firestore
      showToast({
        title: 'Old Identity Dissolved',
        description: 'The void is prepared. Awaiting new installation.',
        type: 'success',
      });
      
      soundManager.play('complete');
      
      // TODO: Trigger app state update to unlock Godself Debator
    } catch (error) {
      console.error('Error during immolation:', error);
      showToast({
        title: 'Error',
        description: 'Failed to complete the ritual. Please try again.',
        type: 'destructive',
      });
    }
  };

  if (!isActive) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Ego Dissolution Chamber</h2>
        <p className="text-muted-foreground">
          Complete 7 days of coherence to unlock this chamber.
        </p>
      </Card>
    );
  }

  if (isBurning) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <ParticleEffect isActive={true} text={burningText} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="text-center z-50"
        >
          <Flame className="h-32 w-32 text-red-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-2">
            OLD IDENTITY DISSOLVED
          </h2>
          <p className="text-xl text-gray-400">
            THE VOID IS PREPARED. AWAITING NEW INSTALLATION.
          </p>
        </motion.div>
      </div>
    );
  }

  if (showMeditation) {
    return (
      <PreImmolationMeditation
        onComplete={() => {
          setShowMeditation(false);
          setIsImmolating(true);
        }}
      />
    );
  }

  if (isImmolating) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">The Immolation</h2>
        <p className="text-muted-foreground mb-8">
          Press and hold the button for 11 seconds to complete the ritual.
        </p>
        <Button
          ref={buttonRef}
          variant="destructive"
          size="lg"
          className="w-64 h-64 rounded-full text-2xl"
          onMouseDown={handleImmolationStart}
          onMouseUp={handleImmolationEnd}
          onMouseLeave={handleImmolationEnd}
          onTouchStart={handleImmolationStart}
          onTouchEnd={handleImmolationEnd}
        >
          {countdown === 11 ? (
            'INCINERATE OLD SELF'
          ) : (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <span>{countdown}</span>
            </div>
          )}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {PURGE_STEPS[currentStep].title}
          </h2>
          <p className="text-muted-foreground">
            {PURGE_STEPS[currentStep].prompt}
          </p>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
          placeholder="Begin your purge..."
        />

        <div className="space-y-2">
          <Progress
            value={(content.length / PURGE_STEPS[currentStep].minLength) * 100}
          />
          <p className="text-sm text-muted-foreground">
            {content.length} / {PURGE_STEPS[currentStep].minLength} characters
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={content.length < PURGE_STEPS[currentStep].minLength}
        >
          {currentStep === PURGE_STEPS.length - 1 ? 'Complete Purge' : 'Next'}
        </Button>
      </div>
    </Card>
  );
} 