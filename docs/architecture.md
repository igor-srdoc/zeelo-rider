# Zeelo Rider App Architecture

## Feature-Based Structure

This app follows a **feature-based architecture** where code is organized by domain features rather than technical layers.

## Directory Structure

```
zeelo-rider/
├── app/                          # Expo Router screens (thin layer)
│   ├── (tabs)/
│   │   ├── rides.tsx            # Rides screen (composition only)
│   │   ├── search.tsx           # Search screen (composition only)
│   │   └── account.tsx
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Entry redirect
│
├── features/                     # Feature modules
│   ├── rides/
│   │   ├── api/                 # Data fetching hooks
│   │   │   ├── use-rides.ts
│   │   │   └── use-search-rides.ts
│   │   ├── state/               # State management
│   │   │   └── search.store.ts  # Zustand search state
│   │   └── ui/                  # UI components organized by context
│   │       ├── find-ride-card.tsx     # Main screen cards
│   │       ├── rides-help-card.tsx
│   │       ├── list/            # Rides list view components
│   │       │   ├── ride-card.tsx      # ⭐ Shared ride card
│   │       │   ├── rides-header.tsx
│   │       │   ├── rides-loading-state.tsx
│   │       │   ├── rides-error-card.tsx
│   │       │   └── rides-list.tsx
│   │       └── search/          # Search view components
│   │           ├── search-header.tsx
│   │           ├── search-input.tsx
│   │           ├── search-loading-state.tsx
│   │           ├── search-error-card.tsx
│   │           ├── search-results.tsx
│   │           └── search-no-results.tsx
│
├── ui/                          # Shared UI components
│   ├── error-card.tsx          # Reusable error card
│   ├── loading-state.tsx       # Reusable loading spinner
│   └── page-title.tsx          # Reusable page title text
│
└── lib/                         # Shared utilities
    ├── supabase.ts             # Supabase client
    └── utils.ts                # Format helpers
```

## Key Principles

### 1. Feature-Based Organization

The `rides` feature contains all rides-related functionality:

- **`api/`** - Data fetching logic (React Query hooks)
- **`state/`** - State management (Zustand stores)
- **`ui/`** - UI components organized by view context:
  - **`list/`** - Components for the rides list view
  - **`search/`** - Components for the search view
  - Top-level: Shared cards used across views

### 2. Organized by View Context

UI components are organized by the view they belong to:

- **`ui/list/`** - Components specific to the rides list view
- **`ui/search/`** - Components specific to the search view
- **`ui/`** (top-level) - Shared cards like `find-ride-card` and `rides-help-card`
- **`ride-card`** - Lives in `features/rides/ui/list/` and is reused in search results

### 3. Thin Screen Layer

Screen files in `app/(tabs)/` are **composition only**:

- Import and compose feature components
- No business logic
- No state management (moved to feature stores)
- No prop drilling

### 4. Self-Contained Components

Each component:

- Accesses data via feature stores (Zustand) or hooks (React Query)
- Handles its own conditional rendering
- Returns `null` when not needed
- No prop drilling required

### 5. Naming Conventions

- **kebab-case** for file names (e.g., `ride-card.tsx`, `search-input.tsx`)
- **PascalCase** for component exports (e.g., `RideCard`, `SearchInput`)
- **camelCase** for hooks (e.g., `useRides`, `useSearchRides`)

## Example: Search Screen with Zustand

```tsx
// features/rides/state/search.store.ts
export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// app/(tabs)/search.tsx
// All components imported from features/rides/ui/search/
import { SearchHeader } from "@/features/rides/ui/search/search-header";
import { SearchInput } from "@/features/rides/ui/search/search-input";
// ... other imports

export default function SearchScreen() {
  return (
    <SafeAreaView>
      <View>
        <SearchHeader /> {/* Pure component */}
        <SearchInput /> {/* Uses store, no props */}
        <SearchLoadingState /> {/* Uses store + hook, no props */}
        <SearchErrorCard /> {/* Uses store + hook, no props */}
        <SearchResults /> {/* Uses store + hook, no props */}
        <SearchNoResults /> {/* Uses store + hook, no props */}
      </View>
    </SafeAreaView>
  );
}
```

## Benefits

✅ **Scalability** - Easy to add new features without affecting others
✅ **Maintainability** - Related code lives together
✅ **Reusability** - Components can be shared across features
✅ **Testability** - Features can be tested in isolation
✅ **Developer Experience** - Clear structure, easy to navigate
✅ **Consistent Naming** - kebab-case for files, PascalCase for exports
