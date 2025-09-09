"use client"

import { Button } from "@/components/ui/button"
import {
  Cog6ToothIcon,
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

interface HomePageProps {
  onNavigate: (tab: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div
        className="text-center py-16 relative overflow-hidden"
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(59, 130, 246, 0.8)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-gray-900/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">Smart Roll Cutting Solutions</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Optimize your material usage with advanced cutting pattern algorithms.
            <br />
            Reduce waste, save costs, and improve efficiency in your manufacturing process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("run")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Start Optimization
            </Button>
            <Button
              onClick={() => onNavigate("api-docs")}
              variant="outline"
              className="border-white text-white px-8 py-3 text-lg bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/90 transition-all duration-300"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              API Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section - Zig-zag Layout */}
      <div className="px-6 lg:px-12 space-y-24">
        {/* Feature 1 - Left aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Advanced Algorithms
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              State-of-the-art optimization algorithms to minimize waste and maximize efficiency
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our cutting-edge algorithms analyze your material specifications and cutting requirements to generate
              optimal cutting patterns. Choose between minimizing material wastage or reducing cutter changes based on
              your production priorities.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Dual optimization strategies
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Real-time pattern generation
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Intelligent waste reduction
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">92.3%</div>
                <div className="text-sm text-gray-600">Material Utilization</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">15%</div>
                <div className="text-sm text-gray-600">Waste Reduction</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">45%</div>
                <div className="text-sm text-gray-600">Time Savings</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 - Right aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Roll 1</span>
                  <span className="text-xs text-gray-500">1000mm</span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-6 bg-blue-400 rounded" style={{ width: "25%" }}></div>
                  <div className="h-6 bg-green-400 rounded" style={{ width: "18%" }}></div>
                  <div className="h-6 bg-purple-400 rounded" style={{ width: "30%" }}></div>
                  <div className="h-6 bg-orange-400 rounded" style={{ width: "20%" }}></div>
                  <div className="h-6 bg-gray-200 rounded" style={{ width: "7%" }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Wastage: 70mm</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Roll 2</span>
                  <span className="text-xs text-gray-500">1000mm</span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-6 bg-red-400 rounded" style={{ width: "40%" }}></div>
                  <div className="h-6 bg-yellow-400 rounded" style={{ width: "20%" }}></div>
                  <div className="h-6 bg-indigo-400 rounded" style={{ width: "25%" }}></div>
                  <div className="h-6 bg-gray-200 rounded" style={{ width: "15%" }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Wastage: 150mm</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Real-time Analytics
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Comprehensive analytics and reporting to track your material usage and savings
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get detailed insights into your cutting operations with interactive visualizations, performance metrics,
              and comprehensive reports. Track material utilization, identify optimization opportunities, and monitor
              cost savings over time.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Interactive cutting plan visualization
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Performance monitoring dashboard
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Export capabilities (PDF/Excel)
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3 - Left aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <CubeIcon className="h-4 w-4 mr-2" />
              Industrial Scale
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Built for manufacturing environments with support for complex cutting patterns
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Designed specifically for industrial manufacturing environments, our system handles complex cutting
              requirements with multiple material types, sizes, and specifications. Scale from small batches to large
              production runs with consistent performance.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Multiple input methods (Manual/Excel)
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Flexible field configuration
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Production-ready scalability
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="text-center">
                <ClockIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600 text-sm">Average response time under 2 seconds</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-xs text-gray-600">Cuts per batch</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs text-gray-600">Availability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="bg-gray-900 rounded-2xl p-12 text-white mx-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Solution?</h2>
          <p className="text-xl text-gray-300">Transform your manufacturing process with intelligent optimization</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cog6ToothIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Reduce Material Waste</h3>
            <p className="text-gray-300">
              Minimize material wastage by up to 15% with intelligent cutting pattern optimization
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Increase Efficiency</h3>
            <p className="text-gray-300">
              Reduce setup time and cutter changes while maintaining high production throughput
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CubeIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Save Costs</h3>
            <p className="text-gray-300">
              Lower material costs and improved productivity translate to significant cost savings
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
