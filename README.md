# FinanceLens AI

A modern personal finance app for Gen-Z and Millennials that combines AI-driven coaching, budget tracking, and gamified educational experiences.

## 🎯 Features

### Core Functionality
- **Dashboard** - Real-time financial overview with wealth analysis pie charts
- **AI Coach** - Interactive chat-based financial advisor with personalized insights
- **Debt Calculator** - Track and manage debts with BNPL payment tracking
- **Investment Hub** - Monitor real assets (Real Estate, Gold, Stocks, Crypto)
- **Learning Hub** - Gamified courses with XP progression system
- **Profile Management** - User settings, security preferences, and experience tracking

### Technical Highlights
- **Gamification** - XP-based leveling system with achievement badges
- **Subscription Tracking** - Monitor recurring payments linked to accounts
- **SMART Goals** - Specific, Measurable, Achievable financial targets
- **Social Comparisons** - Benchmark spending against peer groups
- **Monthly Analytics** - AI-generated spending conclusions and insights

## 🛠 Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Routing**: React Router 7.13.0 (Data Mode)
- **Styling**: Tailwind CSS v4.1.12
- **Animation**: Motion (Framer Motion) 12.23.24
- **Charts**: Recharts 2.15.2
- **UI Components**: Radix UI primitives + custom shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form 7.55.0
- **Build Tool**: Vite 6.3.5

## 🎨 Design System

### Color Palette
- **Primary (Deep Blue)**: `#1E3A8A` - Main brand color
- **Success (Mint Green)**: `#10B981` - Positive actions and growth
- **Warning (Coral)**: `#F97316` - Alerts and important notices
- **Background**: `#F3F4F6` - Soft gray for comfortable viewing

### Typography
- Custom font system defined in `/src/styles/theme.css`
- Responsive text sizing optimized for mobile-first design

### Component Library
- **Standard Components** (`button.tsx`, `card.tsx`, `input.tsx`) - shadcn/ui library
- **Custom Components** (`custom-button.tsx`, `custom-card.tsx`, `custom-input.tsx`) - Onboarding-specific with Motion animations

## 📁 Project Structure

```
/src
  /app
    /components
      /figma           # Figma-generated components
      /ui              # UI component library
    /context           # React Context providers
    /pages             # Main application pages
    App.tsx            # Root component with RouterProvider
    Layout.tsx         # Shared layout with bottom navigation
  /styles
    fonts.css          # Font imports
    index.css          # Global styles entry
    tailwind.css       # Tailwind base imports
    theme.css          # Design tokens and theme variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (preferred) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Setup
This app uses local storage for data persistence in demo mode. For production:
1. Set up Supabase backend (optional)
2. Configure environment variables for API keys
3. Update authentication flow in `FinanceContext.tsx`

## 📱 Pages Overview

### 1. Dashboard (`/`)
- Net wealth visualization with pie charts
- Quick action cards (Add Income, Add Expense, Link Account)
- Account balance tracking
- Subscription overview
- SMART goals progress
- Social spending comparisons

### 2. AI Coach (`/coach`)
- Chat interface with financial AI assistant
- Pre-built prompts for common queries
- Contextual financial advice
- Spending pattern analysis

### 3. Debt Calculator (`/debt`)
- Debt overview pie chart
- BNPL (Buy Now Pay Later) payment tracking
- Debt item management with payment schedules
- Interest calculation tools

### 4. Investment Hub (`/invest`)
- Portfolio performance area chart
- Asset allocation pie chart
- Real asset tracking (Real Estate, Gold, Stocks, Crypto)
- AI market analysis insights

### 5. Learning Hub (`/learn`)
- Gamified financial literacy courses
- XP-based progression system
- Achievement badges
- Category-based learning paths

### 6. Profile (`/profile`)
- User information management
- Security settings (password, biometric)
- Notification preferences
- Experience level display
- Account management

### 7. Onboarding (`/onboarding`)
- Initial user setup flow
- Goal selection
- Income/age input
- Biometric authentication setup

## 🔧 Key Components

### Context Provider (`FinanceContext.tsx`)
Manages global state including:
- User accounts and balances
- Transactions (income/expenses)
- Debts and BNPL payments
- Assets and investments
- Subscriptions
- SMART goals
- XP and leveling system

### Custom UI Components
- `custom-button.tsx` - Animated buttons with Motion
- `custom-card.tsx` - Glassmorphism card variants
- `custom-input.tsx` - Floating label inputs with icons

### Standard UI Components (shadcn/ui)
Located in `/src/app/components/ui/`:
- Dialog, Sheet, Drawer for modals
- Select, Input, Switch for forms
- Accordion, Tabs for content organization
- Avatar, Badge for user elements
- And many more...

## 📊 Data Models

### Account
```typescript
{
  id: string;
  name: string;
  balance: number;
  type: 'Checking' | 'Savings' | 'Credit Card';
}
```

### Transaction
```typescript
{
  id: string;
  amount: number;
  category: CategoryType;
  date: string;
  description: string;
  type: 'income' | 'expense';
  accountId?: string;
}
```

### Debt
```typescript
{
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: string;
  type: 'Credit Card' | 'Personal Loan' | 'Student Loan' | 'BNPL';
}
```

### Asset
```typescript
{
  id: string;
  name: string;
  type: 'Real Estate' | 'Gold' | 'Stocks' | 'Crypto' | 'Others';
  value: number;
  purchasePrice: number;
  dateAcquired: string;
}
```

## 🎮 Gamification System

### Levels
1. **Beginner** (0 XP) - Starting point
2. **Explorer** (100 XP) - Basic understanding
3. **Strategist** (250 XP) - Developing skills
4. **Master** (500 XP) - Advanced knowledge
5. **Legend** (1000 XP) - Elite status

### XP Sources
- Completing learning modules
- Achieving financial goals
- Consistent expense tracking
- Debt reduction milestones

## 🔒 Security Considerations

⚠️ **Important**: This is a demo application with mock data stored in localStorage.

For production deployment:
- Implement proper authentication (OAuth, JWT)
- Use secure backend (Supabase, Firebase)
- Encrypt sensitive financial data
- Implement proper session management
- Add HTTPS/SSL certificates
- Follow GDPR/privacy regulations

## 📝 Development Notes

### Code Style
- TypeScript strict mode enabled
- Functional components with hooks
- Custom hooks for reusable logic
- Tailwind CSS for all styling (no inline styles except for dynamic values)

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions (44px minimum touch targets)
- iOS safe area considerations
- Optimized for 360px - 1920px viewports

### Performance
- Lazy loading for route-based code splitting
- Optimized re-renders with React.memo where needed
- Efficient chart rendering with minHeight constraints

## 🐛 Known Issues & Fixes

### Chart Rendering Errors
All Recharts components now have explicit `minHeight` props to prevent dimension errors on initial render.

### File Naming
- Removed duplicate uppercase UI component files (Button.tsx, Card.tsx, Input.tsx)
- Created separate `custom-*` prefixed components for specialized use cases
- All standard components use lowercase naming convention

## 🚢 Deployment

### Build Optimization
```bash
pnpm build
```

Output will be in `/dist` folder, ready for static hosting on:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

### Environment Variables (Production)
Create `.env.production`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_ENDPOINT=your_api_endpoint
```

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

This project is open for contributions. Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🆘 Support

For issues or questions:
- Check existing GitHub issues
- Review documentation in `/guidelines/Guidelines.md`
- Contact the development team

---

**Version**: 1.2.0  
**Last Updated**: March 2026  
**Built with** ❤️ **for the future of finance**
