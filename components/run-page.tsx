"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManualInputTab from "@/components/manual-input-tab";
import ExcelUploadTab from "@/components/excel-upload-tab";
import ResultsTab from "@/components/results-tab";
import OptimizationProgress from "@/components/optimization-progress";

interface RunPageProps {
  onOptimizationSuccess: (data: any) => void;
  isOptimizing: boolean;
  setIsOptimizing: (value: boolean) => void;
  optimizationResults: any;
  setOptimizationResults: (data: any) => void;
}

export default function RunPage({
  onOptimizationSuccess,
  isOptimizing,
  setIsOptimizing,
  optimizationResults,
  setOptimizationResults,
}: RunPageProps) {
  const [activeTab, setActiveTab] = useState("manual");
  const [resultSource, setResultSource] = useState<"manual" | "excel" | null>(
    null
  );
  const [wsConnected, setWsConnected] = useState(false);
  const [wsMessage, setWsMessage] = useState<string>("");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleOptimizationStart = (source: "manual" | "excel") => {
    setResultSource(null);
    setOptimizationResults(null);
    setIsOptimizing(true);
  };

  const handleOptimizationComplete = (
    data: any,
    source: "manual" | "excel"
  ) => {
    setIsOptimizing(false);
    if (data) {
      setResultSource(source);
      setOptimizationResults(data);
      onOptimizationSuccess(data);
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
    <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 w-full max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 md:py-4 lg:py-6 flex flex-col items-center justify-center">
        <CardTitle
          className="
            font-bold text-center text-gray-900
            text-[clamp(1.25rem,2.5vw,2.5rem)]
          "
        >
          Optimization Dashboard
        </CardTitle>
        <CardDescription
          className="
            text-center text-gray-600 mt-1 md:mt-2
            text-[clamp(0.875rem,1.5vw,1.25rem)]
          "
        >
          Submit your cutting requirements and get optimized cutting patterns
        </CardDescription>
      </CardHeader>

      {/* Optimization Progress */}
      {isOptimizing && (
        <div className="mb-4 md:mb-6 px-3 sm:px-4 lg:px-6">
          <OptimizationProgress
            isOptimizing={isOptimizing}
            message={wsMessage || "Processing your optimization request..."}
            estimatedTime="1-3 minutes"
          />
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="
            flex flex-row sm:flex-row gap-2 sm:gap-4 
            w-full mb-6 md:mb-8 
            bg-blue-100/50 backdrop-blur-sm p-1 rounded-lg
          "
        >
          <TabsTrigger
            value="manual"
            className="
              flex-1 font-medium cursor-pointer transition-all duration-200
              py-2 md:py-2.5 lg:py-3
              text-[clamp(0.75rem,1.5vw,1rem)]
              data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm
              hover:bg-blue-50
            "
          >
            <span className="md:hidden">Manual</span>
            <span className="hidden md:inline">Manual Input</span>
          </TabsTrigger>

          <TabsTrigger
            value="excel"
            className="
              flex-1 font-medium cursor-pointer transition-all duration-200
              py-2 md:py-2.5 lg:py-3
              text-[clamp(0.75rem,1.5vw,1rem)]
              data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm
              hover:bg-blue-50
            "
          >
            <span className="md:hidden">Excel</span>
            <span className="hidden md:inline">Excel Upload</span>
          </TabsTrigger>
        </TabsList>

        {/* Manual Input Tab */}
        <TabsContent
          value="manual"
          className="space-y-4 md:space-y-6 animate-fade-in px-3 sm:px-4 lg:px-6"
        >
          <ManualInputTab
            onOptimizationStart={() => {
              setWsConnected(true);
              setWsMessage("Connecting to optimization server...");
              handleOptimizationStart("manual");
            }}
            onOptimizationComplete={(data) =>
              handleOptimizationComplete(data, "manual")
            }
            isOptimizing={isOptimizing}
            optimizationResults={optimizationResults}
          />
          {optimizationResults && resultSource === "manual" && (
            <div
              ref={resultsRef}
              className="mt-4 md:mt-6"
              data-results-section
            >
              <ResultsTab
                results={optimizationResults}
                formData={optimizationResults.formData}
              />
            </div>
          )}
        </TabsContent>

        {/* Excel Upload Tab */}
        <TabsContent
          value="excel"
          className="space-y-4 md:space-y-6 animate-fade-in px-3 sm:px-4 lg:px-6"
        >
          <ExcelUploadTab
            onOptimizationStart={() => {
              setWsConnected(true);
              setWsMessage("Connecting to file optimization server...");
              handleOptimizationStart("excel");
            }}
            onOptimizationComplete={(data) =>
              handleOptimizationComplete(data, "excel")
            }
            isOptimizing={isOptimizing}
          />
          {optimizationResults && resultSource === "excel" && (
            <div
              ref={resultsRef}
              className="mt-4 md:mt-6"
              data-results-section
            >
              <ResultsTab
                results={optimizationResults}
                formData={optimizationResults.formData}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
