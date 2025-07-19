import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { StatCard } from '../ui/StatCard';
import { 
  GitBranch, 
  GitPullRequest, 
  Users, 
  Target,
  Trophy,
  TrendingUp,
  Code,
  Star
} from 'lucide-react';

export const StatsGrid = () => {
  const { github, leetcode } = useSelector((state: RootState) => state.codingStats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* GitHub Stats */}
      <StatCard
        title="Total Commits"
        value={github.totalCommits.toLocaleString()}
        subtitle="This year"
        icon={<GitBranch className="w-5 h-5" />}
        trend="up"
        trendValue="+12% from last month"
        glowColor="primary"
      />
      
      <StatCard
        title="Pull Requests"
        value={github.totalPRs}
        subtitle="Merged successfully"
        icon={<GitPullRequest className="w-5 h-5" />}
        trend="up"
        trendValue="+5 this week"
        glowColor="accent"
      />
      
      <StatCard
        title="Repositories"
        value={github.repositories}
        subtitle="Public & Private"
        icon={<Code className="w-5 h-5" />}
        trend="neutral"
        trendValue="3 active"
      />
      
      <StatCard
        title="Followers"
        value={github.followers}
        subtitle="GitHub community"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+15 this month"
      />
      
      {/* LeetCode Stats */}
      <StatCard
        title="Problems Solved"
        value={leetcode.totalSolved}
        subtitle="Total across all difficulties"
        icon={<Target className="w-5 h-5" />}
        trend="up"
        trendValue="+8 this week"
        glowColor="primary"
      />
      
      <StatCard
        title="Global Ranking"
        value={`#${leetcode.ranking.toLocaleString()}`}
        subtitle="Among all users"
        icon={<Trophy className="w-5 h-5" />}
        trend="up"
        trendValue="↑156 positions"
      />
      
      <StatCard
        title="Acceptance Rate"
        value={`${leetcode.acceptanceRate}%`}
        subtitle="Solutions accepted"
        icon={<TrendingUp className="w-5 h-5" />}
        trend="up"
        trendValue="+2.3% improvement"
      />
      
      <StatCard
        title="Current Streak"
        value={`${github.contributionStreak} days`}
        subtitle="Daily contributions"
        icon={<Star className="w-5 h-5" />}
        trend="up"
        trendValue="Personal best!"
      />
    </div>
  );
};