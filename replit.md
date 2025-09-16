# Smart Roll Cutting Solution

## Overview
This is a Next.js 14 application for a manufacturing optimization tool called "Smart Roll Cutting Solution". The application helps optimize material usage with advanced cutting pattern algorithms to reduce waste and improve efficiency in manufacturing processes.

## Project Architecture
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI components with shadcn/ui
- **Charts**: Recharts for data visualization
- **Analytics**: Vercel Analytics integration
- **File Processing**: XLSX library for Excel file uploads

## Key Features
- Manual Input & Excel Upload for cutting requirements
- Dual Optimization Strategies (minimize waste vs minimize cutter changes)
- Visual Cutting Plans and performance analytics
- API Integration capabilities
- Export functionality

## Development Setup
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access through Replit)
- **Build System**: Next.js with TypeScript
- **Package Manager**: npm

## Deployment Configuration
- **Target**: Autoscale (suitable for stateless frontend)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## Recent Changes (2025-09-12)
- Installed all dependencies from package.json
- Fixed TypeScript compilation errors
- Configured Next.js for Replit environment (hostname 0.0.0.0:5000)
- Set up development workflow with proper port binding
- Configured deployment settings for production use
- Verified application functionality through testing

## Current State
- Application is running successfully in development
- All LSP diagnostics resolved
- Development server accessible on port 5000
- Ready for production deployment