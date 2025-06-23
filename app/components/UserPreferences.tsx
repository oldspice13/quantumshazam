import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface UserPreferencesProps {
  preferences: {
    name: string;
    email: string;
    notificationSettings: {
      dailyReminder: boolean;
      weeklyReport: boolean;
      evidenceAlerts: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
  onSave: (preferences: UserPreferencesProps['preferences']) => void;
}

export const UserPreferences: React.FC<UserPreferencesProps> = ({
  preferences,
  onSave
}) => {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  const handleChange = (field: string, value: any) => {
    setLocalPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setLocalPreferences(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: value
      }
    }));
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold">User Preferences</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Name</label>
          <Input
            value={localPreferences.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Email</label>
          <Input
            type="email"
            value={localPreferences.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Notification Settings</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={localPreferences.notificationSettings.dailyReminder}
                onCheckedChange={(checked: boolean) => handleNotificationChange('dailyReminder', checked)}
              />
              <span className="text-sm">Daily Practice Reminder</span>
            </label>

            <label className="flex items-center space-x-2">
              <Checkbox
                checked={localPreferences.notificationSettings.weeklyReport}
                onCheckedChange={(checked: boolean) => handleNotificationChange('weeklyReport', checked)}
              />
              <span className="text-sm">Weekly Progress Report</span>
            </label>

            <label className="flex items-center space-x-2">
              <Checkbox
                checked={localPreferences.notificationSettings.evidenceAlerts}
                onCheckedChange={(checked: boolean) => handleNotificationChange('evidenceAlerts', checked)}
              />
              <span className="text-sm">Evidence Collection Alerts</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Theme</h4>
          <select
            value={localPreferences.theme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('theme', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onSave(localPreferences)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Preferences
        </Button>
      </div>
    </Card>
  );
}; 