"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManualInput from "@/components/run/ManualInput";
import ExcelUpload from "@/components/run/ExcelUpload";
import Results from "@/components/run/Results";
import { OptimizeProvider, useOptimize } from "@/components/run/store";

export default function RunPage() {
  return (
    <OptimizeProvider>
      <RunPageContent />
    </OptimizeProvider>
  );
}

function RunPageContent() {
  const [activeTab, setActiveTab] = useState("manual");
  const [resultSource, setResultSource] = useState<"manual" | "excel" | null>(
    null
  );
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any | null>(
    null
  );
  const [wsMessage, setWsMessage] = useState<string>("");
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const { setState } = useOptimize();

  const handleOptimizationStart = (source: "manual" | "excel") => {
    setResultSource(null);
    setOptimizationResults(null);
    setIsOptimizing(true);
  };

  // Clear results when switching tabs
  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      // Clear results when switching tabs
      setResultSource(null);
      setOptimizationResults(null);
      setIsOptimizing(false);
      setState({ status: "idle", progress: 0 });
    }
    setActiveTab(newTab);
  };

  const handleOptimizationComplete = (
    data: any,
    source: "manual" | "excel"
  ) => {
    setIsOptimizing(false);
    if (data) {
      setResultSource(source);
      setOptimizationResults(data);
    } else {
      setResultSource(null);
      setOptimizationResults(null);
    }
  };

  // Scroll results into view when ready
  useEffect(() => {
    if (optimizationResults && !isOptimizing) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [optimizationResults, isOptimizing]);

  return (
    <Card className="shadow-lg  border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 w-full max-w-screen-2xl mx-auto my-6 sm:my-8 ">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-4 flex flex-col items-center justify-center">
          <CardTitle className="font-bold text-center text-gray-900 text-2xl">
            Optimization Dashboard
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Submit your cutting requirements and get optimized cutting patterns
          </CardDescription>
        </CardHeader>

        {/* Optimization Progress */}
        {isOptimizing && (
          <div className="mb-4 px-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div>
                  <p className="text-blue-800 font-medium">
                    {wsMessage || "Processing your optimization request..."}
                  </p>
                  <p className="text-blue-600 text-sm">Estimated time: 1-3 minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="flex gap-2 w-full bg-blue-100/50 backdrop-blur-sm border border-gray mt-1 p-1 rounded-lg">
              <TabsTrigger
                value="manual"
                className="flex-1 font-medium transition-all duration-200 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-blue-50 rounded-md"
              >
                <span className="md:hidden">Manual</span>
                <span className="hidden md:inline">Manual Input</span>
              </TabsTrigger>

              <TabsTrigger
                value="excel"
                className="flex-1 font-medium transition-all duration-200 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-blue-50 rounded-md"
              >
                <span className="md:hidden">Excel</span>
                <span className="hidden md:inline">Excel Upload</span>
              </TabsTrigger>
            </TabsList>

          {/* Manual Input Tab */}
          <TabsContent value="manual" className="animate-fade-in !m-0 px-4 py-4 sm:py-6">
            <ManualInput 
              onOptimizationStart={() => handleOptimizationStart("manual")}
              onOptimizationComplete={(data) => handleOptimizationComplete(data, "manual")}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
            {/* Results will show below manual input when optimization completes */}
            <div
              className="mt-6"
              ref={resultSource === "manual" ? resultsRef : undefined}
            >
              <Results />
            </div>
          </TabsContent>

          {/* Excel Upload Tab */}
          <TabsContent value="excel" className="animate-fade-in px-4 py-4 sm:py-6">
            <ExcelUpload 
              onOptimizationStart={() => handleOptimizationStart("excel")}
              onOptimizationComplete={(data) => handleOptimizationComplete(data, "excel")}
              isOptimizing={isOptimizing}
            />
            {/* Results will show below excel upload when optimization completes */}
            <div
              className="mt-6"
              ref={resultSource === "excel" ? resultsRef : undefined}
            >
              <Results />
            </div>
          </TabsContent>
          </Tabs>
        </div>
      </Card>
  );
}
