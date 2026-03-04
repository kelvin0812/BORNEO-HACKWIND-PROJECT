# Changelog

All notable changes to FinanceLens AI will be documented in this file.

## [1.2.0] - 2026-03-04

### Added
- **Profile Tab**: Complete profile management system with user settings
  - Security center with password management
  - Biometric authentication toggle (FaceID/Fingerprint)
  - Notification preferences
  - Language settings
  - Personalized AI insights toggle
  - Experience roadmap with XP progression display
  - Edit profile dialog with avatar upload UI
  - Trusted devices management
  - Help center and legal documents access
  - Account data management (logout, data reset)

- **Navigation Enhancement**: 
  - Added Profile tab to bottom navigation bar
  - Implemented 6-tab navigation system (Home, Invest, Coach, Debt, Learn, Profile)
  - Active state indicators with animated dot

### Changed
- **Chart Rendering**: Fixed dimension errors across all Recharts components
  - Added explicit `minHeight` props to all ResponsiveContainer instances
  - Dashboard wealth analysis chart: 256px minimum height
  - Debt calculator overview chart: 192px minimum height
  - Investment performance chart: 128px minimum height
  - Investment allocation chart: 192px minimum height with proper container wrapping

- **Component Organization**: Resolved file redundancy issues
  - Removed duplicate uppercase component files (Button.tsx, Card.tsx, Input.tsx)
  - Created custom-prefixed components (custom-button.tsx, custom-card.tsx, custom-input.tsx)
  - Updated Onboarding page to use custom components
  - Standardized all other pages to use lowercase shadcn/ui components

### Fixed
- Recharts "width(0) and height(0)" errors on initial render
- File naming conflicts between custom and library components
- Profile page functional interactions (dialogs, switches, form submissions)
- Bottom navigation active state persistence across routes

## [1.1.0] - 2026-03-03

### Added
- **Investment Hub**: Complete real asset tracking system
  - Portfolio summary with total asset value
  - Performance area chart with 6-month trend
  - Asset allocation pie chart
  - Individual asset cards with gain/loss indicators
  - Add asset dialog with type selection
  - AI market analysis insights card

- **Learning Hub**: Gamified financial education platform
  - Course categories (Budgeting, Investing, Debt, Savings, Advanced)
  - XP-based progression system
  - Achievement badges
  - Course completion tracking
  - Interactive course cards with difficulty indicators

- **Enhanced Debt Calculator**:
  - Debt overview pie chart
  - BNPL (Buy Now Pay Later) payment tracking
  - Debt item management with payment schedules
  - Add debt dialog with interest rate calculation

- **Advanced Analytics**:
  - Social spending comparisons by age group
  - Monthly expense conclusions
  - Peer benchmarking insights

### Changed
- Upgraded navigation to 5-tab system (Home, Coach, Debt, Learn, Invest)
- Enhanced FinanceContext with asset and learning module management
- Improved data models for debts, assets, and courses

## [1.0.0] - 2026-03-02

### Added
- **Initial Release**: Core FinanceLens AI application
  - Dashboard with wealth visualization
  - AI Coach chat interface
  - Debt tracking and management
  - Account management system
  - Transaction tracking (income/expenses)
  - Subscription monitoring
  - SMART goals tracker
  - Onboarding flow

- **Tech Stack**:
  - React 18.3.1 with TypeScript
  - React Router 7.13.0
  - Tailwind CSS v4.1.12
  - Motion (Framer Motion) 12.23.24
  - Recharts 2.15.2
  - Radix UI components

- **Design System**:
  - Custom color palette (Deep Blue, Mint Green, Warning Coral)
  - Glassmorphism UI design
  - Mobile-first responsive layout
  - Touch-friendly interactions

- **Features**:
  - Local storage data persistence
  - Real-time balance calculations
  - Category-based expense tracking
  - Subscription deadline monitoring
  - Financial goal progress tracking
  - XP and leveling system

### Development
- Project scaffolding with Vite
- ESLint and TypeScript configuration
- Tailwind CSS v4 integration
- Component library setup (shadcn/ui + custom components)
- Context-based state management
- Routing architecture with React Router

---

## Version History

- **v1.2.0** (Current) - Profile management and chart fixes
- **v1.1.0** - Investment tracking and learning hub
- **v1.0.0** - Initial release with core features

## Upcoming Features

### Planned for v1.3.0
- [ ] Supabase backend integration
- [ ] Real-time data synchronization
- [ ] Multi-device support
- [ ] Data export (CSV/PDF)
- [ ] Dark mode theme
- [ ] Push notifications
- [ ] Budget alerts and recommendations

### Planned for v2.0.0
- [ ] AI-powered spending predictions
- [ ] Bill payment automation
- [ ] Receipt scanning with OCR
- [ ] Investment recommendations
- [ ] Collaborative goals (family/friends)
- [ ] Advanced reporting and insights
- [ ] Integration with bank APIs
- [ ] Cryptocurrency portfolio tracking

## Breaking Changes

None in current version.

## Migration Guide

### From v1.1.0 to v1.2.0
No breaking changes. New profile features are additive.

### From v1.0.0 to v1.1.0
- Update navigation component to support 5 tabs
- Add asset and course management to FinanceContext
- No data migration needed (localStorage schema extended)

---

**Maintained by**: FinanceLens AI Development Team  
**Last Updated**: March 4, 2026
