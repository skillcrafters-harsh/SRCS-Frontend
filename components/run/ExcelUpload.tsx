"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudArrowUpIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { useOptimize } from "@/components/run/store";

const REQUIRED_FIELDS = ["itemName", "size", "uom", "nor"] as const;

type RequiredFieldKey = (typeof REQUIRED_FIELDS)[number];

const REQUIRED_FIELD_LABELS: Record<RequiredFieldKey, string> = {
  itemName: "Item Name",
  size: "Size",
  uom: "UOM",
  nor: "NOR",
};

interface ExcelUploadTabProps {
  onOptimizationStart?: () => void;
  onOptimizationComplete?: (data: any) => void;
  isOptimizing?: boolean;
}

export default function ExcelUploadTab({
  onOptimizationStart,
  onOptimizationComplete,
  isOptimizing,
}: ExcelUploadTabProps) {
  const { setState } = useOptimize();
  const [formData, setFormData] = useState({
    motherRollWidth: "4500",
    maxCuts: "7",
    customerName: "Chirag",
    soNo: "Chapli",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (!showPreviewModal) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [showPreviewModal]);

  const handlePreviewOpen = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowPreviewModal(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
    );
    if (excelFile) {
      handleFileUpload(excelFile);
    }
  }, []);

  const resetFileState = () => {
    setUploadedFile(null);
    setPreviewData([]);
    setShowPreviewModal(false);
  };

  const handleFileUpload = (file: File) => {
    resetFileState();

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length > 1) {
        const headers = jsonData[0] as (string | number)[];
        const rows = jsonData.slice(1) as any[][];
        const headerFieldMap: Record<number, string> = {};
        const requiredColumnPresence = new Set<RequiredFieldKey>();

        headers.forEach((header, colIndex) => {
          const normalizedHeader = header?.toString().toLowerCase().trim() || "";
          switch (normalizedHeader) {
            case "item_name":
            case "itemname":
            case "item name":
              headerFieldMap[colIndex] = "itemName";
              requiredColumnPresence.add("itemName");
              break;
            case "dia":
              headerFieldMap[colIndex] = "dia";
              break;
            case "bf":
              headerFieldMap[colIndex] = "bf";
              break;
            case "gsm":
              headerFieldMap[colIndex] = "gsm";
              break;
            case "quality":
              headerFieldMap[colIndex] = "quality";
              break;
            case "size":
            case "width":
              headerFieldMap[colIndex] = "size";
              requiredColumnPresence.add("size");
              break;
            case "uom":
              headerFieldMap[colIndex] = "uom";
              requiredColumnPresence.add("uom");
              break;
            case "nor":
            case "quantity":
            case "qty":
              headerFieldMap[colIndex] = "nor";
              requiredColumnPresence.add("nor");
              break;
            default:
              if (normalizedHeader) {
                headerFieldMap[colIndex] = normalizedHeader;
              }
          }
        });

        const isMissingCell = (value: unknown) => {
          if (value === undefined || value === null) return true;
          if (typeof value === "string") return value.trim() === "";
          if (typeof value === "number") return Number.isNaN(value) || value === 0;
          return false;
        };

        const parsedData = rows
          .map((row) => {
            const rowData: Record<string, any> = {};
            headers.forEach((_, colIndex) => {
              const key = headerFieldMap[colIndex];
              if (!key) return;
              const rawValue = row[colIndex];
              const value = rawValue ?? "";
              rowData[key] = typeof value === "string" ? value.trim() : value;
            });
            return rowData;
          })
          .filter((row) => row.itemName || row.size || row.uom || row.nor);

        const missingRequiredColumns = REQUIRED_FIELDS.filter(
          (field) => !requiredColumnPresence.has(field)
        );
        const missingDataFields = new Set<RequiredFieldKey>();

        parsedData.forEach((row) => {
          REQUIRED_FIELDS.forEach((field) => {
            if (isMissingCell(row[field])) {
              missingDataFields.add(field);
            }
          });
        });

        if (missingRequiredColumns.length > 0 || missingDataFields.size > 0) {
          const messages: string[] = [];
          if (missingRequiredColumns.length > 0) {
            messages.push(
              `Missing required columns: ${missingRequiredColumns
                .map((field) => REQUIRED_FIELD_LABELS[field])
                .join(", ")}`
            );
          }
          if (missingDataFields.size > 0) {
            messages.push(
              `Rows missing values for: ${Array.from(missingDataFields)
                .map((field) => REQUIRED_FIELD_LABELS[field])
                .join(", ")}`
            );
          }

          toast.error(messages.join(" | "));
          return;
        }

        if (parsedData.length === 0) {
          toast.error("No rows containing required fields were found.");
          return;
        }

        console.log("Parsed data:", parsedData);
        setPreviewData(parsedData);
        setUploadedFile(file);
        setShowPreviewModal(false);
      } else {
        toast.error("The uploaded sheet is empty or missing headers.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const isFormValid = () => {
    const basicFieldsValid =
      formData.motherRollWidth &&
      formData.maxCuts &&
      formData.customerName &&
      formData.soNo;
    const fileValid = uploadedFile && previewData.length > 0;
    return basicFieldsValid && fileValid;
  };

  const handleOptimize = async () => {
    if (isFormValid() && uploadedFile) {
      setState({
        status: "started",
        progress: 0,
      });
      onOptimizationStart?.();

      try {
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              const arrayBuffer = reader.result as ArrayBuffer;
              const bytes = new Uint8Array(arrayBuffer);
              const base64 = btoa(String.fromCharCode(...bytes));
              resolve(base64);
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = () => reject(new Error("Error reading file"));
          reader.readAsArrayBuffer(uploadedFile);
        });

        const wsUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://192.168.29.138:8000";
        const ws = new WebSocket(`${wsUrl}/ws/optimize-cutting-from-file`);

        ws.onopen = () => {
          const payload = {
            decal_size: parseFloat(formData.motherRollWidth),
            no_of_cut: parseInt(formData.maxCuts),
            file_content: fileBase64,
            filename: uploadedFile.name,
            customer_name: formData.customerName,
            so_no: formData.soNo,
          };
          ws.send(JSON.stringify(payload));
        };

        ws.onmessage = (event) => {
          try {
            const result = JSON.parse(event.data);
            if (result.status) {
              setState({
                status: "completed",
                progress: 100,
                plans: result.data?.strategies?.min_wastage?.results || [],
                metrics: {
                  utilizedPercent: 85,
                  wastePercent: 15,
                  totalRolls: result.data?.strategies?.min_wastage?.total_rolls_used || 0
                }
              });
              toast.success("Optimization completed successfully!");
              onOptimizationComplete?.({ data: result.data, formData });
            } else {
              setState({
                status: "error",
                progress: 0,
                error: result.message || "Optimization failed"
              });
              toast.error(`Error: ${result.message || "Optimization failed"}`);
              onOptimizationComplete?.(null);
            }
            ws.close();
          } catch (error) {
            setState({
              status: "error",
              progress: 0,
              error: "Error processing server response"
            });
            toast.error("Error processing server response");
            onOptimizationComplete?.(null);
            ws.close();
          }
        };

        ws.onerror = () => {
          setState({
            status: "error",
            progress: 0,
            error: "Failed to connect to optimization server"
          });
          toast.error("Failed to connect to optimization server");
          onOptimizationComplete?.(null);
        };
      } catch (error) {
        setState({
          status: "error",
          progress: 0,
          error: "Error processing file"
        });
        toast.error("Error processing file");
        onOptimizationComplete?.(null);
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <Loader isVisible={isOptimizing || false} />

      {/* Basic Information */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-black">
            1. Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6">
          <div className="space-y-2">
            <Label htmlFor="motherRollWidthExcel" className="text-xs sm:text-sm font-medium text-black">
              Mother Roll Width (mm) <span className="text-red-600">*</span>
            </Label>
            <Input
              id="motherRollWidthExcel"
              type="number"
              placeholder="Enter width"
              value={formData.motherRollWidth}
              onChange={(e) => handleInputChange("motherRollWidth", e.target.value)}
              className="bg-white border-gray-300 focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCutsExcel" className="text-xs sm:text-sm font-medium text-black">
              Max Cuts per Roll <span className="text-red-600">*</span>
            </Label>
            <Input
              id="maxCutsExcel"
              type="number"
              placeholder="Enter max cuts"
              value={formData.maxCuts}
              onChange={(e) => handleInputChange("maxCuts", e.target.value)}
              className="bg-white border-gray-300 focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerNameExcel" className="text-xs sm:text-sm font-medium text-black">
              Customer Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="customerNameExcel"
              type="text"
              placeholder="Enter customer"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              className="bg-white border-gray-300 focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soNoExcel" className="text-xs sm:text-sm font-medium text-black">
              SO No <span className="text-red-600">*</span>
            </Label>
            <Input
              id="soNoExcel"
              type="text"
              placeholder="Enter SO number"
              value={formData.soNo}
              onChange={(e) => handleInputChange("soNo", e.target.value)}
              className="bg-white border-gray-300 focus:border-black text-black"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Excel Format Requirements */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-black">
            2. Excel Format Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-black mb-2 text-sm sm:text-base">
                  Required Fields:
                </h4>
                <p className="text-xs sm:text-sm text-black">
                  ItemName, Size, UOM, NOR
                </p>
              </div>
              <div>
                <h4 className="font-medium text-black mb-2 text-sm sm:text-base">
                  Optional Fields:
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  DIA, BF, GSM, Quality, Quantity
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
              <p className="text-xs sm:text-sm text-black font-medium">
                📝 Note: ItemName, Size, UOM and NOR are required. Other fields are flexible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Zone */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-black">
            3. Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragOver ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudArrowUpIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-500 mb-4" />
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-black">
                Drop your Excel file here
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                or click to browse files
              </p>
              <div className="pt-4">
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                  size="sm"
                  className="sm:w-auto px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl border-0"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <DocumentIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm sm:text-base truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {(uploadedFile.size / 1024).toFixed(1)} KB • {previewData.length} rows
                    </p>
                  </div>
                </div>
                {previewData.length > 0 && (
                  <Button
                    onClick={handlePreviewOpen}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white hover:bg-gray-50 text-green-700 border-green-300 hover:border-green-400 rounded-md transition-transform hover:scale-[1.02]"
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-6xl w-full h-[90vh] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">Data Preview</h3>
              <Button
                onClick={() => setShowPreviewModal(false)}
                variant="outline"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {/* Desktop Table View */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">Sr. No.</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">Item Name</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">DIA (IN)</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">BF</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">GSM</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">Quality</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">Size</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">UOM</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">NOR</th>
                      <th className="border border-gray-300 p-3 text-left text-xs sm:text-sm font-medium text-black">QTY (MM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{index + 1}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.itemName}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.dia}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.bf}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.gsm}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.quality}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.size}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.uom}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.nor}</td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm text-black">{row.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {previewData.map((row, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Row #{index + 1}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div className="font-medium text-gray-600">Item Name:</div>
                      <div className="text-gray-900 truncate">{row.itemName}</div>
                      <div className="font-medium text-gray-600">Size:</div>
                      <div className="text-gray-900">{row.size}</div>
                      <div className="font-medium text-gray-600">UOM:</div>
                      <div className="text-gray-900">{row.uom}</div>
                      <div className="font-medium text-gray-600">NOR:</div>
                      <div className="text-gray-900">{row.nor}</div>
                      {row.dia && (
                        <>
                          <div className="font-medium text-gray-600">DIA:</div>
                          <div className="text-gray-900">{row.dia}</div>
                        </>
                      )}
                      {row.bf && (
                        <>
                          <div className="font-medium text-gray-600">BF:</div>
                          <div className="text-gray-900">{row.bf}</div>
                        </>
                      )}
                      {row.gsm && (
                        <>
                          <div className="font-medium text-gray-600">GSM:</div>
                          <div className="text-gray-900">{row.gsm}</div>
                        </>
                      )}
                      {row.quality && (
                        <>
                          <div className="font-medium text-gray-600">Quality:</div>
                          <div className="text-gray-900 truncate">{row.quality}</div>
                        </>
                      )}
                      {row.quantity && (
                        <>
                          <div className="font-medium text-gray-600">Quantity:</div>
                          <div className="text-gray-900">{row.quantity}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimize Button */}
      <div className="flex justify-center py-4">
        <Button
          onClick={handleOptimize}
          disabled={!isFormValid() || isOptimizing}
          size="lg"
          className="sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 shadow-xl border-0"
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
  );
}
