/**
 * Validates and parses Path of Exile item JSON format
 * Expected format from API: { name, baseType, ilvl, properties }
 */

export interface ParsedItemData {
  name: string;
  baseType: string;
  ilvl: number;
  properties: Array<{
    name: string;
    values: string[][];
  }>;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  data?: ParsedItemData;
}

export function validateAndParseItemJson(jsonString: string): ValidationResult {
  // Check if string is empty
  if (!jsonString || jsonString.trim() === "") {
    return {
      valid: false,
      error: "JSON input is empty",
    };
  }

  // Try to parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    const errorMsg = error instanceof SyntaxError ? error.message : "Unknown JSON error";
    return {
      valid: false,
      error: `Invalid JSON: ${errorMsg}`,
    };
  }

  // Validate structure
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      valid: false,
      error: "JSON must be an object (not an array or primitive)",
    };
  }

  const obj = parsed as Record<string, unknown>;

  // Validate required fields
  if (typeof obj.name !== "string" || obj.name.trim() === "") {
    return {
      valid: false,
      error: "Missing or invalid 'name' field (must be a non-empty string)",
    };
  }

  if (typeof obj.baseType !== "string" || obj.baseType.trim() === "") {
    return {
      valid: false,
      error: "Missing or invalid 'baseType' field (must be a non-empty string)",
    };
  }

  if (typeof obj.ilvl !== "number" || obj.ilvl < 0 || obj.ilvl > 100) {
    return {
      valid: false,
      error: "Missing or invalid 'ilvl' field (must be a number between 0 and 100)",
    };
  }

  // Validate properties array
  if (!Array.isArray(obj.properties)) {
    return {
      valid: false,
      error: "Missing or invalid 'properties' field (must be an array)",
    };
  }

  // Validate each property object
  for (let i = 0; i < obj.properties.length; i++) {
    const prop = obj.properties[i];
    if (!prop || typeof prop !== "object" || Array.isArray(prop)) {
      return {
        valid: false,
        error: `Property at index ${i} must be an object`,
      };
    }

    const propObj = prop as Record<string, unknown>;

    if (typeof propObj.name !== "string" || propObj.name.trim() === "") {
      return {
        valid: false,
        error: `Property at index ${i}: missing or invalid 'name' field`,
      };
    }

    if (!Array.isArray(propObj.values)) {
      return {
        valid: false,
        error: `Property at index ${i}: missing or invalid 'values' field (must be an array)`,
      };
    }

    // Validate values array contains string arrays
    for (let j = 0; j < propObj.values.length; j++) {
      const val = propObj.values[j];
      if (!Array.isArray(val) || !val.every((v) => typeof v === "string")) {
        return {
          valid: false,
          error: `Property at index ${i}, values at index ${j}: must be an array of strings`,
        };
      }
    }
  }

  // Return parsed data
  return {
    valid: true,
    data: {
      name: obj.name as string,
      baseType: obj.baseType as string,
      ilvl: obj.ilvl as number,
      properties: obj.properties as ParsedItemData["properties"],
    },
  };
}
