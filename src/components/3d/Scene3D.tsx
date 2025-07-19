import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const Scene3D = () => {
  const { github, leetcode } = useSelector((state: RootState) => state.codingStats);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted relative">
      {/* CSS-based 3D visualization */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        
        {/* GitHub Stats Cube */}
        <motion.div
          className="w-24 h-24 bg-primary/20 border border-primary/30 rounded-lg backdrop-blur-sm mr-8"
          style={{
            transform: 'rotateX(15deg) rotateY(-15deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-primary text-sm font-bold mb-1">GitHub</div>
            <div className="text-foreground text-xs">{github.totalCommits}</div>
            <div className="text-muted-foreground text-xs">commits</div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/10 rounded-lg blur-md -z-10"></div>
        </motion.div>

        {/* LeetCode Stats Cube */}
        <motion.div
          className="w-24 h-24 bg-accent/20 border border-accent/30 rounded-lg backdrop-blur-sm ml-8"
          style={{
            transform: 'rotateX(-15deg) rotateY(15deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateY: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-accent text-sm font-bold mb-1">LeetCode</div>
            <div className="text-foreground text-xs">{leetcode.totalSolved}</div>
            <div className="text-muted-foreground text-xs">solved</div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-accent/10 rounded-lg blur-md -z-10"></div>
        </motion.div>

        {/* Interactive Chart Bars */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[
            { value: leetcode.easySolved, color: 'bg-success', label: 'Easy' },
            { value: leetcode.mediumSolved, color: 'bg-warning', label: 'Medium' },
            { value: leetcode.hardSolved, color: 'bg-destructive', label: 'Hard' }
          ].map((item, index) => {
            const maxValue = Math.max(leetcode.easySolved, leetcode.mediumSolved, leetcode.hardSolved) || 1;
            const height = Math.max((item.value / maxValue) * 60, 8);
            
            return (
              <motion.div
                key={index}
                className={`w-4 ${item.color} rounded-t opacity-80 hover:opacity-100 cursor-pointer`}
                style={{ height: `${height}px` }}
                whileHover={{ scale: 1.2 }}
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                title={`${item.label}: ${item.value}`}
              />
            );
          })}
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};