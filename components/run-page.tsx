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

interface RunPageProps {
  onOptimize: (data: any, source: "manual" | "excel") => Promise<void>;
  isOptimizing: boolean;
  optimizationResults: any;
}

export default function RunPage({
  onOptimize,
  isOptimizing,
  optimizationResults,
}: RunPageProps) {
  const [activeTab, setActiveTab] = useState("manual");
  const [resultSource, setResultSource] = useState<"manual" | "excel" | null>(
    null
  );
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleOptimize = async (data: any, source: "manual" | "excel") => {
    setResultSource(source);
    await onOptimize(data, source);
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
              onOptimize={handleOptimize}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
            {optimizationResults && resultSource === "manual" && (
              <div ref={resultsRef} className="">
                <ResultsTab
                  results={optimizationResults}
                  formData={optimizationResults.formData}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="excel" className="space-y-6 animate-fade-in">
            <ExcelUploadTab
              onOptimize={handleOptimize}
              isOptimizing={isOptimizing}
            />
            {optimizationResults && resultSource === "excel" && (
              <div ref={resultsRef} className="pt-4">
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
