// Trigger redeploy: force clean build
"use client"

import { useState, useEffect } from 'react';
import { QuantumDeathRitual } from '@/components/QuantumDeathRitual';
import { BioelectricIntegration } from '@/components/BioelectricIntegration';
import { TemporalCollapseProtocol } from '@/components/TemporalCollapseProtocol';
import { SelfAuthoredDivinity } from '@/components/SelfAuthoredDivinity';
import { DailySession } from '@/components/DailySession';
import { RealWorldIntegration } from '@/components/RealWorldIntegration';
import { QuantumFieldStatus } from '@/components/QuantumFieldStatus';
import { GodselfDebateChamber } from '@/components/GodselfDebateChamber';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

interface QuantumFieldState {
  coherence: number;
  syncAmplification: number;
  evidenceCount: number;
}

export default function Home() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [fieldStatus, setFieldStatus] = useState<QuantumFieldState>(() => {
    const saved = localStorage.getItem('quantumFieldStatus');
    return saved ? JSON.parse(saved) : {
      coherence: 0,
      syncAmplification: 1.0,
      evidenceCount: 0
    };
  });
  const [activeTab, setActiveTab] = useState('debate');

  // Save field status to localStorage
  useEffect(() => {
    localStorage.setItem('quantumFieldStatus', JSON.stringify(fieldStatus));
  }, [fieldStatus]);

  const handleDebateComplete = (insights: string[]) => {
    setFieldStatus((prev: QuantumFieldState) => {
      const newStatus = {
        ...prev,
        coherence: Math.min(prev.coherence + 15, 100),
        evidenceCount: prev.evidenceCount + 1,
        syncAmplification: prev.syncAmplification + 0.1
      };

      // Show toast for significant progress
      if (newStatus.coherence >= 50 && prev.coherence < 50) {
        showToast({
          title: 'Quantum Breakthrough!',
          description: 'You have reached 50% coherence. The quantum transformation chamber is now accessible.',
          type: 'success'
        });
        setActiveTab('quantum');
      }

      return newStatus;
    });
  };

  const handleQuantumComplete = () => {
    setFieldStatus((prev: QuantumFieldState) => ({
      ...prev,
      coherence: Math.min(prev.coherence + 10, 100),
      syncAmplification: prev.syncAmplification + 0.2
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Quantum Transformation Chamber
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="debate">Godself Debate</TabsTrigger>
            <TabsTrigger 
              value="quantum" 
              disabled={fieldStatus.coherence < 50}
              className={fieldStatus.coherence < 50 ? 'opacity-50' : ''}
            >
              Quantum Transformation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="debate" className="space-y-6">
            <GodselfDebateChamber
              onDebateComplete={handleDebateComplete}
            />
            <QuantumFieldStatus
              quantumField={fieldStatus}
              currentDay={currentDay}
              archetype="godself"
            />
          </TabsContent>

          <TabsContent value="quantum" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuantumDeathRitual />
              <BioelectricIntegration />
              <TemporalCollapseProtocol />
              <SelfAuthoredDivinity />
            </div>

            <div className="mt-8">
              <DailySession
                title="Quantum Integration"
                duration={900}
                description="Integrate quantum states through conscious observation"
                onComplete={handleQuantumComplete}
              />
              <RealWorldIntegration
                title="Field Application"
                actions={[
                  { 
                    id: '1', 
                    description: 'Apply quantum principles', 
                    impact: 'Strengthen quantum field coherence'
                  }
                ]}
                onComplete={() => {
                  setFieldStatus((prev: QuantumFieldState) => ({
                    ...prev,
                    evidenceCount: prev.evidenceCount + 1
                  }));
                }}
              />
              <QuantumFieldStatus
                quantumField={fieldStatus}
                currentDay={currentDay}
                archetype="quantum"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
} 