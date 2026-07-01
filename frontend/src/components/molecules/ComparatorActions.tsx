import React from "react";
import { Button, Icon } from "../atoms";

interface ComparatorActionsProps {
  onSwap: () => void;
  onClear: () => void;
  hasItems: boolean;
}

export function ComparatorActions({
  onSwap,
  onClear,
  hasItems,
}: ComparatorActionsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <Button
        variant="secondary"
        onClick={onSwap}
        disabled={!hasItems}
        title="Swap items between slots"
        className="gap-2"
      >
        <Icon name="swap" size={18} />
        <span>Swap Items</span>
      </Button>

      <Button
        variant="destructive"
        onClick={onClear}
        disabled={!hasItems}
        title="Clear comparison"
        className="gap-2"
      >
        <Icon name="x" size={18} />
        <span>Clear</span>
      </Button>
    </div>
  );
}
