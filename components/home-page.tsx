"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PlayIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline"

interface HomePageProps {
  onNavigate: (tab: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-0">
      {/* Hero Section - Problem-Solution Hook */}
      <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
        {/* Background Video/Image Option */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          <img 
            src="/bg.png" 
            alt="High Material Wastage Problem" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  Stop Losing Money
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Stop Wasteful Roll Cutting. 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    Start Boosting Profits.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Smart Roll Cutting's AI-powered platform transforms manual, error-prone material planning into automated, optimized production.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate("run")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Start Your Free Trial
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  onClick={() => onNavigate("api-docs")}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white px-8 py-4 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  Request a Demo
                </Button>
              </div>
            </div>
            
            {/* Video/Image Placeholder */}
            <div className="relative">
              <div className="aspect-video bg-gray-800/50 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <PlayIcon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Watch Our Solution in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Agitation Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Hidden Costs of Traditional Roll Cutting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every day you delay optimization, you're losing money. Here's what's really costing you:
            </p>
          </div>

          {/* Problem 1: Material Wastage & Rising Costs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                Problem #1
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Are You Throwing Profits Away?
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Manual calculations and inefficient cutting patterns lead to massive material scrap. Every inch of wasted paper is money lost directly from your bottom line, causing your operational costs to spiral upwards.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">
                  "The average manufacturer loses 15-25% of material to poor cutting patterns. That's thousands of dollars every month."
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/hcsuhcishcs.png" 
                alt="High Material Wastage - Frustrated worker with waste pile" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                Costs Rising
              </div>
            </div>
          </div>

          {/* Problem 2: Downtime & Lost Productivity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="/_wasteNdowntime.png" 
                alt="Downtime and Lost Productivity - Worker with hands up" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                Profit Loss
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                <ClockIcon className="h-4 w-4 mr-2" />
                Problem #2
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Downtime is Your Biggest Enemy.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Miscalculations don't just waste material; they halt production. Machine downtime, re-runs, and rework kill productivity, delay orders, and erode your competitive edge.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <p className="text-orange-800 font-semibold">
                  "Every hour of unplanned downtime costs manufacturers an average of $260,000 per year."
                </p>
              </div>
            </div>
          </div>

          {/* Problem 3: Maintenance & Frequent Changes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                Problem #3
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Frequent Cutter Changes Draining Your Resources?
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sub-optimal cutting plans can lead to excessive wear and tear on your machinery, necessitating frequent, costly cutter changes and increasing your overall maintenance expenditure.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <p className="text-purple-800 font-semibold">
                  "Poor cutting patterns can increase maintenance costs by up to 40% due to excessive equipment wear."
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/cutterChangeProblem.png" 
                alt="Higher Maintenance Costs - Worker fixing cutter" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                Higher Costs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section - Smart Roll Cutting's Transformation */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Waste into Profit with Smart Roll Cutting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop losing money to inefficiency. Here's how Smart Roll Cutting transforms your operation:
            </p>
          </div>

          {/* Solution 1: Guaranteed Waste Reduction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Solution #1
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Achieve Up To 40% Waste Reduction Instantly.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our AI-powered optimization engine generates the most efficient cutting patterns in seconds, dramatically reducing material waste and turning your current losses into significant savings. See the impact directly on our intuitive dashboard.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-green-800 font-semibold">
                  "Our customers see an average of 40% waste reduction within the first month of implementation."
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-gray-600">Less Waste</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$50K+</div>
                  <div className="text-sm text-gray-600">Monthly Savings</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/wasteImproved.png" 
                alt="Smart Roll Cutting Dashboard - Happy worker with reduced costs" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                Costs Reduced
              </div>
            </div>
          </div>

          {/* Solution 2: Boost Productivity & Profit Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="/fewCutterChange.png" 
                alt="Profit Growth - Two happy workers with growth graph" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                Profit Growth
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Solution #2
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Maximize Uptime. Maximize Profit.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                By providing optimized plans, Smart Roll Cutting enables longer, uninterrupted production runs, minimizes cutter changes, and eliminates costly re-runs. This leads to increased throughput, reduced labor, and a clear path to sustained profit growth.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800 font-semibold">
                  "Longer runs without interruptions mean 25% more production capacity and 30% higher profit margins."
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">25%</div>
                  <div className="text-sm text-gray-600">More Production</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">30%</div>
                  <div className="text-sm text-gray-600">Higher Margins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple to Implement, Powerful to Perform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes, see results immediately. Our 3-step process makes optimization effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Integrate</h3>
              <p className="text-gray-600">
                Connect Smart Roll Cutting to your existing ERP and production data. Seamless integration with your current workflow.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Optimize</h3>
              <p className="text-gray-600">
                Our AI analyzes your orders and materials to generate the perfect cut plan. Get optimized patterns in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Produce</h3>
              <p className="text-gray-600">
                Execute with confidence, knowing you're maximizing material and minimizing downtime. Start saving immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof and Credibility Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of manufacturers who are transforming their operations
            </p>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                "Smart Roll Cutting changed our entire operation. We saw an immediate 30% reduction in waste, and our team now works with unparalleled efficiency. The ROI was clear within months."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                  <div className="text-gray-600">Operations Director, Global Manufacturing Co.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-lg text-gray-600">Average Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-lg text-gray-600">Customer Retention Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$2M+</div>
              <div className="text-lg text-gray-600">Average Annual Savings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Production?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Stop letting inefficiency erode your margins. Join the hundreds of manufacturers who are transforming their operations with Smart Roll Cutting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={() => onNavigate("run")}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Start Your Free Trial
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
            <Button
              onClick={() => onNavigate("api-docs")}
              variant="outline"
              size="lg"
              className="border-white/30 text-white px-8 py-4 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Request a Personalized Demo
            </Button>
          </div>

          <p className="text-blue-200 text-sm">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
