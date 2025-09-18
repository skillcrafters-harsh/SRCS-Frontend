"use client"

import { useState, useEffect } from "react"

import { HomeIcon, DocumentTextIcon, PlayIcon, CodeBracketIcon, BookOpenIcon, InformationCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import HomePage from "@/components/home-page"
import ExamplePage from "@/components/example-page"
import RunPage from "@/components/run-page"
import ApiDocsPage from "@/components/api-docs-page"
import SEOContentPage from "@/components/seo-content-page"

type OptimizationResults = {
  summary: {
    totalRollsUsed: number
    totalWastage: number
    totalCutterChanges: number
    utilizationPercentage: number
    efficiency: number
    costSavings: number
  }
  strategies: {
    minimizeCutterChanges: {
      rollsUsed: number
      wastage: number
      cutterChanges: number
      efficiency: number
    }
    minimizeWastage: {
      rollsUsed: number
      wastage: number
      cutterChanges: number
      efficiency: number
    }
  }
  cuttingPlan: Array<{
    rollId: number
    decalSize: number
    cuts: Array<{
      size: number
      quantity: number
      actualSize: number
      uom: string
    }>
    wastage: number
    usagePercent: number
  }>
}

export default function RollCuttingOptimization() {
  const [activeMainTab, setActiveMainTab] = useState("home")
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResults | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveMainTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Provide a navigation handler for child components that also scrolls to top
  const handleNavigate = (tab: string) => {
    setActiveMainTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  const handleOptimization = async (data: any, source: "manual" | "excel") => {
    if (data === null) {
      setOptimizationResults(null);
      return;
    }
    
    setIsOptimizing(true);
    try {
      console.log("Optimizing with data:", data, "from source:", source);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setOptimizationResults(data);
      setActiveMainTab("run");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      
      setTimeout(() => {
        const resultsElement = document.querySelector('[data-results-section]')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
  <div className="min-h-screen bg-white animate-fade-in">
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


<style jsx global>{`
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 2.5s linear infinite;
  }
`}</style>

      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center  animate-slide-in-left">
              <div className="flex-shrink-0">
                <img src="/main-logo.png" alt="Smart Roll Cutting Solution" className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
              <div className="w-[100%]">
                <div className="text-lg sm:text-xl font-bold text-foreground uppercase" style={{fontFamily: 'Helvetica', color: '#08429d'}}>Smart Roll</div>
                <div className="text-sm sm:text-[11px] uppercase w-[85%] mx-auto">Cutting Solution</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 animate-slide-in-right">
              <button
                onClick={() => handleTabChange("home")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "home"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleTabChange("example")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "example"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span>Example</span>
              </button>
              <button
                onClick={() => handleTabChange("run")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "run"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <PlayIcon className="h-4 w-4" />
                <span>Run</span>
              </button>
              <button
                onClick={() => handleTabChange("api-docs")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "api-docs"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <BookOpenIcon className="h-4 w-4" />
                <span>API Docs</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-border">
                <button
                  onClick={() => {
                    handleTabChange("home")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                    activeMainTab === "home"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    handleTabChange("example")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                    activeMainTab === "example"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5" />
                  <span>Example</span>
                </button>
                <button
                  onClick={() => {
                    handleTabChange("run")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                    activeMainTab === "run"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Run</span>
                </button>
                <button
                  onClick={() => {
                    handleTabChange("api-docs")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                    activeMainTab === "api-docs"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <BookOpenIcon className="h-5 w-5" />
                  <span>API Docs</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className={`w-full ${activeMainTab === "home" ? "" : "px-6 lg:px-8 py-8"}`}>
        <div className="tab-content">
          {activeMainTab === "home" && <HomePage onNavigate={handleNavigate} />}

          {activeMainTab === "example" && <ExamplePage />}
          {activeMainTab === "run" && (
            <RunPage
              onOptimize={handleOptimization}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
          )}
          {activeMainTab === "api-docs" && <ApiDocsPage />}
        </div>
      </main>

      <footer className="bg-white/95 backdrop-blur-md border-t border-border mt-16">
        <div className="w-full px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="/logo.png" alt="Smart Roll Cutting Solution" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold text-foreground">Smart Roll Cutting Solution</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Advanced manufacturing optimization with intelligent cutting pattern generation. Reduce waste, save
                  costs, and improve efficiency in your manufacturing process.
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Manual Input & Excel Upload</li>
                  <li>• Dual Optimization Strategies</li>
                  <li>• Visual Cutting Plans</li>
                  <li>• Performance Analytics</li>
                  <li>• API Integration</li>
                  <li>• Export Capabilities</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button
                      onClick={() => handleTabChange("api-docs")}
                      className="hover:text-primary transition-colors"
                    >
                      • API Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabChange("example")}
                      className="hover:text-primary transition-colors"
                    >
                      • Examples
                    </button>
                  </li>
                  <li>• Contact Support</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-6 text-center">
              <p className="text-sm text-muted-foreground">© 2024 Smart Roll Cutting Solution. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
