import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface QuantumFieldStatusProps {
  quantumField: {
    coherence: number;
    syncAmplification: number;
    evidenceCount: number;
  };
  currentDay: number;
  archetype: string;
}

export const QuantumFieldStatus: React.FC<QuantumFieldStatusProps> = ({
  quantumField,
  currentDay,
  archetype
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Field Coherence</h4>
          <div className="space-y-2">
            <Progress value={quantumField.coherence} />
            <p className="text-2xl font-bold">{quantumField.coherence}%</p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Sync Amplification</h4>
          <div className="space-y-2">
            <Progress value={quantumField.syncAmplification * 100} />
            <p className="text-2xl font-bold">x{quantumField.syncAmplification.toFixed(1)}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Evidence Collected</h4>
          <div className="space-y-2">
            <Progress value={(quantumField.evidenceCount / currentDay) * 100} />
            <p className="text-2xl font-bold">{quantumField.evidenceCount}</p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h4 className="text-sm font-medium mb-2">Current Status</h4>
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Day {currentDay} • {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Archetype
          </p>
          <p className="text-sm">
            {quantumField.coherence >= 80
              ? "Your quantum field is highly coherent. Perfect time for manifestation!"
              : quantumField.coherence >= 50
              ? "Your quantum field is stable. Keep building momentum."
              : "Your quantum field is forming. Focus on daily practice."}
          </p>
        </div>
      </Card>
    </div>
  );
}; 