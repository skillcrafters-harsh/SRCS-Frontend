"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CodeBracketIcon,
  DocumentTextIcon,
  CubeIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

export default function ApiDocsPage() {
  const id = "opt_67890abcdef" // Declare the id variable

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl border border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="secondary" className="mr-3">
              v1.2.0
            </Badge>
            <Badge variant="outline">Latest</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">API Documentation</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Integrate roll cutting optimization into your applications with our powerful RESTful API
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-1" />
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="animate-slide-in-left">
        <CardHeader className="py-3 flex items-center">
          <CardTitle className="flex items-center text-xl">
            <CodeBracketIcon className="h-6 w-6 mr-2 text-primary" />
            Quick Start Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center mb-2">
              <Badge variant="outline" className="mr-2">
                Base URL
              </Badge>
            </div>
            <div className="bg-muted rounded-lg p-3 font-mono text-sm text-foreground">
              https://api.smartrollcutting.com/v1
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <ShieldCheckIcon className="h-4 w-4 mr-2 text-primary" />
                Authentication
              </h4>
              <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                <div className="text-muted-foreground mb-1"># Required Header</div>
                <div>X-API-Key: your_api_key_here</div>
              </div>
              <p className="text-sm text-muted-foreground">Get your API key from the dashboard after signing up</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <ClockIcon className="h-4 w-4 mr-2 text-primary" />
                Rate Limits
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Free Tier:</span>
                  <span className="font-mono">100 req/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Tier:</span>
                  <span className="font-mono">1,000 req/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise:</span>
                  <span className="font-mono">Unlimited</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="optimize" className="animate-slide-in-right">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="optimize">POST /optimize</TabsTrigger>
          <TabsTrigger value="status">GET /optimize/{id}</TabsTrigger>
          <TabsTrigger value="export">GET /export/{id}</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="optimize" className="space-y-4">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle className="flex items-center">
                <Badge className="mr-2">POST</Badge>
                /optimize
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Request Body Example:</h5>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "decal_size": 4470.4,
  "no_of_cut": 7,
  "rolls": [
    {
      "item_name": "KRAFT PAPER SIZE (151 TO ABOVE)",
      "dia": 36,
      "bf": 16,
      "gsm": 180,
      "quality": "GOLDEN",
      "size": 27,
      "uom": "IN",
      "nor": 5,
      "quantity": 1620
    },
    {
      "item_name": "KRAFT PAPER SIZE (151 TO ABOVE)",
      "dia": 36,
      "bf": 16,
      "gsm": 180,
      "quality": "GOLDEN",
      "size": 29,
      "uom": "IN",
      "nor": 5,
      "quantity": 1740
    }
  ]
}`}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Response Example:</h5>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "status": true,
  "message": "Optimization request submitted successfully",
  "data": {
    "optimization_id": "opt_67890abcdef",
    "estimated_completion": "2024-01-15T10:30:00Z",
    "status": "processing"
  }
}`}</pre>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <div>
                    <h6 className="font-medium text-accent">Required Fields</h6>
                    <p className="text-sm text-muted-foreground mt-1">
                      item_name, size, uom, and nor are required for each roll. Other fields are optional.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle className="flex items-center">
                <Badge variant="secondary" className="mr-2">
                  GET
                </Badge>
                /optimize/{id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Response Example (Completed):</h5>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto max-h-96">
                  <pre>{`{
  "status": true,
  "message": "Cutting optimization completed with two strategies",
  "data": {
    "decal_size": 4470.4,
    "no_of_cut": 7,
    "strategies": {
      "min_cutter_changes": {
        "total_rolls_used": 4,
        "total_wastage_mm": 50.8,
        "total_wastage_qty": 72,
        "total_cutter_changes": 3,
        "efficiency_percent": 98.86,
        "results": [
          {
            "size_bucket": "DIA:36.0 | BF:16 | GSM:180 | QUALITY:GOLDEN",
            "cutting_plans": [
              {
                "plan_number": 1,
                "sets": 2,
                "sizes": [
                  {
                    "id": "5ce7a7f5",
                    "size_mm": 812.8,
                    "actual_size": 32,
                    "uom": "IN"
                  }
                ],
                "wastage_mm": 0,
                "usage_percent": 100
              }
            ]
          }
        ]
      },
      "min_wastage": {
        "total_rolls_used": 4,
        "total_wastage_mm": 50.8,
        "efficiency_percent": 98.86
      }
    }
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle className="flex items-center">
                <Badge variant="secondary" className="mr-2">
                  GET
                </Badge>
                /export/{id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Query Parameters:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <code>format</code>
                    <span className="text-muted-foreground">csv, pdf, excel, json</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <code>strategy</code>
                    <span className="text-muted-foreground">min_cutter_changes, min_wastage</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Example Request:</h5>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                  GET /export/opt_67890abcdef?format=excel&strategy=min_wastage
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle>Webhook Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Webhook Payload:</h5>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "event": "optimization.completed",
  "optimization_id": "opt_67890abcdef",
  "timestamp": "2024-01-15T10:35:22Z",
  "data": {
    "status": "completed",
    "efficiency": 98.86,
    "total_rolls": 4,
    "total_wastage": 50.8
  }
}`}</pre>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h6 className="font-medium text-primary mb-2">Webhook Events</h6>
                <ul className="text-sm space-y-1">
                  <li>
                    • <code>optimization.started</code> - Processing begins
                  </li>
                  <li>
                    • <code>optimization.completed</code> - Results ready
                  </li>
                  <li>
                    • <code>optimization.failed</code> - Processing error
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-scale-in hover-lift">
          <CardHeader className="py-3 flex items-center">
            <CardTitle className="flex items-center text-lg">
              <CubeIcon className="h-5 w-5 mr-2 text-primary" />
              JavaScript SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted rounded p-3 font-mono text-xs">npm install @smartroll/sdk</div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              <div className="text-muted-foreground mb-1">// Usage</div>
              <div>{`const api = new RollCuttingAPI('your_api_key_here');`}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Examples
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover-lift" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="py-3 flex items-center">
            <CardTitle className="flex items-center text-lg">
              <CubeIcon className="h-5 w-5 mr-2 text-primary" />
              Python SDK
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted rounded p-3 font-mono text-xs">pip install smartroll-sdk</div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              <div className="text-muted-foreground mb-1"># Usage</div>
              <div>{`api = RollCuttingAPI(api_key='your_api_key_here')`}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Examples
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover-lift" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="py-3 flex items-center">
            <CardTitle className="flex items-center text-lg">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-primary" />
              OpenAPI Spec
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Download the complete OpenAPI 3.0 specification for code generation and testing
            </p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Download Spec
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in">
        <CardHeader className="py-3 flex items-center">
          <CardTitle>Error Codes & Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">HTTP Status Codes</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <code className="text-green-600">200</code>
                  <span>Success</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <code className="text-yellow-600">400</code>
                  <span>Bad Request</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <code className="text-red-600">401</code>
                  <span>Unauthorized</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <code className="text-red-600">429</code>
                  <span>Rate Limited</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <code className="text-red-600">500</code>
                  <span>Server Error</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Common Issues</h5>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">Invalid API Key</div>
                  <div className="text-muted-foreground">Check your API key in the dashboard</div>
                </div>
                <div>
                  <div className="font-medium">Missing Required Fields</div>
                  <div className="text-muted-foreground">Ensure item_name, size, uom, nor are provided</div>
                </div>
                <div>
                  <div className="font-medium">Rate Limit Exceeded</div>
                  <div className="text-muted-foreground">Implement exponential backoff or upgrade plan</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
