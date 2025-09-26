"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BoltIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline"

export default function ApiDocsPage() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({})

  /**
   * Copies text to clipboard with fallback for older browsers
   * @param {string} text - Text to copy
   * @param {string} key - Unique key for tracking copy state
   */
  const copyToClipboard = async (text: string, key: string) => {
    try {
      // Modern clipboard API
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    }
  }

  const CopyButton = ({ text, copyKey }: { text: string; copyKey: string }) => (
    <Button
      variant="outline"
      size="sm"
      className="absolute top-2 right-2 h-8 px-2 text-xs"
      onClick={() => copyToClipboard(text, copyKey)}
    >
      {copiedStates[copyKey] ? (
        <>
          <CheckIcon className="h-3 w-3 mr-1" />
          Copied
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="h-3 w-3 mr-1" />
          Copy
        </>
      )}
    </Button>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Get started with SRCS WebSocket API</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Integrate real-time roll cutting optimization into your project in minutes.
        </p>
      </div>

      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="react">React / Next.js</TabsTrigger>
          <TabsTrigger value="vanilla">Vanilla JavaScript</TabsTrigger>
          <TabsTrigger value="node">Node.js</TabsTrigger>
        </TabsList>

        <TabsContent value="react" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BoltIcon className="h-6 w-6" />
              Install and Setup
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Environment Configuration</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add the WebSocket URL to your environment file:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`# .env.local (Next.js) or .env (React)
NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000`}
                  </pre>
                  <CopyButton 
                    text="NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000" 
                    copyKey="env" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Create the Hook</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create <code className="bg-muted px-1 py-0.5 rounded text-sm">hooks/useOptimization.js</code>:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`import { useState } from 'react'

/**
 * Custom hook for roll cutting optimization via WebSocket
 * Manages loading state and WebSocket connection
 */
export const useOptimization = () => {
  const [loading, setLoading] = useState(false)

  /**
   * Sends roll cutting data to WebSocket server for optimization
   * @param {Object} data - Roll cutting specifications
   * @returns {Promise} - Resolves with optimization results
   */
  const optimize = async (data) => {
    setLoading(true)
    
    // Connect to WebSocket server
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_BASE_URL
    )
    
    return new Promise((resolve, reject) => {
      // Send data when connection opens
      ws.onopen = () => ws.send(JSON.stringify(data))
      
      // Handle server response
      ws.onmessage = (event) => {
        const result = JSON.parse(event.data)
        if (result.status) {
          resolve(result.data)
        } else {
          reject(new Error(result.message))
        }
        ws.close()
        setLoading(false)
      }
      
      // Handle connection errors
      ws.onerror = () => {
        reject(new Error('Connection failed'))
        setLoading(false)
      }
    })
  }

  return { optimize, loading }
}`}
                  </pre>
                  <CopyButton 
                    text={`import { useState } from 'react'

/**
 * Custom hook for roll cutting optimization via WebSocket
 * Manages loading state and WebSocket connection
 */
export const useOptimization = () => {
  const [loading, setLoading] = useState(false)

  /**
   * Sends roll cutting data to WebSocket server for optimization
   * @param {Object} data - Roll cutting specifications
   * @returns {Promise} - Resolves with optimization results
   */
  const optimize = async (data) => {
    setLoading(true)
    
    // Connect to WebSocket server
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_BASE_URL
    )
    
    return new Promise((resolve, reject) => {
      // Send data when connection opens
      ws.onopen = () => ws.send(JSON.stringify(data))
      
      // Handle server response
      ws.onmessage = (event) => {
        const result = JSON.parse(event.data)
        if (result.status) {
          resolve(result.data)
        } else {
          reject(new Error(result.message))
        }
        ws.close()
        setLoading(false)
      }
      
      // Handle connection errors
      ws.onerror = () => {
        reject(new Error('Connection failed'))
        setLoading(false)
      }
    })
  }

  return { optimize, loading }
}`} 
                    copyKey="hook" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Use in Component</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Import and use the hook in your component:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`import { useOptimization } from './hooks/useOptimization'

/**
 * Component for roll cutting optimization form
 * Uses WebSocket to send data and receive results
 */
export default function OptimizeForm() {
  const { optimize, loading } = useOptimization()

  /**
   * Handles form submission and sends data for optimization
   * Creates sample roll cutting data and processes it
   */
  const handleSubmit = async () => {
    // Sample roll cutting data
    const data = {
      decal_size: 4500,      // Mother roll width in mm
      no_of_cut: 7,          // Maximum cuts per roll
      rolls: [
        {
          item_name: "Pattern 1",  // Product name
          size: 32,               // Cut size
          uom: "IN",              // Unit of measurement
          nor: 5,                 // Number of rolls required
          roll_id: "R1"           // Unique roll identifier
        }
      ]
    }

    try {
      const result = await optimize(data)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <button 
      onClick={handleSubmit} 
      disabled={loading}
    >
      {loading ? 'Optimizing...' : 'Optimize'}
    </button>
  )
}`}
                  </pre>
                  <CopyButton 
                    text={`import { useOptimization } from './hooks/useOptimization'

/**
 * Component for roll cutting optimization form
 * Uses WebSocket to send data and receive results
 */
export default function OptimizeForm() {
  const { optimize, loading } = useOptimization()

  /**
   * Handles form submission and sends data for optimization
   * Creates sample roll cutting data and processes it
   */
  const handleSubmit = async () => {
    // Sample roll cutting data
    const data = {
      decal_size: 4500,      // Mother roll width in mm
      no_of_cut: 7,          // Maximum cuts per roll
      rolls: [
        {
          item_name: "Pattern 1",  // Product name
          size: 32,               // Cut size
          uom: "IN",              // Unit of measurement
          nor: 5,                 // Number of rolls required
          roll_id: "R1"           // Unique roll identifier
        }
      ]
    }

    try {
      const result = await optimize(data)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <button 
      onClick={handleSubmit} 
      disabled={loading}
    >
      {loading ? 'Optimizing...' : 'Optimize'}
    </button>
  )
}`} 
                    copyKey="component" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Excel File Upload (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For Excel file upload, install XLSX and create upload hook:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`// Install XLSX package
npm install xlsx

// Create hooks/useExcelUpload.js
import { useState } from 'react'

export const useExcelUpload = () => {
  const [loading, setLoading] = useState(false)

  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result)
        const base64 = btoa(String.fromCharCode(...bytes))
        resolve(base64)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const optimizeFromFile = async (file, formData) => {
    setLoading(true)
    const fileBase64 = await fileToBase64(file)
    
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_BASE_URL + '/ws/optimize-cutting-from-file'
    )
    
    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        ws.send(JSON.stringify({
          decal_size: parseFloat(formData.motherRollWidth),
          no_of_cut: parseInt(formData.maxCuts),
          file_content: fileBase64,
          filename: file.name,
          customer_name: formData.customerName,
          so_no: formData.soNo
        }))
      }
      
      ws.onmessage = (event) => {
        const result = JSON.parse(event.data)
        result.status ? resolve(result.data) : reject(result.message)
        ws.close()
        setLoading(false)
      }
      
      ws.onerror = () => {
        reject('Connection failed')
        setLoading(false)
      }
    })
  }

  return { optimizeFromFile, loading }
}`}
                  </pre>
                  <CopyButton 
                    text={`npm install xlsx

import { useState } from 'react'

export const useExcelUpload = () => {
  const [loading, setLoading] = useState(false)

  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result)
        const base64 = btoa(String.fromCharCode(...bytes))
        resolve(base64)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const optimizeFromFile = async (file, formData) => {
    setLoading(true)
    const fileBase64 = await fileToBase64(file)
    
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_BASE_URL + '/ws/optimize-cutting-from-file'
    )
    
    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        ws.send(JSON.stringify({
          decal_size: parseFloat(formData.motherRollWidth),
          no_of_cut: parseInt(formData.maxCuts),
          file_content: fileBase64,
          filename: file.name,
          customer_name: formData.customerName,
          so_no: formData.soNo
        }))
      }
      
      ws.onmessage = (event) => {
        const result = JSON.parse(event.data)
        result.status ? resolve(result.data) : reject(result.message)
        ws.close()
        setLoading(false)
      }
      
      ws.onerror = () => {
        reject('Connection failed')
        setLoading(false)
      }
    })
  }

  return { optimizeFromFile, loading }
}`} 
                    copyKey="react-excel" 
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vanilla" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BoltIcon className="h-6 w-6" />
              Vanilla JavaScript Setup
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Create HTML File</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create <code className="bg-muted px-1 py-0.5 rounded text-sm">index.html</code>:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`<!DOCTYPE html>
<html>
<head>
    <title>SRCS Integration</title>
</head>
<body>
    <button id="optimizeBtn">Optimize Cutting</button>
    <div id="result"></div>
    
    <script src="srcs.js"></script>
</body>
</html>`}
                  </pre>
                  <CopyButton 
                    text={`<!DOCTYPE html>
<html>
<head>
    <title>SRCS Integration</title>
</head>
<body>
    <button id="optimizeBtn">Optimize Cutting</button>
    <div id="result"></div>
    
    <script src="srcs.js"></script>
</body>
</html>`} 
                    copyKey="html" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Create JavaScript File</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create <code className="bg-muted px-1 py-0.5 rounded text-sm">srcs.js</code>:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`function optimizeRolls(data) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting')
    
    ws.onopen = () => {
      ws.send(JSON.stringify(data))
    }
    
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data)
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    }
    
    ws.onerror = () => {
      reject(new Error('Connection failed'))
    }
  })
}

document.getElementById('optimizeBtn').onclick = async () => {
  const data = {
    decal_size: 4500,
    no_of_cut: 7,
    rolls: [
      {
        item_name: "Pattern 1",
        size: 32,
        uom: "IN",
        nor: 5,
        roll_id: "R1"
      }
    ]
  }

  try {
    const result = await optimizeRolls(data)
    document.getElementById('result').innerHTML = 
      '<pre>' + JSON.stringify(result, null, 2) + '</pre>'
  } catch (error) {
    document.getElementById('result').innerHTML = 
      '<p style="color: red;">Error: ' + error.message + '</p>'
  }
}`}
                  </pre>
                  <CopyButton 
                    text={`function optimizeRolls(data) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting')
    
    ws.onopen = () => {
      ws.send(JSON.stringify(data))
    }
    
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data)
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    }
    
    ws.onerror = () => {
      reject(new Error('Connection failed'))
    }
  })
}

document.getElementById('optimizeBtn').onclick = async () => {
  const data = {
    decal_size: 4500,
    no_of_cut: 7,
    rolls: [
      {
        item_name: "Pattern 1",
        size: 32,
        uom: "IN",
        nor: 5,
        roll_id: "R1"
      }
    ]
  }

  try {
    const result = await optimizeRolls(data)
    document.getElementById('result').innerHTML = 
      '<pre>' + JSON.stringify(result, null, 2) + '</pre>'
  } catch (error) {
    document.getElementById('result').innerHTML = 
      '<p style="color: red;">Error: ' + error.message + '</p>'
  }
}`} 
                    copyKey="js" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Excel File Upload (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add file upload functionality to your HTML and JavaScript:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`// Add to HTML
<input type="file" id="fileInput" accept=".xlsx,.xls" />
<button id="uploadBtn">Upload Excel</button>

// Add to JavaScript
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result)
      const base64 = btoa(String.fromCharCode(...bytes))
      resolve(base64)
    }
    reader.readAsArrayBuffer(file)
  })
}

document.getElementById('uploadBtn').onclick = async () => {
  const file = document.getElementById('fileInput').files[0]
  if (!file) return
  
  const fileBase64 = await fileToBase64(file)
  const ws = new WebSocket('ws://localhost:8000/ws/optimize-cutting-from-file')
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
      decal_size: 4500,
      no_of_cut: 7,
      file_content: fileBase64,
      filename: file.name,
      customer_name: "Customer",
      so_no: "SO123"
    }))
  }
  
  ws.onmessage = (event) => {
    const result = JSON.parse(event.data)
    document.getElementById('result').innerHTML = 
      '<pre>' + JSON.stringify(result, null, 2) + '</pre>'
    ws.close()
  }
}`}
                  </pre>
                  <CopyButton 
                    text={`// Add to HTML
<input type="file" id="fileInput" accept=".xlsx,.xls" />
<button id="uploadBtn">Upload Excel</button>

// Add to JavaScript
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result)
      const base64 = btoa(String.fromCharCode(...bytes))
      resolve(base64)
    }
    reader.readAsArrayBuffer(file)
  })
}

document.getElementById('uploadBtn').onclick = async () => {
  const file = document.getElementById('fileInput').files[0]
  if (!file) return
  
  const fileBase64 = await fileToBase64(file)
  const ws = new WebSocket('ws://localhost:8000/ws/optimize-cutting-from-file')
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
      decal_size: 4500,
      no_of_cut: 7,
      file_content: fileBase64,
      filename: file.name,
      customer_name: "Customer",
      so_no: "SO123"
    }))
  }
  
  ws.onmessage = (event) => {
    const result = JSON.parse(event.data)
    document.getElementById('result').innerHTML = 
      '<pre>' + JSON.stringify(result, null, 2) + '</pre>'
    ws.close()
  }
}`} 
                    copyKey="vanilla-excel" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Run Your Project</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Open <code className="bg-muted px-1 py-0.5 rounded text-sm">index.html</code> in your browser and test both manual and file upload.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="excel" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CloudArrowUpIcon className="h-6 w-6" />
              Excel File Upload
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Install XLSX Package (React/Next.js)</h3>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`npm install xlsx`}
                  </pre>
                  <CopyButton 
                    text="npm install xlsx" 
                    copyKey="xlsx-install" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Create Excel Upload Hook</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create <code className="bg-muted px-1 py-0.5 rounded text-sm">hooks/useExcelUpload.js</code>:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`import { useState } from 'react'

export const useExcelUpload = () => {
  const [loading, setLoading] = useState(false)

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const arrayBuffer = reader.result
        const bytes = new Uint8Array(arrayBuffer)
        const base64 = btoa(String.fromCharCode(...bytes))
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  const optimizeFromFile = async (file, formData) => {
    setLoading(true)
    
    try {
      const fileBase64 = await fileToBase64(file)
      
      const ws = new WebSocket(
        process.env.NEXT_PUBLIC_WS_BASE_URL + '/ws/optimize-cutting-from-file'
      )
      
      return new Promise((resolve, reject) => {
        ws.onopen = () => {
          const payload = {
            decal_size: parseFloat(formData.motherRollWidth),
            no_of_cut: parseInt(formData.maxCuts),
            file_content: fileBase64,
            filename: file.name,
            customer_name: formData.customerName,
            so_no: formData.soNo
          }
          ws.send(JSON.stringify(payload))
        }
        
        ws.onmessage = (event) => {
          const result = JSON.parse(event.data)
          if (result.status) {
            resolve(result.data)
          } else {
            reject(new Error(result.message))
          }
          ws.close()
          setLoading(false)
        }
        
        ws.onerror = () => {
          reject(new Error('Connection failed'))
          setLoading(false)
        }
      })
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return { optimizeFromFile, loading }
}`}
                  </pre>
                  <CopyButton 
                    text={`import { useState } from 'react'

export const useExcelUpload = () => {
  const [loading, setLoading] = useState(false)

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const arrayBuffer = reader.result
        const bytes = new Uint8Array(arrayBuffer)
        const base64 = btoa(String.fromCharCode(...bytes))
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  const optimizeFromFile = async (file, formData) => {
    setLoading(true)
    
    try {
      const fileBase64 = await fileToBase64(file)
      
      const ws = new WebSocket(
        process.env.NEXT_PUBLIC_WS_BASE_URL + '/ws/optimize-cutting-from-file'
      )
      
      return new Promise((resolve, reject) => {
        ws.onopen = () => {
          const payload = {
            decal_size: parseFloat(formData.motherRollWidth),
            no_of_cut: parseInt(formData.maxCuts),
            file_content: fileBase64,
            filename: file.name,
            customer_name: formData.customerName,
            so_no: formData.soNo
          }
          ws.send(JSON.stringify(payload))
        }
        
        ws.onmessage = (event) => {
          const result = JSON.parse(event.data)
          if (result.status) {
            resolve(result.data)
          } else {
            reject(new Error(result.message))
          }
          ws.close()
          setLoading(false)
        }
        
        ws.onerror = () => {
          reject(new Error('Connection failed'))
          setLoading(false)
        }
      })
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return { optimizeFromFile, loading }
}`} 
                    copyKey="excel-hook" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Excel Upload Component</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a file upload component:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`import { useExcelUpload } from './hooks/useExcelUpload'

export default function ExcelUploadForm() {
  const { optimizeFromFile, loading } = useExcelUpload()

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = {
      motherRollWidth: "4500",
      maxCuts: "7",
      customerName: "Customer Name",
      soNo: "SO123456"
    }

    try {
      const result = await optimizeFromFile(file, formData)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={loading}
      />
      {loading && <p>Uploading and optimizing...</p>}
    </div>
  )
}`}
                  </pre>
                  <CopyButton 
                    text={`import { useExcelUpload } from './hooks/useExcelUpload'

export default function ExcelUploadForm() {
  const { optimizeFromFile, loading } = useExcelUpload()

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = {
      motherRollWidth: "4500",
      maxCuts: "7",
      customerName: "Customer Name",
      soNo: "SO123456"
    }

    try {
      const result = await optimizeFromFile(file, formData)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={loading}
      />
      {loading && <p>Uploading and optimizing...</p>}
    </div>
  )
}`} 
                    copyKey="excel-component" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Excel File Format</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your Excel file should have these columns:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Required Columns:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• ItemName (or Item_Name)</li>
                        <li>• Size</li>
                        <li>• UOM</li>
                        <li>• NOR</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Optional Columns:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• DIA</li>
                        <li>• BF</li>
                        <li>• GSM</li>
                        <li>• Quality</li>
                        <li>• Quantity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="node" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BoltIcon className="h-6 w-6" />
              Node.js Setup
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Install WebSocket Package</h3>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`npm install ws`}
                  </pre>
                  <CopyButton 
                    text="npm install ws" 
                    copyKey="npm" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Create Node.js Script</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create <code className="bg-muted px-1 py-0.5 rounded text-sm">optimize.js</code>:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`const WebSocket = require('ws')

function optimizeRolls(data) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting')
    
    ws.on('open', () => {
      ws.send(JSON.stringify(data))
    })
    
    ws.on('message', (data) => {
      const result = JSON.parse(data.toString())
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    })
    
    ws.on('error', (error) => {
      reject(error)
    })
  })
}

// Example usage
const data = {
  decal_size: 4500,
  no_of_cut: 7,
  rolls: [
    {
      item_name: "Pattern 1",
      size: 32,
      uom: "IN",
      nor: 5,
      roll_id: "R1"
    }
  ]
}

optimizeRolls(data)
  .then(result => {
    console.log('Success:', JSON.stringify(result, null, 2))
  })
  .catch(error => {
    console.error('Error:', error.message)
  })`}
                  </pre>
                  <CopyButton 
                    text={`const WebSocket = require('ws')

function optimizeRolls(data) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting')
    
    ws.on('open', () => {
      ws.send(JSON.stringify(data))
    })
    
    ws.on('message', (data) => {
      const result = JSON.parse(data.toString())
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    })
    
    ws.on('error', (error) => {
      reject(error)
    })
  })
}

// Example usage
const data = {
  decal_size: 4500,
  no_of_cut: 7,
  rolls: [
    {
      item_name: "Pattern 1",
      size: 32,
      uom: "IN",
      nor: 5,
      roll_id: "R1"
    }
  ]
}

optimizeRolls(data)
  .then(result => {
    console.log('Success:', JSON.stringify(result, null, 2))
  })
  .catch(error => {
    console.error('Error:', error.message)
  })`} 
                    copyKey="node" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Excel File Upload (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For file upload, install fs and create file upload script:
                </p>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`const WebSocket = require('ws')
const fs = require('fs')

function optimizeFromFile(filePath, formData) {
  return new Promise((resolve, reject) => {
    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(filePath)
    const fileBase64 = fileBuffer.toString('base64')
    
    const ws = new WebSocket('ws://localhost:8000/ws/optimize-cutting-from-file')
    
    ws.on('open', () => {
      ws.send(JSON.stringify({
        decal_size: parseFloat(formData.motherRollWidth),
        no_of_cut: parseInt(formData.maxCuts),
        file_content: fileBase64,
        filename: filePath.split('/').pop(),
        customer_name: formData.customerName,
        so_no: formData.soNo
      }))
    })
    
    ws.on('message', (data) => {
      const result = JSON.parse(data.toString())
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    })
    
    ws.on('error', (error) => {
      reject(error)
    })
  })
}

// Example usage
const formData = {
  motherRollWidth: "4500",
  maxCuts: "7",
  customerName: "Customer",
  soNo: "SO123"
}

optimizeFromFile('./data.xlsx', formData)
  .then(result => {
    console.log('Success:', JSON.stringify(result, null, 2))
  })
  .catch(error => {
    console.error('Error:', error.message)
  })`}
                  </pre>
                  <CopyButton 
                    text={`const WebSocket = require('ws')
const fs = require('fs')

function optimizeFromFile(filePath, formData) {
  return new Promise((resolve, reject) => {
    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(filePath)
    const fileBase64 = fileBuffer.toString('base64')
    
    const ws = new WebSocket('ws://localhost:8000/ws/optimize-cutting-from-file')
    
    ws.on('open', () => {
      ws.send(JSON.stringify({
        decal_size: parseFloat(formData.motherRollWidth),
        no_of_cut: parseInt(formData.maxCuts),
        file_content: fileBase64,
        filename: filePath.split('/').pop(),
        customer_name: formData.customerName,
        so_no: formData.soNo
      }))
    })
    
    ws.on('message', (data) => {
      const result = JSON.parse(data.toString())
      if (result.status) {
        resolve(result.data)
      } else {
        reject(new Error(result.message))
      }
      ws.close()
    })
    
    ws.on('error', (error) => {
      reject(error)
    })
  })
}

// Example usage
const formData = {
  motherRollWidth: "4500",
  maxCuts: "7",
  customerName: "Customer",
  soNo: "SO123"
}

optimizeFromFile('./data.xlsx', formData)
  .then(result => {
    console.log('Success:', JSON.stringify(result, null, 2))
  })
  .catch(error => {
    console.error('Error:', error.message)
  })`} 
                    copyKey="node-excel" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Run the Script</h3>
                <div className="relative">
                  <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto text-sm">
{`node optimize.js`}
                  </pre>
                  <CopyButton 
                    text="node optimize.js" 
                    copyKey="run" 
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">WebSocket Endpoints</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Manual Input</Badge>
                <code className="bg-muted px-2 py-1 rounded text-xs">wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting</code>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">File Upload</Badge>
                <code className="bg-muted px-2 py-1 rounded text-xs">wss://srcs-backend-0aqk.onrender.com/ws/optimize-cutting-from-file</code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Required Fields</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <code>decal_size</code> - Mother roll width in mm</li>
              <li>• <code>no_of_cut</code> - Maximum cuts per roll</li>
              <li>• <code>rolls</code> - Array of roll specifications</li>
              <li>• <code>item_name</code> - Product name</li>
              <li>• <code>size</code> - Cut size</li>
              <li>• <code>uom</code> - Unit of measurement (IN, MM, CM)</li>
              <li>• <code>nor</code> - Number of rolls required</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Excel File Format</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2 text-sm">Required Columns:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• ItemName (or Item_Name)</li>
                    <li>• Size</li>
                    <li>• UOM</li>
                    <li>• NOR</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2 text-sm">Optional Columns:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• DIA, BF, GSM</li>
                    <li>• Quality, Quantity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}