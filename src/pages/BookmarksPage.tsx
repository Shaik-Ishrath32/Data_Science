import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

export default function BookmarksPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold text-dark-50 mb-4">BookmarksPage</h1>
        <p className="text-dark-400">This page is under construction.</p>
      </Card>
    </motion.div>
  );
}
