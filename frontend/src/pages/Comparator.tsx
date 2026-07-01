import { useState } from "react";
import { JsonItemForm } from "../components/molecules";
import { ParsedItemData } from "../utils/itemParser";

export function ComparatorPage() {
  const [parsedItem, setParsedItem] = useState<ParsedItemData | null>(null);

  const handleItemValid = (itemData: ParsedItemData) => {
    setParsedItem(itemData);
  };

  const handleClearItem = () => {
    setParsedItem(null);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Item Comparator</h1>
      </div>

      {/* JSON Input Section */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Input Item JSON
        </h2>
        <JsonItemForm onItemValid={handleItemValid} />
      </div>

      {/* Parsed Item Display */}
      {parsedItem && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Parsed Item</h2>
            <button
              onClick={handleClearItem}
              className="text-sm px-3 py-1 rounded bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Item Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-widest">
                  Name
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {parsedItem.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-widest">
                  Base Type
                </p>
                <p className="text-lg font-semibold text-accent">
                  {parsedItem.baseType}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-widest">
                  Item Level
                </p>
                <p className="text-lg font-semibold text-primary">
                  {parsedItem.ilvl}
                </p>
              </div>
            </div>

            {/* Properties */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-widest mb-3">
                Properties ({parsedItem.properties.length})
              </p>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {parsedItem.properties.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    No properties defined
                  </p>
                ) : (
                  parsedItem.properties.map((prop, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/50 border border-border rounded p-3"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {prop.name}
                      </p>
                      <div className="mt-1 space-y-1">
                        {prop.values.map((valueArray, valIdx) => (
                          <p
                            key={valIdx}
                            className="text-xs text-muted-foreground font-mono"
                          >
                            {valueArray.join(" | ")}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
