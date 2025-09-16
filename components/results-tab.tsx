"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import PieChart from "@/components/pie-chart";
import CuttingPlanVisualization from "@/components/cutting-plan-visualization";

interface ResultsTabProps {
  results: any;
  formData?: {
    customerName: string;
    soNo: string;
    motherRollWidth: string;
    maxCuts: string;
  };
}

export default function ResultsTab({ results, formData }: ResultsTabProps) {
  const [showDetailedView, setShowDetailedView] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState<
    "min_cutter_changes" | "min_wastage"
  >("min_wastage");
  // console.log(results)
  if (!results || !results.data) {
    return (
      <div className="p-6 text-center text-gray-500">No results available</div>
    );
  }

  // Handle both direct API response and wrapped response
  const responseData = results.data || results;

  const currentStrategy = responseData.strategies[selectedStrategy];
  const currentResult = currentStrategy.results[0];

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Pattern Details Table</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; font-weight: bold; }
              tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <h2>Pattern Details Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Sets</th>
                  ${Array.from(
                    { length: responseData.no_of_cut },
                    (_, i) => `<th>Size ${i + 1}</th>`
                  ).join("")}
                  <th>Waste/Set (mm)</th>
                  <th>Total Waste (mm)</th>
                  <th>Waste Qty/Set</th>
                  <th>Total Waste Qty</th>
                  <th>Usage/Set (mm)</th>
                  <th>Total Usage (mm)</th>
                  <th>Usage Qty/Set</th>
                  <th>Total Usage Qty</th>
                  <th>Usage %</th>
                </tr>
              </thead>
              <tbody>
                ${currentResult.cutting_plans
                  .map((plan: any) => {
                    const activeSizes = plan.sizes.filter(
                      (s: any) => s.actual_size > 0
                    );
                    return `
                    <tr>
                      <td>Pattern ${plan.plan_number}</td>
                      <td>${plan.sets}</td>
                      ${Array.from(
                        { length: responseData.no_of_cut },
                        (_, i) => {
                          const size = activeSizes[i];
                          return `<td>${
                            size ? `${size.actual_size}${size.uom}` : "-"
                          }</td>`;
                        }
                      ).join("")}
                      <td>${plan.wastage_mm}</td>
                      <td>${plan.total_wastage_mm}</td>
                      <td>${plan.wastage_qty}</td>
                      <td>${plan.total_wastage_qty}</td>
                      <td>${plan.usage_mm}</td>
                      <td>${plan.total_usage_mm}</td>
                      <td>${plan.usage_qty}</td>
                      <td>${plan.total_usage_qty}</td>
                      <td>${plan.usage_percent.toFixed(2)}%</td>
                    </tr>
                  `;
                  })
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleExportExcel = () => {
    const maxCuts = responseData.no_of_cut;

    // Create size column headers
    const sizeHeaders = Array.from(
      { length: maxCuts },
      (_, i) => `Size ${i + 1}`
    );

    const headers = [
      "Customer Name",
      "SO No",
      "Decal Size (mm)",
      "Max Cuts",
      "Plan Number",
      "Sets",
      "Item Name",
      ...sizeHeaders,
      "Wastage (mm)",
      "Usage (%)",
    ];

    const rows = currentResult.cutting_plans.map((plan: any) => {
      const activeSizes = plan.sizes.filter((s: any) => s.actual_size > 0);
      const sizeColumns = Array.from({ length: maxCuts }, (_, i) => {
        const size = activeSizes[i];
        return size ? `${size.actual_size}${size.uom}` : "-";
      });

      return [
        formData?.customerName || "N/A",
        formData?.soNo || "N/A",
        responseData.decal_size,
        maxCuts,
        `Plan ${plan.plan_number}`,
        plan.sets,
        plan.item_details.item_name,
        ...sizeColumns,
        plan.wastage_mm,
        plan.usage_percent.toFixed(2) + "%",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutting-optimization-results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const colors = [
    "#3B82F6", // blue-500
    "#10B981", // emerald-500
    "#8B5CF6", // violet-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
    "#F97316", // orange-500
  ];

  // Map IDs to consistent colors
  const idColorMap = new Map<string, string>();
  let colorIndex = 0;

  const getColorForId = (id: string | null) => {
    if (!id) return "#E5E7EB"; // gray for null IDs

    if (!idColorMap.has(id)) {
      idColorMap.set(id, colors[colorIndex % colors.length]);
      colorIndex++;
    }

    return idColorMap.get(id)!;
  };

  return (
    <div className="space-y-6 min-h-screen animate-fade-in max-w-full">
      {/* Main Dashboard Grid - 1/3 and 2/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1/3: Pie Chart */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 py-3">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <ChartPieIcon className="h-5 w-5" />
              Roll Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center">
            <PieChart
              data={{
                utilized:
                  currentResult.cutting_plans.reduce(
                    (acc: number, plan: any) => acc + plan.usage_percent,
                    0
                  ) / currentResult.cutting_plans.length,
                wastage:
                  100 -
                  currentResult.cutting_plans.reduce(
                    (acc: number, plan: any) => acc + plan.usage_percent,
                    0
                  ) /
                    currentResult.cutting_plans.length,
              }}
            />
          </CardContent>
        </Card>

        {/* 2/3: Two Rows */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1st Row: 4 Metric Boxes Horizontally */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 mb-1">
                    {currentStrategy.total_rolls_used}
                  </p>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Total Rolls Used
                  </p>
                  {/* <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold text-sm">R</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600 mb-1">
                    {(
                      currentResult.cutting_plans.reduce(
                        (acc: number, plan: any) => acc + plan.usage_percent,
                        0
                      ) / currentResult.cutting_plans.length
                    ).toFixed(2)}
                    %
                  </p>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Efficiency
                  </p>
                  {/* <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-orange-600 mb-1">
                    {currentStrategy.total_wastage_mm}mm
                  </p>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Total Wastage
                  </p>
                  {/* <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-3">
                <div className="text-center">
                  {/* <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold text-sm">C</span>
                  </div> */}
                  <p className="text-xl font-bold text-blue-600 mb-1">
                    {currentStrategy.total_cutter_changes}
                  </p>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Cutter Changes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2nd Row: Strategy Selection Horizontal */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 py-3">
              <CardTitle className="text-gray-900">
                Strategy Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-sm ${
                    selectedStrategy === "min_cutter_changes"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                  onClick={() => setSelectedStrategy("min_cutter_changes")}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Minimize Cutter Changes
                    </h4>
                    {selectedStrategy === "min_cutter_changes" && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white text-xs"
                      >
                        Selected
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-600">Rolls Used:</p>
                      <p className="text-gray-900 font-medium">
                        {
                          responseData.strategies.min_cutter_changes
                            .total_rolls_used
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (mm):</p>
                      <p className="text-gray-900 font-medium">
                        {
                          responseData.strategies.min_cutter_changes
                            .total_wastage_mm
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (qty):</p>
                      <p className="text-gray-900 font-medium">
                        {
                          responseData.strategies.min_cutter_changes
                            .total_wastage_qty
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cutter Changes:</p>
                      <p className="text-gray-900 font-medium">
                        {
                          responseData.strategies.min_cutter_changes
                            .total_cutter_changes
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-sm ${
                    selectedStrategy === "min_wastage"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                  onClick={() => setSelectedStrategy("min_wastage")}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Minimize Wastage
                    </h4>
                    {selectedStrategy === "min_wastage" && (
                      <Badge
                        variant="secondary"
                        className="bg-green-500 text-white text-xs"
                      >
                        Selected
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-600">Rolls Used:</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_wastage.total_rolls_used}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (mm):</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_wastage.total_wastage_mm}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (qty):</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_wastage.total_wastage_qty}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cutter Changes:</p>
                      <p className="text-gray-900 font-medium">
                        {
                          responseData.strategies.min_wastage
                            .total_cutter_changes
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cutting Plan with Bar Representation */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border-b border-gray-200 p-4 sm:p-6 py-3 space-y-2 sm:space-y-0">
          <CardTitle className="text-gray-900">Cutting Plan</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={handleExportExcel}
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700 transition-all duration-200 w-full sm:w-auto"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button
              onClick={handleExportPDF}
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200 w-full sm:w-auto"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {currentResult.cutting_plans.map((plan: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 space-y-1 sm:space-y-0">
                  <h4 className="font-semibold text-gray-900">
                    Plan {plan.plan_number} - {plan.item_details.item_name}
                  </h4>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>Sets: {plan.sets}</span>
                    <span>Usage: {plan.usage_percent.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Horizontal Bar Visualization */}
                <div className="mb-3">
                  <div className="flex rounded-lg overflow-hidden h-8 bg-gray-200">
                    {plan.sizes
                      .filter((size: any) => size.actual_size > 0)
                      .map((size: any, sizeIndex: number) => {
                        const totalUsage = plan.total_usage_mm;
                        const sizeUsage = size.size_mm;
                        const percentage =
                          totalUsage > 0
                            ? (sizeUsage / (totalUsage + plan.wastage_mm)) * 100
                            : 0;
                        return (
                          <div
                            key={sizeIndex}
                            className="flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:opacity-80 border-r border-white/30"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: getColorForId(size.id),
                              minWidth: percentage > 5 ? "auto" : "0",
                            }}
                            title={`${size.actual_size}${size.uom}`}
                          >
                            {percentage > 8 && `${size.actual_size}${size.uom}`}
                          </div>
                        );
                      })}
                    {/* Wastage section */}
                    {plan.wastage_mm > 0 && (
                      <div
                        className="flex items-center justify-center text-gray-600 text-xs border-l border-gray-400"
                        style={{
                          width: `${
                            (plan.wastage_mm /
                              (plan.total_usage_mm + plan.wastage_mm)) *
                            100
                          }%`,
                          backgroundColor: "#E5E7EB",
                        }}
                        title={`Wastage: ${plan.wastage_mm}mm`}
                      >
                        {(plan.wastage_mm /
                          (plan.total_usage_mm + plan.wastage_mm)) *
                          100 >
                          5 && "Waste"}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Wastage: {plan.wastage_mm}mm | Usage: {plan.usage_mm}mm |
                    Qty: {plan.usage_qty}
                  </div>
                </div>

                {/* Size Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                  {plan.sizes
                    .filter((size: any) => size.actual_size > 0)
                    .map((size: any, sizeIndex: number) => (
                      <div
                        key={sizeIndex}
                        className="bg-white rounded p-2 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 text-center"
                      >
                        <div className="flex items-center justify-center mb-1">
                          <div
                            className="w-2 h-2 rounded-full border border-gray-300"
                            style={{ backgroundColor: getColorForId(size.id) }}
                          ></div>
                        </div>
                        <p className="text-gray-900 font-medium text-xs">
                          {size.actual_size}
                          {size.uom}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {size.size_mm}mm
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Details Table - Separate Component */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 mt-6">
        <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 py-3">
          <CardTitle className="text-gray-900">Pattern Details Table</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Pattern
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Sets
                  </th>
                  {Array.from({ length: responseData.no_of_cut }, (_, i) => (
                    <th
                      key={i}
                      className="text-left p-3 font-medium text-gray-900"
                    >
                      Size {i + 1}
                    </th>
                  ))}
                  <th className="text-left p-3 font-medium text-gray-900">
                    Waste/Set (mm)
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total Waste (mm)
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Waste Qty/Set
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total Waste Qty
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Usage/Set (mm)
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total Usage (mm)
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Usage Qty/Set
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total Usage Qty
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Usage %
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentResult.cutting_plans.map((plan: any, index: number) => {
                  const activeSizes = plan.sizes.filter(
                    (s: any) => s.actual_size > 0
                  );
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-blue-600 font-medium">
                        Pattern {plan.plan_number}
                      </td>
                      <td className="p-3 text-gray-900">{plan.sets}</td>
                      {Array.from(
                        { length: responseData.no_of_cut },
                        (_, i) => {
                          const size = activeSizes[i];
                          return (
                            <td key={i} className="p-3 text-gray-900">
                              {size ? `${size.actual_size}${size.uom}` : "-"}
                            </td>
                          );
                        }
                      )}
                      <td className="p-3 text-gray-900">{plan.wastage_mm}</td>
                      <td className="p-3 text-gray-900">
                        {plan.total_wastage_mm}
                      </td>
                      <td className="p-3 text-gray-900">{plan.wastage_qty}</td>
                      <td className="p-3 text-gray-900">
                        {plan.total_wastage_qty}
                      </td>
                      <td className="p-3 text-gray-900">{plan.usage_mm}</td>
                      <td className="p-3 text-gray-900">
                        {plan.total_usage_mm}
                      </td>
                      <td className="p-3 text-gray-900">{plan.usage_qty}</td>
                      <td className="p-3 text-gray-900">
                        {plan.total_usage_qty}
                      </td>
                      <td className="p-3 text-green-600 font-medium">
                        {plan.usage_percent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
