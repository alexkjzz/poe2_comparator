import React from "react";
import { useComparator } from "../../hooks/useComparator";
import { SearchBox, ItemCard, ComparatorActions } from "../molecules";

export function ItemComparator() {
  const {
    item1,
    item2,
    swapItems,
    clearComparison,
    setItemsFromQuery,
  } = useComparator();

  const hasItems = item1 !== null || item2 !== null;

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="card rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Search Items
        </h2>
        <SearchBox onSearch={setItemsFromQuery} />
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
            Slot 1
          </h3>
          <ItemCard item={item1} slot={1} />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
            Slot 2
          </h3>
          <ItemCard item={item2} slot={2} />
        </div>
      </div>

      {/* Actions */}
      <ComparatorActions
        onSwap={swapItems}
        onClear={clearComparison}
        hasItems={hasItems}
      />

      {/* Comparison Stats (when both items exist) */}
      {hasItems && (item1 || item2) && (
        <div className="card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Comparison Info
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Item 1
              </p>
              <p className="text-base font-semibold text-foreground truncate">
                {item1?.name || "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Item 2
              </p>
              <p className="text-base font-semibold text-foreground truncate">
                {item2?.name || "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Level Diff
              </p>
              <p className="text-base font-semibold text-accent">
                {item1 && item2
                  ? Math.abs(item1.level - item2.level)
                  : "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Type
              </p>
              <p className="text-base font-semibold text-foreground">
                {item1?.type || item2?.type || "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
