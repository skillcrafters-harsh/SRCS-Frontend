"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudArrowUpIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface ExcelUploadTabProps {
  onOptimize: (data: any, source: "manual" | "excel") => void;
  isOptimizing: boolean;
}

export default function ExcelUploadTab({
  onOptimize,
  isOptimizing,
}: ExcelUploadTabProps) {
  const [formData, setFormData] = useState({
    motherRollWidth: "4500",
    maxCuts: "7",
    customerName: "Chirag",
    soNo: "Chapli",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Persist and restore state for Excel tab
  // useEffect(() => {
  //   try {
  //     const savedForm = localStorage.getItem("excel_formData");
  //     const savedPreview = localStorage.getItem("excel_previewData");
  //     const savedFileName = localStorage.getItem("excel_uploadedFileName");
  //     if (savedForm) setFormData(JSON.parse(savedForm));
  //     if (savedPreview) setPreviewData(JSON.parse(savedPreview));
  //     if (savedFileName) {
  //       // We cannot restore the actual File object securely; preserve name for UX
  //       setUploadedFile(new File([""], savedFileName));
  //     }
  //   } catch {}
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("excel_formData", JSON.stringify(formData));
  //   } catch {}
  // }, [formData]);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("excel_previewData", JSON.stringify(previewData));
  //     localStorage.setItem("excel_uploadedFileName", uploadedFile?.name || "");
  //   } catch {}
  // }, [previewData, uploadedFile]);

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

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
      if (jsonData.length > 1) {
        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1) as any[][];
        
        const parsedData = rows.map((row, index) => {
          const rowData: any = {};
          headers.forEach((header, colIndex) => {
            const normalizedHeader = header.toString().toLowerCase().trim();
            const value = row[colIndex] || '';
            
            switch (normalizedHeader) {
              case 'item_name':
                rowData.itemName = value;
                break;
              case 'itemname':
                rowData.itemName = value;
                break;
              case 'item name':
                rowData.itemName = value;
                break;
              case 'dia':
                rowData.dia = value;
                break;
              case 'bf':
                rowData.bf = value;
                break;
              case 'gsm':
                rowData.gsm = value;
                break;
              case 'quality':
                rowData.quality = value;
                break;
              case 'size':
                rowData.size = value;
                break;
              case 'uom':
                rowData.uom = value;
                break;
              case 'nor':
                rowData.nor = value;
                break;
              case 'quantity':
                rowData.quantity = value;
                break;
              default:
                rowData[normalizedHeader] = value;
            }
          });
          return rowData;
        }).filter(row => row.itemName || row.size || row.uom || row.nor);
        console.log(parsedData);
        setPreviewData(parsedData);
      } else {
        setPreviewData([]);
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
      const formDataToSend = new FormData();
      formDataToSend.append("file", uploadedFile);
      formDataToSend.append("decal_size", formData.motherRollWidth);
      formDataToSend.append("no_of_cut", formData.maxCuts);
      formDataToSend.append("customer_name", formData.customerName);
      formDataToSend.append("so_no", formData.soNo);

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.29.138:8000"
          }/optimize-cutting-from-excel`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
          toast.error(`Error: ${errorData.message || 'Failed to process request'}`);
          return;
        }

        const result = await response.json();
        result.formData = formData;
        toast.success('Optimization completed successfully!');
        onOptimize(result, "excel");
      } catch (error) {
        console.error("API Error:", error);
        alert(`Network Error: ${error instanceof Error ? error.message : 'Failed to connect to server'}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 flex items-center">
          <CardTitle className="text-lg font-semibold text-black">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
          <div className="space-y-2">
            <Label
              htmlFor="motherRollWidth"
              className="text-sm font-medium text-black"
            >
              Mother Roll Width (mm) <span className="text-red-600">*</span>
            </Label>
            <Input
              id="motherRollWidth"
              type="number"
              placeholder="Enter width"
              value={formData.motherRollWidth}
              onChange={(e) =>
                handleInputChange("motherRollWidth", e.target.value)
              }
              className="bg-white border-gray-300 focus:ring-black focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCuts" className="text-sm font-medium text-black">
              Max Cuts per Roll <span className="text-red-600">*</span>
            </Label>
            <Input
              id="maxCuts"
              type="number"
              placeholder="Enter max cuts"
              value={formData.maxCuts}
              onChange={(e) => handleInputChange("maxCuts", e.target.value)}
              className="bg-white border-gray-300 focus:ring-black focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="customerName"
              className="text-sm font-medium text-black"
            >
              Customer Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Enter customer"
              value={formData.customerName}
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
              className="bg-white border-gray-300 focus:ring-black focus:border-black text-black"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soNo" className="text-sm font-medium text-black">
              SO No <span className="text-red-600">*</span>
            </Label>
            <Input
              id="soNo"
              type="text"
              placeholder="Enter SO number"
              value={formData.soNo}
              onChange={(e) => handleInputChange("soNo", e.target.value)}
              className="bg-white border-gray-300 focus:ring-black focus:border-black text-black"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Excel Format Requirements */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 flex items-center">
          <CardTitle className="text-lg font-semibold text-black">
            Excel Format Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-black mb-2">
                  Required Fields:
                </h4>
                <p className="text-sm text-black">ItemName, Size, UOM, NOR</p>
              </div>
              <div>
                <h4 className="font-medium text-black mb-2">
                  Optional Fields:
                </h4>
                <p className="text-sm text-gray-700">
                  DIA, BF, GSM, Quality, Quantity
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
              <p className="text-sm text-black font-medium">
                📝 Note: ItemName, Size, UOM and NOR are required. Other fields
                are flexible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Zone */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50 py-3 flex items-center">
          <CardTitle className="text-lg font-semibold text-black">
            Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-black bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-black">
                Drop your Excel file here
              </p>
              <p className="text-sm text-gray-600">or click to browse files</p>
              <div className="pt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button
                    variant="outline"
                    asChild
                    className="border-black hover:bg-gray-100 bg-white text-black"
                  >
                    <span>Browse Files</span>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <DocumentIcon className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-black">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Preview */}
      {previewData.length > 0 && (
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50 py-3 flex items-center">
            <CardTitle className="text-lg font-semibold text-black">
              Data Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      Item Name
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      DIA (IN)
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      BF
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      GSM
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      Quality
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      Size
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      UOM
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      NOR
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-medium text-black">
                      QTY (MM)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 text-black">
                        {row.itemName}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.dia}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.bf}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.gsm}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.quality}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.size}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.uom}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.nor}
                      </td>
                      <td className="border border-gray-300 p-3 text-black">
                        {row.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimize Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleOptimize}
          disabled={!isFormValid() || isOptimizing}
          size="lg"
          className="px-8 py-3 text-lg font-semibold bg-black hover:bg-gray-800 text-white"
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
