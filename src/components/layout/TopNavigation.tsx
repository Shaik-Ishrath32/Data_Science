import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Moon, Sun, LogOut } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface TopNavigationProps {
  onMenuClick: () => void;
}

export default function TopNavigation({ onMenuClick }: TopNavigationProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = () => {
    // Will open command palette (Ctrl+K)
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-lg border-b border-dark-700">
      <div className="flex items-center justify-between h-20 px-4 lg:px-6">
        {/* Left Section - MBU Logo and Course Info */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-800 text-dark-300 hover:text-dark-50 transition-colors focus-visible"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* MBU Logo and Info */}
          <div className="flex items-center gap-4">
            {/* MBU Logo */}
            <img 
              src="/assets/mbu-logo.svg" 
              alt="Mohan Babu University" 
              className="h-14 w-auto hidden sm:block"
            />
            
            {/* University and Course Info */}
            <div className="hidden md:block border-l border-dark-700 pl-4">
              <h2 className="text-base font-bold text-dark-50 leading-tight">
                {import.meta.env.VITE_INSTITUTION_NAME || 'Mohan Babu University'}
              </h2>
              <p className="text-xs text-dark-400 leading-tight">
                {import.meta.env.VITE_SCHOOL_NAME || 'School of Computing'}
              </p>
              <p className="text-xs text-primary-400 font-semibold leading-tight mt-0.5">
                {import.meta.env.VITE_DEPARTMENT || 'Data Science'} • {import.meta.env.VITE_SUBJECT_CODE || '22DS102006'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            className="gap-2"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline text-xs text-dark-400">Ctrl+K</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-dark-800 text-dark-300 hover:text-dark-50 transition-colors focus-visible"
            aria-label="Notifications"
            onClick={() => navigate('/dashboard/notifications')}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-800 transition-colors focus-visible"
              aria-label="Profile menu"
              aria-expanded={showProfileMenu}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-secondary-400 flex items-center justify-center text-white font-semibold text-sm">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-dark-800 border border-dark-700 rounded-lg shadow-elevation-3 z-20">
                  <div className="p-4 border-b border-dark-700">
                    <p className="text-sm font-medium text-dark-50">
                      {user?.full_name}
                    </p>
                    {user?.roll_number && (
                      <p className="text-xs text-dark-400 mt-0.5">
                        Roll No: {user.roll_number}
                      </p>
                    )}
                    {user?.section && (
                      <p className="text-xs text-dark-400">
                        Section: {user.section}
                      </p>
                    )}
                    <p className="text-xs text-dark-400">
                      {user?.department}
                    </p>
                    <Badge variant="info" className="mt-2 capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate('/dashboard/profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-dark-300 hover:bg-dark-700 hover:text-dark-50 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/dashboard/settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-dark-300 hover:bg-dark-700 hover:text-dark-50 rounded-lg transition-colors"
                    >
                      Settings
                    </button>
                    <hr className="my-2 border-dark-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-error hover:bg-dark-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
