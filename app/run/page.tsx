"use client";

import { useState } from "react";
import RunPage from "@/components/run-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Run() {
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleOptimizationSuccess = (data: any) => {
    setOptimizationResults(data);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
    
    setTimeout(() => {
      const resultsElement = document.querySelector('[data-results-section]')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  };

  return (
    <>
      <Navigation />
      
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-bounce-in">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Optimization completed successfully!</span>
          </div>
        </div>
      )}
      
      <main className="w-full px-6 lg:px-8 py-8">
        <RunPage
          onOptimizationSuccess={handleOptimizationSuccess}
          isOptimizing={isOptimizing}
          setIsOptimizing={setIsOptimizing}
          optimizationResults={optimizationResults}
          setOptimizationResults={setOptimizationResults}
        />
      </main>
      
      <Footer />
    </>
  );
}