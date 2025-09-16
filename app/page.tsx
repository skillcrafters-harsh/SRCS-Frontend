"use client"

import { useState } from "react"

import { HomeIcon, DocumentTextIcon, PlayIcon, CodeBracketIcon, BookOpenIcon, InformationCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import HomePage from "@/components/home-page"
import ExamplePage from "@/components/example-page"
import RunPage from "@/components/run-page"
import ApiDocsPage from "@/components/api-docs-page"
import ApiReferencePage from "@/components/api-reference-page"
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

  const handleOptimization = async (data: any, source: "manual" | "excel") => {
    setIsOptimizing(true)

    try {
      console.log("Optimizing with data:", data, "from source:", source)
      
      // Set the actual API response data
      setOptimizationResults(data)
      setActiveMainTab("run")
      setShowSuccessPopup(true)
      setTimeout(() => setShowSuccessPopup(false), 3000)
    } catch (error) {
      console.error("Optimization failed:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in">
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

      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="flex-shrink-0">
                <img src="/main-logo.png" alt="Smart Roll Cutting Solution" className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">Smart Roll Cutting Solutions</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 animate-slide-in-right">
              <button
                onClick={() => setActiveMainTab("home")}
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
                onClick={() => setActiveMainTab("example")}
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
                onClick={() => setActiveMainTab("run")}
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
                onClick={() => setActiveMainTab("api-docs")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "api-docs"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <BookOpenIcon className="h-4 w-4" />
                <span>API Docs</span>
              </button>
              <button
                onClick={() => setActiveMainTab("api-reference")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  activeMainTab === "api-reference"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <CodeBracketIcon className="h-4 w-4" />
                <span>API Reference</span>
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
                    setActiveMainTab("home")
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
                    setActiveMainTab("example")
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
                    setActiveMainTab("run")
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
                    setActiveMainTab("api-docs")
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
                <button
                  onClick={() => {
                    setActiveMainTab("api-reference")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                    activeMainTab === "api-reference"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  <span>API Reference</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className={`w-full ${activeMainTab === "home" ? "" : "px-6 lg:px-8 py-8"}`}>
        <div className="tab-content">
          {activeMainTab === "home" && <HomePage onNavigate={setActiveMainTab} />}

          {activeMainTab === "example" && <ExamplePage />}
          {activeMainTab === "run" && (
            <RunPage
              onOptimize={handleOptimization}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
          )}
          {activeMainTab === "api-docs" && <ApiDocsPage />}
          {activeMainTab === "api-reference" && <ApiReferencePage />}
        </div>
      </main>

      <footer className="bg-white/95 backdrop-blur-md border-t border-border mt-16">
        <div className="w-full px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="/logo.png" alt="Smart Roll Cutting Solution" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold text-foreground">Smart Roll Cutting Solutions</h3>
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
                      onClick={() => setActiveMainTab("api-docs")}
                      className="hover:text-primary transition-colors"
                    >
                      • API Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveMainTab("api-reference")}
                      className="hover:text-primary transition-colors"
                    >
                      • API Reference
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveMainTab("example")}
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
              <p className="text-sm text-muted-foreground">© 2024 Smart Roll Cutting Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
