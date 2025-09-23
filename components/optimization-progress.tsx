"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  CogIcon 
} from "@heroicons/react/24/outline";

interface OptimizationProgressProps {
  isOptimizing: boolean;
  progress?: number;
  message?: string;
  estimatedTime?: string;
  onCancel?: () => void;
}

export default function OptimizationProgress({
  isOptimizing,
  progress = 0,
  message = "Preparing optimization...",
  estimatedTime,
  onCancel
}: OptimizationProgressProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (isOptimizing && !startTime) {
      setStartTime(new Date());
      setElapsedTime(0);
    } else if (!isOptimizing) {
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [isOptimizing, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOptimizing && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOptimizing, startTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOptimizing) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50/50 border-blue-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <CogIcon className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-gray-900">Optimization in Progress</span>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Processing
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-200"
          />
        </div>

        {/* Status Message */}
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700">{message}</span>
        </div>

        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-gray-600">Elapsed Time</div>
              <div className="font-medium text-gray-900">{formatTime(elapsedTime)}</div>
            </div>
          </div>
          
          {estimatedTime && (
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-gray-600">Estimated</div>
                <div className="font-medium text-gray-900">{estimatedTime}</div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <ExclamationCircleIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <div className="font-medium mb-1">Optimization Tips:</div>
              <ul className="space-y-1">
                <li>• Large problems may take 1-3 minutes to complete</li>
                <li>• Please keep this tab open during processing</li>
                <li>• Results will appear automatically when ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <div className="flex justify-center pt-2">
            <button
              onClick={onCancel}
              className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
            >
              Cancel Optimization
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}