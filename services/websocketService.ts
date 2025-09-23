export interface OptimizationRequest {
  decal_size: number;
  no_of_cut: number;
  rolls: Array<{
    item_name: string;
    size: number;
    uom: string;
    nor: number;
    roll_id?: string;
    dia?: number;
    bf?: number;
    gsm?: number;
    quality?: string;
    quantity?: number;
  }>;
}

export interface FileOptimizationRequest {
  decal_size: number;
  no_of_cut: number;
  file_content: string;
  filename: string;
  customer_name?: string;
  so_no?: string;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://192.168.29.138:8000';
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getOptimizationUrl(): string {
    return `${this.baseUrl}/ws/optimize-cutting`;
  }

  public getFileOptimizationUrl(): string {
    return `${this.baseUrl}/ws/optimize-cutting-from-file`;
  }

  public async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const arrayBuffer = reader.result as ArrayBuffer;
          const bytes = new Uint8Array(arrayBuffer);
          const base64 = btoa(String.fromCharCode(...bytes));
          resolve(base64);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  }

  public createOptimizationRequest(formData: {
    motherRollWidth: string;
    maxCuts: string;
    customerName?: string;
    soNo?: string;
  }, rollSpecs: any[]): OptimizationRequest {
    return {
      decal_size: parseInt(formData.motherRollWidth),
      no_of_cut: parseInt(formData.maxCuts),
      rolls: rollSpecs.map((spec, index) => ({
        item_name: spec.itemName,
        size: parseInt(spec.size),
        uom: spec.uom.split(' - ')[0],
        nor: parseInt(spec.nor),
        roll_id: `R${index + 1}`,
        ...(spec.dia && { dia: parseFloat(spec.dia) }),
        ...(spec.bf && { bf: parseFloat(spec.bf) }),
        ...(spec.gsm && { gsm: parseFloat(spec.gsm) }),
        ...(spec.quality && { quality: spec.quality }),
        ...(spec.quantity && { quantity: spec.quantity }),
      })),
    };
  }

  public async createFileOptimizationRequest(
    file: File,
    formData: {
      motherRollWidth: string;
      maxCuts: string;
      customerName?: string;
      soNo?: string;
    }
  ): Promise<FileOptimizationRequest> {
    const fileBase64 = await this.fileToBase64(file);
    
    return {
      decal_size: parseFloat(formData.motherRollWidth),
      no_of_cut: parseInt(formData.maxCuts),
      file_content: fileBase64,
      filename: file.name,
      ...(formData.customerName && { customer_name: formData.customerName }),
      ...(formData.soNo && { so_no: formData.soNo }),
    };
  }
}

export const websocketService = WebSocketService.getInstance();