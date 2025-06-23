import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EvidenceUploadProps {
  onEvidenceSubmit: (evidence: { 
    description: string; 
    impact: string;
    files?: File[];
  }) => void;
}

export function EvidenceUpload({ onEvidenceSubmit }: EvidenceUploadProps) {
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    
    if (!impact.trim()) {
      newErrors.impact = 'Impact description is required';
    } else if (impact.length < 30) {
      newErrors.impact = 'Impact description must be at least 30 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValid = file.size <= 5 * 1024 * 1024; // 5MB limit
      if (!isValid) {
        showToast({ 
          title: 'File too large', 
          description: `${file.name} exceeds 5MB limit`,
          type: 'destructive'
        });
      }
      return isValid;
    });
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate actual upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onEvidenceSubmit({ description, impact, files });
      setDescription('');
      setImpact('');
      setFiles([]);
      setUploadProgress(100);
      
      showToast({ 
        title: 'Evidence submitted successfully',
        description: 'Your quantum field interaction has been recorded'
      });
    } catch (error) {
      showToast({ 
        title: 'Upload failed',
        description: 'Please try again',
        type: 'destructive'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Upload Evidence</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Description of Field Interaction
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your quantum field interaction..."
            className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Impact on Reality
          </label>
          <textarea
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="How did this interaction manifest in your reality?"
            className={`w-full p-2 border rounded-md ${errors.impact ? 'border-red-500' : ''}`}
            rows={3}
          />
          {errors.impact && (
            <p className="text-red-500 text-sm mt-1">{errors.impact}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Supporting Files (Optional)
          </label>
          <div className="border-2 border-dashed rounded-md p-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept="image/*,video/*,.pdf"
            />
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mb-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <p className="text-sm text-muted-foreground">
                Max file size: 5MB. Supported formats: Images, Videos, PDF
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {isUploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-muted-foreground text-center">
              Uploading evidence...
            </p>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            'Submit Evidence'
          )}
        </Button>
      </form>
    </Card>
  );
} 