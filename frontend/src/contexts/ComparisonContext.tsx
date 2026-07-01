import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Item, ComparisonState } from "../types";

interface ComparisonContextType {
  state: ComparisonState;
  setItem1: (item: Item | null) => void;
  setItem2: (item: Item | null) => void;
  swapItems: () => void;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ComparisonState>({
    item1: null,
    item2: null,
  });

  const setItem1 = useCallback((item: Item | null) => {
    setState((prev) => ({ ...prev, item1: item }));
  }, []);

  const setItem2 = useCallback((item: Item | null) => {
    setState((prev) => ({ ...prev, item2: item }));
  }, []);

  const swapItems = useCallback(() => {
    setState((prev) => ({
      item1: prev.item2,
      item2: prev.item1,
    }));
  }, []);

  const clearComparison = useCallback(() => {
    setState({
      item1: null,
      item2: null,
    });
  }, []);

  return (
    <ComparisonContext.Provider
      value={{
        state,
        setItem1,
        setItem2,
        swapItems,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
}
