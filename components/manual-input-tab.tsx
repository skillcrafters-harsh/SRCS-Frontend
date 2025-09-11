"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react"

interface RollSpec {
  id: string
  itemName: string
  dia: string
  bf: string
  gsm: string
  quality: string
  size: string
  uom: string
  nor: string
  quantity: number
}

interface ManualInputTabProps {
  onOptimize: (data: any, source: "manual" | "excel") => void
  isOptimizing: boolean
  optimizationResults?: any
}

export default function ManualInputTab({ onOptimize, isOptimizing, optimizationResults }: ManualInputTabProps) {
  const [formData, setFormData] = useState({
    motherRollWidth: "",
    maxCuts: "",
    customerName: "",
    soNo: "",
  })

  const [optionalFields, setOptionalFields] = useState({
    dia: false,
    bf: false,
    gsm: false,
    quality: false,
    quantity: false,
  })

  const [rollSpecs, setRollSpecs] = useState<RollSpec[]>([
    {
      id: "1",
      itemName: "",
      dia: "",
      bf: "",
      gsm: "",
      quality: "",
      size: "",
      uom: "IN - Inches",
      nor: "",
      quantity: 0,
    },
  ])



  const itemOptions = {
    1: "KRAFT PAPER SIZE (151 TO ABOVE)",
    2: "KRAFT PAPER SIZE (1 TO 150)",
  }

  const qualityOptions = {
    1: "GOLDEN",
    2: "NATURAL",
    3: "FLUTING",
    4: "GREY",
    5: "BROWN",
  }

  const uomOptions = {
    1: "IN - Inches",
    2: "MM - Millimeters",
    3: "CM - Centimeters",
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOptionalFieldChange = (field: string, checked: boolean) => {
    setOptionalFields((prev) => {
      const updated = { ...prev, [field]: checked }

      if (field === "quantity" && checked) {
        updated.dia = true
      }

      if (field === "dia" && !checked && prev.quantity) {
        // Prevent deselecting dia when quantity is selected
        return prev
      }

      return updated
    })

    // Clear values for unchecked fields (except dia when quantity is selected)
    if (!checked && !(field === "dia" && optionalFields.quantity)) {
      setRollSpecs((prev) => prev.map((spec) => ({ ...spec, [field]: field === "quantity" ? 0 : "" })))
    }
  }

  const handleRollSpecChange = (id: string, field: string, value: string) => {
    setRollSpecs((prev) =>
      prev.map((spec) => {
        if (spec.id === id) {
          const updated = { ...spec, [field]: value }
          if ((field === "dia" || field === "size" || field === "nor" || field === "uom") && optionalFields.quantity) {
            updated.quantity = calculateQuantity(updated)
          }
          return updated
        }
        return spec
      }),
    )
  }

  const calculateQuantity = (spec: RollSpec): number => {
    const dia = Number.parseFloat(spec.dia) || 0
    const size = Number.parseFloat(spec.size) || 0
    const nor = Number.parseFloat(spec.nor) || 0

    if (dia === 0 || size === 0 || nor === 0) return 0

    const baseValue = dia * size * nor

    // Apply UOM-specific formulas
    switch (spec.uom) {
      case "CM - Centimeters":
        return Math.round(baseValue / 2.54)
      case "MM - Millimeters":
        return Math.round(baseValue / 25.4)
      case "IN - Inches":
      default:
        return Math.round(baseValue)
    }
  }

  const addRollSpec = () => {
    const newId = (rollSpecs.length + 1).toString()
    setRollSpecs((prev) => [
      ...prev,
      {
        id: newId,
        itemName: "",
        dia: "",
        bf: "",
        gsm: "",
        quality: "",
        size: "",
        uom: "IN - Inches",
        nor: "",
        quantity: 0,
      },
    ])
  }

  const removeRollSpec = (id: string) => {
    if (rollSpecs.length > 1) {
      setRollSpecs((prev) => prev.filter((spec) => spec.id !== id))
    }
  }

  const isFormValid = () => {
    const basicFieldsValid = formData.motherRollWidth && formData.maxCuts && formData.customerName && formData.soNo

    const rollSpecsValid = rollSpecs.every((spec) => {
      // Required fields: itemName, size, nor, uom
      const requiredValid = spec.itemName && spec.size && spec.nor && spec.uom

      // Optional fields (only validate if enabled)
      const optionalValid =
        (!optionalFields.dia || spec.dia) &&
        (!optionalFields.bf || spec.bf) &&
        (!optionalFields.gsm || spec.gsm) &&
        (!optionalFields.quality || spec.quality)

      return requiredValid && optionalValid
    })

    return basicFieldsValid && rollSpecsValid
  }

  const handleOptimize = async () => {
    if (isFormValid()) {
      const payload = {
        decal_size: parseInt(formData.motherRollWidth),
        no_of_cut: parseInt(formData.maxCuts),
        rolls: rollSpecs.map(spec => ({
          item_name: spec.itemName,
          size: parseInt(spec.size),
          uom: spec.uom.split(' - ')[0],
          nor: parseInt(spec.nor)
        }))
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.29.138:8000'}/optimize-cutting`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })

        const result = await response.json()
        // Add form data to the result for export purposes
        result.formData = formData
        onOptimize(result, "manual")
      } catch (error) {
        console.error('API Error:', error)
        // Handle error appropriately
      }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Combined Card */}
      <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        {/* Basic Information Section */}
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-blue-100">
          <div className="space-y-2">
            <Label htmlFor="motherRollWidth" className="text-sm font-medium text-gray-900">
              Mother Roll Width (mm) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="motherRollWidth"
              type="number"
              placeholder="Enter mother roll width"
              value={formData.motherRollWidth}
              onChange={(e) => handleInputChange("motherRollWidth", e.target.value)}
              className="bg-white border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-gray-900 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCuts" className="text-sm font-medium text-gray-900">
              Max Cuts per Roll <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maxCuts"
              type="number"
              placeholder="Enter max cuts per roll"
              value={formData.maxCuts}
              onChange={(e) => handleInputChange("maxCuts", e.target.value)}
              className="bg-white border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-gray-900 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-sm font-medium text-gray-900">
              Customer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              className="bg-white border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-gray-900 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soNo" className="text-sm font-medium text-gray-900">
              SO No <span className="text-red-500">*</span>
            </Label>
            <Input
              id="soNo"
              type="text"
              placeholder="Enter sales order number"
              value={formData.soNo}
              onChange={(e) => handleInputChange("soNo", e.target.value)}
              className="bg-white border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-gray-900 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
              required
            />
          </div>
        </CardContent>

        {/* Optional Fields Configuration Section */}
        <div className="px-6 py-4 border-b border-blue-100">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Optional Fields Configuration</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors duration-200">
              <Checkbox
                id="dia-checkbox"
                checked={optionalFields.dia}
                onCheckedChange={(checked) => handleOptionalFieldChange("dia", checked as boolean)}
                className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
                disabled={optionalFields.quantity}
              />
              <Label
                htmlFor="dia-checkbox"
                className={`text-xs font-medium cursor-pointer transition-colors duration-200 ${optionalFields.quantity ? "text-gray-500" : "text-gray-900 hover:text-blue-600"}`}
              >
                DIA
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors duration-200">
              <Checkbox
                id="bf-checkbox"
                checked={optionalFields.bf}
                onCheckedChange={(checked) => handleOptionalFieldChange("bf", checked as boolean)}
                className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
              />
              <Label
                htmlFor="bf-checkbox"
                className="text-xs font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              >
                BF
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors duration-200">
              <Checkbox
                id="gsm-checkbox"
                checked={optionalFields.gsm}
                onCheckedChange={(checked) => handleOptionalFieldChange("gsm", checked as boolean)}
                className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
              />
              <Label
                htmlFor="gsm-checkbox"
                className="text-xs font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              >
                GSM
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors duration-200">
              <Checkbox
                id="quality-checkbox"
                checked={optionalFields.quality}
                onCheckedChange={(checked) => handleOptionalFieldChange("quality", checked as boolean)}
                className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
              />
              <Label
                htmlFor="quality-checkbox"
                className="text-xs font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              >
                Quality
              </Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors duration-200">
              <Checkbox
                id="quantity-checkbox"
                checked={optionalFields.quantity}
                onCheckedChange={(checked) => handleOptionalFieldChange("quantity", checked as boolean)}
                className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-all duration-200"
              />
              <Label
                htmlFor="quantity-checkbox"
                className="text-xs font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              >
                Quantity
              </Label>
            </div>
          </div>
        </div>

        {/* Roll Specifications Section */}
        <div className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 px-6">
          <h3 className="text-lg font-semibold text-gray-900">Roll Specifications</h3>
          <Button
            onClick={addRollSpec}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white border-blue-500 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200 hover:shadow-md"
          >
            <PlusIcon className="h-4 w-4" />
            Add Row
          </Button>
        </div>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Item Name <span className="text-red-500">*</span>
                    <div className="text-xs text-blue-600 font-normal">(Product type - Kraft Paper Roll)</div>
                  </th>
                  {optionalFields.dia && (
                    <th className="text-left p-3 font-medium text-gray-900">
                      DIA (IN)
                      <div className="text-xs text-blue-600 font-normal">(Roll Diameter in inches)</div>
                    </th>
                  )}
                  {optionalFields.bf && (
                    <th className="text-left p-3 font-medium text-gray-900">
                      BF
                      <div className="text-xs text-blue-600 font-normal">(Bursting Factor - strength)</div>
                    </th>
                  )}
                  {optionalFields.gsm && (
                    <th className="text-left p-3 font-medium text-gray-900">
                      GSM
                      <div className="text-xs text-blue-600 font-normal">(Grams per Square Meter)</div>
                    </th>
                  )}
                  {optionalFields.quality && (
                    <th className="text-left p-3 font-medium text-gray-900">
                      Quality
                      <div className="text-xs text-blue-600 font-normal">(Paper Quality Grade)</div>
                    </th>
                  )}
                  <th className="text-left p-3 font-medium text-gray-900">
                    Size <span className="text-red-500">*</span>
                    <div className="text-xs text-blue-600 font-normal">(Size required in inches)</div>
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    UOM <span className="text-red-500">*</span>
                    <div className="text-xs text-blue-600 font-normal">(Unit of Measurement)</div>
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    NOR <span className="text-red-500">*</span>
                    <div className="text-xs text-blue-600 font-normal">(Number of Rolls Required)</div>
                  </th>
                  {optionalFields.quantity && (
                    <th className="text-left p-3 font-medium text-gray-900">
                      QTY (MM)
                      <div className="text-xs text-blue-600 font-normal">(Auto-calculated from DIA×Size×NOR)</div>
                    </th>
                  )}
                  <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rollSpecs.map((spec, index) => (
                  <tr
                    key={spec.id}
                    className="border-b border-blue-100 hover:bg-blue-50/50 transition-all duration-200 animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="p-3">
                      <Select
                        value={spec.itemName}
                        onValueChange={(value) => handleRollSpecChange(spec.id, "itemName", value)}
                      >
                        <SelectTrigger className="min-w-[200px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors">
                          <SelectValue placeholder="Select item type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(itemOptions).map(([key, value]) => (
                            <SelectItem key={key} value={value} className="text-gray-900">
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    {optionalFields.dia && (
                      <td className="p-3">
                        <Input
                          type="number"
                          placeholder="36"
                          value={spec.dia}
                          onChange={(e) => handleRollSpecChange(spec.id, "dia", e.target.value)}
                          className="min-w-[80px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors"
                        />
                      </td>
                    )}
                    {optionalFields.bf && (
                      <td className="p-3">
                        <Input
                          type="number"
                          placeholder="BF value"
                          value={spec.bf}
                          onChange={(e) => handleRollSpecChange(spec.id, "bf", e.target.value)}
                          className="min-w-[80px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors"
                        />
                      </td>
                    )}
                    {optionalFields.gsm && (
                      <td className="p-3">
                        <Input
                          type="number"
                          placeholder="GSM"
                          value={spec.gsm}
                          onChange={(e) => handleRollSpecChange(spec.id, "gsm", e.target.value)}
                          className="min-w-[80px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors"
                        />
                      </td>
                    )}
                    {optionalFields.quality && (
                      <td className="p-3">
                        <Select
                          value={spec.quality}
                          onValueChange={(value) => handleRollSpecChange(spec.id, "quality", value)}
                        >
                          <SelectTrigger className="min-w-[120px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(qualityOptions).map(([key, value]) => (
                              <SelectItem key={key} value={value} className="text-gray-900">
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    )}
                    <td className="p-3">
                      <Input
                        type="number"
                        placeholder="Size in inches"
                        value={spec.size}
                        onChange={(e) => handleRollSpecChange(spec.id, "size", e.target.value)}
                        className="min-w-[100px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors"
                      />
                    </td>
                    <td className="p-3">
                      <Select value={spec.uom} onValueChange={(value) => handleRollSpecChange(spec.id, "uom", value)}>
                        <SelectTrigger className="min-w-[120px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(uomOptions).map(([key, value]) => (
                            <SelectItem key={key} value={value} className="text-gray-900">
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        placeholder="Number of rolls"
                        value={spec.nor}
                        onChange={(e) => handleRollSpecChange(spec.id, "nor", e.target.value)}
                        className="min-w-[100px] bg-white border-blue-200 text-gray-900 hover:border-blue-300 transition-colors"
                      />
                    </td>
                    {optionalFields.quantity && (
                      <td className="p-3">
                        <Input
                          type="number"
                          value={spec.quantity}
                          readOnly
                          className="min-w-[80px] bg-blue-50 border-blue-200 text-gray-900"
                        />
                      </td>
                    )}
                    <td className="p-3">
                      <Button
                        onClick={() => removeRollSpec(spec.id)}
                        variant="ghost"
                        size="sm"
                        disabled={rollSpecs.length === 1}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:opacity-80 transition-all duration-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Optimize Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleOptimize}
          disabled={!isFormValid() || isOptimizing}
          size="lg"
          className="px-8 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Optimizing...
            </>
          ) : (
            "Optimize Cutting Pattern"
          )}
        </Button>
      </div>
    </div>
  )
}
