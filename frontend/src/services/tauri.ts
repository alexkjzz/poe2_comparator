const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface ComparisonResponse {
  activeDps: number;
  candidateDps: number;
  deltaPercent: number;
  candidateIsUpgrade: boolean;
}

export interface ApiItem {
  name: string;
  baseType: string;
  ilvl: number;
  properties: Array<{
    name: string;
    values: string[][];
  }>;
}

export const api = {
  healthcheck: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.text();
  },

  compareItems: async (
    activeItem: ApiItem,
    candidateItem: ApiItem
  ): Promise<ComparisonResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activeItem,
        candidateItem,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },
};
