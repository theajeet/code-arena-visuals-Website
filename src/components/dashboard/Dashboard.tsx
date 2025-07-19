import { motion } from 'framer-motion';
import { Scene3D } from '../3d/Scene3D';
import { StatsGrid } from './StatsGrid';
import { Header } from './Header';
import { QuickActions } from './QuickActions';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 py-8 space-y-8">
          {/* Hero Section with 3D Scene */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gradient mb-4">
                CodeArena Dashboard
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your ultimate 3D coding stats visualization. Track your GitHub contributions 
                and LeetCode progress in real-time.
              </p>
            </div>
            
            <div className="neon-glow rounded-lg">
              <Scene3D />
            </div>
          </motion.section>

          {/* Stats Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Performance Metrics
            </h2>
            <StatsGrid />
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <QuickActions />
          </motion.section>
        </main>
      </div>
    </div>
  );
};