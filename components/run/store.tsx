"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { OptimizeResponse } from "@/lib/websocket";

export type OptimizeState = {
  status: OptimizeResponse["status"] | "idle";
  progress: number;
  metrics?: OptimizeResponse["metrics"];
  plans?: OptimizeResponse["plans"];
  error?: string;
};

const defaultState: OptimizeState = {
  status: "idle",
  progress: 0,
};

const OptimizeContext = createContext<{
  state: OptimizeState;
  setState: (s: OptimizeState) => void;
}>({ state: defaultState, setState: () => {} });

export function OptimizeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OptimizeState>(defaultState);
  return (
    <OptimizeContext.Provider value={{ state, setState }}>
      {children}
    </OptimizeContext.Provider>
  );
}

export function useOptimize() {
  return useContext(OptimizeContext);
}
