import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SuccessStory {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface DiscussionTopic {
  id: string;
  title: string;
  replies: number;
  lastActivity: string;
}

export function CommunityFeatures() {
  // Placeholder data - replace with actual data from backend
  const successStories: SuccessStory[] = [
    {
      id: '1',
      title: 'My Quantum Breakthrough',
      content: 'After 30 days of consistent practice, I experienced a profound shift in my manifestation abilities...',
      author: 'Sarah M.',
      date: '2024-02-15'
    },
    {
      id: '2',
      title: 'The Power of Daily Practice',
      content: 'The daily sessions have transformed my approach to goal setting and achievement...',
      author: 'John D.',
      date: '2024-02-14'
    }
  ];

  const discussionTopics: DiscussionTopic[] = [
    {
      id: '1',
      title: 'Tips for Morning Sessions',
      replies: 12,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      title: 'Evidence Collection Ideas',
      replies: 8,
      lastActivity: '5 hours ago'
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Community</h2>
      
      <Tabs defaultValue="stories">
        <TabsList>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="experts">Expert Guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="stories">
          <div className="space-y-4">
            {successStories.map(story => (
              <Card key={story.id} className="p-4">
                <h3 className="font-semibold mb-2">{story.title}</h3>
                <p className="text-muted-foreground mb-2">{story.content}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>By {story.author}</span>
                  <span>{story.date}</span>
                </div>
              </Card>
            ))}
            <Button variant="outline" className="w-full">Share Your Story</Button>
          </div>
        </TabsContent>

        <TabsContent value="discussions">
          <div className="space-y-4">
            {discussionTopics.map(topic => (
              <Card key={topic.id} className="p-4">
                <h3 className="font-semibold mb-2">{topic.title}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{topic.replies} replies</span>
                  <span>Last activity: {topic.lastActivity}</span>
                </div>
              </Card>
            ))}
            <Button variant="outline" className="w-full">Start New Discussion</Button>
          </div>
        </TabsContent>

        <TabsContent value="experts">
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Weekly Q&A Session</h3>
              <p className="text-muted-foreground mb-2">
                Join our quantum consciousness experts for a live Q&A session every Thursday at 7 PM EST.
              </p>
              <Button variant="outline" className="w-full">Register Now</Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground mb-2">
                Get personalized guidance from our certified quantum consciousness practitioners.
              </p>
              <Button variant="outline" className="w-full">Book a Session</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 