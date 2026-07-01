import React, { useState } from "react";
import { validateAndParseItemJson, ParsedItemData } from "../../utils/itemParser";
import { Button } from "../atoms/Button";

interface JsonItemFormProps {
  onItemValid?: (itemData: ParsedItemData) => void;
}

export function JsonItemForm({ onItemValid }: JsonItemFormProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCheck = () => {
    setError(null);
    setSuccess(false);

    const result = validateAndParseItemJson(jsonInput);

    if (!result.valid) {
      setError(result.error || "Validation failed");
      return;
    }

    setSuccess(true);
    if (onItemValid && result.data) {
      onItemValid(result.data);
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleClear = () => {
    setJsonInput("");
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* Textarea */}
      <div className="space-y-2">
        <label htmlFor="json-input" className="text-sm font-medium text-foreground">
          Item JSON
        </label>
        <textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`{\n  "name": "Item Name",\n  "baseType": "Sword",\n  "ilvl": 75,\n  "properties": [\n    {\n      "name": "Physical Damage",\n      "values": [["45", "50"]]\n    }\n  ]\n}`}
          className="w-full h-64 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-primary/10 border border-primary rounded-lg">
          <p className="text-sm text-primary font-medium">✓ Item JSON is valid!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleCheck}>
          Check Item
        </Button>
      </div>
    </div>
  );
}

JsonItemForm.displayName = "JsonItemForm";
