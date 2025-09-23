"use client";

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

interface LoaderProps {
  isVisible: boolean;
}

export default function Loader({ isVisible }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 3;
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
      flexDirection: 'column'
    }}>
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
        {/* Progress Text */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Optimizing Cutting Pattern</h3>
          <p className="text-sm text-gray-600">Processing your requirements...</p>
        </div>

        {/* Roll Cutter Animation */}
        <div className="relative h-24 mb-6 overflow-hidden">
          {/* Roll */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-spin-slow relative shadow-lg">
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-200 to-blue-400"></div>
            </div>
          </div>

          {/* Cutter Line */}
          <div 
            className="absolute top-1/2 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 shadow-lg transition-all duration-300"
            style={{
              left: '5rem',
              width: `${Math.min(progress * 2, 100)}%`,
              transform: 'translateY(-50%)',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
            }}
          ></div>

          {/* Unrolling Sheet */}
          <div 
            className="absolute top-1/2 h-8 bg-gradient-to-r from-gray-100 to-white border border-gray-200 transition-all duration-300"
            style={{
              left: '5rem',
              width: `${progress * 2}%`,
              transform: 'translateY(-50%)'
            }}
          ></div>
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

        {/* Status Text */}
        <div className="text-center text-sm text-gray-500">
          Analyzing cutting patterns and optimizing waste reduction...
        </div>
      </div>
    </div>,
    document.body
  );
}