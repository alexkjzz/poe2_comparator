import { get } from "svelte/store";
import {
  clearComparison,
  selectedItem1,
  selectedItem2,
  type Item,
  type ItemRarity,
} from "../stores/items";

const rarityOrder: ItemRarity[] = ["common", "magic", "rare", "unique"];

function buildItemFromQuery(query: string, slot: 1 | 2): Item {
  const trimmed = query.trim();
  const fallbackName = `Sample Item ${slot}`;
  const normalized = trimmed.length > 0 ? trimmed : fallbackName;

  return {
    id: `${normalized}-${slot}`.toLowerCase().replace(/\s+/g, "-"),
    name: normalized,
    type: "Imported",
    rarity: rarityOrder[(normalized.length + slot) % rarityOrder.length],
    level: Math.max(1, Math.min(100, normalized.length * 2)),
    stats: ["Prototype item from search input"],
  };
}

export function useComparator() {
  const swap = () => {
    const item1 = get(selectedItem1);
    const item2 = get(selectedItem2);
    selectedItem1.set(item2);
    selectedItem2.set(item1);
  };

  const clear = () => {
    clearComparison();
  };

  const setItemsFromQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      clearComparison();
      return;
    }

    selectedItem1.set(buildItemFromQuery(trimmed, 1));
    selectedItem2.set(buildItemFromQuery(`${trimmed} alt`, 2));
  };

  return {
    selectedItem1,
    selectedItem2,
    swap,
    clear,
    setItemsFromQuery,
  };
}
