import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-border mt-8">
      <div className="w-full px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo-bg.png" alt="Smart Roll Cutting Solution" className="w-25 h-25 mx-auto" />
                {/* <h3 className="text-lg font-semibold text-foreground">Smart Roll Cutting Solution</h3> */}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Advanced manufacturing optimization with intelligent cutting pattern generation. Reduce waste, save
                costs, and improve efficiency in your manufacturing process.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-foreground mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Manual Input & Excel Upload</li>
                <li>• Dual Optimization Strategies</li>
                <li>• Visual Cutting Plans</li>
                <li>• Performance Analytics</li>
                <li>• API Integration</li>
                <li>• Export Capabilities</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-foreground mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/api-docs" className="hover:text-primary transition-colors">
                    • API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/example">
                  • Examples
                </Link>
                </li>
                <li>
                  <a href="https://forms.gle/M5k5Yrgc6j1u3wag7" target="_blank" className="hover:text-primary transition-colors">
                    • Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-4 text-center">
            <p className="text-sm text-muted-foreground">© 2025 Smart Roll Cutting Solution. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}