"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Cog6ToothIcon,
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

interface SEOContentPageProps {
  onNavigate: (tab: string) => void
}

export default function SEOContentPage({ onNavigate }: SEOContentPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-5xl">
      {/* SEO Title and Meta Description */}
      <div className="hidden">
        <h1>Smart Roll Cutting System (SRCS) – Advanced Solution for Optimized Roll Cutting</h1>
        <meta name="description" content="Discover the Smart Roll Cutting System (SRCS), the most efficient solution for solving roll cutting problems. Maximize material usage and reduce waste with SRCS technology." />
      </div>

      {/* Hero Section with Main H1 */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Smart Roll Cutting System (SRCS)</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The industry-leading solution for optimizing material usage and solving complex roll cutting problems with precision and efficiency.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => onNavigate("run")} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Try SRCS Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("api-docs")}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            View Documentation
          </Button>
        </div>
      </section>

      {/* What Is the Roll Cutting Problem? Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">What Is the Roll Cutting Problem?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-gray-700">
              The roll cutting problem is a fundamental optimization challenge in manufacturing and industrial processes where materials come in standard-sized rolls or sheets and need to be cut into smaller pieces of various sizes to fulfill customer orders.
            </p>
            <p className="text-gray-700">
              Industries facing this challenge include paper manufacturing, textile production, steel processing, plastic film production, and many others where raw materials are produced in large rolls and must be cut efficiently to minimize waste.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">Key Challenges in Roll Cutting:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Minimizing material waste while fulfilling all required cuts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Optimizing cutter patterns to reduce machine setup time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Balancing production efficiency with material utilization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Managing complex order requirements with varying sizes and quantities</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative h-64 md:h-full rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-gray-900/60 flex items-center justify-center text-white text-center p-6">
              <div>
                <h3 className="text-2xl font-bold mb-3">Industry Impact</h3>
                <p className="mb-4">Inefficient cutting patterns can result in 15-25% material waste, directly impacting production costs and sustainability goals.</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-white">$1.2M+</p>
                    <p className="text-sm">Average annual waste cost for mid-sized manufacturers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">18%</p>
                    <p className="text-sm">Typical material waste without optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How SRCS Solves Roll Cutting Challenges */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">How SRCS Solves Roll Cutting Challenges</h2>
        <p className="text-gray-700 text-lg">
          The Smart Roll Cutting System (SRCS) leverages advanced algorithms and intelligent optimization techniques to transform how manufacturers approach the roll cutting problem.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LightBulbIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">AI-Powered Optimization</h3>
              <p className="text-gray-600">
                SRCS employs sophisticated algorithms that analyze thousands of possible cutting patterns in seconds to identify the most efficient solution for your specific requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Dynamic pattern generation based on real-time constraints</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multi-objective optimization balancing waste and efficiency</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Waste Reduction Focus</h3>
              <p className="text-gray-600">
                Our system prioritizes material utilization, typically reducing waste by 10-15% compared to manual planning methods or less sophisticated optimization tools.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Trim loss minimization strategies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Remnant management for future use</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Production Efficiency</h3>
              <p className="text-gray-600">
                SRCS optimizes not just material usage but also production workflows by minimizing cutter changes and streamlining operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Reduced machine setup time</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Optimized cutting sequences</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <CubeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Versatile Application</h3>
              <p className="text-gray-600">
                Whether you're cutting paper, textiles, metal, or plastic films, SRCS adapts to your specific industry requirements and material constraints.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Industry-specific optimization parameters</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Customizable constraints and priorities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features of SRCS */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Key Features of SRCS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Dual Optimization Strategies</h4>
            <p className="text-gray-600">
              Choose between minimizing material waste or reducing cutter changes based on your production priorities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Real-time Visualization</h4>
            <p className="text-gray-600">
              Interactive visual representations of cutting patterns help you understand and validate optimization results.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Flexible Input Methods</h4>
            <p className="text-gray-600">
              Import data via Excel spreadsheets or manually input your requirements through an intuitive interface.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Comprehensive Analytics</h4>
            <p className="text-gray-600">
              Detailed reports on material utilization, waste reduction, and cost savings to quantify the benefits.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">API Integration</h4>
            <p className="text-gray-600">
              Seamlessly integrate SRCS with your existing production systems through our comprehensive API.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Secure Cloud Processing</h4>
            <p className="text-gray-600">
              Process complex optimization problems in the cloud with enterprise-grade security and data protection.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits of Using SRCS */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Benefits of Using SRCS</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Material Cost Reduction</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Reduce raw material costs by up to 15% through optimized cutting patterns that minimize waste.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Increased Production Efficiency</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Streamline production workflows with optimized cutting sequences and reduced machine setup time.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Environmental Sustainability</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Contribute to sustainability goals by reducing material waste and optimizing resource utilization.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Rapid ROI</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Most customers achieve return on investment within 3-6 months through material savings and efficiency gains.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Enhanced Planning Capabilities</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Make informed decisions with detailed analytics and forecasting tools for material requirements.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-1 mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Competitive Advantage</h4>
                </div>
                <p className="text-gray-700 pl-9">
                  Stay ahead of competitors with cutting-edge optimization technology that delivers measurable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-6 w-6 mr-2" />
                <h4 className="text-lg font-semibold">Paper Manufacturing Giant</h4>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700">
                A leading paper manufacturer implemented SRCS and reduced material waste by 12.5%, resulting in annual savings of $875,000 while improving production throughput by 8%.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Read full case study</span>
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-6 w-6 mr-2" />
                <h4 className="text-lg font-semibold">Textile Industry Leader</h4>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700">
                A textile manufacturer optimized their cutting operations with SRCS, achieving 15% waste reduction and 22% fewer cutter changes, dramatically improving production efficiency.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Read full case study</span>
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white rounded-xl p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Optimize Your Roll Cutting Process?</h2>
        <p className="text-xl max-w-3xl mx-auto">
          Join hundreds of manufacturers who have transformed their operations with the Smart Roll Cutting System (SRCS).
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => onNavigate("run")} 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Start Optimization
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("api-docs")}
            className="border-white text-white hover:bg-blue-700 px-8 py-3 text-lg"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Explore Documentation
          </Button>
        </div>
      </section>

      {/* Schema Markup (hidden) */}
      <div className="hidden" itemScope itemType="https://schema.org/Product">
        <meta itemProp="name" content="Smart Roll Cutting System (SRCS)" />
        <meta itemProp="description" content="Advanced solution for optimized roll cutting that minimizes waste and improves efficiency in manufacturing processes." />
        <meta itemProp="brand" content="SRCS" />
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="price" content="0" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>
      </div>
    </div>
  )
}