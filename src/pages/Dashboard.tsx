import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  TrendingUp,
  BookOpen,
  ShoppingCart,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import { calculateCompletionPercentage, formatRelativeTime } from '../lib/utils';
import type { Experiment, DashboardStats } from '../types';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentExperiments, setRecentExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch stats
      const [
        experimentsResult,
        progressResult,
        cartResult,
        bookmarksResult,
      ] = await Promise.all([
        supabase
          .from('experiments')
          .select('id', { count: 'exact' })
          .eq('publication_status', 'published'),
        supabase
          .from('student_progress')
          .select('status', { count: 'exact' })
          .eq('user_id', user.id),
        supabase
          .from('lab_cart_items')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id),
        supabase
          .from('bookmarks')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id),
      ]);

      const totalExperiments = experimentsResult.count || 0;
      const allProgress = progressResult.data || [];
      const completedCount = allProgress.filter((p) => p.status === 'completed').length;

      setStats({
        total_experiments: totalExperiments,
        completed_experiments: 0, // Will calculate from sub-experiments
        in_progress_experiments: 0,
        total_sub_experiments: allProgress.length,
        completed_sub_experiments: completedCount,
        cart_items_count: cartResult.count || 0,
        bookmarks_count: bookmarksResult.count || 0,
        completion_percentage: calculateCompletionPercentage(
          completedCount,
          allProgress.length || 1
        ),
      });

      // Fetch recent experiments
      const { data: experiments } = await supabase
        .from('experiments')
        .select('*')
        .eq('publication_status', 'published')
        .order('created_at', { ascending: false })
        .limit(4);

      if (experiments) {
        setRecentExperiments(experiments);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-dark-400">
              Continue your Data Science journey
            </p>
          </div>
          <div className="hidden md:block">
            <Badge variant="info" className="text-sm px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2 inline" />
              {user?.role === 'student' ? 'Student' : user?.role}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Total Experiments</p>
              <p className="text-3xl font-bold text-dark-50">
                {stats?.total_experiments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary-600/10 flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-primary-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Completed</p>
              <p className="text-3xl font-bold text-dark-50">
                {stats?.completed_sub_experiments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-dark-50">
                {stats?.in_progress_experiments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Lab Cart</p>
              <p className="text-3xl font-bold text-dark-50">
                {stats?.cart_items_count || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary-400/10 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-secondary-400" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark-50">
              Overall Progress
            </h3>
            <Link
              to="/dashboard/progress"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              View Details →
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-dark-300">Completion Rate</span>
                <span className="font-semibold text-dark-50">
                  {stats?.completion_percentage || 0}%
                </span>
              </div>
              <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats?.completion_percentage || 0}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary-600 to-secondary-400 rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {stats?.completed_sub_experiments || 0}
                </p>
                <p className="text-xs text-dark-400 mt-1">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {stats?.in_progress_experiments || 0}
                </p>
                <p className="text-xs text-dark-400 mt-1">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-dark-400">
                  {(stats?.total_sub_experiments || 0) -
                    (stats?.completed_sub_experiments || 0)}
                </p>
                <p className="text-xs text-dark-400 mt-1">Remaining</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Experiments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark-50">
            Recent Experiments
          </h2>
          <Link to="/dashboard/experiments">
            <Button variant="ghost" size="sm" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recentExperiments.length > 0 ? (
            recentExperiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link to={`/dashboard/experiments/${experiment.id}`}>
                  <Card hover className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center text-primary-400 font-semibold">
                          {experiment.experiment_number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-dark-50 mb-1">
                            {experiment.title}
                          </h3>
                          {experiment.difficulty && (
                            <Badge
                              variant={
                                experiment.difficulty === 'beginner'
                                  ? 'success'
                                  : experiment.difficulty === 'intermediate'
                                  ? 'warning'
                                  : 'error'
                              }
                            >
                              {experiment.difficulty}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                      {experiment.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-dark-500">
                      <span>Added {formatRelativeTime(experiment.created_at)}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <Card className="p-8 md:col-span-2 text-center">
              <BookOpen className="h-12 w-12 text-dark-600 mx-auto mb-3" />
              <p className="text-dark-400">No experiments available yet</p>
            </Card>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Link to="/dashboard/experiments">
          <Card hover className="p-6 text-center">
            <FlaskConical className="h-8 w-8 text-primary-400 mx-auto mb-3" />
            <h3 className="font-semibold text-dark-50 mb-1">
              Browse Experiments
            </h3>
            <p className="text-sm text-dark-400">
              Explore all available practicals
            </p>
          </Card>
        </Link>

        <Link to="/dashboard/cart">
          <Card hover className="p-6 text-center">
            <ShoppingCart className="h-8 w-8 text-secondary-400 mx-auto mb-3" />
            <h3 className="font-semibold text-dark-50 mb-1">My Lab Cart</h3>
            <p className="text-sm text-dark-400">
              View selected experiments
            </p>
          </Card>
        </Link>

        <Link to="/dashboard/progress">
          <Card hover className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-dark-50 mb-1">Track Progress</h3>
            <p className="text-sm text-dark-400">
              Monitor your achievements
            </p>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}
