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
│   │       ├── ride-card.tsx     # ⭐ Shared component
│   │       ├── rides-header.tsx
│   │       ├── loading-state.tsx
│   │       ├── error-card.tsx
│   │       ├── rides-list.tsx
│   │       ├── find-ride-card.tsx
│   │       └── help-card.tsx
│   │
│   └── search/
│       └── ui/                  # Search-specific UI
│           ├── search-header.tsx
│           ├── search-input.tsx
│           ├── search-loading-state.tsx
│           ├── search-error-card.tsx
│           ├── search-results.tsx
│           └── no-results.tsx
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

### 2. Shared Components

Components used across features live in the most relevant feature:
- **`ride-card`** - Lives in `features/rides/ui/` but used in both rides and search

### 3. Thin Screen Layer

Screen files in `app/(tabs)/` are **composition only**:
- Import and compose feature components
- No business logic
- No state management (except local UI state like search input)

### 4. Self-Contained Components

Each component:
- Manages its own data fetching via hooks
- Handles its own conditional rendering
- Returns `null` when not needed

### 5. Naming Conventions

- **kebab-case** for file names (e.g., `ride-card.tsx`, `search-input.tsx`)
- **PascalCase** for component exports (e.g., `RideCard`, `SearchInput`)
- **camelCase** for hooks (e.g., `useRides`, `useSearchRides`)

## Example: Rides Screen

```tsx
// app/(tabs)/rides.tsx
export default function RidesScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <RidesHeader />      {/* Fetches rides, shows "See all" if has rides */}
        <LoadingState />     {/* Fetches rides, shows spinner if loading */}
        <ErrorCard />        {/* Fetches rides, shows error if failed */}
        <RidesList />        {/* Fetches rides, shows list or empty state */}
        <HelpCard />         {/* Static component */}
      </ScrollView>
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

## Migration Notes

**Before:**
- `hooks/use-rides.ts` → `features/rides/api/use-rides.ts`
- `hooks/use-search-rides.ts` → `features/rides/api/use-search-rides.ts`
- All components in screen files → Extracted to `features/*/ui/`
- PascalCase file names → kebab-case file names

**After:**
- ✅ Feature-based structure
- ✅ Shared `ride-card` component
- ✅ Clean screen composition
- ✅ No `hooks/` folder (moved to feature `api/` folders)
- ✅ kebab-case file naming convention
