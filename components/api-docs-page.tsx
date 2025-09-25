"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BoltIcon,
  CloudArrowUpIcon,
  CommandLineIcon,
  CubeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

export default function ApiDocsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
      <div className="text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-xl lg:rounded-2xl border border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              WebSocket API
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">Setup Guide</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">WebSocket Integration</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Quick setup guide for WebSocket connections
          </p>
        </div>
      </div>

      <Card className="animate-slide-in-left">
        <CardHeader className="py-2 sm:py-3">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <BoltIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
            Quick Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card rounded-lg p-3 sm:p-4 border">
              <Badge variant="outline" className="mb-2 text-xs sm:text-sm">Manual Input</Badge>
              <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm text-foreground break-all">
                ws://localhost:8000/ws/optimize-cutting
              </div>
            </div>
            <div className="bg-card rounded-lg p-3 sm:p-4 border">
              <Badge variant="outline" className="mb-2 text-xs sm:text-sm">File Upload</Badge>
              <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm text-foreground break-all">
                ws://localhost:8000/ws/optimize-cutting-from-file
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 sm:p-4">
            <h6 className="font-medium text-accent mb-2 text-sm sm:text-base">Environment Setup</h6>
            <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
              <div>NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="react" className="animate-slide-in-right">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 h-auto">
          <TabsTrigger value="react" className="text-xs sm:text-sm px-2 sm:px-4 py-2">React</TabsTrigger>
          <TabsTrigger value="vanilla" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Vanilla JS</TabsTrigger>
          <TabsTrigger value="manual" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Manual</TabsTrigger>
          <TabsTrigger value="file" className="text-xs sm:text-sm px-2 sm:px-4 py-2">File Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="react" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="py-2 sm:py-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Badge className="mr-2 text-xs sm:text-sm">React</Badge>
                Setup Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">1. Environment:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">2. Basic Hook:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-48 sm:max-h-64">
                  <pre>{`const useOptimization = () => {
  const [loading, setLoading] = useState(false);

  const optimize = async (data) => {
    setLoading(true);
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_BASE_URL + '/ws/optimize-cutting'
    );
    
    return new Promise((resolve, reject) => {
      ws.onopen = () => ws.send(JSON.stringify(data));
      ws.onmessage = (e) => {
        const result = JSON.parse(e.data);
        result.status ? resolve(result.data) : reject(result.message);
        ws.close();
        setLoading(false);
      };
      ws.onerror = () => {
        reject('Connection failed');
        setLoading(false);
      };
    });
  };

  return { optimize, loading };
};`}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">3. Form Submit:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`const { optimize, loading } = useOptimization();

const handleSubmit = async () => {
  const data = {
    decal_size: 4500,
    no_of_cut: 7,
    rolls: [{ item_name: "Pattern 1", size: 32, uom: "IN", nor: 5 }]
  };
  
  try {
    const result = await optimize(data);
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vanilla" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="py-2 sm:py-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Badge variant="secondary" className="mr-2 text-xs sm:text-sm">JavaScript</Badge>
                Basic Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Simple Function:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-48 sm:max-h-64">
                  <pre>{`function optimizeRolls(data) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:8000/ws/optimize-cutting');
    
    ws.onopen = () => {
      ws.send(JSON.stringify(data));
    };
    
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      if (result.status) {
        resolve(result.data);
      } else {
        reject(result.message);
      }
      ws.close();
    };
    
    ws.onerror = () => {
      reject('Connection failed');
    };
  });
}`}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Form Submit:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`document.getElementById('submitBtn').onclick = async () => {
  const data = {
    decal_size: 4500,
    no_of_cut: 7,
    rolls: [{
      item_name: "Pattern 1",
      size: 32,
      uom: "IN",
      nor: 5
    }]
  };
  
  try {
    const result = await optimizeRolls(data);
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="py-2 sm:py-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Badge variant="secondary" className="mr-2 text-xs sm:text-sm">Manual</Badge>
                Data Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Request:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-48 sm:max-h-64">
                  <pre>{`{
  "decal_size": 4500,
  "no_of_cut": 7,
  "rolls": [
    {
      "item_name": "Pattern 1",
      "size": 32,
      "uom": "IN",
      "nor": 5
    }
  ]
}`}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Response:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-32 sm:max-h-48">
                  <pre>{`{
  "status": true,
  "data": {
    "strategies": {
      "min_cutter_changes": {
        "total_rolls_used": 3,
        "efficiency_percent": 98.86
      }
    }
  }
}`}</pre>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-2 sm:p-3">
                <h6 className="font-medium text-accent text-sm sm:text-base">Required Fields</h6>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  item_name, size, uom, nor are required
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="py-2 sm:py-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <CloudArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Request:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-32 sm:max-h-48">
                  <pre>{`{
  "decal_size": 4500,
  "no_of_cut": 7,
  "file_content": "base64_encoded_excel",
  "filename": "data.xlsx",
  "customer_name": "Customer",
  "so_no": "SO123"
}`}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">Excel Columns:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                    <h6 className="font-medium text-green-800 mb-1 text-xs sm:text-sm">Required:</h6>
                    <ul className="text-xs sm:text-sm text-green-700 space-y-0.5">
                      <li>• ItemName</li>
                      <li>• Size</li>
                      <li>• UOM</li>
                      <li>• NOR</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                    <h6 className="font-medium text-blue-800 mb-1 text-xs sm:text-sm">Optional:</h6>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-0.5">
                      <li>• DIA, BF, GSM</li>
                      <li>• Quality, Quantity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm sm:text-base">File to Base64:</h5>
                <div className="bg-muted rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto max-h-32 sm:max-h-48">
                  <pre>{`const fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result);
      const base64 = btoa(String.fromCharCode(...bytes));
      resolve(base64);
    };
    reader.readAsArrayBuffer(file);
  });
};`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="animate-scale-in hover-lift">
          <CardHeader className="py-2 sm:py-3">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
              <BoltIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
              Native WebSocket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="bg-green-50 border border-green-200 rounded p-2 sm:p-3">
              <div className="text-green-800 font-medium text-xs sm:text-sm">✅ Recommended</div>
              <div className="text-green-700 text-xs sm:text-sm">No dependencies</div>
            </div>
            <div className="bg-muted rounded p-2 sm:p-3 font-mono text-xs overflow-x-auto">
              <div>new WebSocket('ws://...')</div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover-lift" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="py-2 sm:py-3">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
              <CommandLineIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
              reconnecting-websocket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="bg-muted rounded p-2 sm:p-3 font-mono text-xs overflow-x-auto">
              npm install reconnecting-websocket
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Auto-reconnection for production
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover-lift sm:col-span-2 lg:col-span-1" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="py-2 sm:py-3">
            <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
              <CubeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
              socket.io-client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="bg-muted rounded p-2 sm:p-3 font-mono text-xs overflow-x-auto">
              npm install socket.io-client
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Advanced features & fallbacks
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}