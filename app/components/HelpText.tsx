'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface HelpTextProps {
  title: string;
  content: string;
  tooltip?: string;
}

export function HelpText({ title, content, tooltip }: HelpTextProps) {
  return (
    <Card className="p-4 bg-muted/50">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-blue-400">{title}</h4>
          <p className="text-sm text-muted-foreground">{content}</p>
          {tooltip && (
            <p className="text-xs text-muted-foreground/70">{tooltip}</p>
          )}
        </div>
      </div>
    </Card>
  );
} 