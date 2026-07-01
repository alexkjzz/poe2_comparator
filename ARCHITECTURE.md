# POE2 Comparator - Frontend Architecture

## 📐 Atomic Design Structure

```
src/
├── components/
│   ├── atoms/              # Basic, reusable UI elements
│   │   ├── Button.svelte   # Stylized button with variants
│   │   ├── Badge.svelte    # Item rarity badges
│   │   └── Input.svelte    # Input field with labels
│   │
│   ├── molecules/          # Simple combinations of atoms
│   │   ├── SearchBox.svelte    # Search functionality
│   │   └── ItemCard.svelte     # Item display card
│   │
│   ├── organisms/          # Complex combinations (full features)
│   │   └── ItemComparator.svelte  # Main comparison feature
│   │
│   └── templates/          # Page layouts (coming soon)
│
├── stores/                 # Global state management
│   └── items.ts           # Item selection store
│
├── styles/                # Global styles
│   └── global.css         # Theme variables and utilities
│
└── routes/                # SvelteKit pages
    └── +page.svelte       # Main overlay page
```

## 🎨 Theme & Colors

The overlay uses a **dark POE2 theme** with gold accents:
- Primary: Gold (`#d4af37`)
- Background: Dark (`#1a1a1a`)
- Rarity Colors: Common, Magic, Rare, Unique

CSS variables are defined in `styles/global.css` for consistency.

## 🔧 Components

### Atoms
- **Button**: Multiple variants (primary, secondary, danger) and sizes (sm, md, lg)
- **Badge**: Item rarity badges (common, magic, rare, unique, currency)
- **Input**: Searchable input with labels

### Molecules
- **SearchBox**: Search interface for items
- **ItemCard**: Displays item stats, rarity, level

### Organisms
- **ItemComparator**: Main comparison interface with two item slots

## 📦 State Management

Global item state via Svelte stores in `stores/items.ts`:
- `selectedItem1`: First item in comparison
- `selectedItem2`: Second item in comparison
- `swapItems()`: Swap items between slots
- `clearComparison()`: Clear both slots

## 🎯 Next Steps

1. Connect to backend API for item parsing
2. Add item search/filtering
3. Add detailed comparison stats
4. Overlay integration with Tauri windowing
5. Additional templates for different screens (builds, etc.)
