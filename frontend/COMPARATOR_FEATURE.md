# Comparator Page - JSON Item Input Feature

## Overview

The Comparator page has been refactored to accept Path of Exile items in JSON format, validate them according to the PoE API structure, and display the parsed item details.

## Features

### 1. JSON Input (Molecule Component)

- **Component**: `JsonItemForm`
- **Location**: `src/components/molecules/JsonItemForm.tsx`
- **Purpose**: Provides UI for JSON input with validation

**Features:**

- Large textarea (256px height) for item JSON
- Example placeholder showing expected format
- Clear button to reset input
- Check Item button to validate and parse
- Error messages displayed in red box
- Success message with auto-dismiss (3s)

### 2. Item Parser (Utility)

- **Module**: `src/utils/itemParser.ts`
- **Purpose**: Validates and parses PoE item JSON

**Validation Rules:**

- `name`: Required, non-empty string
- `baseType`: Required, non-empty string
- `ilvl`: Required, number between 0-100
- `properties`: Required, array of property objects
- Each property must have:
  - `name`: string
  - `values`: array of string arrays

**Export Functions:**

```typescript
validateAndParseItemJson(jsonString: string): ValidationResult
```

**Types:**

```typescript
interface ParsedItemData {
  name: string;
  baseType: string;
  ilvl: number;
  properties: Array<{
    name: string;
    values: string[][];
  }>;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  data?: ParsedItemData;
}
```

### 3. Comparator Page (Page Component)

- **Location**: `src/pages/Comparator.tsx`
- **State**: Local state for parsed item

**Features:**

- Displays title "Item Comparator"
- JsonItemForm component for input
- Parsed item display section (only shows when item is valid)
- Item details grid with name, base type, item level
- Properties list with scrollable content
- Clear button to reset parsed item

## Usage

### In Component

```typescript
import { JsonItemForm } from "../components/molecules";
import { ParsedItemData } from "../utils";

export function MyComponent() {
  const [item, setItem] = useState<ParsedItemData | null>(null);

  const handleItemValid = (itemData: ParsedItemData) => {
    setItem(itemData);
    // Use itemData for comparisons, API calls, etc.
  };

  return <JsonItemForm onItemValid={handleItemValid} />;
}
```

### Validation in Utilities

```typescript
import { validateAndParseItemJson } from "../utils";

const jsonString = '{"name":"Item","baseType":"Type","ilvl":75,"properties":[]}';
const result = validateAndParseItemJson(jsonString);

if (result.valid && result.data) {
  console.log("Item is valid:", result.data);
} else {
  console.error("Validation error:", result.error);
}
```

## Expected JSON Format

```json
{
  "name": "Item Name",
  "baseType": "Base Type Name",
  "ilvl": 75,
  "properties": [
    {
      "name": "Physical Damage",
      "values": [["45", "50"]]
    },
    {
      "name": "Attributes",
      "values": [["+50"], ["-20"]]
    }
  ]
}
```

## Example Item

```json
{
  "name": "Shaper Sword of Eternal Night",
  "baseType": "Bastard Sword",
  "ilvl": 86,
  "properties": [
    {
      "name": "Physical Damage",
      "values": [["245", "305"]]
    },
    {
      "name": "Attacks per Second",
      "values": [["1.45"]]
    },
    {
      "name": "Critical Strike Chance",
      "values": [["5.5%"]]
    },
    {
      "name": "Requires Level",
      "values": [["50"]]
    },
    {
      "name": "Life",
      "values": [["+95"]]
    },
    {
      "name": "Fire Resistance",
      "values": [["+18%"]]
    }
  ]
}
```

## Error Messages

| Error                                   | Cause                                          |
| --------------------------------------- | ---------------------------------------------- |
| "JSON input is empty"                   | Textarea is empty                              |
| "Invalid JSON: ..."                     | JSON syntax error                              |
| "JSON must be an object"                | Top-level is not an object                     |
| "Missing or invalid 'name' field"       | name is missing, empty, or not a string        |
| "Missing or invalid 'baseType' field"   | baseType is missing, empty, or not a string    |
| "Missing or invalid 'ilvl' field"       | ilvl is missing, not a number, or out of range |
| "Missing or invalid 'properties' field" | properties is not an array                     |
| "Property at index X: ..."              | Invalid property object structure              |

## Styling

### Textarea

- **Input background**: Uses CSS variable `--input`
- **Border color**: Uses CSS variable `--border`
- **Focus ring**: Primary color (2px)
- **Font**: Monospace (font-mono) for JSON clarity

### Error Box

- **Background**: `destructive/10` (semi-transparent red)
- **Border**: Destructive color
- **Text**: Destructive color

### Success Message

- **Background**: `primary/10` (semi-transparent)
- **Border**: Primary color
- **Text**: Primary color
- **Auto-dismiss**: After 3 seconds

### Parsed Item Display

- **Name**: Large, bold text
- **Base Type**: Accent color
- **Item Level**: Primary color
- **Properties**: Monospace font, scrollable list

## Future Enhancements

- [ ] Add file upload for JSON files
- [ ] Add syntax highlighting in textarea
- [ ] Add JSON beautifier/formatter
- [ ] Add side-by-side item comparison
- [ ] Add API call to compare two items
- [ ] Add item history/recent items
- [ ] Add export parsed item as JSON

## Testing

### Valid Item Test

1. Navigate to `/comparator`
2. Paste example JSON above into textarea
3. Click "Check Item"
4. Should see success message and parsed item display

### Invalid Format Tests

1. Empty JSON: Should show "JSON input is empty"
2. Missing field: Should show "Missing or invalid 'X' field"
3. Wrong type: Should show "Invalid 'X' field"
4. Bad ilvl: Should show "Must be between 0 and 100"

## Code Quality

- ✓ TypeScript strict mode
- ✓ Full type safety for item data
- ✓ ESLint: 0 errors
- ✓ Comprehensive validation
- ✓ Clear error messages
- ✓ No external dependencies

## Related Files

- `frontend/src/pages/Comparator.tsx` - Page component
- `frontend/src/components/molecules/JsonItemForm.tsx` - Input form
- `frontend/src/utils/itemParser.ts` - Validation logic
- `frontend/src/components/atoms/Button.tsx` - Button component (with outline variant)
