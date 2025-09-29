"use client";

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

interface LoaderProps {
  isVisible: boolean;
}

export default function Loader({ isVisible }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    "Analyzing requirements...",
    "Reducing waste...", 
    "Generating patterns...",
    "Optimizing cuts...",
    "Finalizing layout..."
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStage(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        const newProgress = prev + Math.random() * 3;
        setStage(Math.floor(newProgress / 20));
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '1rem'
    }}>
      <div
        className="bg-white rounded-lg shadow-2xl px-6 sm:px-8 py-6 sm:py-8"
        style={{ width: 'min(90vw, 26rem)' }}
      >
        {/* Progress Text */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Optimizing Cutting Pattern</h3>
          <p className="text-sm text-gray-600">Processing your requirements...</p>
        </div>

        {/* Roll Unrolling Animation */}
        <div className="relative h-32 mb-6 overflow-hidden bg-gray-50 rounded-lg">
          {/* Roll */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 relative shadow-xl animate-spin" 
                 style={{ animationDuration: '3s' }}>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-300 to-blue-500"></div>
              <div className="absolute inset-6 rounded-full bg-white opacity-30"></div>
            </div>
          </div>

          {/* Unrolling Sheet */}
          <div 
            className="absolute top-1/2 h-12 bg-gradient-to-b from-white to-gray-100 border-t border-b border-gray-300 transition-all duration-500 shadow-md"
            style={{
              left: '6rem',
              width: `${Math.min(progress * 3, 280)}px`,
              transform: 'translateY(-50%)'
            }}
          >
            {/* Cut Patterns */}
            {progress > 20 && (
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: Math.floor(progress / 15) }).map((_, i) => (
                  <div key={i} 
                       className="absolute border-l border-dashed border-gray-400" 
                       style={{ left: `${20 + i * 25}px`, height: '100%' }} />
                ))}
              </div>
            )}
          </div>

          {/* Laser Cutter */}
          <div 
            className="absolute top-1/2 w-1 bg-gradient-to-b from-red-400 to-red-600 transition-all duration-300"
            style={{
              left: `${96 + Math.min(progress * 2.8, 260)}px`,
              height: '60px',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4)',
              opacity: progress > 10 ? 1 : 0
            }}
          >
            <div className="absolute -top-2 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Grid Pattern (Final State) */}
          {progress > 90 && (
            <div className="absolute top-1/2 transition-all duration-1000" 
                 style={{
                   left: '6rem',
                   width: `${Math.min(progress * 3, 280)}px`,
                   height: '48px',
                   transform: 'translateY(-50%)'
                 }}>
              <div className="grid grid-cols-6 grid-rows-3 gap-0.5 h-full opacity-60">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="bg-blue-200 border border-blue-300 animate-pulse" 
                       style={{ animationDelay: `${i * 50}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="text-center text-sm text-gray-500 h-5">
          <span className="animate-pulse">{stages[Math.min(stage, stages.length - 1)]}</span>
        </div>
        
      </div>
    </div>,
    document.body
  );
}