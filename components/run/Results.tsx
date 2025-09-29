"use client";

import { useState } from "react";
import { useOptimize } from "@/components/run/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

interface PieChartData {
  utilized: number;
  wastage: number;
}

// Simple PieChart component since we don't have the external one
function PieChart({ data }: { data: PieChartData }) {
  const total = data.utilized + data.wastage;
  const utilizedPercent = (data.utilized / total) * 100;
  const wastagePercent = (data.wastage / total) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#1E88E5"
            strokeWidth="8"
            strokeDasharray={`${utilizedPercent * 2.51} ${wastagePercent * 2.51}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold text-gray-900">{utilizedPercent.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Utilized</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Utilized ({utilizedPercent.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Waste ({wastagePercent.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const { state } = useOptimize();
  const [selectedStrategy, setSelectedStrategy] = useState<"min_cutter_changes" | "min_wastage">("min_wastage");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [highlightedSize, setHighlightedSize] = useState<string | null>(null);

  if (!state.plans || state.plans.length === 0) {
    return (
      <div className="p-4 sm:p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="mt-4">No optimization results available yet</p>
      </div>
    );
  }

  // Mock data structure to match the expected format
  const results = {
    data: {
      strategies: {
        min_wastage: {
          total_rolls_used: state.metrics?.totalRolls || 5,
          total_wastage_mm: 150,
          total_wastage_qty: 10,
          total_cutter_changes: 8,
          results: state.plans || []
        },
        min_cutter_changes: {
          total_rolls_used: (state.metrics?.totalRolls || 5) + 1,
          total_wastage_mm: 180,
          total_wastage_qty: 12,
          total_cutter_changes: 6,
          results: state.plans || []
        }
      },
      decal_size: 4500,
      no_of_cut: 7
    }
  };

  const responseData = results.data;
  const currentStrategy = responseData.strategies[selectedStrategy];
  const currentStrategyResults: any[] = Array.isArray((currentStrategy as any)?.results)
    ? (currentStrategy as any).results
    : [];

  // Get bucket performance metrics
  const getBucketMetrics = (bucket: any) => {
    if (!bucket.cutting_plans) return { avgEfficiency: 0, totalWastage: 0, cutterChanges: 0, rollsUsed: 0 };
    
    const avgEfficiency = bucket.cutting_plans.reduce(
      (acc: number, plan: any) => acc + (plan.usage_percent || 85), 0
    ) / bucket.cutting_plans.length;
    
    return {
      avgEfficiency,
      totalWastage: bucket.summary?.total_wastage_mm || 150,
      cutterChanges: bucket.summary?.total_cutter_changes || 8,
      rollsUsed: bucket.summary?.total_stock_rolls || 5,
    };
  };

  const formatCSVValue = (value: string | number | null | undefined) => {
    const str = value === null || value === undefined ? "" : String(value);
    if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const maxCuts = responseData.no_of_cut || 0;

    const allTablesHTML = currentStrategyResults
      .map((bucket: any, bucketIndex: number) => {
        const bucketLabel = bucket?.size_bucket || `Bucket ${bucketIndex + 1}`;
        const metrics = getBucketMetrics(bucket || {});

        const tableRows = (bucket?.cutting_plans || [])
          .map((plan: any, planIndex: number) => {
            const activeSizes = getFilteredSizes(plan);
            const sizeColumns = Array.from({ length: maxCuts }, (_, i) => {
              const size = activeSizes[i];
              return `<td style="border: 1px solid #ddd; padding: 8px;">${
                size
                  ? `${size.actual_size || size.size || "-"}${size.uom || "mm"}`
                  : "-"
              }</td>`;
            }).join("");

            const usagePercent = (plan?.usage_percent ?? 0).toFixed(2);

            return `
              <tr style="${planIndex % 2 === 0 ? "background-color: #f9f9f9;" : ""}">
                <td style="border: 1px solid #ddd; padding: 8px;">${planIndex + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px; color: #2563eb; font-weight: 500;">${
                  plan?.item_details?.item_name || `Item ${planIndex + 1}`
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.sets ?? "-"}</td>
                ${sizeColumns}
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.wastage_mm ?? "-"}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.total_wastage_mm ?? "-"}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.wastage_qty ?? 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.total_wastage_qty ?? 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.usage_mm ?? "-"}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.total_usage_mm ?? "-"}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.usage_qty ?? 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${plan?.total_usage_qty ?? 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px; color: #059669; font-weight: 500;">${usagePercent}%</td>
              </tr>
            `;
          })
          .join("");

        return `
          <div class="bucket-section">
            <h3 class="bucket-heading">
              ${bucketLabel}
              <span class="bucket-meta">
                <span>Efficiency: <strong>${metrics.avgEfficiency.toFixed(1)}%</strong></span>
                <span>Wastage: <strong>${metrics.totalWastage}mm</strong></span>
                <span>Changes: <strong>${metrics.cutterChanges}</strong></span>
                <span>Rolls: <strong>${metrics.rollsUsed}</strong></span>
              </span>
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sr. No.</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sets</th>
                  ${Array.from({ length: maxCuts }, (_, i) => `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Size ${i + 1}</th>`).join("")}
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
                ${tableRows || `<tr><td colspan="${13 + maxCuts}" style="border: 1px solid #ddd; padding: 12px; text-align: center;">No cutting plans available</td></tr>`}
              </tbody>
            </table>
          </div>
        `;
      })
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Cutting Optimization Results - ${selectedStrategy.replace("_", " ").toUpperCase()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.5; color: #1f2937; }
            h1 { color: #111827; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-bottom: 24px; font-size: 24px; letter-spacing: 0.4px; }
            .summary-card { margin-bottom: 24px; padding: 16px 18px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
            .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 12px; }
            .summary-item { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }
            .summary-label { color: #4b5563; text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; }
            .summary-value { font-weight: 600; color: #111827; font-size: 14px; }
            .bucket-section { margin-bottom: 32px; page-break-inside: avoid; }
            .bucket-heading { display: flex; flex-direction: column; gap: 4px; font-size: 15px; color: #1f2937; margin: 0 0 12px; padding: 10px 12px; background-color: #f3f4f6; border-left: 4px solid #3b82f6; border-radius: 4px; }
            .bucket-meta { font-size: 12px; color: #4b5563; font-weight: 500; display: flex; flex-wrap: wrap; gap: 12px; }
            .bucket-meta span { display: flex; gap: 6px; align-items: baseline; }
            .bucket-meta strong { color: #1f2937; font-weight: 600; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; font-size: 11px; }
            @media print { body { margin: 10px; } .page-break { page-break-before: always; } }
          </style>
        </head>
        <body>
          <div class="summary-card">
            <div class="summary-grid">
              <div class="summary-item">
                <span class="summary-label">Strategy</span>
                <span class="summary-value">${selectedStrategy.replace("_", " ").toUpperCase()}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Total Rolls Used</span>
                <span class="summary-value">${currentStrategy.total_rolls_used}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Total Wastage</span>
                <span class="summary-value">${currentStrategy.total_wastage_mm}mm</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Total Cutter Changes</span>
                <span class="summary-value">${currentStrategy.total_cutter_changes}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Decal Size</span>
                <span class="summary-value">${responseData.decal_size}mm</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Max Cuts</span>
                <span class="summary-value">${responseData.no_of_cut}</span>
              </div>
            </div>
          </div>
          ${allTablesHTML || '<p>No cutting plans available for export.</p>'}
          <div style="margin-top: 40px; font-size: 12px; color: #4b5563;">
            <strong>Prepared by SRCS</strong> · <a href="https://srcs.vercel.app/" target="_blank">https://srcs.vercel.app/</a>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportExcel = () => {
    const maxCuts = responseData.no_of_cut || 0;
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

    currentStrategyResults.forEach((bucket: any, bucketIndex: number) => {
      const bucketLabel = bucket?.size_bucket || `Bucket ${bucketIndex + 1}`;
      csvContent += `\n${formatCSVValue(bucketLabel)}\n`;
      csvContent += headers.map(formatCSVValue).join(",") + "\n";

      (bucket?.cutting_plans || []).forEach((plan: any, planIndex: number) => {
        const activeSizes = getFilteredSizes(plan);
        const sizeColumns = Array.from({ length: maxCuts }, (_, i) => {
          const size = activeSizes[i];
          return size
            ? `${size.actual_size || size.size || "-"}${size.uom || "mm"}`
            : "-";
        });

        const row = [
          planIndex + 1,
          plan?.item_details?.item_name || `Item ${planIndex + 1}`,
          plan?.sets ?? 0,
          ...sizeColumns,
          plan?.wastage_mm ?? 0,
          plan?.total_wastage_mm ?? 0,
          plan?.wastage_qty ?? 0,
          plan?.total_wastage_qty ?? 0,
          plan?.usage_mm ?? 0,
          plan?.total_usage_mm ?? 0,
          plan?.usage_qty ?? 0,
          plan?.total_usage_qty ?? 0,
          `${(plan?.usage_percent ?? 0).toFixed(2)}%`,
        ];

        csvContent += row.map(formatCSVValue).join(",") + "\n";
      });
    });

    if (!csvContent.trim()) {
      csvContent = "No cutting plans available";
    }

    csvContent += `\n${formatCSVValue("SRCS Website")},${formatCSVValue("https://srcs.vercel.app/")}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutting-optimization-results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const colors = [
    "#2563eb", "#dc2626", "#059669", "#7c3aed", "#ea580c", 
    "#0891b2", "#65a30d", "#c2410c"
  ];

  const idColorMap = new Map<string, string>();
  let colorIndex = 0;

  const getColorForId = (id: string | null) => {
    if (!id) return "#E5E7EB";
    if (!idColorMap.has(id)) {
      idColorMap.set(id, colors[colorIndex % colors.length]);
      colorIndex++;
    }
    return idColorMap.get(id)!;
  };

  const renderPatternDetails = (plans: any[] = []) => {
    if (!plans.length) return null;

    return (
      <div className="!mt-2 md:!mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Pattern Details</h4>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-900">Sr. No.</th>
                <th className="text-left p-3 font-medium text-gray-900">Item Name</th>
                <th className="text-left p-3 font-medium text-gray-900">Sets</th>
                {Array.from({ length: responseData.no_of_cut }, (_, i) => (
                  <th key={i} className="text-left p-3 font-medium text-gray-900">Size {i + 1}</th>
                ))}
                <th className="text-left p-3 font-medium text-gray-900">Waste/Set (mm)</th>
                <th className="text-left p-3 font-medium text-gray-900">Total Waste (mm)</th>
                <th className="text-left p-3 font-medium text-gray-900">Usage/Set (mm)</th>
                <th className="text-left p-3 font-medium text-gray-900">Total Usage (mm)</th>
                <th className="text-left p-3 font-medium text-gray-900">Usage %</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan: any, planIndex: number) => {
                const activeSizes = (plan.sizes || []).filter((s: any) => (s.actual_size || s.size) > 0);
                return (
                  <tr key={planIndex} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-900 font-medium">{planIndex + 1}</td>
                    <td className="p-3 text-blue-600 font-medium">{plan.item_details?.item_name || `Item ${planIndex + 1}`}</td>
                    <td className="p-3 text-gray-900">{plan.sets || 1}</td>
                    {Array.from({ length: responseData.no_of_cut }, (_, i) => {
                      const size = activeSizes[i];
                      return (
                        <td key={i} className="p-3 text-gray-900">
                          {size ? `${size.actual_size || size.size}${size.uom || 'mm'}` : "-"}
                        </td>
                      );
                    })}
                    <td className="p-3 text-gray-900">{plan.wastage_mm || 700}</td>
                    <td className="p-3 text-gray-900">{plan.total_wastage_mm || 700}</td>
                    <td className="p-3 text-gray-900">{plan.usage_mm || 3800}</td>
                    <td className="p-3 text-gray-900">{plan.total_usage_mm || 3800}</td>
                    <td className="p-3 text-green-600 font-medium">{(plan.usage_percent || 85).toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Table View */}
        <div className="md:hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-200 rounded-lg" style={{ minWidth: '800px' }}>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">Sr.</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap min-w-[120px]">Item Name</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">Sets</th>
                  {Array.from({ length: responseData.no_of_cut }, (_, i) => (
                    <th key={i} className="text-left p-3 font-medium text-gray-900 whitespace-nowrap min-w-[60px]">Size {i + 1}</th>
                  ))}
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">Waste (mm)</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">Usage (mm)</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">Efficiency %</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan: any, planIndex: number) => {
                  const activeSizes = (plan.sizes || []).filter((s: any) => (s.actual_size || s.size) > 0);
                  return (
                    <tr key={planIndex} className="border-b border-gray-100">
                      <td className="p-3 text-gray-900 font-medium whitespace-nowrap">{planIndex + 1}</td>
                      <td className="p-3 text-blue-600 font-medium whitespace-nowrap" title={plan.item_details?.item_name || `Item ${planIndex + 1}`}>
                        {plan.item_details?.item_name || `Item ${planIndex + 1}`}
                      </td>
                      <td className="p-3 text-gray-900 whitespace-nowrap">{plan.sets || 1}</td>
                      {Array.from({ length: responseData.no_of_cut }, (_, i) => {
                        const size = activeSizes[i];
                        return (
                          <td key={i} className="p-3 text-gray-900 whitespace-nowrap">
                            {size ? `${size.actual_size || size.size}${size.uom || 'mm'}` : "-"}
                          </td>
                        );
                      })}
                      <td className="p-3 text-orange-600 font-medium whitespace-nowrap">{plan.wastage_mm || 700}</td>
                      <td className="p-3 text-gray-900 whitespace-nowrap">{plan.usage_mm || 3800}</td>
                      <td className="p-3 text-green-600 font-bold whitespace-nowrap">{(plan.usage_percent || 85).toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="text-xs text-gray-500 mt-2">
            💡 Swipe horizontally to see all columns
          </div> */}
        </div>
      </div>
    );
  };

  const getFilteredSizes = (plan: any) =>
    (plan.sizes || []).filter((size: any) => (size.actual_size || size.size) > 0);

  const generateSizeKey = (
    size: any,
    context: { bucketIndex?: number; planIndex: number; sizeIndex: number }
  ) => {
    if (size?.id) return String(size.id);
    if (size?.size_id) return String(size.size_id);
    return `${context.bucketIndex ?? "single"}-${context.planIndex}-${context.sizeIndex}-${size?.actual_size || size?.size}-${size?.uom || "mm"}`;
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 via-white to-indigo-50/30  sm:p-3 lg:p-6 rounded-xl">
      {/* Main Dashboard Grid - Mobile First */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Pie Chart - Full width on mobile */}
        <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-gray-200 shadow-sm hover:shadow-md p-0 transition-all duration-300 lg:order-1">
          <CardHeader className="bg-gradient-to-r from-gray-50 via-blue-50/50 to-indigo-50/30 border-b border-gray-200 p-2 sm:p-3 lg:p-4">
            <CardTitle className="flex items-center gap-1 sm:gap-2 text-gray-900 text-sm sm:text-md lg:text-base">
              <ChartPieIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              Roll Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex items-center justify-center">
            <div className="w-full max-w-[250px] sm:max-w-none">
              <PieChart
                data={{
                  utilized: state.metrics?.utilizedPercent || 85,
                  wastage: state.metrics?.wastePercent || 15,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Metrics and Strategy - Stack on mobile */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:order-2">
          {/* Metric Boxes - 2x2 grid on mobile, 4 columns on larger screens */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/10 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-2 sm:p-3">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {currentStrategy.total_rolls_used}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    Total Rolls
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-2 sm:p-3">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-green-600 mb-1">
                    {(
                      currentStrategyResults.reduce(
                        (acc: number, bucket: any) =>
                          acc +
                          (bucket.cutting_plans || []).reduce(
                            (planAcc: number, plan: any) =>
                              planAcc + (plan.usage_percent || 85),
                            0
                          ),
                        0
                      ) /
                      Math.max(
                        currentStrategyResults.reduce(
                          (acc: number, bucket: any) =>
                            acc + (bucket.cutting_plans || []).length,
                          0
                        ),
                        1
                      )
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    Efficiency
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-2 sm:p-3">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-orange-600 mb-1">
                    {currentStrategy.total_wastage_mm}
                    <span className="text-xs">mm</span>
                  </p>
                  <p className="text-xs font-medium text-gray-600">Wastage</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-2 sm:p-3">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-blue-600 mb-1">
                    {currentStrategy.total_cutter_changes}
                  </p>
                  <p className="text-xs font-medium text-gray-600">Cuts</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategy Selection */}
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4">
              <CardTitle className="text-gray-900 text-sm sm:text-base">
                Strategy Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="!p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        {responseData.strategies.min_cutter_changes.total_rolls_used}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (mm):</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_cutter_changes.total_wastage_mm}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wastage (qty):</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_cutter_changes.total_wastage_qty}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cutter Changes:</p>
                      <p className="text-gray-900 font-medium">
                        {responseData.strategies.min_cutter_changes.total_cutter_changes}
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
                        {responseData.strategies.min_wastage.total_cutter_changes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export Section */}
      <div className="space-y-4">
        <div className="flex flex-row sm:flex-row justify-between items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Optimization Results
          </h2>
          <div className="flex flex-row gap-1 sm:gap-2">
            <Button
              onClick={handleExportExcel}
              size="sm"
              className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center border-0 min-w-[60px] sm:w-auto"
            >
              <DocumentArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export Excel</span>
              <span className="sm:hidden">Excel</span>
            </Button>
            <Button
              onClick={handleExportPDF}
              size="sm"
              className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center border-0 min-w-[60px] sm:w-auto"
            >
              <DocumentArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>

        {/* Size Bucket Results with Visual Bars and Tables */}
        {currentStrategyResults.length === 1 ? (
          // Single bucket - show directly without accordion
          <Card className="border border-gray-200 bg-white flex gap-0 flex-col">
            <CardHeader className="hover:bg-gray-50 p-[8px] sm:p-[12px]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-xs sm:text-sm flex-shrink-0">
                  1
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-xs sm:text-base break-words">
                    {currentStrategyResults[0].size_bucket || "Main Bucket"}
                  </CardTitle>
                  <div className="mt-1 flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-600">
                    <span>Wastage: <strong>{getBucketMetrics(currentStrategyResults[0]).totalWastage}mm</strong></span>
                    <span>Changes: <strong>{getBucketMetrics(currentStrategyResults[0]).cutterChanges}</strong></span>
                    <span>Rolls: <strong>{getBucketMetrics(currentStrategyResults[0]).rollsUsed}</strong></span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="!p-2 sm:p-3">
              <div className="space-y-6">
                {/* Cutting Plans with Visual Bars */}
                <div className="space-y-4">
                  {(currentStrategyResults[0].cutting_plans || []).map((plan: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-2 sm:p-4 border border-gray-200">
                      <div className="mb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            Plan {plan.plan_number || index + 1} - {plan.item_details?.item_name || `Item ${index + 1}`}
                          </h4>
                          <div className="flex w-full justify-between text-xs sm:text-sm text-gray-600 sm:w-auto sm:justify-start sm:gap-4">
                            <span className="sm:mr-0">Sets: <strong>{plan.sets || 1}</strong></span>
                            <span>Usage: <strong>{(plan.usage_percent || 85).toFixed(2)}%</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Bar - Exact Reference Implementation */}
                      <div className="mb-3">
                        <div className="flex rounded-lg overflow-hidden h-8 bg-gray-200">
                          {getFilteredSizes(plan).map((size: any, sizeIndex: number) => {
                            const sizeKey = generateSizeKey(size, {
                              planIndex: index,
                              sizeIndex,
                            });
                            const percentage =
                              (size.size_mm /
                                (plan.usage_mm + plan.wastage_mm)) *
                              100;
                            const isHighlighted = highlightedSize === sizeKey;
                            return (
                              <div
                                key={sizeKey}
                                className={`flex items-center justify-center text-white text-xs font-medium transition-all duration-200 border-r border-white/30 ${
                                  isHighlighted ? "ring-2 ring-yellow-400 ring-inset shadow-sm" : ""
                                }`}
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: getColorForId(sizeKey),
                                }}
                                title={`${size.actual_size}${size.uom}`}
                              >
                                {(percentage > 8 || isHighlighted) && (
                                  <span className="hidden md:inline">
                                    {size.actual_size}
                                    {size.uom}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          {plan.wastage_mm > 0 && (
                            <div
                              className="flex items-center justify-center text-gray-600 text-xs"
                              style={{
                                width: `${
                                  (plan.wastage_mm /
                                    (plan.usage_mm + plan.wastage_mm)) *
                                  100
                                }%`,
                                backgroundColor: "#E5E7EB",
                              }}
                            >
                              Waste
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                          <div className="flex text-xs text-gray-500 sm:justify-start">
                            <span>
                              Usage: <strong>{plan.usage_mm}mm </strong> 
                            </span>
                             &nbsp;|&nbsp;
                            <span>
                              Wastage: <strong>{plan.wastage_mm}mm </strong>
                            </span>
                            &nbsp;|&nbsp;
                            <span className="sm:ml-0">
                              Qty: <strong>{plan.usage_qty}</strong>
                          </span>
                          </div>
                        </div>
                      </div>

                      {/* Size Details - Show only unique IDs */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {(() => {
                          const uniqueSizes = getFilteredSizes(plan).reduce(
                            (
                              acc: { size: any; key: string }[],
                              size: any,
                              sizeIndex: number
                            ) => {
                              const sizeKey = generateSizeKey(size, {
                                planIndex: index,
                                sizeIndex,
                              });
                              if (!acc.some((item) => item.key === sizeKey)) {
                                acc.push({ size, key: sizeKey });
                              }
                              return acc;
                            },
                            [] as { size: any; key: string }[]
                          );

                          return uniqueSizes.map(({ size, key }) => (
                            <button
                              key={key}
                              type="button"
                              className={`bg-white rounded p-2 border text-center min-w-0 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                highlightedSize === key
                                  ? "ring-2 ring-yellow-400 bg-yellow-50"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                setHighlightedSize(
                                  highlightedSize === key ? null : key
                                )
                              }
                            >
                              <div
                                className="w-2 h-2 rounded-full mx-auto mb-1"
                                style={{ backgroundColor: getColorForId(key) }}
                              ></div>
                              <p className="text-xs font-medium truncate">
                                {size.actual_size || size.size || 100}
                                {size.uom || "mm"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {size.size_mm || size.actual_size || size.size || 100}mm
                              </p>
                            </button>
                          ));
                        })()}
                      </div>
                    </div>
                  ))}
                </div>

                {renderPatternDetails(currentStrategyResults[0].cutting_plans || [])}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Multiple buckets - show accordion
          currentStrategyResults.map((bucket: any, bucketIndex: number) => {
            const bucketLabel = bucket.size_bucket || `Bucket ${bucketIndex + 1}`;
            const metrics = getBucketMetrics(bucket);
            const isExpanded = expandedSections.has(bucket.size_bucket || `bucket-${bucketIndex}`);

            const toggleSection = () => {
              const newExpanded = new Set(expandedSections);
              const key = bucket.size_bucket || `bucket-${bucketIndex}`;
              if (isExpanded) {
                newExpanded.delete(key);
              } else {
                newExpanded.add(key);
              }
              setExpandedSections(newExpanded);
            };

            return (
              <Card key={bucketIndex} className="border border-gray-200 bg-white ">
                <CardHeader className="cursor-pointer hover:bg-gray-50 sm:p-6 p-[0.6rem]" onClick={toggleSection}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0 flex-1 ">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full  flex items-center justify-center bg-blue-500 text-white font-bold text-xs sm:text-sm flex-shrink-0">
                        {bucketIndex + 1}
                      </div>
                      <div className="min-w-0 flex-1 ">
                        <CardTitle className="text-sm sm:text-base truncate">{bucketLabel}</CardTitle>
                        <div className="flex sm:flex-row gap-1 sm:gap-4 text-xs text-gray-600">
                          <span>Wastage: <strong>{metrics.totalWastage}mm</strong></span>
                          <span>Changes: <strong>{metrics.cutterChanges}</strong></span>
                          <span>Rolls: <strong>{metrics.rollsUsed}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="!p-2 md:!p-6 border-t border-gray-200">
                    {/* Same content as single bucket but for this specific bucket */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {(bucket.cutting_plans || []).map((plan: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold text-gray-900">
                                Plan {plan.plan_number || index + 1} - {plan.item_details?.item_name || `Item ${index + 1}`}
                              </h4>
                              <div className="flex gap-2 text-sm text-gray-600">
                                <span>Sets: {plan.sets || 1}</span>
                                <span>Usage: {(plan.usage_percent || 85).toFixed(2)}%</span>
                              </div>
                            </div>
                            {/* Horizontal Bar Visualization with Highlight */}
                            <div className="mb-3">
                              <div className="flex rounded-lg overflow-hidden h-8 bg-gray-200">
                                {getFilteredSizes(plan).map((size: any, sizeIndex: number) => {
                                  const sizeKey = generateSizeKey(size, {
                                    bucketIndex,
                                    planIndex: index,
                                    sizeIndex,   
                                  });
                                  const total = (plan.usage_mm || 0) + (plan.wastage_mm || 0);
                                  const sizeUsage = size.size_mm || size.actual_size || 0;
                                  const percentage = total > 0 ? (sizeUsage / total) * 100 : 0;
                                  const isHighlighted = highlightedSize === sizeKey;
                                  return (
                                    <div
                                      key={sizeKey}
                                      className={`flex items-center justify-center text-white text-xs font-medium transition-all duration-300 border-r border-white/30 ${
                                        isHighlighted ? "ring-2 ring-yellow-400 ring-inset shadow-sm" : ""
                                      }`}
                                      style={{
                                        width: `${percentage}%`,
                                        backgroundColor: getColorForId(sizeKey),
                                      }}
                                      title={`${size.actual_size}${size.uom}`}
                                      onClick={() =>
                                        setHighlightedSize(isHighlighted ? null : sizeKey)
                                      }
                                    >
                                      {(percentage > 8 || isHighlighted) && (
                                        <span className="hidden md:inline">
                                          {size.actual_size}
                                          {size.uom}
                                        </span>
                                      )}
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
                                          ((plan.total_usage_mm || plan.usage_mm || 0) +
                                            plan.wastage_mm)) *
                                        100
                                      }%`,
                                      backgroundColor: "#E5E7EB",
                                    }}
                                    title={`Wastage: ${plan.wastage_mm}mm`}
                                  >
                                    {(plan.wastage_mm /
                                      ((plan.total_usage_mm || plan.usage_mm || 0) +
                                        plan.wastage_mm)) *
                                      100 >
                                      5 && "Waste"}
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Wastage: {plan.wastage_mm}mm | Usage: {plan.usage_mm}mm | Qty: {plan.usage_qty}
                              </div>
                            </div>


                            {/* Size Details Grid - Show only unique IDs */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                              {(() => {
                                const uniqueSizes = getFilteredSizes(plan).reduce(
                                  (
                                    acc: { size: any; key: string }[],
                                    size: any,
                                    sizeIndex: number
                                  ) => {
                                    const sizeKey = generateSizeKey(size, {
                                      bucketIndex,
                                      planIndex: index,
                                      sizeIndex,
                                    });
                                    if (!acc.some((item) => item.key === sizeKey)) {
                                      acc.push({ size, key: sizeKey });
                                    }
                                    return acc;
                                  },
                                  [] as { size: any; key: string }[]
                                );

                                return uniqueSizes.map(({ size, key }) => (
                                  <button
                                    key={key}
                                    type="button"
                                    className={`bg-white rounded p-2 border border-gray-200 transition-colors duration-200 text-center cursor-pointer ${
                                      highlightedSize === key
                                        ? 'ring-2 ring-yellow-400 bg-yellow-50'
                                        : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() =>
                                      setHighlightedSize(
                                        highlightedSize === key
                                          ? null 
                                          : key
                                      )
                                    }
                                  >
                                    <div className="flex items-center justify-center mb-1">
                                      <div
                                        className="w-2 h-2 rounded-full border border-gray-300"
                                        style={{
                                          backgroundColor: getColorForId(
                                            key
                                          ),
                                        }}
                                      ></div>
                                    </div>
                                    <p className="text-gray-900 font-medium text-xs">
                                      {size.actual_size}
                                      {size.uom}
                                    </p>
                                    <p className="text-gray-600 text-xs">
                                      {size.size_mm}mm
                                    </p>
                                  </button>
                                ));
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                      {renderPatternDetails(bucket.cutting_plans || [])}
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
