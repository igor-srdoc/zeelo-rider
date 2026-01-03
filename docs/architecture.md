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
│   │   └── ui/                  # UI components
│   │       ├── ride-card.tsx          # ⭐ Shared component
│   │       ├── rides-header.tsx
│   │       ├── rides-loading-state.tsx
│   │       ├── rides-error-card.tsx
│   │       ├── rides-list.tsx
│   │       ├── find-ride-card.tsx
│   │       └── rides-help-card.tsx
│   │
│   └── search/
│       ├── search.store.ts      # Zustand state management
│       └── ui/                  # Search-specific UI
│           ├── search-header.tsx
│           ├── search-input.tsx
│           ├── search-loading-state.tsx
│           ├── search-error-card.tsx
│           ├── search-results.tsx
│           └── search-no-results.tsx
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

Each feature (`rides`, `search`) contains:

- **`api/`** - Data fetching logic (React Query hooks)
- **`ui/`** - UI components specific to that feature
- **`*.store.ts`** - State management (Zustand stores)

### 2. Shared Components

Components used across features live in the most relevant feature:

- **`ride-card`** - Lives in `features/rides/ui/` but used in both rides and search

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
// features/search/search.store.ts
export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// app/(tabs)/search.tsx
export default function SearchScreen() {
  return (
    <SafeAreaView>
      <View>
        <SearchHeader /> {/* Pure component */}
        <SearchInput /> {/* Uses store, no props */}
        <SearchLoadingState /> {/* Uses store + hook, no props */}
        <SearchErrorCard /> {/* Uses store + hook, no props */}
        <SearchResults /> {/* Uses store + hook, no props */}
        <NoResults /> {/* Uses store + hook, no props */}
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
