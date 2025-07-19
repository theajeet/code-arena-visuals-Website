import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  glowColor?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  className,
  glowColor = 'primary'
}: StatCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: glowColor === 'primary' ? 'var(--glow-primary)' : 'var(--glow-accent)'
      }}
      className={cn(
        "card-glow p-6 rounded-lg transition-all duration-300 cursor-pointer",
        "hover:border-primary/50 group relative overflow-hidden",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          {icon && (
            <div className="text-primary group-hover:text-primary transition-colors">
              {icon}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground font-mono">
            {value}
          </div>
          
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
          
          {trend && trendValue && (
            <div className={cn("flex items-center text-sm", getTrendColor())}>
              <span className="mr-1">
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
              </span>
              {trendValue}
            </div>
          )}
        </div>
        
        {/* Animated data bar */}
        <div className="mt-4 data-bar opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};