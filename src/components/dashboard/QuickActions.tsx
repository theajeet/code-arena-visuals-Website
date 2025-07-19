import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { 
  ExternalLink, 
  Download, 
  Share2, 
  Zap,
  BarChart3,
  Target
} from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'View GitHub Profile',
      description: 'Open your GitHub profile in a new tab',
      icon: <ExternalLink className="w-5 h-5" />,
      action: () => window.open('https://github.com', '_blank'),
      variant: 'default' as const,
    },
    {
      title: 'Practice LeetCode',
      description: 'Continue solving coding challenges',
      icon: <Target className="w-5 h-5" />,
      action: () => window.open('https://leetcode.com', '_blank'),
      variant: 'secondary' as const,
    },
    {
      title: 'Export Stats',
      description: 'Download your stats as JSON/CSV',
      icon: <Download className="w-5 h-5" />,
      action: () => console.log('Exporting stats...'),
      variant: 'outline' as const,
    },
    {
      title: 'Share Dashboard',
      description: 'Share your achievements with others',
      icon: <Share2 className="w-5 h-5" />,
      action: () => console.log('Sharing dashboard...'),
      variant: 'outline' as const,
    },
    {
      title: 'Analytics',
      description: 'Deep dive into your coding patterns',
      icon: <BarChart3 className="w-5 h-5" />,
      action: () => console.log('Opening analytics...'),
      variant: 'secondary' as const,
    },
    {
      title: 'Quick Sync',
      description: 'Force refresh all data sources',
      icon: <Zap className="w-5 h-5" />,
      action: () => console.log('Quick syncing...'),
      variant: 'default' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card-glow p-6 rounded-lg cursor-pointer group"
            onClick={action.action}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {action.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant={action.variant} 
                size="sm" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  action.action();
                }}
              >
                Execute
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};