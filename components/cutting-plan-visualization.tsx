"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CuttingPlanVisualizationProps {
  cuttingPlan: any[]
  showDetailed: boolean
}

export default function CuttingPlanVisualization({ cuttingPlan, showDetailed }: CuttingPlanVisualizationProps) {
  const colors = [
    "#3b82f6", // blue-500
    "#10b981", // green-500
    "#f59e0b", // yellow-500
    "#ef4444", // red-500
    "#8b5cf6", // purple-500
    "#06b6d4", // cyan-500
  ]

  const renderRollVisualization = (roll: any, index: number) => {
    const totalWidth = 400 // Total width for visualization
    let currentPosition = 0

    return (
      <div key={roll.rollId} className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Roll {roll.rollId}</h4>
        <div className="relative">
          {/* Roll visualization bar */}
          <div className="h-12 bg-gray-200 rounded-lg overflow-hidden flex">
            {roll.cuts.map((cut: any, cutIndex: number) => {
              const cutWidth = (cut.size / 1000) * totalWidth // Scale for visualization
              const color = colors[cutIndex % colors.length]

              const segment = (
                <div
                  key={cutIndex}
                  className="h-full flex items-center justify-center text-white text-xs font-medium"
                  style={{
                    width: `${cutWidth}px`,
                    backgroundColor: color,
                    minWidth: "30px",
                  }}
                >
                  {cut.size}mm × {cut.quantity}
                </div>
              )

              currentPosition += cutWidth
              return segment
            })}

            {/* Wastage section */}
            {roll.wastage > 0 && (
              <div
                className="h-full flex items-center justify-center text-gray-600 text-xs font-medium bg-gray-300"
                style={{ width: `${(roll.wastage / 1000) * totalWidth}px`, minWidth: "20px" }}
              >
                Waste: {roll.wastage}mm
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="mt-2 flex flex-wrap gap-2">
            {roll.cuts.map((cut: any, cutIndex: number) => (
              <div key={cutIndex} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[cutIndex % colors.length] }}
                ></div>
                <span className="text-xs text-gray-600">
                  Size {cut.size}mm (×{cut.quantity})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Roll Visualizations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Roll Cutting Patterns</h3>
        {cuttingPlan.map((roll, index) => renderRollVisualization(roll, index))}
      </div>

      {/* Detailed Table View */}
      {showDetailed && (
        <Card>
          <CardHeader className="py-3 flex items-center">
            <CardTitle>Detailed Cutting Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left font-medium">Roll ID</th>
                    <th className="border border-gray-200 p-3 text-left font-medium">Size 1</th>
                    <th className="border border-gray-200 p-3 text-left font-medium">Size 2</th>
                    <th className="border border-gray-200 p-3 text-left font-medium">Size 3</th>
                    <th className="border border-gray-200 p-3 text-left font-medium">Size 4</th>
                    <th className="border border-gray-200 p-3 text-left font-medium">Wastage (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {cuttingPlan.map((roll) => (
                    <tr key={roll.rollId} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-medium">Roll {roll.rollId}</td>
                      {[0, 1, 2, 3].map((index) => (
                        <td key={index} className="border border-gray-200 p-3">
                          {roll.cuts[index] ? `${roll.cuts[index].size}mm (×${roll.cuts[index].quantity})` : "-"}
                        </td>
                      ))}
                      <td className="border border-gray-200 p-3 text-red-600 font-medium">{roll.wastage}mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Legend */}
      <Card>
        <CardHeader className="py-3 flex items-center">
          <CardTitle>Color Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-sm text-gray-600">Size Pattern {index + 1}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Wastage</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
