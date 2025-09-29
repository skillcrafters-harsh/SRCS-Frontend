# Smart Roll Cutting System (SRCS)

## Overview

Smart Roll Cutting System (SRCS) is a web application that optimizes roll cutting patterns to minimize material waste and maximize efficiency in manufacturing processes. The system solves the "Roll Cutting Problem" by providing dual optimization strategies - minimizing waste or minimizing cutter changes. It supports both manual input and Excel file uploads for bulk roll cutting requirements, offering real-time calculations with visual cutting plans and performance analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with TypeScript for type safety and modern React features
- **Styling**: Tailwind CSS with custom design system based on blue (#1E88E5) primary color
- **Component Library**: Radix UI components with shadcn/ui for consistent, accessible UI components
- **State Management**: React hooks and context for local state management
- **Form Handling**: React Hook Form with Zod resolvers for form validation
- **File Processing**: XLSX library for Excel file parsing and processing

### Page Structure
- **Home Page** (`/`): Landing page with hero section, problem showcase, and solution overview
- **Run Page** (`/run`): Main application interface with tabbed layout for manual input, Excel upload, and results
- **Example Page** (`/example`): Provides sample data and usage examples
- **API Documentation** (`/api-docs`): Interactive documentation for WebSocket APIs

### Core Features
- **Manual Input Interface**: Form-based roll specification entry with dynamic add/remove functionality
- **Excel Upload Support**: Bulk data processing with file validation and preview capabilities
- **Dual Optimization Strategies**: Algorithm selection between waste minimization and cutter change minimization
- **Results Visualization**: Interactive charts, tables, and cutting plan displays using custom canvas-based pie charts
- **Real-time Processing**: WebSocket-based optimization with progress tracking and status updates

### Data Flow
- **Input Processing**: Roll specifications collected via forms or Excel parsing
- **Optimization Request**: Data sent to backend WebSocket endpoint for processing
- **Progress Tracking**: Real-time updates on optimization status and completion
- **Results Display**: Formatted results with performance metrics, cutting plans, and export options

### UI/UX Design Patterns
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Loading States**: Custom loader components with progress indicators
- **Error Handling**: Toast notifications and inline validation feedback
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## External Dependencies

### Backend Services
- **WebSocket API**: Real-time optimization service at `ws://192.168.29.138:8000`
  - `/ws/optimize-cutting`: Manual input optimization endpoint
  - `/ws/optimize-cutting-from-file`: File-based optimization endpoint

### Third-Party Libraries
- **UI Components**: Radix UI primitives for accessibility and consistent behavior
- **File Processing**: XLSX for Excel file reading and parsing
- **Validation**: Zod for schema validation and type safety
- **Styling**: Tailwind CSS with custom utility classes and design tokens
- **Icons**: Heroicons and Lucide React for consistent iconography
- **Analytics**: Vercel Analytics for usage tracking and performance monitoring

### Development Tools
- **Font System**: Geist Sans and Geist Mono for typography
- **Build System**: Next.js built-in bundling and optimization
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: ESLint configuration for code standards

### Browser APIs
- **File API**: For local file reading and processing
- **Canvas API**: Custom pie chart rendering for results visualization
- **WebSocket API**: Real-time communication with optimization backend
- **Clipboard API**: Copy-to-clipboard functionality with fallback support