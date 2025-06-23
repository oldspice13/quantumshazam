"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Add type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface VoiceMessage {
  id: string;
  type: 'user' | 'godself';
  audioUrl: string;
  text: string;
  timestamp: Date;
}

export const VoiceIntegration: React.FC<{
  onUserMessage: (text: string) => void;
  onGodselfResponse: (text: string) => Promise<string>;
}> = ({ onUserMessage, onGodselfResponse }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<VoiceMessage | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check browser compatibility
  useEffect(() => {
    if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
      setError('Your browser does not support audio recording. Please use a modern browser like Chrome or Firefox.');
    }
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setError('Your browser does not support speech recognition. Please use Chrome for the best experience.');
    }
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Convert audio to text using Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Set language

        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          const message: VoiceMessage = {
            id: Date.now().toString(),
            type: 'user',
            audioUrl,
            text,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, message]);
          onUserMessage(text);

          // Get Godself response
          handleGodselfResponse(text);
        };

        recognition.onerror = (event) => {
          setError(`Speech recognition error: ${event.error}`);
        };

        recognition.start();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      setError('Error starting recording. Please check your microphone permissions.');
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleGodselfResponse = async (userText: string) => {
    try {
      setError(null);
      const response = await onGodselfResponse(userText);
      
      // Convert text to speech
      const audioBlob = await textToSpeech(response);
      const audioUrl = URL.createObjectURL(audioBlob);

      const message: VoiceMessage = {
        id: Date.now().toString(),
        type: 'godself',
        audioUrl,
        text: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, message]);
      setCurrentMessage(message);
      playAudio(audioUrl);
    } catch (error) {
      setError('Error getting Godself response. Please try again.');
      console.error('Error getting Godself response:', error);
    }
  };

  const textToSpeech = async (text: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 1.0; // Normal pitch

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const mediaStreamDestination = audioContext.createMediaStreamDestination();
        const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => resolve(new Blob(chunks, { type: 'audio/wav' }));

        mediaRecorder.start();
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => mediaRecorder.stop();
      } catch (error) {
        reject(error);
      }
    });
  };

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(error => {
        setError('Error playing audio. Please check your audio settings.');
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="text-sm mt-2">Please try using Chrome for the best experience.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Voice Dialogue</h3>
        <p className="text-muted-foreground">
          Speak with your Godself
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'destructive' : 'default'}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          {isPlaying && (
            <Button
              onClick={stopAudio}
              variant="outline"
            >
              Stop Playback
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Recording: {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playAudio(message.audioUrl)}
                >
                  Play
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} className="hidden" />
    </Card>
  );
}; 