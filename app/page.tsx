"use client"

import { useState } from "react"
import { HomeIcon, DocumentTextIcon, PlayIcon, CodeBracketIcon, BookOpenIcon } from "@heroicons/react/24/outline"
import HomePage from "@/components/home-page"
import ExamplePage from "@/components/example-page"
import RunPage from "@/components/run-page"
import ApiDocsPage from "@/components/api-docs-page"
import ApiReferencePage from "@/components/api-reference-page"

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

  const handleOptimization = async (data: any, source: "manual" | "excel") => {
    setIsOptimizing(true)

    try {
      console.log("Optimizing with data:", data, "from source:", source)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockResults = {
        summary: {
          totalRollsUsed: 4,
          totalWastage: 50.8,
          totalCutterChanges: 3,
          utilizationPercentage: 98.86,
          efficiency: 89.95,
          costSavings: 4373,
        },
        strategies: {
          minimizeCutterChanges: {
            rollsUsed: 4,
            wastage: 50.8,
            cutterChanges: 3,
            efficiency: 89.95,
          },
          minimizeWastage: {
            rollsUsed: 4,
            wastage: 50.8,
            cutterChanges: 3,
            efficiency: 89.95,
          },
        },
        cuttingPlan: [
          {
            rollId: 1,
            decalSize: 4470.4,
            cuts: [
              { size: 812.8, quantity: 2, actualSize: 32, uom: "IN" },
              { size: 736.6, quantity: 2, actualSize: 29, uom: "IN" },
              { size: 685.8, quantity: 2, actualSize: 27, uom: "IN" },
            ],
            wastage: 0,
            usagePercent: 100,
          },
          {
            rollId: 2,
            decalSize: 4470.4,
            cuts: [
              { size: 1016, quantity: 3, actualSize: 40, uom: "IN" },
              { size: 736.6, quantity: 1, actualSize: 29, uom: "IN" },
              { size: 685.8, quantity: 1, actualSize: 27, uom: "IN" },
            ],
            wastage: 0,
            usagePercent: 100,
          },
          {
            rollId: 3,
            decalSize: 4470.4,
            cuts: [
              { size: 1016, quantity: 1, actualSize: 40, uom: "IN" },
              { size: 863.6, quantity: 3, actualSize: 34, uom: "IN" },
              { size: 812.8, quantity: 1, actualSize: 32, uom: "IN" },
            ],
            wastage: 50.8,
            usagePercent: 98.86,
          },
        ],
      }

      setOptimizationResults(mockResults)
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
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="flex-shrink-0">
                <img src="/main-logo.png" alt="Smart Roll Cutting Solution" className="w-15 h-15" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Smart Roll Cutting Solutions</h1>
                {/* <p className="text-sm text-primary">
                  Optimize your material usage with advanced cutting pattern algorithms
                </p> */}
              </div>
            </div>

            <nav className="flex space-x-1 animate-slide-in-right">
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
          </div>
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
