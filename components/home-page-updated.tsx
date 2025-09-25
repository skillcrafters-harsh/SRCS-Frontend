"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlayIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-0">
      {/* Hero Section - Problem-Solution Hook */}
  <div className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        {/* Background Video/Image Option */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          <img
            src="/bg.png"
            alt="High Material Wastage Problem"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6 lg:space-y-8">
              <div className="space-y-4">
                {/* <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  Stop Losing Money
                </Badge> */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                  SRCS Vercel | Smart Roll Cutting System – Roll Cutting Optimization Software
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  SRCS Vercel is the leading Smart Roll Cutting System for roll cutting optimization, cutting pattern generation, and material waste reduction. Our roll cutting calculator helps paper, textile, metal, and plastic industries reduce waste by 30% with advanced cutting algorithms and automated optimization solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                  <p className="text-white/80 text-sm">
                    Watch Our Solution in Action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Agitation Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Reduce Waste, Save Costs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Every day you delay optimization, you're losing money. Here's
              what's really costing you:
            </p>
          </div>

          {/* Problem 1: Material Wastage & Rising Costs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                Problem #1
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Are You Throwing Profits Away?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Manual calculations and inefficient cutting patterns lead to
                massive material scrap. Every inch of wasted paper is money lost
                directly from your bottom line, causing your operational costs
                to spiral upwards.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">
                  "The average manufacturer loses 15-25% of material to poor
                  cutting patterns. That's thousands of dollars every month."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/hcsuhcishcs.png"
                alt="High Material Wastage - Frustrated worker with waste pile"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base lg:text-lg">
                Costs Rising
              </div>
            </div>
          </div>

          {/* Problem 2: Downtime & Lost Productivity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
            <div className="order-2 lg:order-1 relative">
              <img
                src="/_wasteNdowntime.png"
                alt="Downtime and Lost Productivity - Worker with hands up"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-lg">
                Profit Loss
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                <ClockIcon className="h-4 w-4 mr-2" />
                Problem #2
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Downtime is Your Biggest Enemy.
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Miscalculations don't just waste material; they halt production.
                Machine downtime, re-runs, and rework kill productivity, delay
                orders, and erode your competitive edge.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <p className="text-orange-800 font-semibold">
                  "Every hour of unplanned downtime costs manufacturers an
                  average of $260,000 per year."
                </p>
              </div>
            </div>
          </div>

          {/* Problem 3: Maintenance & Frequent Changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                Problem #3
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Frequent Cutter Changes Draining Your Resources?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Inefficient cutting patterns force constant machine adjustments and cutter changes. This increases maintenance costs, reduces equipment lifespan, and creates operational complexity that your team struggles to manage.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <p className="text-purple-800 font-semibold">
                  "Excessive cutter changes can reduce machine efficiency by up to 40% and increase maintenance costs significantly."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/maintenance.png"
                alt="Maintenance Issues - Worker fixing machinery"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base lg:text-lg">
                High Maintenance
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Enhancements Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Beyond Paper: A Platform Built for the Future
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core optimization engine is designed to solve challenges across a variety of industries.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              <Card className="min-w-[300px] bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plastics & Film</h3>
                  <p className="text-gray-600">Minimize waste and improve yield for flexible packaging and industrial films.</p>
                </CardContent>
              </Card>

              <Card className="min-w-[300px] bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Textiles & Fabrics</h3>
                  <p className="text-gray-600">Optimize fabric cutting patterns for garment manufacturing and textile production.</p>
                </CardContent>
              </Card>

              <Card className="min-w-[300px] bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Metal Processing</h3>
                  <p className="text-gray-600">Advanced algorithms for steel, aluminum, and specialty metal cutting operations.</p>
                </CardContent>
              </Card>

              <Card className="min-w-[300px] bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Solutions</h3>
                  <p className="text-gray-600">Tailored optimization algorithms for your specific industry requirements.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              See Our Full Roadmap
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}