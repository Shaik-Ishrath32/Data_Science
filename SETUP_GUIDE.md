# Data Science Digital Lab Manual - Setup Guide

## 🎉 What's Been Built (Phase 1)

### ✅ Completed Features

1. **Project Foundation**
   - ✅ Vite + React + TypeScript setup
   - ✅ All dependencies installed and configured
   - ✅ Build system verified and working

2. **Design System**
   - ✅ Custom Tailwind CSS configuration
   - ✅ Dark/Light theme support
   - ✅ Design tokens (colors, typography, spacing)
   - ✅ UI Component library (Button, Input, Card, Badge, Loading, Modal, Toast)
   - ✅ Framer Motion animations configured
   - ✅ Accessibility-focused design

3. **Database Architecture**
   - ✅ Complete PostgreSQL schema with 14 tables
   - ✅ Row Level Security (RLS) policies
   - ✅ User roles (student, faculty, admin)
   - ✅ Comprehensive relationships and constraints
   - ✅ Seed data structure

4. **Authentication & Authorization**
   - ✅ Supabase authentication integration
   - ✅ Protected routes
   - ✅ Role-based access control
   - ✅ Session management
   - ✅ Login/Signup flows

5. **Application Shell**
   - ✅ Responsive sidebar navigation
   - ✅ Top navigation with search, theme toggle, notifications
   - ✅ Dashboard layout
   - ✅ Routing configured for all pages

6. **Public Pages**
   - ✅ Premium landing page with hero section
   - ✅ Feature showcase
   - ✅ Login page with validation
   - ✅ Signup page with user registration
   - ✅ 404 error page

7. **Dashboard (Partial)**
   - ✅ Welcome section
   - ✅ Stats cards (experiments, completed, in-progress, cart)
   - ✅ Progress overview with animated bar
   - ✅ Recent experiments grid
   - ✅ Quick actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Step 1: Environment Setup

1. Make sure you have the `.env` file in the root directory
2. Get your Supabase credentials:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project (or use existing)
   - Go to Project Settings → API
   - Copy your Project URL and anon public key

3. Update `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 2: Database Setup

1. Open Supabase dashboard
2. Go to SQL Editor
3. Run the migrations in order:
   - Copy content from `database/migrations/001_initial_schema.sql`
   - Click "Run" to create all tables
   - Copy content from `database/migrations/002_row_level_security.sql`
   - Click "Run" to set up security policies
   - Copy content from `database/seeds/001_initial_data.sql`
   - Click "Run" to insert initial data

### Step 3: Run the Application

```bash
# Install dependencies (already done, but in case)
npm install

# Start development server
npm run dev
```

The application will open at http://localhost:5173

### Step 4: Create Your First User

1. Open the app in your browser
2. Click "Get Started" or "Sign Up"
3. Fill in the registration form
4. Check your email for verification (Supabase will send it)
5. After verification, you can log in

### Step 5: Create Admin User (Optional)

After signing up, you need to manually set your role to admin:

1. Go to Supabase Dashboard → Authentication → Users
2. Copy your user UUID
3. Go to SQL Editor
4. Run this query (replace `your-uuid-here` with actual UUID):

```sql
INSERT INTO users (auth_user_id, full_name, department, role) 
VALUES 
('your-uuid-here', 'Your Name', 'Computer Science and Engineering', 'admin');
```

Now you can access the faculty/admin features.

## 📁 Project Structure

```
Digital_Lab/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components (Sidebar, TopNav)
│   │   ├── dashboard/       # Dashboard-specific widgets
│   │   ├── experiments/     # Experiment components
│   │   ├── cart/            # Lab cart components
│   │   └── search/          # Search components
│   ├── pages/               # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── ... (placeholder pages)
│   ├── lib/                 # Utilities
│   │   ├── supabase.ts      # Supabase client & auth helpers
│   │   └── utils.ts         # Utility functions
│   ├── store/               # State management
│   │   ├── authStore.ts     # Authentication state
│   │   └── themeStore.ts    # Theme state
│   ├── types/               # TypeScript definitions
│   ├── styles/              # Global styles
│   └── App.tsx              # Main app component
├── database/
│   ├── migrations/          # Database migrations
│   └── seeds/               # Seed data
├── public/                  # Static assets
└── ... config files
```

## 🎨 Design System

### Colors

The app uses a sophisticated dark theme with these primary colors:

- **Primary**: #6385FF (Blue accent)
- **Secondary**: #36D6E8 (Cyan accent)
- **Success**: #36C995 (Green)
- **Warning**: #F2B95F (Orange)
- **Error**: #FF7185 (Red)
- **Background**: #080D1B (Dark navy)
- **Surface**: #0E1629 (Elevated dark)

### Typography

- **Font Family**: Inter (sans-serif)
- **Mono Font**: JetBrains Mono

### Animations

All animations use Framer Motion and respect `prefers-reduced-motion`.

## 🔐 Security Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **RLS is enforced** - Database security is enabled at row level
3. **Client-side protection** - Routes are protected with authentication checks
4. **No secrets in code** - All keys are in environment variables

## 📝 What's Next (Phase 2)

The following features need to be implemented:

### Immediate Priority
1. **Experiments Page** - Browse all available experiments with filters
2. **Experiment Detail** - View single experiment with sub-experiments list
3. **Sub-Experiment Workspace** - Full content viewer with code, theory, etc.
4. **Lab Cart** - Add/remove experiments functionality
5. **Progress Tracking** - Mark practicals as complete

### Secondary Priority
6. **Global Search** - Command palette (Ctrl+K)
7. **Bookmarks** - Save favorite experiments
8. **Resources** - YouTube, GitHub, documentation links
9. **Faculty Dashboard** - Content management interface
10. **Lab Manual Reader** - Dedicated reading view

### Content Import
11. **Import Experiments 5 & 6** - You mentioned you have these ready
12. **Content validation** - Ensure all fields are properly structured

### Polish
13. **Animations** - Add throughout the app
14. **Mobile optimization** - Ensure responsive design works perfectly
15. **Accessibility audit** - Test keyboard navigation and screen readers
16. **Testing** - Write and run tests for core features

## 🐛 Troubleshooting

### Build Errors

If you see TypeScript errors:
```bash
npm run build
```

If it succeeds, you're good. TypeScript is strict but the app will work.

### Supabase Connection Issues

1. Check your `.env` file has correct credentials
2. Verify your Supabase project is active
3. Check browser console for specific errors

### Database Errors

1. Ensure migrations ran successfully
2. Check SQL Editor in Supabase for error messages
3. Verify RLS policies are active

### Authentication Issues

1. Check Supabase Email settings (Authentication → Email Templates)
2. For development, you can disable email verification temporarily
3. Ensure users table is properly linked to auth.users

## 📞 Support

For issues or questions:
1. Check the README.md for general information
2. Review database schema in migrations folder
3. Check component documentation in code comments

## 🎓 Educational Context

**Institution**: Mohan Babu University  
**Department**: Computer Science and Engineering (Data Science)  
**Subject**: Data Science (22DS102006)  
**Batch**: 2028

---

**Status**: ✅ Phase 1 Complete - Core infrastructure ready  
**Next**: Implement experiments browsing and detail views
