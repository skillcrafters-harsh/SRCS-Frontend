"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function ExamplePage() {
  const handleExportExample = () => {
    // Create example data for Excel export
    const exampleData = [
      [
        "Item Name",
        "Size",
        "NOR",
        "UOM",
        "Dia",
        "BF",
        "GSM",
        "Quality",
        "Quantity",
      ],
      ["Paper Roll A", "250", "2", "MM", "36", "80", "120", "Premium", "150"],
      ["Paper Roll B", "180", "5", "MM", "36", "80", "120", "Standard", "270"],
      ["Paper Roll C", "120", "1", "MM", "36", "80", "120", "Premium", "72"],
      ["Paper Roll D", "300", "1", "MM", "36", "80", "120", "Standard", "180"],
      ["Paper Roll E", "200", "4", "MM", "36", "80", "120", "Premium", "480"],
    ];

    // Convert to CSV and download
    const csvContent = exampleData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "example_input_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center px-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Example Input & Output
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          See how our optimization system works with real-world data examples
        </p>
      </div>

      {/* Example Input Section */}
      <Card className="shadow-lg w-full">
        <CardHeader className="bg-blue-50 py-2 sm:py-3 lg:py-4 flex items-center px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900">
            Example Input Data
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Sample cutting requirements for paper roll optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Roll Width:</span>
                  <span className="text-gray-900">1000 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Material Type:
                  </span>
                  <span className="text-gray-900">Paper</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Optimization Goal:
                  </span>
                  <span className="text-gray-900">Minimize Wastage</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Total Items:
                  </span>
                  <span className="text-gray-900">5 different sizes</span>
                </div>
              </div>
            </div>

            {/* Cut Requirements Table */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Cut Requirements
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">
                        Size (mm)
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        NOR
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 text-gray-900">250</td>
                      <td className="p-3 text-gray-900">2</td>
                      <td className="p-3 text-gray-900">150</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-900">180</td>
                      <td className="p-3 text-gray-900">5</td>
                      <td className="p-3 text-gray-900">270</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-900">120</td>
                      <td className="p-3 text-gray-900">1</td>
                      <td className="p-3 text-gray-900">72</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-900">300</td>
                      <td className="p-3 text-gray-900">1</td>
                      <td className="p-3 text-gray-900">180</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-900">200</td>
                      <td className="p-3 text-gray-900">4</td>
                      <td className="p-3 text-gray-900">480</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleExportExample}
              size="sm"
              className="w-full sm:w-auto px-3 cursor-pointer sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium sm:font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Download Example Input (Excel)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          <div className="h-px bg-gray-300 w-16"></div>
          <ArrowRightIcon className="h-6 w-6 text-gray-400" />
          <div className="h-px bg-gray-300 w-16"></div>
        </div>
      </div>

      {/* Example Output Section */}
      <Card className="shadow-lg w-full">
        <CardHeader className="bg-green-50 py-3 flex items-center">
          <CardTitle className="text-xl text-gray-900">
            Optimization Results
          </CardTitle>
          <CardDescription className="text-gray-600">
            Generated cutting plan and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">92.30%</div>
                  <div className="text-sm text-gray-600">
                    Material Utilization
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Rolls Used</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">180 mm</div>
                  <div className="text-sm text-gray-600">Total Wastage</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-gray-600">Cutter Changes</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-900">
                  System Performance
                </h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="text-gray-900">0.80s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CPU Usage:</span>
                  <span className="text-gray-900">38%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Memory Usage:</span>
                  <span className="text-gray-900">1.8GB</span>
                </div>
              </div>
            </div>

            {/* Cutting Plan Visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Cutting Plan Preview
              </h3>
              <div className="space-y-3">
                <div className="bg-white border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Roll 1
                    </span>
                    <span className="text-xs text-gray-500">Wastage: 20mm</span>
                  </div>
                  <div className="flex space-x-1 h-6">
                    <div
                      className="bg-blue-400 rounded flex-1"
                      style={{ maxWidth: "25%" }}
                    ></div>
                    <div
                      className="bg-green-400 rounded flex-1"
                      style={{ maxWidth: "18%" }}
                    ></div>
                    <div
                      className="bg-purple-400 rounded flex-1"
                      style={{ maxWidth: "30%" }}
                    ></div>
                    <div
                      className="bg-orange-400 rounded flex-1"
                      style={{ maxWidth: "25%" }}
                    ></div>
                    <div
                      className="bg-gray-200 rounded"
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    250×2, 180×3, 120×1
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Roll 2
                    </span>
                    <span className="text-xs text-gray-500">Wastage: 50mm</span>
                  </div>
                  <div className="flex space-x-1 h-6">
                    <div
                      className="bg-red-400 rounded flex-1"
                      style={{ maxWidth: "30%" }}
                    ></div>
                    <div
                      className="bg-yellow-400 rounded flex-1"
                      style={{ maxWidth: "20%" }}
                    ></div>
                    <div
                      className="bg-indigo-400 rounded flex-1"
                      style={{ maxWidth: "40%" }}
                    ></div>
                    <div
                      className="bg-gray-200 rounded"
                      style={{ width: "5%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    300×1, 200×2, 180×2
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Roll 3
                    </span>
                    <span className="text-xs text-gray-500">Wastage: 30mm</span>
                  </div>
                  <div className="flex space-x-1 h-6">
                    <div
                      className="bg-pink-400 rounded flex-1"
                      style={{ maxWidth: "40%" }}
                    ></div>
                    <div
                      className="bg-cyan-400 rounded flex-1"
                      style={{ maxWidth: "25%" }}
                    ></div>
                    <div
                      className="bg-lime-400 rounded flex-1"
                      style={{ maxWidth: "32%" }}
                    ></div>
                    <div
                      className="bg-gray-200 rounded"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    200×2, 250×1, 180×2
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                * Colors represent different cut sizes. Gray areas indicate
                wastage.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
