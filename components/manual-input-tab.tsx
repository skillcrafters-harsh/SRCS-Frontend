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
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/loader";

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
  onOptimizationStart: () => void;
  onOptimizationComplete: (data: any) => void;
  isOptimizing: boolean;
  optimizationResults?: any;
}

export default function ManualInputTab({
  onOptimizationStart,
  onOptimizationComplete,
  isOptimizing,
  optimizationResults,
}: ManualInputTabProps) {
  const [formData, setFormData] = useState({
    motherRollWidth: "4500",
    maxCuts: "7",
    customerName: "Himesh",
    soNo: "Reshmia",
  });

  console.log(isOptimizing);
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
      itemName: "Pattern 1",
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
    1: "Plan Pattern 1",
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
        itemName: "Pattern 1",
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

  const copyJsonData = () => {
    const jsonData = {
      decal_size: parseInt(formData.motherRollWidth),
      no_of_cut: parseInt(formData.maxCuts),
      rolls: rollSpecs.map((spec, index) => {
        const roll: any = {
          item_name: spec.itemName,
          size: parseInt(spec.size),
          uom: spec.uom.split(" - ")[0],
          nor: parseInt(spec.nor),
          roll_id: `R${index + 1}`,
        };

        if (optionalFields.dia && spec.dia) roll.dia = parseFloat(spec.dia);
        if (optionalFields.bf && spec.bf) roll.bf = parseFloat(spec.bf);
        if (optionalFields.gsm && spec.gsm) roll.gsm = parseFloat(spec.gsm);
        if (optionalFields.quality && spec.quality) roll.quality = spec.quality;
        if (optionalFields.quantity && spec.quantity)
          roll.quantity = spec.quantity;

        return roll;
      }),
    };

    const jsonString = JSON.stringify(jsonData, null, 2);

    // Fallback for older browsers
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(jsonString)
        .then(() => {
          toast.success("JSON data copied to clipboard!");
        })
        .catch(() => {
          fallbackCopyTextToClipboard(jsonString);
        });
    } else {
      fallbackCopyTextToClipboard(jsonString);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast.success("JSON data copied to clipboard!");
      } else {
        toast.error("Failed to copy JSON data");
      }
    } catch (err) {
      toast.error("Failed to copy JSON data");
    }

    document.body.removeChild(textArea);
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
      // Start optimization
      onOptimizationStart();

      // Use WebSocket for optimization
      const wsUrl =
        process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://192.168.29.138:8000";
      console.log("Connecting to WebSocket:", `${wsUrl}/ws/optimize-cutting`);
      const ws = new WebSocket(`${wsUrl}/ws/optimize-cutting`);

      console.log("WebSocket created, readyState:", ws.readyState);

      ws.onopen = () => {
        console.log("WebSocket connected successfully!");
        const payload = {
          decal_size: parseInt(formData.motherRollWidth),
          no_of_cut: parseInt(formData.maxCuts),
          rolls: rollSpecs.map((spec, index) => ({
            item_name: spec.itemName,
            size: parseInt(spec.size),
            uom: spec.uom.split(" - ")[0],
            nor: parseInt(spec.nor),
            roll_id: `R${index + 1}`,
            ...(spec.dia && { dia: parseFloat(spec.dia) }),
            ...(spec.bf && { bf: parseFloat(spec.bf) }),
            ...(spec.gsm && { gsm: parseFloat(spec.gsm) }),
            ...(spec.quality && { quality: spec.quality }),
            ...(spec.quantity && { quantity: spec.quantity }),
          })),
        };

        ws.send(JSON.stringify(payload));
      };

      ws.onmessage = (event) => {
        try {
          const result = JSON.parse(event.data);
          console.log("WebSocket response:", result);

          if (result.status) {
            const resultWithFormData = {
              data: result.data,
              formData: formData,
            };
            toast.success("Optimization completed successfully!");
            onOptimizationComplete(resultWithFormData);
          } else {
            toast.error(`Error: ${result.message || "Optimization failed"}`);
            onOptimizationComplete(null);
          }

          ws.close();
        } catch (error) {
          console.error("WebSocket message error:", error);
          toast.error("Error processing server response");
          onOptimizationComplete(null);
          ws.close();
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        console.log("WebSocket readyState on error:", ws.readyState);
        toast.error("Failed to connect to optimization server");
        onOptimizationComplete(null);
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
      };
    }
  };

  return (
    <div className="space-y-2 animate-fade-in">
      <Loader isVisible={isOptimizing} />

      {/* Basic Information */}
      <Card className="shadow-lg border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 ">
          <CardTitle className="text-vw-lg font-semibold">
            1. Enter Your Roll Details
          </CardTitle>
          <p className="text-vw-sm mt-1">
            Begin by providing the key inputs for your optimization run.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 sm:p-4 md:p-6 border-b border-blue-100">
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
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-blue-100">
          <h3 className="text-vw-base font-semibold text-gray-900 mb-4">
            Configure Optional Fields
          </h3>
          <div className="grid grid-cols-2 gap-3">
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
                  className="text-vw-xs font-medium cursor-pointer text-gray-900"
                >
                  {field.toUpperCase()}
                  <div className="text-xs font-normal text-gray-600">
                    {field === "dia" && "Roll Diameter in inches"}
                    {field === "bf" && "Bursting Factor (strength)"}
                    {field === "gsm" && "Grams per Square Meter"}
                    {field === "quality" && "Paper Quality type"}
                    {field === "quantity" && "Auto calculated quantity"}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Roll Specifications */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 px-3 sm:px-4 md:px-6 gap-3 md:gap-0">
          <div className="flex flex-col items-start">
            <h3 className="text-vw-base font-semibold">
              2. Cutting Specifications
            </h3>
            <p className="text-vw-xs">
              Add all the roll sizes and requirements you need to optimize.
            </p>
          </div>
          <div className="flex flex-row sm:flex-row gap-2 w-full md:w-auto justify-end">
            <div>
              <Button
                onClick={copyJsonData}
                variant="outline"
                size="sm"
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-green-400 to-green-400 hover:from-green-700 hover:to-green-800 text-white hover:scale-105 transition-all duration-300 shadow-xl border-0"
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
                Copy JSON
              </Button>
            </div>
            <div>
              <Button
                onClick={addRollSpec}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl border-0"
              >
                <PlusIcon className="h-4 w-4" />
                Add Roll
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-blue-200 bg-blue-50">
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Item Name <span style={{ color: "red" }}>*</span>
                    <div className="text-xs font-normal text-gray-600">
                      Product type (Kraft Paper Roll)
                    </div>
                  </th>
                  {optionalFields.dia && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      DIA (IN)
                      <div className="text-xs font-normal text-gray-600">
                        Roll Diameter in inches
                      </div>
                    </th>
                  )}
                  {optionalFields.bf && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      BF
                      <div className="text-xs font-normal text-gray-600">
                        Bursting Factor (strength)
                      </div>
                    </th>
                  )}
                  {optionalFields.gsm && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      GSM
                      <div className="text-xs font-normal text-gray-600">
                        Grams per Square Meter
                      </div>
                    </th>
                  )}
                  {optionalFields.quality && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      Quality
                      <div className="text-xs font-normal text-gray-600">
                        Paper Quality type
                      </div>
                    </th>
                  )}
                  <th className="text-left p-3 font-semibold text-gray-900">
                    Size <span style={{ color: "red" }}>*</span>
                    <div className="text-xs font-normal text-gray-600">
                      Width of the cut roll
                    </div>
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    UOM <span style={{ color: "red" }}>*</span>
                    <div className="text-xs font-normal text-gray-600">
                      Unit of Measurement
                    </div>
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900">
                    NOR <span style={{ color: "red" }}>*</span>
                    <div className="text-xs font-normal text-gray-600">
                      Number of Rolls Required
                    </div>
                  </th>
                  {optionalFields.quantity && (
                    <th className="text-left p-3 font-semibold text-gray-900">
                      QTY (MM)
                      <div className="text-xs font-normal text-gray-600">
                        Auto calculated quantity
                      </div>
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
                      <Input
                        type="text"
                        value={spec.itemName}
                        placeholder="Enter item name"
                        onChange={(e) =>
                          handleRollSpecChange(
                            spec.id,
                            "itemName",
                            e.target.value
                          )
                        }
                        className="min-w-[200px] border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                      />
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
                        <Input
                          type="text"
                          value={spec.quality}
                          placeholder="Enter quality"
                          onChange={(e) =>
                            handleRollSpecChange(
                              spec.id,
                              "quality",
                              e.target.value
                            )
                          }
                          className="min-w-[120px] border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:bg-blue-50/30 bg-white text-gray-900 font-medium"
                        />
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
                        className="text-blue-600 cursor-pointer hover:text-blue-700 hover:bg-blue-50"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeRollSpec(spec.id)}
                        variant="ghost"
                        size="sm"
                        disabled={rollSpecs.length === 1}
                        className="text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {rollSpecs.map((spec) => (
              <div
                key={spec.id}
                className="bg-blue-50 rounded-lg p-4 border border-blue-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">
                    Roll #{spec.id}
                  </h4>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => duplicateRollSpec(spec.id)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 cursor-pointer hover:text-blue-700 hover:bg-blue-50"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => removeRollSpec(spec.id)}
                      variant="ghost"
                      size="sm"
                      disabled={rollSpecs.length === 1}
                      className="text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700">
                      Item Name *
                    </Label>
                    <Input
                      type="text"
                      value={spec.itemName}
                      placeholder="Pattern 1"
                      onChange={(e) =>
                        handleRollSpecChange(
                          spec.id,
                          "itemName",
                          e.target.value
                        )
                      }
                      className="w-full border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        Size (mm) *
                      </Label>
                      <Input
                        type="number"
                        value={spec.size}
                        placeholder="Size"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "size", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        Rolls Required *
                      </Label>
                      <Input
                        type="number"
                        value={spec.nor}
                        placeholder="Qty"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "nor", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700">
                      UOM *
                    </Label>
                    <Select
                      value={spec.uom}
                      onValueChange={(value) =>
                        handleRollSpecChange(spec.id, "uom", value)
                      }
                    >
                      <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium">
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
                  </div>
                  {optionalFields.dia && (
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        DIA
                      </Label>
                      <Input
                        type="number"
                        value={spec.dia}
                        placeholder="36"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "dia", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                  )}
                  {optionalFields.bf && (
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        BF
                      </Label>
                      <Input
                        type="number"
                        value={spec.bf}
                        placeholder="BF"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "bf", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                  )}
                  {optionalFields.gsm && (
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        GSM
                      </Label>
                      <Input
                        type="number"
                        value={spec.gsm}
                        placeholder="GSM"
                        onChange={(e) =>
                          handleRollSpecChange(spec.id, "gsm", e.target.value)
                        }
                        className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                  )}
                  {optionalFields.quality && (
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        Quality
                      </Label>
                      <Input
                        type="text"
                        value={spec.quality}
                        placeholder="Enter quality"
                        onChange={(e) =>
                          handleRollSpecChange(
                            spec.id,
                            "quality",
                            e.target.value
                          )
                        }
                        className="w-full border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 hover:border-blue-500 bg-white text-gray-900 font-medium"
                      />
                    </div>
                  )}
                  {optionalFields.quantity && (
                    <div>
                      <Label className="text-xs font-medium text-gray-700">
                        Auto QTY
                      </Label>
                      <Input
                        type="number"
                        value={spec.quantity}
                        readOnly
                        className="bg-gray-100 border-gray-300 text-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="flex justify-center pt-1">
          <Button
            onClick={handleOptimize}
            disabled={!isFormValid() || isOptimizing}
            size="sm"
            className="sm:w-auto cursor-pointer px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium sm:font-semibold bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl border-0"
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
    </div>
  );
}
