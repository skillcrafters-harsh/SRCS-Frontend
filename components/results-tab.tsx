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
  const [selectedStrategy, setSelectedStrategy] = useState<
    "min_cutter_changes" | "min_wastage"
  >("min_wastage");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  // console.log(results)
  if (!results || !results.data) {
    return (
      <div className="p-6 text-center text-gray-500">No results available</div>
    );
  }

  // Handle both direct API response and wrapped response
  const responseData = results.data || results;

  const currentStrategy = responseData.strategies[selectedStrategy];
  
  // Get bucket performance metrics
  const getBucketMetrics = (bucket: any) => {
    const avgEfficiency = bucket.cutting_plans.reduce((acc: number, plan: any) => acc + plan.usage_percent, 0) / bucket.cutting_plans.length;
    return {
      avgEfficiency,
      totalWastage: bucket.summary.total_wastage_mm,
      cutterChanges: bucket.summary.total_cutter_changes,
      rollsUsed: bucket.summary.total_stock_rolls
    };
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const allTablesHTML = currentStrategy.results.map((bucket: any, bucketIndex: number) => {
        const bucketLabel = bucket.size_bucket || `Bucket ${bucketIndex + 1}`;
        const metrics = getBucketMetrics(bucket);
        
        return `
          <div style="margin-bottom: 40px; page-break-inside: avoid;">
            <h3 style="color: #1f2937; margin-bottom: 10px; padding: 10px; background-color: #f3f4f6; border-left: 4px solid #3b82f6;">
              ${bucketLabel} - Efficiency: ${metrics.avgEfficiency.toFixed(1)}% | Wastage: ${metrics.totalWastage}mm
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sr. No.</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sets</th>
                  ${Array.from(
                    { length: responseData.no_of_cut },
                    (_, i) => `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Size ${i + 1}</th>`
                  ).join("")}
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Waste/Set (mm)</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Waste (mm)</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Waste Qty/Set</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Waste Qty</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Usage/Set (mm)</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Usage (mm)</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Usage Qty/Set</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Usage Qty</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Usage %</th>
                </tr>
              </thead>
              <tbody>
                ${bucket.cutting_plans
                  .map((plan: any, i: any) => {
                    const activeSizes = plan.sizes.filter(
                      (s: any) => s.actual_size > 0
                    );
                    return `
                    <tr style="${i % 2 === 0 ? 'background-color: #f9f9f9;' : ''}">
                      <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
                      <td style="border: 1px solid #ddd; padding: 8px; color: #2563eb; font-weight: 500;">${plan.item_details.item_name}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.sets}</td>
                      ${Array.from(
                        { length: responseData.no_of_cut },
                        (_, i) => {
                          const size = activeSizes[i];
                          return `<td style="border: 1px solid #ddd; padding: 8px;">${
                            size ? `${size.actual_size}${size.uom}` : "-"
                          }</td>`;
                        }
                      ).join("")}
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.wastage_mm}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.total_wastage_mm}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.wastage_qty || 0}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.total_wastage_qty || 0}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.usage_mm}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.total_usage_mm}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.usage_qty || 0}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${plan.total_usage_qty || 0}</td>
                      <td style="border: 1px solid #ddd; padding: 8px; color: #059669; font-weight: 500;">${plan.usage_percent.toFixed(2)}%</td>
                    </tr>
                  `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
      }).join("");
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Cutting Optimization Results - ${selectedStrategy.replace('_', ' ').toUpperCase()}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px; 
                line-height: 1.4;
              }
              h1 {
                color: #1f2937;
                border-bottom: 2px solid #3b82f6;
                padding-bottom: 10px;
                margin-bottom: 30px;
              }
              h3 {
                margin-top: 30px;
                margin-bottom: 15px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-bottom: 30px;
                font-size: 12px;
              }
              th, td { 
                border: 1px solid #ddd; 
                padding: 6px; 
                text-align: left; 
              }
              th { 
                background-color: #f5f5f5; 
                font-weight: bold; 
                font-size: 11px;
              }
              @media print {
                body { margin: 10px; }
                .page-break { page-break-before: always; }
              }
            </style>
          </head>
          <body>
            <h1>Cutting Optimization Results</h1>
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <strong>Strategy:</strong> ${selectedStrategy.replace('_', ' ').toUpperCase()}<br>
              <strong>Total Rolls Used:</strong> ${currentStrategy.total_rolls_used}<br>
              <strong>Total Wastage:</strong> ${currentStrategy.total_wastage_mm}mm<br>
              <strong>Total Cutter Changes:</strong> ${currentStrategy.total_cutter_changes}<br>
              <strong>Decal Size:</strong> ${responseData.decal_size}mm<br>
              <strong>Max Cuts:</strong> ${responseData.no_of_cut}
            </div>
            ${allTablesHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleExportExcel = () => {
    const maxCuts = responseData.no_of_cut;
    const sizeHeaders = Array.from({ length: maxCuts }, (_, i) => `Size ${i + 1}`);

    const headers = [
      "Sr. No.",
      "Item Name",
      "Sets",
      ...sizeHeaders,
      "Waste/Set (mm)",
      "Total Waste (mm)",
      "Waste Qty/Set",
      "Total Waste Qty",
      "Usage/Set (mm)",
      "Total Usage (mm)",
      "Usage Qty/Set",
      "Total Usage Qty",
      "Usage %",
    ];

    let csvContent = "";
    
    currentStrategy.results.forEach((bucket: any, bucketIndex: number) => {
      const bucketLabel = bucket.size_bucket || `Bucket ${bucketIndex + 1}`;
      
      // Add bucket header
      csvContent += `\n${bucketLabel}\n`;
      csvContent += headers.join(",") + "\n";
      
      // Add bucket data
      bucket.cutting_plans.forEach((plan: any, planIndex: number) => {
        const activeSizes = plan.sizes.filter((s: any) => s.actual_size > 0);
        const sizeColumns = Array.from({ length: maxCuts }, (_, i) => {
          const size = activeSizes[i];
          return size ? `${size.actual_size}${size.uom}` : "-";
        });

        const row = [
          planIndex + 1,
          plan.item_details.item_name,
          plan.sets,
          ...sizeColumns,
          plan.wastage_mm,
          plan.total_wastage_mm,
          plan.wastage_qty || 0,
          plan.total_wastage_qty || 0,
          plan.usage_mm,
          plan.total_usage_mm,
          plan.usage_qty || 0,
          plan.total_usage_qty || 0,
          plan.usage_percent.toFixed(2) + "%",
        ];
        
        csvContent += row.join(",") + "\n";
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutting-optimization-results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const colors = [
    "#2563eb", // blue-600 (primary)
    "#dc2626", // red-600 (secondary)
    "#059669", // emerald-600
    "#7c3aed", // violet-600
    "#ea580c", // orange-600
    "#0891b2", // cyan-600
    "#65a30d", // lime-600
    "#c2410c", // orange-700
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
    <div className="space-y-6 min-h-screen animate-fade-in max-w-full bg-gradient-to-br from-blue-50/20 via-white to-indigo-50/30 p-6 rounded-xl">
      {/* Main Dashboard Grid - 1/3 and 2/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1/3: Pie Chart */}
        <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-gray-200 shadow-sm hover:shadow-md p-0 transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 via-blue-50/50 to-indigo-50/30 border-b border-gray-200 p-4 py-3">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <ChartPieIcon className="h-5 w-5" />
              Roll Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center">
            <PieChart
              data={{
                utilized:
                  currentStrategy.results.reduce(
                    (acc: number, bucket: any) => acc + bucket.cutting_plans.reduce(
                      (planAcc: number, plan: any) => planAcc + plan.usage_percent, 0
                    ), 0
                  ) / currentStrategy.results.reduce(
                    (acc: number, bucket: any) => acc + bucket.cutting_plans.length, 0
                  ),
                wastage:
                  100 - currentStrategy.results.reduce(
                    (acc: number, bucket: any) => acc + bucket.cutting_plans.reduce(
                      (planAcc: number, plan: any) => planAcc + plan.usage_percent, 0
                    ), 0
                  ) / currentStrategy.results.reduce(
                    (acc: number, bucket: any) => acc + bucket.cutting_plans.length, 0
                  ),
              }}
            />
          </CardContent>
        </Card>

        {/* 2/3: Two Rows */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1st Row: 4 Metric Boxes Horizontally */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/10 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
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
                      currentStrategy.results.reduce(
                        (acc: number, bucket: any) => acc + bucket.cutting_plans.reduce(
                          (planAcc: number, plan: any) => planAcc + plan.usage_percent, 0
                        ), 0
                      ) / currentStrategy.results.reduce(
                        (acc: number, bucket: any) => acc + bucket.cutting_plans.length, 0
                      )
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

      {/* Grouped Accordion for Size Buckets */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Size Bucket Results</h2>
          <div className="flex gap-2">
            <Button
              onClick={handleExportExcel}
              size="sm"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center border-0"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button
              onClick={handleExportPDF}
              size="sm"
              className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center border-0"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
        
        {/* Check if single bucket - show direct, otherwise show accordion */}
        {currentStrategy.results.length === 1 ? (
          // Single bucket - show directly without accordion
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="hover:bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <CardTitle className="text-base">
                    {currentStrategy.results[0].size_bucket}
                  </CardTitle>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span>Wastage: <strong>{getBucketMetrics(currentStrategy.results[0]).totalWastage}mm</strong></span>
                    <span>Cutter Changes: <strong>{getBucketMetrics(currentStrategy.results[0]).cutterChanges}</strong></span>
                    <span>Rolls Used: <strong>{getBucketMetrics(currentStrategy.results[0]).rollsUsed}</strong></span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-3">
              <div className="space-y-6">
                {/* Cutting Plans */}
                <div className="space-y-4">
                  {currentStrategy.results[0].cutting_plans.map((plan: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-900">
                          Plan {plan.plan_number} - {plan.item_details.item_name}
                        </h4>
                        <div className="flex gap-2 text-sm text-gray-600">
                          <span>Sets: {plan.sets}</span>
                          <span>Usage: {plan.usage_percent.toFixed(2)}%</span>
                        </div>
                      </div>
                      
                      {/* Visual Bar */}
                      <div className="mb-3">
                        <div className="flex rounded-lg overflow-hidden h-8 bg-gray-200">
                          {plan.sizes
                            .filter((size: any) => size.actual_size > 0)
                            .map((size: any, sizeIndex: number) => {
                              const percentage = (size.size_mm / (plan.usage_mm + plan.wastage_mm)) * 100;
                              return (
                                <div
                                  key={sizeIndex}
                                  className="flex items-center justify-center text-white text-xs font-medium"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: getColorForId(size.id),
                                  }}
                                  title={`${size.actual_size}${size.uom}`}
                                >
                                  {percentage > 8 && `${size.actual_size}${size.uom}`}
                                </div>
                              );
                            })}
                          {plan.wastage_mm > 0 && (
                            <div
                              className="flex items-center justify-center text-gray-600 text-xs"
                              style={{
                                width: `${(plan.wastage_mm / (plan.usage_mm + plan.wastage_mm)) * 100}%`,
                                backgroundColor: "#E5E7EB",
                              }}
                            >
                              Waste
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Usage: {plan.usage_mm}mm | Wastage: {plan.wastage_mm}mm | Qty: {plan.usage_qty}
                        </div>
                      </div>
                      
                      {/* Size Details */}
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        {plan.sizes
                          .filter((size: any) => size.actual_size > 0)
                          .map((size: any, sizeIndex: number) => (
                            <div key={sizeIndex} className="bg-white rounded p-2 border text-center">
                              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: getColorForId(size.id) }}></div>
                              <p className="text-xs font-medium">{size.actual_size}{size.uom}</p>
                              <p className="text-xs text-gray-500">{size.size_mm}mm</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pattern Details Table */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Pattern Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left p-3 font-medium text-gray-900">Sr. No.</th>
                          <th className="text-left p-3 font-medium text-gray-900">Item Name</th>
                          <th className="text-left p-3 font-medium text-gray-900">Sets</th>
                          {Array.from({ length: responseData.no_of_cut }, (_, i) => (
                            <th key={i} className="text-left p-3 font-medium text-gray-900">
                              Size {i + 1}
                            </th>
                          ))}
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Waste/Set</div>
                            <div className="text-xs font-normal">(mm)</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Total Waste</div>
                            <div className="text-xs font-normal">(mm)</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Waste</div>
                            <div className="text-xs font-normal">Qty/Set</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Total Waste</div>
                            <div className="text-xs font-normal">Qty</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Usage/Set</div>
                            <div className="text-xs font-normal">(mm)</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Total Usage</div>
                            <div className="text-xs font-normal">(mm)</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Usage</div>
                            <div className="text-xs font-normal">Qty/Set</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">
                            <div>Total Usage</div>
                            <div className="text-xs font-normal">Qty</div>
                          </th>
                          <th className="text-left p-3 font-medium text-gray-900">Usage %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStrategy.results[0].cutting_plans.map((plan: any, planIndex: number) => {
                          const activeSizes = plan.sizes.filter((s: any) => s.actual_size > 0);
                          return (
                            <tr key={planIndex} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="p-3 text-gray-900 font-medium">{planIndex + 1}</td>
                              <td className="p-3 text-blue-600 font-medium">{plan.item_details.item_name}</td>
                              <td className="p-3 text-gray-900">{plan.sets}</td>
                              {Array.from({ length: responseData.no_of_cut }, (_, i) => {
                                const size = activeSizes[i];
                                return (
                                  <td key={i} className="p-3 text-gray-900">
                                    {size ? `${size.actual_size}${size.uom}` : "-"}
                                  </td>
                                );
                              })}
                              <td className="p-3 text-gray-900">{plan.wastage_mm}</td>
                              <td className="p-3 text-gray-900">{plan.total_wastage_mm}</td>
                              <td className="p-3 text-gray-900">{plan.wastage_qty || 0}</td>
                              <td className="p-3 text-gray-900">{plan.total_wastage_qty || 0}</td>
                              <td className="p-3 text-gray-900">{plan.usage_mm}</td>
                              <td className="p-3 text-gray-900">{plan.total_usage_mm}</td>
                              <td className="p-3 text-gray-900">{plan.usage_qty || 0}</td>
                              <td className="p-3 text-gray-900">{plan.total_usage_qty || 0}</td>
                              <td className="p-3 text-green-600 font-medium">{plan.usage_percent.toFixed(2)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Multiple buckets - show accordion
          currentStrategy.results.map((bucket: any, bucketIndex: number) => {
            const bucketLabel = bucket.size_bucket || `Bucket ${bucketIndex + 1}`;
            const metrics = getBucketMetrics(bucket);
            const isHighPerforming = metrics.avgEfficiency > 85;
            const isExpanded = expandedSections.has(bucket.size_bucket);
            const rollSizes = bucket.verification?.map((v: any) => v.size_mm).join(' + ') || 'N/A';
            
            const toggleSection = () => {
              const newExpanded = new Set(expandedSections);
              if (isExpanded) {
                newExpanded.delete(bucket.size_bucket);
              } else {
                newExpanded.add(bucket.size_bucket);
              }
              setExpandedSections(newExpanded);
            };
          
            return (
              <Card key={bucketIndex} className="border border-gray-200 bg-white">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 p-3"
                  onClick={toggleSection}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-sm">
                        {bucketIndex + 1}
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {bucketLabel} - Rolls: {rollSizes}
                        </CardTitle>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>Wastage: <strong>{metrics.totalWastage}mm</strong></span>
                          <span>Cutter Changes: <strong>{metrics.cutterChanges}</strong></span>
                          <span>Rolls Used: <strong>{metrics.rollsUsed}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              
              {isExpanded && (
                <CardContent className="p-3 border-t border-gray-200">
                  <div className="space-y-6">
                    {/* Cutting Plans */}
                    <div className="space-y-4">
                      {bucket.cutting_plans.map((plan: any, index: number) => (
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
                        const totalUsage = plan.usage_mm;
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
                    
                    {/* Pattern Details Table for this bucket */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Pattern Details - {bucketLabel}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="text-left p-3 font-medium text-gray-900">Sr. No.</th>
                              <th className="text-left p-3 font-medium text-gray-900">Item Name</th>
                              <th className="text-left p-3 font-medium text-gray-900">Sets</th>
                              {Array.from({ length: responseData.no_of_cut }, (_, i) => (
                                <th key={i} className="text-left p-3 font-medium text-gray-900">
                                  Size {i + 1}
                                </th>
                              ))}
                              <th className="text-left p-3 font-medium text-gray-900">
                                <div>Waste/Set</div>
                                <div className="text-xs font-normal">(mm)</div>
                              </th>
                              <th className="text-left p-3 font-medium text-gray-900">
                                <div>Total Waste</div>
                                <div className="text-xs font-normal">(mm)</div>
                              </th>
                              <th className="text-left p-3 font-medium text-gray-900">
                                <div>Usage/Set</div>
                                <div className="text-xs font-normal">(mm)</div>
                              </th>
                              <th className="text-left p-3 font-medium text-gray-900">
                                <div>Total Usage</div>
                                <div className="text-xs font-normal">(mm)</div>
                              </th>
                              <th className="text-left p-3 font-medium text-gray-900">Usage %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bucket.cutting_plans.map((plan: any, planIndex: number) => {
                              const activeSizes = plan.sizes.filter((s: any) => s.actual_size > 0);
                              return (
                                <tr key={planIndex} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="p-3 text-gray-900 font-medium">{planIndex + 1}</td>
                                  <td className="p-3 text-blue-600 font-medium">{plan.item_details.item_name}</td>
                                  <td className="p-3 text-gray-900">{plan.sets}</td>
                                  {Array.from({ length: responseData.no_of_cut }, (_, i) => {
                                    const size = activeSizes[i];
                                    return (
                                      <td key={i} className="p-3 text-gray-900">
                                        {size ? `${size.actual_size}${size.uom}` : "-"}
                                      </td>
                                    );
                                  })}
                                  <td className="p-3 text-gray-900">{plan.wastage_mm}</td>
                                  <td className="p-3 text-gray-900">{plan.total_wastage_mm}</td>
                                  <td className="p-3 text-gray-900">{plan.usage_mm}</td>
                                  <td className="p-3 text-gray-900">{plan.total_usage_mm}</td>
                                  <td className="p-3 text-green-600 font-medium">{plan.usage_percent.toFixed(2)}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
            );
          })
        )}
      </div>


    </div>
  );
}
