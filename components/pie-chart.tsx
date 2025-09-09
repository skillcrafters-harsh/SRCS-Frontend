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
    const size = 200
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
    const radius = size / 2 - 20

    // Draw utilized portion
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, 0, utilizedAngle)
    ctx.closePath()
    ctx.fillStyle = "#10b981" // green-500
    ctx.fill()

    // Draw wastage portion
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, utilizedAngle, utilizedAngle + wastageAngle)
    ctx.closePath()
    ctx.fillStyle = "#ef4444" // red-500
    ctx.fill()

    // Draw border
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#e5e7eb" // gray-200
    ctx.lineWidth = 2
    ctx.stroke()
  }, [data])

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Utilized ({data.utilized}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Wastage ({data.wastage}%)</span>
        </div>
      </div>
    </div>
  )
}
