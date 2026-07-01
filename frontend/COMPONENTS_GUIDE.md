# Components Guide

## 📚 Composants Disponibles

### Atoms (Composants Basiques)

#### Button

Bouton réutilisable avec plusieurs variantes.

```tsx
import { Button } from "@/components/atoms";

// Variantes: primary (défaut), secondary, ghost, danger
// Tailles: sm, md (défaut), lg
// État loading

export function MyComponent() {
  return (
    <div className="space-y-2">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary" size="lg">
        Large Secondary
      </Button>
      <Button variant="danger" size="sm">
        Delete
      </Button>
      <Button isLoading>Loading...</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
```

#### Input

Champ de saisie avec support des erreurs.

```tsx
import { Input } from "@/components/atoms";

export function MyForm() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Item Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter item name..."
      error={value.length > 100 ? "Max 100 chars" : undefined}
      helperText="Type to search items"
    />
  );
}
```

#### Badge

Badge pour afficher les rareté des items.

```tsx
import { Badge } from "@/components/atoms";

export function RarityDisplay() {
  return (
    <div className="space-x-2">
      <Badge variant="common">Common</Badge>
      <Badge variant="magic">Magic</Badge>
      <Badge variant="rare">Rare</Badge>
      <Badge variant="unique">Unique</Badge>
      <Badge variant="default">Default</Badge>
    </div>
  );
}
```

#### Icon

Icônes SVG réutilisables.

```tsx
import { Icon } from "@/components/atoms";

export function MyIcons() {
  return (
    <div className="space-x-4">
      <Icon name="search" size={24} />
      <Icon name="swap" size={20} className="text-blue-500" />
      <Icon name="x" size={18} />
      <Icon name="arrow-down" />
      <Icon name="check" />
      <Icon name="loader" className="animate-spin" />
      <Icon name="menu" />
      <Icon name="close" />
    </div>
  );
}
```

---

### Molecules (Composants Composés)

#### SearchBox

Barre de recherche avec validation.

```tsx
import { SearchBox } from "@/components/molecules";

export function MySearchComponent() {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Faire quelque chose avec la query
  };

  return <SearchBox onSearch={handleSearch} placeholder="Search items..." />;
}
```

#### ItemCard

Carte affichant les détails d'un item.

```tsx
import { ItemCard } from "@/components/molecules";
import type { Item } from "@/types";

export function MyItemDisplay() {
  const item: Item = {
    id: "sword-1",
    name: "Divine Sword",
    type: "Sword",
    rarity: "unique",
    level: 85,
    stats: ["100 Physical Damage", "+20 Life"],
  };

  return <ItemCard item={item} slot={1} />;
}
```

#### ComparatorActions

Boutons d'actions pour le comparateur.

```tsx
import { ComparatorActions } from "@/components/molecules";

export function MyComparator() {
  const handleSwap = () => console.log("Swapped");
  const handleClear = () => console.log("Cleared");

  return <ComparatorActions onSwap={handleSwap} onClear={handleClear} hasItems={true} />;
}
```

---

### Organisms (Composants Complexes)

#### ItemComparator

Comparateur d'items complet avec toute la logique.

```tsx
import { ItemComparator } from "@/components/organisms";

export function MyPage() {
  return <ItemComparator />;
}
```

**Features:**

- Barre de recherche
- 2 slots pour les items
- Actions (swap, clear)
- Affichage des stats de comparaison

#### Sidebar

Navigation sidebar avec responsive.

```tsx
import { Sidebar } from "@/components/organisms";
import { useState } from "react";

export function MyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1">Contenu principal</main>
    </div>
  );
}
```

**Features:**

- Responsive (sidebar fixe sur desktop, toggle sur mobile)
- Menu items
- Version animée

---

## 🎣 Custom Hooks

### useComparator

Hook pour gérer la logique du comparateur.

```tsx
import { useComparator } from "@/hooks";

export function MyComparatorLogic() {
  const {
    item1, // Item | null
    item2, // Item | null
    setItem1, // (item: Item | null) => void
    setItem2, // (item: Item | null) => void
    swapItems, // () => void
    clearComparison, // () => void
    setItemsFromQuery, // (query: string) => void
    buildItemFromQuery, // (query: string, slot: 1 | 2) => Item
  } = useComparator();

  return (
    <div>
      <p>Item 1: {item1?.name}</p>
      <p>Item 2: {item2?.name}</p>
      <button onClick={swapItems}>Swap</button>
      <button onClick={() => setItemsFromQuery("Divine Sword")}>Search</button>
    </div>
  );
}
```

---

## 🎨 Utils

### cn (classNames)

Combine les classes CSS de manière intelligente.

```tsx
import { cn } from "@/utils";

export function MyComponent({ isActive, isDisabled }) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg transition-colors",
        isActive && "bg-blue-600 text-white",
        isDisabled && "opacity-50 cursor-not-allowed",
        "hover:shadow-lg"
      )}
    >
      Content
    </div>
  );
}
```

---

## 📦 Types

```tsx
import type { Item, ItemRarity, ComparisonState } from "@/types";

// Item
interface Item {
  id: string;
  name: string;
  type: string;
  rarity: ItemRarity;
  level: number;
  stats?: string[];
  imageUrl?: string;
}

// ItemRarity
type ItemRarity = "common" | "magic" | "rare" | "unique";

// ComparisonState
interface ComparisonState {
  item1: Item | null;
  item2: Item | null;
}
```

---

## 🔧 Context

### ComparisonProvider & useComparison

Gère l'état global du comparateur.

```tsx
import { ComparisonProvider, useComparison } from "@/contexts";

// Wrapper au root
function App() {
  return (
    <ComparisonProvider>
      <MyComponent />
    </ComparisonProvider>
  );
}

// Utilisation dans les composants
function MyComponent() {
  const {
    state, // { item1, item2 }
    setItem1, // (item: Item | null) => void
    setItem2, // (item: Item | null) => void
    swapItems, // () => void
    clearComparison, // () => void
  } = useComparison();

  return (
    <div>
      <p>{state.item1?.name}</p>
      <button onClick={swapItems}>Swap</button>
    </div>
  );
}
```

---

## 📋 Checklist pour Ajouter un Composant

- [ ] Créer le fichier dans le dossier approprié (atoms/molecules/organisms)
- [ ] Exporter dans le fichier `index.ts` du dossier
- [ ] Typer correctement avec TypeScript
- [ ] Utiliser `forwardRef` si c'est un HTML input/button
- [ ] Ajouter `displayName` pour les DevTools
- [ ] Utiliser `cn()` pour les classes conditionnelles
- [ ] Documenter dans ce fichier
- [ ] Tester le lint: `npm run lint`
- [ ] Tester le build: `npm run build`

---

**Last Updated:** 2026-07-01
