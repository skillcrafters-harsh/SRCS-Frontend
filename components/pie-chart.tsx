"use client"

import { useEffect, useRef } from "react"

interface PieChartProps {
  data: {
    utilized: number
    wastage: number
  }
}

export default function PieChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 250
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Calculate angles
    const total = data.utilized + data.wastage
    const utilizedAngle = (data.utilized / total) * 2 * Math.PI
    const wastageAngle = (data.wastage / total) * 2 * Math.PI

    const centerX = size / 2
    const centerY = size / 2
    const outerRadius = size / 2 - 30
    const innerRadius = outerRadius * 0.6

    // Draw utilized portion (donut)
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, -Math.PI / 2, -Math.PI / 2 + utilizedAngle)
    ctx.arc(centerX, centerY, innerRadius, -Math.PI / 2 + utilizedAngle, -Math.PI / 2, true)
    ctx.closePath()
    ctx.fillStyle = "#10b981" // green-500
    ctx.fill()

    // Draw wastage portion (donut)
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, -Math.PI / 2 + utilizedAngle, -Math.PI / 2 + utilizedAngle + wastageAngle)
    ctx.arc(centerX, centerY, innerRadius, -Math.PI / 2 + utilizedAngle + wastageAngle, -Math.PI / 2 + utilizedAngle, true)
    ctx.closePath()
    ctx.fillStyle = "#f97316" // orange-500
    ctx.fill()

    // Draw center text
    ctx.fillStyle = "#374151" // gray-700
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${data.utilized.toFixed(1)}%`, centerX, centerY - 5)
    ctx.font = "12px sans-serif"
    ctx.fillText("Efficiency", centerX, centerY + 15)

    // Add subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
  }, [data])

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas ref={canvasRef} className="max-w-full h-auto animate-pulse" />
      </div>
      <div className="flex items-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Utilized ({data.utilized.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Wastage ({data.wastage.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  )
}
