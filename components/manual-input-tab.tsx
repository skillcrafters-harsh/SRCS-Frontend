"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

interface RollSpec {
  id: string;
  itemName: string;
  dia: string;
  bf: string;
  gsm: string;
  quality: string;
  size: string;
  uom: string;
  nor: string;
  quantity: number;
}

interface ManualInputTabProps {
  onOptimize: (data: any, source: "manual" | "excel") => void;
  isOptimizing: boolean;
  optimizationResults?: any;
}

export default function ManualInputTab({
  onOptimize,
  isOptimizing,
  optimizationResults,
}: ManualInputTabProps) {
  const [formData, setFormData] = useState({
    motherRollWidth: "4500",
    maxCuts: "7",
    customerName: "Himesh",
    soNo: "Reshmia",
  });

  const [optionalFields, setOptionalFields] = useState({
    dia: false,
    bf: false,
    gsm: false,
    quality: false,
    quantity: false,
  });

  const [rollSpecs, setRollSpecs] = useState<RollSpec[]>([
    {
      id: "1",
      itemName: "KRAFT PAPER SIZE (151 TO ABOVE)",
      dia: "",
      bf: "",
      gsm: "",
      quality: "",
      size: "32",
      uom: "IN - Inches",
      nor: "5",
      quantity: 0,
    },
  ]);

  const itemOptions = {
    1: "KRAFT PAPER SIZE (151 TO ABOVE)",
    2: "KRAFT PAPER SIZE (1 TO 150)",
  };

  const qualityOptions = {
    1: "GOLDEN",
    2: "NATURAL",
    3: "FLUTING",
    4: "GREY",
    5: "BROWN",
  };

  const uomOptions = {
    1: "IN - Inches",
    2: "MM - Millimeters",
    3: "CM - Centimeters",
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionalFieldChange = (field: string, checked: boolean) => {
    setOptionalFields((prev) => {
      const updated = { ...prev, [field]: checked };

      if (field === "quantity" && checked) {
        updated.dia = true;
      }

      if (field === "dia" && !checked && prev.quantity) {
        return prev;
      }

      return updated;
    });

    if (!checked && !(field === "dia" && optionalFields.quantity)) {
      setRollSpecs((prev) =>
        prev.map((spec) => ({
          ...spec,
          [field]: field === "quantity" ? 0 : "",
        }))
      );
    }
  };

  const handleRollSpecChange = (id: string, field: string, value: string) => {
    setRollSpecs((prev) =>
      prev.map((spec) => {
        if (spec.id === id) {
          const updated = { ...spec, [field]: value };
          if (
            (field === "dia" ||
              field === "size" ||
              field === "nor" ||
              field === "uom") &&
            optionalFields.quantity
          ) {
            updated.quantity = calculateQuantity(updated);
          }
          return updated;
        }
        return spec;
      })
    );
  };

  const calculateQuantity = (spec: RollSpec): number => {
    const dia = Number.parseFloat(spec.dia) || 0;
    const size = Number.parseFloat(spec.size) || 0;
    const nor = Number.parseFloat(spec.nor) || 0;

    if (dia === 0 || size === 0 || nor === 0) return 0;

    const baseValue = dia * size * nor;

    switch (spec.uom) {
      case "CM - Centimeters":
        return Math.round(baseValue / 2.54);
      case "MM - Millimeters":
        return Math.round(baseValue / 25.4);
      case "IN - Inches":
      default:
        return Math.round(baseValue);
    }
  };

  const addRollSpec = () => {
    const newId = (rollSpecs.length + 1).toString();
    setRollSpecs((prev) => [
      ...prev,
      {
        id: newId,
        itemName: "KRAFT PAPER SIZE (151 TO ABOVE)",
        dia: "",
        bf: "",
        gsm: "",
        quality: "",
        size: "",
        uom: "IN - Inches",
        nor: "",
        quantity: 0,
      },
    ]);
  };

  const removeRollSpec = (id: string) => {
    if (rollSpecs.length > 1) {
      setRollSpecs((prev) => prev.filter((spec) => spec.id !== id));
    }
  };

  const duplicateRollSpec = (id: string) => {
    setRollSpecs((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      const source = prev[index];
      const newSpec: RollSpec = {
        ...source,
        id: (prev.length + 1).toString(),
      };
      const next = [...prev];
      next.splice(index + 1, 0, newSpec);
      return next;
    });
  };

  const isFormValid = () => {
    const basicFieldsValid = formData.motherRollWidth && formData.maxCuts;

    const rollSpecsValid = rollSpecs.every((spec) => {
      const requiredValid = spec.itemName && spec.size && spec.nor && spec.uom;
      const optionalValid =
        (!optionalFields.dia || spec.dia) &&
        (!optionalFields.bf || spec.bf) &&
        (!optionalFields.gsm || spec.gsm) &&
        (!optionalFields.quality || spec.quality);

      return requiredValid && optionalValid;
    });

    return basicFieldsValid && rollSpecsValid;
  };

  // Persist and restore state to avoid losing inputs after results
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem("manual_formData");
      const savedOptional = localStorage.getItem("manual_optionalFields");
      const savedRolls = localStorage.getItem("manual_rollSpecs");
      if (savedForm) setFormData(JSON.parse(savedForm));
      if (savedOptional) setOptionalFields(JSON.parse(savedOptional));
      if (savedRolls) setRollSpecs(JSON.parse(savedRolls));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("manual_formData", JSON.stringify(formData));
    } catch {}
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "manual_optionalFields",
        JSON.stringify(optionalFields)
      );
    } catch {}
  }, [optionalFields]);

  useEffect(() => {
    try {
      localStorage.setItem("manual_rollSpecs", JSON.stringify(rollSpecs));
    } catch {}
  }, [rollSpecs]);

  const handleOptimize = async () => {
    if (isFormValid()) {
      const payload = {
        decal_size: parseInt(formData.motherRollWidth),
        no_of_cut: parseInt(formData.maxCuts),
        rolls: rollSpecs.map((spec) => ({
          item_name: spec.itemName,
          size: parseInt(spec.size),
          uom: spec.uom.split(" - ")[0],
          nor: parseInt(spec.nor),
        })),
      };

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.29.138:8000"
          }/optimize-cutting`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
          alert(`Error: ${errorData.message || 'Failed to process request'}`);
          return;
        }

        const result = await response.json();
        result.formData = formData;
        alert('Optimization completed successfully!');
        onOptimize(result, "manual");
      } catch (error) {
        console.error("API Error:", error);
        alert(`Network Error: ${error instanceof Error ? error.message : 'Failed to connect to server'}`);
      }
    }
  };

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Basic Information */}
      <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 ">
          <CardTitle className="text-lg font-semibold">
            1. Enter Your Roll Details
          </CardTitle>
          <p className="text-sm mt-1">
            Begin by providing the key inputs for your optimization run.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-blue-100">
          <div className="space-y-2">
            <Label
              htmlFor="motherRollWidth"
              className="text-sm font-semibold text-gray-900"
            >
              Mother Roll Width (mm) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="motherRollWidth"
              type="number"
              placeholder="e.g., 2000"
              value={formData.motherRollWidth}
              onChange={(e) =>
                handleInputChange("motherRollWidth", e.target.value)
              }
              className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="maxCuts"
              className="text-sm font-semibold text-gray-900"
            >
              Max Cuts per Roll <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maxCuts"
              type="number"
              placeholder="e.g., 10"
              value={formData.maxCuts}
              onChange={(e) => handleInputChange("maxCuts", e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="customerName"
              className="text-sm font-semibold text-gray-900"
            >
              Customer Name
            </Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Optional"
              value={formData.customerName}
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
              className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="soNo"
              className="text-sm font-semibold text-gray-900"
            >
              SO No (Sales Order)
            </Label>
            <Input
              id="soNo"
              type="text"
              placeholder="Optional"
              value={formData.soNo}
              onChange={(e) => handleInputChange("soNo", e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
            />
          </div>
        </CardContent>

        {/* Optional Fields */}
        <div className="px-6 py-4 border-b border-blue-100">
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            Configure Optional Fields
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {["dia", "bf", "gsm", "quality", "quantity"].map((field) => (
              <div
                key={field}
                className="flex items-center space-x-2 hover:bg-blue-50/50 p-2 rounded transition-colors"
              >
                <Checkbox
                  id={`${field}-checkbox`}
                  checked={optionalFields[field as keyof typeof optionalFields]}
                  onCheckedChange={(checked) =>
                    handleOptionalFieldChange(field, checked as boolean)
                  }
                  disabled={field === "dia" && optionalFields.quantity}
                  className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={`${field}-checkbox`}
                  className="text-xs font-medium cursor-pointer text-gray-900"
                >
                  {field.toUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Roll Specifications */}
        <div className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 px-6">
          <div>
            <h3 className="text-lg font-semibold">2. Cutting Specifications</h3>
            <p className="text-sm">
              Add all the roll sizes and requirements you need to optimize.
            </p>
          </div>
          <Button
            onClick={addRollSpec}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white text-blue-600 border-white hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-md"
          >
            <PlusIcon className="h-4 w-4" />
            Add Roll
          </Button>
        </div>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-blue-200 bg-blue-50">
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Item Name *
                  </th>
                  {optionalFields.dia && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      DIA
                    </th>
                  )}
                  {optionalFields.bf && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      BF
                    </th>
                  )}
                  {optionalFields.gsm && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      GSM
                    </th>
                  )}
                  {optionalFields.quality && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      Quality
                    </th>
                  )}
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Size (mm) *
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    UOM *
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Rolls Required *
                  </th>
                  {optionalFields.quantity && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      Auto QTY
                    </th>
                  )}
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rollSpecs.map((spec) => (
                  <tr
                    key={spec.id}
                    className="border-b border-blue-100 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-3">
                      <Select
                        value={spec.itemName}
                        onValueChange={(value) =>
                          handleRollSpecChange(spec.id, "itemName", value)
                        }
                      >
                        <SelectTrigger className="min-w-[200px] border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium">
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(itemOptions).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
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
                          value={spec.dia}
                          placeholder="36"
                          onChange={(e) =>
                            handleRollSpecChange(spec.id, "dia", e.target.value)
                          }
                          className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                        />
                      </td>
                    )}
                    {optionalFields.bf && (
                      <td className="p-3">
                        <Input
                          type="number"
                          value={spec.bf}
                          placeholder="BF"
                          onChange={(e) =>
                            handleRollSpecChange(spec.id, "bf", e.target.value)
                          }
                          className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                        />
                      </td>
                    )}
                    {optionalFields.gsm && (
                      <td className="p-3">
                        <Input
                          type="number"
                          value={spec.gsm}
                          placeholder="GSM"
                          onChange={(e) =>
                            handleRollSpecChange(spec.id, "gsm", e.target.value)
                          }
                          className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                        />
                      </td>
                    )}
                    {optionalFields.quality && (
                      <td className="p-3">
                        <Select
                          value={spec.quality}
                          onValueChange={(value) =>
                            handleRollSpecChange(spec.id, "quality", value)
                          }
                        >
                          <SelectTrigger className="min-w-[120px] border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(qualityOptions).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </td>
                    )}
                    <td className="p-3">
                      <Input
                        type="number"
                        value={spec.size}
                        placeholder="Size in mm"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "size", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                      />
                    </td>
                    <td className="p-3">
                      <Select
                        value={spec.uom}
                        onValueChange={(value) =>
                          handleRollSpecChange(spec.id, "uom", value)
                        }
                      >
                        <SelectTrigger className="min-w-[120px] border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium">
                          <SelectValue placeholder="Select UOM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(uomOptions).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        value={spec.nor}
                        placeholder="Qty"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "nor", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                      />
                    </td>
                    {optionalFields.quantity && (
                      <td className="p-3">
                        <Input
                          type="number"
                          value={spec.quantity}
                          readOnly
                          className="bg-gray-100 border-gray-300 text-gray-700"
                        />
                      </td>
                    )}
                    <td className="p-3 flex gap-1">
                      <Button
                        onClick={() => duplicateRollSpec(spec.id)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeRollSpec(spec.id)}
                        variant="ghost"
                        size="sm"
                        disabled={rollSpecs.length === 1}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
        <div className="flex justify-center pt-1">
          <Button
            onClick={handleOptimize}
            disabled={!isFormValid() || isOptimizing}
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Optimizing...
              </>
            ) : (
              "Generate My Optimization Plan"
            )}
          </Button>
        </div>
      </Card>

      {/* CTA */}
    </div>
  );
}
