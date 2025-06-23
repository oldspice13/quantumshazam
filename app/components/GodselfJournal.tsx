"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JournalEntry {
  id: string;
  date: Date;
  insight: string;
  reflection: string;
  tags: string[];
}

export const GodselfJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [reflection, setReflection] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('godselfJournal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('godselfJournal', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (insight: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      insight,
      reflection: '',
      tags: []
    };
    setEntries(prev => [...prev, newEntry]);
    setSelectedEntry(newEntry);
    setIsEditing(true);
  };

  const handleUpdateEntry = () => {
    if (!selectedEntry) return;

    const updatedEntry: JournalEntry = {
      ...selectedEntry,
      reflection,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setEntries(prev =>
      prev.map(entry =>
        entry.id === selectedEntry.id ? updatedEntry : entry
      )
    );
    setIsEditing(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Godself Journal</h3>
        <p className="text-muted-foreground">
          Capture and reflect on your transformative insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Recent Entries</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {entries.map(entry => (
              <Card
                key={entry.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedEntry?.id === entry.id ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  setSelectedEntry(entry);
                  setReflection(entry.reflection);
                  setTags(entry.tags.join(', '));
                  setIsEditing(false);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{entry.insight}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.date.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEntry(entry.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {selectedEntry && (
          <div className="space-y-4">
            <h4 className="font-medium">Reflection</h4>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{selectedEntry.insight}</p>
              </div>
              
              {isEditing ? (
                <>
                  <Input
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Write your reflection..."
                    className="h-32"
                  />
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags (comma-separated)"
                  />
                  <Button onClick={handleUpdateEntry}>
                    Save Reflection
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedEntry.reflection || 'No reflection yet...'}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Reflection
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}; 