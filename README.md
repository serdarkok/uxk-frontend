# UXKraft Frontend

A modern React-based shipping and logistics management application built with TypeScript, Redux Toolkit, and TanStack Table.

## 🚀 Features

- **Ship Management**: View, search, and manage shipping items with comprehensive details
- **Advanced Search**: Real-time search with debouncing for optimal performance
- **Smart Filtering**: Filter ships by vendor and phase with support for combined filters
- **Data Export**: Export filtered data to CSV format with a single click
- **Bulk Operations**: Select and manage multiple ship items simultaneously
- **Responsive Data Table**: Powered by TanStack React Table with sorting, pagination, and selection
- **Dark/Light Theme**: Built-in theme switcher with persistent preferences
- **Real-time Updates**: Redux Toolkit Query for efficient data fetching and caching

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server

### State Management & Data Fetching
- **Redux Toolkit 2.11** - State management
- **RTK Query** - Data fetching and caching
- **React Redux 9.2** - React bindings for Redux

### UI Components & Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Checkbox, Dialog, Dropdown Menu, Popover, Select
- **Lucide React** - Icon library
- **Next Themes** - Theme management
- **Vaul** - Drawer/sheet components
- **Sonner** - Toast notifications

### Data & Tables
- **TanStack React Table 8** - Headless table library
- **React CSV** - CSV export functionality
- **Date-fns 4** - Date manipulation
- **React Day Picker 9** - Date picker component

### Development
- **ESLint 9** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - Fast Refresh support

## 📁 Project Structure

```
src/
├── assets/          # Static assets (SVG icons, images)
├── components/      # Reusable UI components
│   ├── item/       # Item-specific components (Planning, Production, Shipping, etc.)
│   ├── provider/   # Context providers (Theme)
│   └── ui/         # Base UI components (Button, Input, Select, etc.)
├── lib/            # Utility functions and helpers
├── modules/        # Feature-specific modules
│   ├── dataTable/  # Data table components (Columns, Export, Pagination)
│   ├── drawers/    # Drawer components (Single, Multiple, Tracking)
│   └── items/      # Item management components (Search, Select, Selected Rows)
├── services/       # API services and HTTP clients
├── store/          # Redux store configuration
│   ├── api/        # RTK Query API endpoints
│   ├── slices/     # Redux slices
│   └── store.ts    # Store configuration
└── types/          # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v8 or higher)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (TypeScript check + Vite build)
- `pnpm lint` - Run ESLint to check code quality
- `pnpm preview` - Preview production build locally

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

### API Integration

The application uses RTK Query for API communication. API endpoints are defined in:
- `src/store/api/shipsApi.ts` - Ship-related endpoints
- `src/store/api/vendorApi.ts` - Vendor endpoints
- `src/store/api/locationsApi.ts` - Location endpoints
- `src/store/api/categoriesApi.ts` - Category endpoints

## 📊 Key Features Explained

### Search Functionality
- Debounced search (500ms delay) to minimize API calls
- Real-time results as you type
- Searches across ship items and their properties

### Filtering System
- **Vendor Filter**: Filter ships by vendor
- **Phase Filter**: Filter ships by phase (1-99)
- **Combined Filters**: Apply multiple filters simultaneously
- Filters work seamlessly with search functionality

### CSV Export
- Exports currently displayed/filtered data
- Includes comprehensive ship details (25+ columns)
- Automatic filename with current date
- One-click download

### Bulk Operations
- Select multiple ships using checkboxes
- Perform bulk actions on selected items
- Visual indicator showing selected count

### Theme Support
- Light and dark mode support
- Persistent theme preference
- Smooth transitions between themes

## 🎨 UI Components

The application uses a custom design system built on top of Radix UI primitives:

- **Button** - Primary, secondary, outline, and ghost variants
- **Input** - Text inputs with validation support
- **Select** - Dropdown selects with clear functionality
- **Calendar/DatePicker** - Date selection components
- **Checkbox** - Multi-select support
- **Dialog/Sheet** - Modal and drawer overlays
- **Table** - Sortable, paginated data tables
- **Dropdown Menu** - Context menus and actions

## 🔐 State Management

### Redux Store Structure

```typescript
{
  ships: {
    selectedRows: IShip[]  // Currently selected ship items
  },
  api: {
    ships: {},      // Ships cache and queries
    vendors: {},    // Vendors cache
    locations: {},  // Locations cache
    categories: {}  // Categories cache
  }
}
```

## 🚢 Ship Data Model

```typescript
interface IShip {
  id: number;
  itemId: number;
  shipToTitle: string;
  shipToAddress: string;
  shipFrom: string;
  vendorId: number;
  quantity: number;
  phase: number;
  notes: string;
  locationId: number;
  categoryId: number;
  // ... dates and tracking fields
  item: { name, description, price, markup, spec };
  location: { name };
  category: { name };
  vendor: { name };
}
```

## 🎯 Future Enhancements

- [ ] Advanced filtering with date ranges
- [ ] Bulk edit functionality
- [ ] Print view for shipping labels
- [ ] Real-time notifications
- [ ] Offline support with service workers
- [ ] Import CSV functionality
- [ ] Custom column visibility controls
- [ ] Saved filter presets

## 📝 Code Style

This project follows:
- React 19 best practices with hooks
- TypeScript strict mode
- Functional components with typed props
- Redux Toolkit patterns and conventions
- ESLint recommended rules

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new code
3. Write meaningful component and variable names
4. Keep components small and focused
5. Use Redux for global state, local state for component-specific data
6. Test your changes before submitting

## 📄 License

Private project - All rights reserved

---

Built with ❤️ using modern React ecosystem
