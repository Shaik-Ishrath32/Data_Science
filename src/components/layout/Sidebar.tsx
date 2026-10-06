import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FlaskConical,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  Bookmark,
  Library,
  Bell,
  User,
  Settings,
  Users,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuthStore();
  const isFacultyOrAdmin = user?.role === 'faculty' || user?.role === 'admin';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Course Overview', href: '/dashboard/course', icon: BookOpen },
    { name: 'Experiments', href: '/dashboard/experiments', icon: FlaskConical },
    { name: 'Lab Manual', href: '/dashboard/lab-manual', icon: BookOpen },
    { name: 'Resources', href: '/dashboard/resources', icon: Library },
    { name: 'My Lab Cart', href: '/dashboard/cart', icon: ShoppingCart },
    { name: 'My Progress', href: '/dashboard/progress', icon: TrendingUp },
    { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark },
  ];

  const userNavigation = [
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const facultyNavigation = [
    { name: 'Faculty Dashboard', href: '/dashboard/faculty', icon: Users },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-dark-900 border-r border-dark-700',
          'lg:static lg:translate-x-0',
          'flex flex-col custom-scrollbar overflow-y-auto'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-400 flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-dark-50">Lab Manual</h1>
              <p className="text-xs text-dark-400">Data Science</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                      : 'text-dark-300 hover:bg-dark-800 hover:text-dark-50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn('h-5 w-5', isActive && 'animate-pulse')} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-dark-800" />

          {/* User Navigation */}
          <div className="space-y-1">
            {userNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    'focus-visible',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:bg-dark-800 hover:text-dark-50'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Faculty Navigation */}
          {isFacultyOrAdmin && (
            <>
              <div className="my-4 border-t border-dark-800" />
              <div className="space-y-1">
                {facultyNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        'focus-visible',
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'text-dark-300 hover:bg-dark-800 hover:text-dark-50'
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-dark-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-400 flex items-center justify-center text-white font-semibold">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-50 truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-dark-400 truncate capitalize">
                {user?.role || 'Student'}
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
