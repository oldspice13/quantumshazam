import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const concepts = {
  quantumField: {
    title: "Quantum Field",
    description: "The quantum field is the fundamental fabric of reality where consciousness and matter interact. It's the space where your thoughts and intentions can influence physical reality.",
    keyPoints: [
      "A unified field where consciousness and matter are interconnected",
      "The medium through which quantum consciousness operates",
      "Where your intentions can manifest as physical reality"
    ]
  },
  consciousnessSessions: {
    title: "Consciousness Sessions",
    description: "Structured meditation and awareness practices designed to enhance your connection with the quantum field and develop your consciousness.",
    keyPoints: [
      "Guided meditations to expand awareness",
      "Energy work to strengthen your connection",
      "Visualization techniques for manifestation"
    ]
  },
  realWorldIntegration: {
    title: "Real World Integration",
    description: "Practical exercises and activities that help you apply quantum consciousness principles in your daily life.",
    keyPoints: [
      "Daily practices to maintain quantum awareness",
      "Exercises to strengthen your connection",
      "Activities to manifest your intentions"
    ]
  },
  evidenceCollection: {
    title: "Evidence Collection",
    description: "Documenting your journey through photos, videos, and notes to track your progress and manifestations.",
    keyPoints: [
      "Visual proof of your manifestations",
      "Progress tracking and reflection",
      "Building confidence in your abilities"
    ]
  }
};

export function ConceptsGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Understanding Quantum Consciousness</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {Object.entries(concepts).map(([key, concept]) => (
            <div key={key} className="space-y-2">
              <h3 className="text-lg font-semibold">{concept.title}</h3>
              <p className="text-muted-foreground">{concept.description}</p>
              <ul className="list-disc pl-6 space-y-1">
                {concept.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 