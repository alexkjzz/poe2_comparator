import { writable } from "svelte/store";

export interface Item {
  id: string;
  name: string;
  type: string;
  rarity: "common" | "magic" | "rare" | "unique";
  level: number;
  stats?: string[];
  imageUrl?: string;
}

export const selectedItem1 = writable<Item | null>(null);
export const selectedItem2 = writable<Item | null>(null);

export function swapItems() {
  let item1: Item | null = null;
  let item2: Item | null = null;

  selectedItem1.subscribe((v) => (item1 = v))();
  selectedItem2.subscribe((v) => (item2 = v))();

  selectedItem1.set(item2);
  selectedItem2.set(item1);
}

export function clearComparison() {
  selectedItem1.set(null);
  selectedItem2.set(null);
}
