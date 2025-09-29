import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 ">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-4 pt-6 sm:pt-8 lg:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex justify-center sm:justify-start mb-4 sm:mb-6">
                <Link href={"/"} className="cursor-pointer">
                  <img
                    src="/logo-bg.png"
                    alt="Smart Roll Cutting Solution"
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed text-center sm:text-left">
                Advanced manufacturing optimization with intelligent cutting
                pattern generation. Reduce waste, save costs, and improve
                efficiency in your manufacturing process.
              </p>
            </div>

            {/* Features */}
            <div className="text-center sm:text-left ">
              <h4 className="text-sm text-center sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                Features
              </h4>
              <div className="flex justify-center items-center ">
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 w-[60%] text-xs sm:text-sm lg:text-base text-gray-600">
                <div className="flex flex-col items-baseline">
                <li className="hover:text-blue-600 transition-colors">• Manual Input & Excel Upload</li>
                <li className="hover:text-blue-600 transition-colors">• Dual Optimization Strategies</li>
                <li className="hover:text-blue-600 transition-colors">• Visual Cutting Plans</li>
                <li className="hover:text-blue-600 transition-colors">• Performance Analytics</li>
                <li className="hover:text-blue-600 transition-colors">• API Integration</li>
                <li className="hover:text-blue-600 transition-colors">• Export Capabilities</li>
                </div>
              </ul>
              </div>
            </div>

            {/* Resources */}
            <div className="text-center sm:text-left">
              <h4 className="text-center text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                Resources
              </h4>
              <div className="flex justify-center items-center">

              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 w-[60%] text-xs sm:text-sm lg:text-base text-gray-600">
                <div className="flex flex-col items-baseline">
                <li>
                  <Link
                    href="/api-docs"
                    className="hover:text-blue-600 transition-colors duration-200 inline-block"
                  >
                    • API Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/example"
                    className="hover:text-blue-600 transition-colors duration-200 inline-block"
                  >
                    • Examples
                  </Link>
                </li>
                <li>
                  <a
                    href="https://forms.gle/M5k5Yrgc6j1u3wag7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-200 inline-block"
                  >
                    • Contact Support
                  </a>
                </li>
                </div>
              </ul>
            </div>
              </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-6 sm:mt-8 lg:mt-4 pt-4 lg:pt-2 text-center">
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              © 2025 Smart Roll Cutting Solution. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
