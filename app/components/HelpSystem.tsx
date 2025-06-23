'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HelpCircle, Search, X } from 'lucide-react';

interface HelpTopic {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

const helpTopics: HelpTopic[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: 'Learn the basics of using the Godself Debate Chamber, including how to start a session, use voice features, and track your progress.',
    keywords: ['start', 'begin', 'basics', 'tutorial'],
  },
  {
    id: 'voice-features',
    title: 'Voice Features',
    content: 'Discover how to use voice recording, speech-to-text, and text-to-speech features for a more immersive experience.',
    keywords: ['voice', 'recording', 'speech', 'audio'],
  },
  {
    id: 'evidence-tracking',
    title: 'Evidence Tracking',
    content: 'Learn how to document and track your transformation through real-world evidence, synchronicities, and impact measurements.',
    keywords: ['evidence', 'tracking', 'progress', 'measurement'],
  },
  {
    id: 'identity-transformation',
    title: 'Identity Transformation',
    content: 'Understand how to define your current and desired identity, track traits, and document limiting beliefs.',
    keywords: ['identity', 'transformation', 'traits', 'beliefs'],
  },
  {
    id: 'meditation-timer',
    title: 'Meditation Timer',
    content: 'Learn how to use the meditation timer feature to prepare for your debate sessions.',
    keywords: ['meditation', 'timer', 'preparation', 'focus'],
  },
  {
    id: 'journaling',
    title: 'Journaling',
    content: 'Discover how to use the journaling feature to document insights, reflections, and breakthroughs.',
    keywords: ['journal', 'insights', 'reflections', 'breakthroughs'],
  },
];

export function HelpSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);

  const filteredTopics = helpTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Help Center</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {selectedTopic ? (
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedTopic(null)}
                  >
                    ← Back to topics
                  </Button>
                  <h3 className="text-xl font-semibold">{selectedTopic.title}</h3>
                  <p className="text-muted-foreground">{selectedTopic.content}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTopics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="p-4 cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <h3 className="font-semibold">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.content}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
} 