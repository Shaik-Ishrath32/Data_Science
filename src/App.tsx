import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import ToastProvider from './components/ui/Toast';
import Loading from './components/ui/Loading';

// Lazy load pages
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CourseOverviewPage = lazy(() => import('./pages/CourseOverviewPage'));
const ExperimentsPage = lazy(() => import('./pages/ExperimentsPage'));
const ExperimentDetailPage = lazy(() => import('./pages/ExperimentDetailPage'));
const SubExperimentPage = lazy(() => import('./pages/SubExperimentPage'));
const LabCartPage = lazy(() => import('./pages/LabCartPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LabManualPage = lazy(() => import('./pages/LabManualPage'));
const FacultyDashboard = lazy(() => import('./pages/FacultyDashboard'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { initialize, initialized } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Apply theme class
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  }, [theme]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <Loading size="lg" text="Initializing..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastProvider />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loading size="lg" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="course" element={<CourseOverviewPage />} />
            <Route path="experiments" element={<ExperimentsPage />} />
            <Route path="experiments/:experimentId" element={<ExperimentDetailPage />} />
            <Route
              path="experiments/:experimentId/sub-experiments/:subExpId"
              element={<SubExperimentPage />}
            />
            <Route path="cart" element={<LabCartPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="lab-manual" element={<LabManualPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Faculty/Admin Routes */}
            <Route
              path="faculty"
              element={
                <ProtectedRoute requiredRole="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
