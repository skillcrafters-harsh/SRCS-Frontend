export type WSMessage<T = unknown> = {
  type: string;
  data?: T;
  progress?: number;
  error?: string;
};

export type OptimizeRequest = {
  strategy: "minimize_waste" | "minimize_cutter_changes";
  items: Array<{
    width: number;
    length?: number;
    quantity: number;
    dia?: number;
    bf?: number;
    gsm?: number;
    quality?: string;
  }>;
};

export type OptimizeResponse = {
  status: "started" | "progress" | "completed" | "error";
  progress?: number;
  metrics?: {
    wastePercent: number;
    utilizedPercent: number;
    totalRolls: number;
  };
  plans?: Array<{
    rollId: string;
    cuts: Array<{ width: number; qty: number }>;
  }>;
  error?: string;
};

export function createWS(path: string) {
  const base = process.env.NEXT_PUBLIC_WS_BASE_URL || "";
  const url = `${base}${path}`;
  if (!url.startsWith("ws://") && !url.startsWith("wss://")) {
    throw new Error("Invalid NEXT_PUBLIC_WS_BASE_URL. It must start with ws:// or wss://");
  }
  return new WebSocket(url);
}

export function sendOptimize(ws: WebSocket, payload: OptimizeRequest) {
  ws.send(JSON.stringify(payload));
}
