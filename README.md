# Data Science Digital Lab Manual

A premium, production-ready educational web application for Mohan Babu University's Data Science laboratory practicals.

## Features

- 🎓 **Comprehensive Lab Management**: Structured experiments with nested sub-experiments
- 🔐 **Role-Based Access**: Student, Faculty, and Admin roles with appropriate permissions
- 🎨 **Premium Design**: Dark/Light themes with refined UI/UX
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- 🔍 **Advanced Search**: Global search with command palette (Ctrl+K)
- 📊 **Progress Tracking**: Complete lab progress analytics
- 🛒 **Lab Cart**: Select and organize experiments
- 🔖 **Bookmarks & Notes**: Personal learning management
- 💻 **Code Viewer**: Syntax-highlighted code with copy functionality
- 📚 **Digital Manual**: Interactive lab manual reader
- ♿ **Accessible**: WCAG 2.2 AA compliant design
- 🔔 **Notifications**: In-app notification system
- 🎭 **Animations**: Polished Framer Motion interactions

## Technology Stack

### Frontend
- React 18+ with TypeScript
- Vite for blazing-fast development
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- React Router for navigation
- Zustand for state management
- React Syntax Highlighter for code display

### Backend & Database
- Supabase (PostgreSQL + Authentication)
- Row Level Security (RLS) policies
- Real-time subscriptions

## Project Structure

```
Digital_Lab/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives
│   │   ├── layout/          # Layout components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── experiments/     # Experiment components
│   │   ├── cart/            # Lab cart components
│   │   └── search/          # Search components
│   ├── pages/               # Page components
│   ├── lib/                 # Utilities and configurations
│   ├── hooks/               # Custom React hooks
│   ├── store/               # State management
│   ├── types/               # TypeScript definitions
│   └── styles/              # Global styles
├── database/
│   ├── migrations/          # Database schema migrations
│   └── seeds/               # Seed data
└── public/                  # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### 1. Clone and Install

```bash
cd Digital_Lab
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** → **API**
3. Copy your **Project URL** and **anon public key**

### 3. Database Setup

1. In Supabase dashboard, go to **SQL Editor**
2. Run the migrations in order:
   - `database/migrations/001_initial_schema.sql`
   - `database/migrations/002_row_level_security.sql`
   - `database/seeds/001_initial_data.sql`

### 4. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Create Admin User

1. Sign up through the application (once running)
2. In Supabase, go to **Authentication** → **Users**
3. Copy the user's UUID
4. In SQL Editor, create admin profile:

```sql
INSERT INTO users (auth_user_id, full_name, department, role) 
VALUES 
('user-uuid-here', 'Admin Name', 'Computer Science', 'admin');
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## User Roles

### Student
- Browse published experiments
- Track progress and completion
- Manage lab cart and bookmarks
- Take personal notes
- View resources and code

### Faculty
- Create and edit experiments
- Manage sub-experiments
- Add resources and datasets
- Preview and publish content
- Add viva questions

### Admin
- All faculty permissions
- Manage users and roles
- Configure subjects
- System-wide settings

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

### Adding New Experiments

Faculty can add experiments through the admin dashboard, or you can import structured data via the database.

## Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder contains the production build.

### Deploy to Vercel/Netlify

1. Connect your Git repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### Deploy to Custom Server

1. Build the application
2. Serve the `dist` folder with any static server
3. Ensure environment variables are set

## Content Import

To import experiment content from lab documents, use the provided import structure in the admin panel or directly insert into the database following the schema.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Keyboard navigation throughout
- Screen reader compatible
- ARIA labels and landmarks
- Focus management
- Color contrast compliance
- Reduced motion support

## Security

- Row Level Security (RLS) enforced
- Role-based access control
- Input validation
- XSS protection
- Secure authentication
- No secrets in client code

## Performance

- Code splitting
- Lazy loading
- Optimized images
- Efficient database queries
- Caching strategies
- Fast page loads

## License

Proprietary - Mohan Babu University

## Support

For issues or questions, contact the development team or raise an issue in the repository.

## Acknowledgments

- Mohan Babu University
- Computer Science and Engineering (Data Science) Department
- Subject Code: 22DS102006
- Batch: 2028

---

Built with ❤️ for education
