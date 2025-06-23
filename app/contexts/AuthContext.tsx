"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

interface User {
  id: string;
  email: string;
  name: string;
  progress: {
    completedDays: number[];
    lastActive: string;
    streak: number;
    evidence: {
      dayId: number;
      description: string;
      impact: string;
    }[];
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateProgress: (dayId: number, evidence?: { description: string; impact: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        progress: {
          completedDays: [],
          lastActive: new Date().toISOString(),
          streak: 0,
          evidence: []
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      showToast({ title: 'Login successful' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      showToast({ title: 'Login failed', type: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('user');
      showToast({ title: 'Logged out successfully' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      showToast({ title: 'Logout failed', type: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      showToast({ title: 'Profile updated' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      showToast({ title: 'Update failed', type: 'destructive' });
    }
  };

  const updateProgress = async (dayId: number, evidence?: { description: string; impact: string }) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Calculate new streak
      const completedDays = [...user.progress.completedDays, dayId].sort();
      let newStreak = 1; // Start with 1 for the current day
      
      // Check previous days for streak
      for (let i = completedDays.length - 2; i >= 0; i--) {
        const currentDay = completedDays[i];
        const nextDay = completedDays[i + 1];
        
        // If days are consecutive, increment streak
        if (nextDay - currentDay === 1) {
          newStreak++;
        } else {
          break;
        }
      }
      
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          completedDays: completedDays,
          lastActive: new Date().toISOString(),
          streak: newStreak,
          evidence: evidence 
            ? [...user.progress.evidence, { dayId, ...evidence }]
            : user.progress.evidence
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Show appropriate toast message
      if (newStreak > user.progress.streak) {
        showToast({ 
          title: 'New Streak Record!', 
          description: `You've maintained your practice for ${newStreak} day${newStreak !== 1 ? 's' : ''}!`,
          type: 'success'
        });
      } else {
        showToast({ title: 'Progress updated' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Progress update failed');
      showToast({ title: 'Progress update failed', type: 'destructive' });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 