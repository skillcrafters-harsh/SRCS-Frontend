"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDownIcon, ChevronUpIcon, DocumentArrowDownIcon, ChartPieIcon } from "@heroicons/react/24/outline"
import PieChart from "@/components/pie-chart"
import CuttingPlanVisualization from "@/components/cutting-plan-visualization"

interface ResultsTabProps {
  results: any
}

export default function ResultsTab({ results }: ResultsTabProps) {
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<"minimizeCutterChanges" | "minimizeWastage">(
    "minimizeWastage",
  )

  const handleExportExcel = () => {
    const csvContent = [
      ["Roll ID", "Decal Size (mm)", "Cuts", "Wastage (mm)"],
      ...results.cuttingPlan.map((roll: any) => [
        `Roll ${roll.rollId}`,
        roll.decalSize,
        roll.cuts.map((cut: any) => `${cut.size}mm x${cut.quantity}`).join("; "),
        roll.wastage,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cutting-plan-results.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const colors = [
    "#3B82F6", // blue-500
    "#10B981", // emerald-500
    "#8B5CF6", // violet-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
    "#F97316", // orange-500
  ]

  return (
    <div className="space-y-6 min-h-screen p-4 sm:p-6 animate-fade-in max-w-7xl mx-auto">
      {/* Key Metrics - Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rolls Used</p>
                <p className="text-2xl font-bold text-gray-900">{results.summary.totalRollsUsed}</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">R</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold text-green-600">{results.summary.utilizationPercentage.toFixed(2)}%</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Waste</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(100 - results.summary.utilizationPercentage).toFixed(2)}%
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-blue-600">₹4,373</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Roll Utilization & Wastage */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6 py-3 flex items-center">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <ChartPieIcon className="h-5 w-5" />
              Roll Utilization & Wastage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="animate-chart-fade-in">
              <PieChart
                data={{
                  utilized: results.summary.utilizationPercentage,
                  wastage: 100 - results.summary.utilizationPercentage,
                }}
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Used Material ({results.summary.utilizationPercentage.toFixed(2)}%)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Waste ({(100 - results.summary.utilizationPercentage).toFixed(2)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Comparison */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6 py-3 flex items-center">
            <CardTitle className="text-gray-900">Strategy Comparison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-3">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-sm ${
                  selectedStrategy === "minimizeCutterChanges"
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-blue-300 bg-white"
                }`}
                onClick={() => setSelectedStrategy("minimizeCutterChanges")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm text-gray-900">Minimize Cutter Changes</h4>
                  {selectedStrategy === "minimizeCutterChanges" && (
                    <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-600">Rolls Used:</p>
                    <p className="text-gray-900 font-medium">{results.strategies.minimizeCutterChanges.rollsUsed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Efficiency:</p>
                    <p className="text-gray-900 font-medium">86.95%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Waste:</p>
                    <p className="text-gray-900 font-medium">13.05%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cutter Changes:</p>
                    <p className="text-gray-900 font-medium">
                      {results.strategies.minimizeCutterChanges.cutterChanges}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-sm ${
                  selectedStrategy === "minimizeWastage"
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-blue-300 bg-white"
                }`}
                onClick={() => setSelectedStrategy("minimizeWastage")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm text-gray-900">Minimize Wastage</h4>
                  {selectedStrategy === "minimizeWastage" && (
                    <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                      Alternative
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-600">Rolls Used:</p>
                    <p className="text-gray-900 font-medium">{results.strategies.minimizeWastage.rollsUsed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Efficiency:</p>
                    <p className="text-gray-900 font-medium">89.95%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Waste:</p>
                    <p className="text-gray-900 font-medium">10.05%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cutter Changes:</p>
                    <p className="text-gray-900 font-medium">{results.strategies.minimizeWastage.cutterChanges}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cutting Plan with Bar Representation */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border-b border-gray-200 p-4 sm:p-6 py-3 space-y-2 sm:space-y-0">
          <CardTitle className="text-gray-900">Cutting Plan</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setShowDetailedView(!showDetailedView)}
              variant="outline"
              size="sm"
              className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full sm:w-auto"
            >
              {showDetailedView ? (
                <>
                  <ChevronUpIcon className="h-4 w-4 mr-2" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDownIcon className="h-4 w-4 mr-2" />
                  View Details
                </>
              )}
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-600 hover:bg-green-50 transition-all duration-200 w-full sm:w-auto bg-transparent"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {results.cuttingPlan.map((roll: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 space-y-1 sm:space-y-0">
                  <h4 className="font-semibold text-gray-900">Roll {roll.rollId}</h4>
                  <span className="text-sm text-gray-600">{roll.decalSize}mm</span>
                </div>

                {/* Horizontal Bar Visualization */}
                <div className="mb-3">
                  <div className="flex rounded-lg overflow-hidden h-8 bg-gray-200">
                    {roll.cuts.map((cut: any, cutIndex: number) => {
                      const percentage = ((cut.size * cut.quantity) / roll.decalSize) * 100
                      return (
                        <div
                          key={cutIndex}
                          className="flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:opacity-80"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: colors[cutIndex % colors.length],
                            minWidth: percentage > 5 ? "auto" : "0",
                          }}
                          title={`${cut.size}mm x ${cut.quantity}`}
                        >
                          {percentage > 8 && `${cut.size}mm`}
                        </div>
                      )
                    })}
                    {/* Wastage section */}
                    {roll.wastage > 0 && (
                      <div
                        className="flex items-center justify-center text-gray-600 text-xs"
                        style={{
                          width: `${(roll.wastage / roll.decalSize) * 100}%`,
                          backgroundColor: "#E5E7EB",
                        }}
                        title={`Wastage: ${roll.wastage}mm`}
                      >
                        {(roll.wastage / roll.decalSize) * 100 > 5 && "Waste"}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Wastage: {roll.wastage}mm</div>
                </div>

                {/* Cut Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {roll.cuts.map((cut: any, cutIndex: number) => (
                    <div
                      key={cutIndex}
                      className="bg-white rounded-lg p-3 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors[cutIndex % colors.length] }}
                        ></div>
                        <p className="text-gray-900 font-medium text-sm">{cut.size}mm</p>
                      </div>
                      <p className="text-gray-600 text-xs">Qty: {cut.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showDetailedView && (
            <div className="mt-6 animate-fade-in">
              <CuttingPlanVisualization cuttingPlan={results.cuttingPlan} showDetailed={showDetailedView} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
