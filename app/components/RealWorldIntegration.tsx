import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

interface IntegrationProps {
  title: string;
  actions: {
    id: string;
    description: string;
    impact: string;
  }[];
  onComplete: () => void;
}

export const RealWorldIntegration: React.FC<IntegrationProps> = ({
  title,
  actions,
  onComplete
}) => {
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const progress = (completedActions.length / actions.length) * 100;

  const handleActionComplete = (actionId: string) => {
    setCompletedActions(prev => {
      const newCompleted = prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId];
      
      if (newCompleted.length === actions.length) {
        setShowConfirmation(true);
      }
      
      return newCompleted;
    });
  };

  const handleConfirm = () => {
    onComplete();
    setShowConfirmation(false);
    setCompletedActions([]);
  };

  const handleReset = () => {
    setCompletedActions([]);
    setShowConfirmation(false);
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">
          Complete these actions to integrate quantum principles into your daily life
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="space-y-4">
        {actions.map(action => (
          <div key={action.id} className="flex items-start space-x-3">
            <Checkbox
              checked={completedActions.includes(action.id)}
              onCheckedChange={(checked: boolean) => handleActionComplete(action.id)}
            />
            <div>
              <p className="text-sm font-medium">{action.description}</p>
              <p className="text-sm text-muted-foreground">{action.impact}</p>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="p-4 bg-muted rounded-lg space-y-3">
          <p className="text-sm font-medium">All actions completed!</p>
          <p className="text-sm text-muted-foreground">
            Would you like to record this achievement and move to the next step?
          </p>
          <div className="flex space-x-2">
            <Button onClick={handleConfirm} className="flex-1">
              Confirm & Continue
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}; 