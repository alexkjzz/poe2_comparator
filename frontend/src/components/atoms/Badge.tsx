import React from "react";
import { ItemRarity } from "../../types";
import { cn } from "../../utils/cn";

interface BadgeProps {
  variant?: ItemRarity | "default";
  children: React.ReactNode;
  className?: string;
}

const rarityBgColors: Record<ItemRarity | "default", string> = {
  common: "bg-muted",
  magic: "bg-blue-600/80",
  rare: "bg-yellow-600/80",
  unique: "bg-orange-600/80",
  default: "bg-muted",
};

const rarityTextColors: Record<ItemRarity | "default", string> = {
  common: "text-muted-foreground",
  magic: "text-blue-100",
  rare: "text-yellow-100",
  unique: "text-orange-100",
  default: "text-muted-foreground",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        rarityBgColors[variant],
        rarityTextColors[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
