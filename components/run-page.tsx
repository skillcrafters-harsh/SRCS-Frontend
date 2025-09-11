"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ManualInputTab from "@/components/manual-input-tab"
import ExcelUploadTab from "@/components/excel-upload-tab"
import ResultsTab from "@/components/results-tab"

interface RunPageProps {
  onOptimize: (data: any, source: "manual" | "excel") => Promise<void>
  isOptimizing: boolean
  optimizationResults: any
}

export default function RunPage({ onOptimize, isOptimizing, optimizationResults }: RunPageProps) {
  const [activeTab, setActiveTab] = useState("manual")

  useEffect(() => {
    if (optimizationResults && !isOptimizing) {
      setActiveTab("results")
    }
  }, [optimizationResults, isOptimizing])

  return (
    <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 flex flex-col items-center justify-center">
        <CardTitle className="text-2xl font-bold text-center text-gray-900">Optimization Dashboard</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Submit your cutting requirements and get optimized cutting patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-blue-100/50 backdrop-blur-sm">
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
            <TabsTrigger
              value="results"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-blue-50 disabled:opacity-50"
              disabled={!optimizationResults}
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6 animate-fade-in">
            <ManualInputTab
              onOptimize={onOptimize}
              isOptimizing={isOptimizing}
              optimizationResults={optimizationResults}
            />
          </TabsContent>

          <TabsContent value="excel" className="space-y-6 animate-fade-in">
            <ExcelUploadTab onOptimize={onOptimize} isOptimizing={isOptimizing} />
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
            {optimizationResults && <ResultsTab results={optimizationResults} formData={optimizationResults.formData} />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
