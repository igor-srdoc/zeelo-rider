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
│   │       ├── RideCard.tsx     # ⭐ Shared component
│   │       ├── RidesHeader.tsx
│   │       ├── LoadingState.tsx
│   │       ├── ErrorCard.tsx
│   │       ├── RidesList.tsx
│   │       ├── FindRideCard.tsx
│   │       └── HelpCard.tsx
│   │
│   └── search/
│       └── ui/                  # Search-specific UI
│           ├── SearchHeader.tsx
│           ├── SearchInput.tsx
│           ├── SearchLoadingState.tsx
│           ├── SearchErrorCard.tsx
│           ├── SearchResults.tsx
│           └── NoResults.tsx
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

- **`RideCard`** - Lives in `features/rides/ui/` but used in both rides and search

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

## Example: Rides Screen

```tsx
// app/(tabs)/rides.tsx
export default function RidesScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <RidesHeader /> {/* Fetches rides, shows "See all" if has rides */}
        <LoadingState /> {/* Fetches rides, shows spinner if loading */}
        <ErrorCard /> {/* Fetches rides, shows error if failed */}
        <RidesList /> {/* Fetches rides, shows list or empty state */}
        <HelpCard /> {/* Static component */}
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

## Migration Notes

**Before:**

- `hooks/use-rides.ts` → `features/rides/api/use-rides.ts`
- `hooks/use-search-rides.ts` → `features/rides/api/use-search-rides.ts`
- All components in screen files → Extracted to `features/*/ui/`

**After:**

- ✅ Feature-based structure
- ✅ Shared `RideCard` component
- ✅ Clean screen composition
- ✅ No `hooks/` folder (moved to feature `api/` folders)
