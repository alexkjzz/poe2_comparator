import React from "react";
import { Item } from "../../types";
import { Badge } from "../atoms";

interface ItemCardProps {
  item: Item | null;
  slot: 1 | 2;
}

export function ItemCard({ item, slot }: ItemCardProps) {
  if (!item) {
    return (
      <div className="card border-2 border-dashed rounded-lg p-6 flex items-center justify-center h-64">
        <p className="text-muted-foreground text-center text-sm">
          No item selected for slot {slot}
        </p>
      </div>
    );
  }

  return (
    <div className="card rounded-lg p-6 hover:border-primary transition-colors duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground break-words">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground">{item.type}</p>
          </div>
          <Badge variant={item.rarity}>{item.rarity}</Badge>
        </div>

        {/* Item Stats */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Level
            </span>
            <span className="text-sm font-semibold text-foreground">
              {item.level}
            </span>
          </div>

          {/* Stats List */}
          {item.stats && item.stats.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Stats
              </p>
              <ul className="space-y-1">
                {item.stats.map((stat, idx) => (
                  <li key={idx} className="text-xs text-foreground/90">
                    • {stat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image Placeholder */}
        {item.imageUrl && (
          <div className="mt-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-auto rounded object-cover max-h-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}
