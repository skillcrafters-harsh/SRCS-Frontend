"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBracketIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function ApiReferencePage() {
  const id = "opt_123" // Declare the id variable

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Complete reference documentation for the Roll Cutting Optimization API
          </p>
        </div>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="models">Data Models</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="errors">Error Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle className="flex items-center">
                <CodeBracketIcon className="h-6 w-6 mr-2 text-blue-500" />
                Available Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* POST /optimize */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                  <span className="font-mono text-sm">/api/v1/optimize</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Submit cutting requirements for optimization</p>
                <div className="bg-gray-50 rounded p-4 text-xs font-mono">
                  {`curl -X POST https://api.rollcutting.com/v1/optimize \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your_api_key" \\
  -d '{
    "rollSpecs": {
      "length": 1000,
      "width": 500,
      "thickness": 2.5,
      "materialType": "Steel"
    },
    "cutRequirements": [
      {
        "itemName": "Part A",
        "size": 250,
        "quantity": 10,
        "priority": "high"
      }
    ],
    "strategy": "minimize_waste"
  }'`}
                </div>
              </div>

              {/* GET /optimize/{id} */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                  <span className="font-mono text-sm">/api/v1/optimize/{id}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Retrieve optimization results by ID</p>
                <div className="bg-gray-50 rounded p-4 text-xs font-mono">
                  {`curl -X GET https://api.rollcutting.com/v1/optimize/${id} \\
  -H "X-API-Key: your_api_key"`}
                </div>
              </div>

              {/* GET /optimize/{id}/export */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                  <span className="font-mono text-sm">/api/v1/optimize/{id}/export</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Export results in Excel format</p>
                <div className="bg-gray-50 rounded p-4 text-xs font-mono">
                  {`curl -X GET https://api.rollcutting.com/v1/optimize/${id}/export \\
  -H "X-API-Key: your_api_key" \\
  -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="py-3 flex items-center">
                <CardTitle>Roll Specifications</CardTitle>
                <CardDescription>Material roll properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded p-4 text-xs font-mono">
                  {`{
  "length": number,      // Roll length in mm
  "width": number,       // Roll width in mm  
  "thickness": number,   // Material thickness
  "materialType": string, // Material type
  "cost": number         // Cost per unit (optional)
}`}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3 flex items-center">
                <CardTitle>Cut Requirements</CardTitle>
                <CardDescription>Individual cutting specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded p-4 text-xs font-mono">
                  {`{
  "itemName": string,    // Item identifier
  "size": number,        // Cut size in mm
  "quantity": number,    // Number of pieces
  "priority": string,    // "high" | "medium" | "low"
  "tolerance": number    // Tolerance in mm (optional)
}`}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle>JavaScript Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded p-4 text-green-400 font-mono text-sm">
                {`import { RollCuttingAPI } from '@rollcutting/sdk';

const api = new RollCuttingAPI('your_api_key');

async function optimizeCutting() {
  const result = await api.optimize({
    rollSpecs: {
      length: 1000,
      width: 500,
      thickness: 2.5
    },
    cutRequirements: [
      { itemName: 'Part A', size: 250, quantity: 10 },
      { itemName: 'Part B', size: 180, quantity: 15 }
    ]
  });
  
  console.log('Efficiency:', result.efficiency);
  console.log('Total Rolls:', result.totalRolls);
}`}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle>Python Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded p-4 text-green-400 font-mono text-sm">
                {`from rollcutting_sdk import RollCuttingAPI

api = RollCuttingAPI(api_key='your_api_key')

result = api.optimize(
    roll_specs={
        'length': 1000,
        'width': 500,
        'thickness': 2.5
    },
    cut_requirements=[
        {'itemName': 'Part A', 'size': 250, 'quantity': 10},
        {'itemName': 'Part B', 'size': 180, 'quantity': 15}
    ]
)

print(f"Efficiency: {result.efficiency}%")
print(f"Total Rolls: {result.total_rolls}")`}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader className="py-3 flex items-center">
              <CardTitle className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-red-500" />
                Error Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="font-mono text-sm font-semibold">400 - Bad Request</div>
                  <p className="text-sm text-gray-600">Invalid request parameters or missing required fields</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="font-mono text-sm font-semibold">401 - Unauthorized</div>
                  <p className="text-sm text-gray-600">Invalid or missing API key</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="font-mono text-sm font-semibold">429 - Rate Limited</div>
                  <p className="text-sm text-gray-600">Too many requests, please slow down</p>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <div className="font-mono text-sm font-semibold">500 - Internal Server Error</div>
                  <p className="text-sm text-gray-600">Server error, please try again later</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
