import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  BookOpen,
  TrendingUp,
  Code2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function LandingPage() {
  const features = [
    {
      icon: FlaskConical,
      title: 'Interactive Experiments',
      description: 'Explore Data Science practicals with structured, step-by-step guidance.',
    },
    {
      icon: Code2,
      title: 'Code Examples',
      description: 'Syntax-highlighted Python code with copy functionality and explanations.',
    },
    {
      icon: BookOpen,
      title: 'Digital Manual',
      description: 'Complete lab manual with searchable content and progress tracking.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your completion status and monitor your learning journey.',
    },
  ];

  const benefits = [
    'Structured learning path with nested sub-experiments',
    'Comprehensive theory and practical procedures',
    'Expected outputs and detailed explanations',
    'Viva questions with answers for exam preparation',
    'Resource links: YouTube, GitHub, documentation',
    'Personal bookmarks and notes',
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-400 flex items-center justify-center">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">Lab Manual</h1>
                <p className="text-xs text-dark-400">Data Science</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-secondary-400/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-400 text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Mohan Babu University</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-dark-50 mb-6">
              Your Data Science Lab.
              <br />
              <span className="gradient-text">Reimagined.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-8">
              Explore experiments, understand the code, visualize the output, and track every practical you complete.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { label: 'Experiments', value: '6+' },
              { label: 'Sub-Experiments', value: '35+' },
              { label: 'Code Examples', value: '40+' },
              { label: 'Resources', value: '100+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              A comprehensive platform designed for modern Data Science education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-600/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-dark-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-6">
                Learn at Your Own Pace
              </h2>
              <p className="text-lg text-dark-300 mb-8">
                Access all laboratory practicals with detailed explanations, code examples, and resources in one organized platform.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-dark-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-success" />
                  </div>
                  <h3 className="font-semibold text-dark-50">Fast & Efficient</h3>
                </div>
                <p className="text-sm text-dark-400">
                  Quickly find experiments, copy code, and access resources without friction.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-dark-50">Secure & Private</h3>
                </div>
                <p className="text-sm text-dark-400">
                  Your progress, notes, and bookmarks are private and securely stored.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600/20 to-secondary-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
              Ready to Transform Your Lab Experience?
            </h2>
            <p className="text-lg text-dark-300 mb-8">
              Join students already using the Digital Lab Manual to excel in Data Science.
            </p>
            <Link to="/signup">
              <Button variant="primary" size="lg" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-dark-400">
            <p>
              © 2024 Mohan Babu University. Department of Computer Science and Engineering (Data Science).
            </p>
            <p className="mt-2">Subject Code: 22DS102006 | Batch: 2028</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
