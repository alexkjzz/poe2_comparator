export interface Item {
  id: string;
  name: string;
  type: string;
  rarity: ItemRarity;
  level: number;
  stats?: string[];
  imageUrl?: string;
}

export type ItemRarity = "common" | "magic" | "rare" | "unique";

export interface ComparisonState {
  item1: Item | null;
  item2: Item | null;
}

export const RARITY_ORDER: ItemRarity[] = ["common", "magic", "rare", "unique"];

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: "bg-gray-500",
  magic: "bg-blue-500",
  rare: "bg-yellow-500",
  unique: "bg-orange-500",
};

export const RARITY_TEXT_COLORS: Record<ItemRarity, string> = {
  common: "text-gray-400",
  magic: "text-blue-400",
  rare: "text-yellow-400",
  unique: "text-orange-400",
};
