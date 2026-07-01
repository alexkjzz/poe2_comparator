# Architecture React - Atomic Design

## 📁 Structure du Projet

```
frontend/src/
├── types/                 # Types TypeScript partagés
│   └── index.ts          # Interfaces Item, ItemRarity, etc.
├── contexts/              # React Contexts (state management)
│   ├── ComparisonContext.tsx
│   └── index.ts          # Barrel export
├── hooks/                 # Custom React Hooks
│   ├── useComparator.ts   # Logique métier comparateur
│   └── index.ts          # Barrel export
├── utils/                 # Fonctions utilitaires
│   ├── cn.ts             # Classname merger
│   └── index.ts          # Barrel export
├── components/            # Composants React (Atomic Design)
│   ├── atoms/            # Composants basiques
│   │   ├── Button.tsx    # Bouton réutilisable
│   │   ├── Input.tsx     # Champ input
│   │   ├── Badge.tsx     # Badge rareté
│   │   ├── Icon.tsx      # Icônes SVG
│   │   └── index.ts      # Barrel export
│   ├── molecules/        # Composants composés (atoms + logic)
│   │   ├── SearchBox.tsx # Barre de recherche
│   │   ├── ItemCard.tsx  # Carte item unique
│   │   ├── ComparatorActions.tsx # Boutons actions
│   │   └── index.ts      # Barrel export
│   ├── organisms/        # Composants complexes (full features)
│   │   ├── ItemComparator.tsx # Comparateur complet
│   │   ├── Sidebar.tsx   # Sidebar navigation
│   │   └── index.ts      # Barrel export
│   └── index.ts          # Barrel export général
├── styles/               # Fichiers CSS
│   ├── index.css        # Styles globaux + variables CSS
│   └── tailwind.css     # Directives Tailwind
├── main.tsx              # Point d'entrée React
├── App.tsx               # Composant racine avec layout
└── vite-env.d.ts        # Types Vite

```

## 🏗️ Principes d'Architecture

### Atomic Design

- **Atoms**: Composants élémentaires sans logique métier (Button, Input, Badge, Icon)
- **Molecules**: Composition d'atoms avec logique simple (SearchBox, ItemCard, ComparatorActions)
- **Organisms**: Composants complexes combinant molecules et logique métier (ItemComparator, Sidebar)

### State Management

- **Context API** pour l'état global (ComparisonContext)
- **Custom Hooks** pour la logique métier (useComparator)
- **Props drilling** minimal grâce aux contexts

### TypeScript Strict

- Types importés depuis `types/index.ts`
- Interfaces bien définies pour chaque composant
- Pas d'any, typage complet

### Composants Fonctionnels

- React.forwardRef pour exposer les refs (Button, Input)
- useCallback pour optimiser les callbacks
- displayName pour les DevTools
- PropTypes-like typing avec TypeScript

## 📦 Imports Recommandés

### Atomes

```tsx
import { Button, Input, Badge, Icon } from "@/components/atoms";
```

### Molécules

```tsx
import { SearchBox, ItemCard, ComparatorActions } from "@/components/molecules";
```

### Organismes

```tsx
import { ItemComparator, Sidebar } from "@/components/organisms";
```

### Hooks

```tsx
import { useComparator } from "@/hooks";
```

### Types

```tsx
import type { Item, ItemRarity } from "@/types";
```

### Utils

```tsx
import { cn } from "@/utils";
```

## 🎨 Styling avec Tailwind

### Variables CSS personnalisées

```css
:root {
  --background: #0a0e27;
  --foreground: #e4e4e7;
  --card: #1a1d3a;
  --input: #27293d;
  --border: #3f4254;
  --primary: #3b82f6;
}
```

### Classes utilitaires

```tsx
// Exemple: combiner classes dynamiquement
className={cn(
  "p-4 rounded-lg",
  variant === "primary" && "bg-blue-600",
  disabled && "opacity-50"
)}
```

## 🔄 Flux de Données

```
App (root)
  └─ ComparisonProvider (state)
      ├─ Sidebar (navigation)
      └─ ItemComparator (main content)
          ├─ SearchBox (input)
          ├─ ItemCard x2 (display)
          └─ ComparatorActions (controls)
```

- **SearchBox** appelle `useComparator.setItemsFromQuery()`
- **ItemCard** affiche les items du context
- **ComparatorActions** appelle `swapItems()` et `clearComparison()`

## ✅ Bonnes Pratiques Appliquées

- [x] Types stricts (TypeScript)
- [x] Componants réutilisables
- [x] Séparation concerns (logic vs UI)
- [x] Nommage cohérent
- [x] Exports barrel pour imports clean
- [x] Tailwind CSS pour styling
- [x] Dark theme par défaut
- [x] Responsive design
- [x] Accessibility (ARIA labels, roles)
- [x] Performance (useCallback, memo si besoin)

## 🚀 Ajouter un Nouveau Composant

### Nouvel Atom (ex: Toggle)

```tsx
// components/atoms/Toggle.tsx
import React, { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={cn("w-5 h-5 rounded border-border bg-input accent-primary", className)}
          {...props}
        />
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";
```

Puis ajouter à `components/atoms/index.ts`:

```ts
export { Toggle } from "./Toggle";
```

## 🧪 Tester les Composants

```bash
# Linting
npm run lint

# Build
npm run build

# Dev server
npm run dev
```

---

**Last Updated:** 2026-07-01
