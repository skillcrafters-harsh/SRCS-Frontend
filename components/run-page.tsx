"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManualInputTab from "@/components/manual-input-tab";
import ExcelUploadTab from "@/components/excel-upload-tab";
import ResultsTab from "@/components/results-tab";
import WebSocketStatus from "@/components/websocket-status";
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

  const handleOptimizationComplete = (data: any, source: "manual" | "excel") => {
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

  // When results arrive, scroll into view within the active tab
  useEffect(() => {
    if (optimizationResults && !isOptimizing) {
      // slight delay to ensure DOM is painted
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [optimizationResults, isOptimizing]);

  return (
    <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 w-full max-w-7xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 flex flex-col items-center justify-center">
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Optimization Dashboard
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Submit your cutting requirements and get optimized cutting patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* WebSocket Status */}
        {/* <div className="mb-4">
          <WebSocketStatus 
            isConnected={wsConnected}
            isOptimizing={isOptimizing}
            lastMessage={wsMessage}
          />
        </div>
         */}
        {/* Optimization Progress */}
        {isOptimizing && (
          <div className="mb-6">
            <OptimizationProgress 
              isOptimizing={isOptimizing}
              message={wsMessage || "Processing your optimization request..."}
              estimatedTime="1-3 minutes"
            />
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-blue-100/50 backdrop-blur-sm">
            <TabsTrigger
              value="manual"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-blue-50"
            >
              Manual Input
            </TabsTrigger>
            <TabsTrigger
              value="excel"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-blue-50"
            >
              Excel Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6 animate-fade-in">
            <ManualInputTab
              onOptimizationStart={() => {
                setWsConnected(true);
                setWsMessage("Connecting to optimization server...");
                handleOptimizationStart("manual");
              }}
              onOptimizationComplete={(data) => handleOptimizationComplete(data, "manual")}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
            {optimizationResults && resultSource === "manual" && (
              <div ref={resultsRef} className="" data-results-section>
                <ResultsTab
                  results={optimizationResults}
                  formData={optimizationResults.formData}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="excel" className="space-y-6 animate-fade-in">
            <ExcelUploadTab
              onOptimizationStart={() => {
                setWsConnected(true);
                setWsMessage("Connecting to file optimization server...");
                handleOptimizationStart("excel");
              }}
              onOptimizationComplete={(data) => handleOptimizationComplete(data, "excel")}
              isOptimizing={isOptimizing}
            />
            {optimizationResults && resultSource === "excel" && (
              <div ref={resultsRef} className="pt-4" data-results-section>
                <ResultsTab
                  results={optimizationResults}
                  formData={optimizationResults.formData}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
