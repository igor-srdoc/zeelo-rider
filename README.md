# Zeelo Rider App

A React Native mobile application for Zeelo riders to manage and search for their rides.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) with React Native
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Backend**: [Supabase](https://supabase.com/)
- **Language**: TypeScript

## Architecture

This app follows a **feature-based architecture** where code is organized by domain features rather than technical layers. Components are further organized by view context (list vs. search).

📖 **For detailed architecture documentation, see [docs/architecture.md](./docs/architecture.md)**

### Key Features

- **Rides List**: View and manage your upcoming rides
- **Search**: Find rides by workplace or school
- **Account**: User profile and settings

### Directory Structure

```
zeelo-rider/
├── app/                    # Expo Router screens (thin composition layer)
│   └── (tabs)/            # Tab-based navigation
├── features/              # Feature modules
│   └── rides/
│       ├── api/          # Data fetching hooks
│       ├── state/        # State management (Zustand)
│       └── ui/           # UI components by view context
│           ├── list/     # Rides list view components
│           └── search/   # Search view components
├── lib/                   # Shared utilities
└── ui/                    # Shared UI components
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Expo Go app (for testing on physical device)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory with your Supabase credentials:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_KEY=your_supabase_key
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

### Running the App

After starting the dev server, you can:

- **Scan QR code** with Expo Go app on your phone
- Press **`a`** to open in Android emulator
- Press **`i`** to open in iOS simulator
- Press **`w`** to open in web browser

## Development

### Project Structure

- **`app/(tabs)/`** - Screen files (composition only, no business logic)
- **`features/rides/api/`** - React Query hooks for data fetching
- **`features/rides/state/`** - Zustand stores for state management
- **`features/rides/ui/list/`** - Components for the rides list view
- **`features/rides/ui/search/`** - Components for the search view
- **`lib/`** - Shared utilities (Supabase client, helpers)
- **`ui/`** - Shared UI components (error cards, loading states)

### Coding Conventions

- **File names**: kebab-case (e.g., `ride-card.tsx`)
- **Component exports**: PascalCase (e.g., `RideCard`)
- **Hooks**: camelCase (e.g., `useRides`)
- **Self-contained components**: Components access data via stores or hooks, no prop drilling

### Key Principles

1. **Feature-based organization** - Code organized by domain features
2. **View context organization** - UI components grouped by where they're used (list/search)
3. **Thin screen layer** - Screens only compose components, no logic
4. **Self-contained components** - Components manage their own state and data
5. **No prop drilling** - Use Zustand stores and React Query hooks

## Documentation

- **Architecture**: [docs/architecture.md](./docs/architecture.md) - Detailed architecture documentation
- **Expo Docs**: [https://docs.expo.dev](https://docs.expo.dev)
- **React Native**: [https://reactnative.dev](https://reactnative.dev)
- **NativeWind**: [https://www.nativewind.dev](https://www.nativewind.dev)

## Resources

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router introduction](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/)
- [NativeWind documentation](https://www.nativewind.dev/)
- [Zustand documentation](https://zustand-demo.pmnd.rs/)
- [React Query documentation](https://tanstack.com/query/latest)
