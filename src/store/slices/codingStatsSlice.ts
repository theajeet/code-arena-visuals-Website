import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributionStreak: number;
  repositories: number;
  followers: number;
  following: number;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  submissionCalendar: Record<string, number>;
}

export interface CodingStatsState {
  github: GitHubStats;
  leetcode: LeetCodeStats;
  isLoading: boolean;
  lastUpdated: string | null;
}

const initialState: CodingStatsState = {
  github: {
    totalCommits: 1247,
    totalPRs: 89,
    totalIssues: 34,
    contributionStreak: 42,
    repositories: 67,
    followers: 234,
    following: 189,
  },
  leetcode: {
    totalSolved: 342,
    easySolved: 156,
    mediumSolved: 142,
    hardSolved: 44,
    ranking: 12543,
    acceptanceRate: 87.3,
    submissionCalendar: {
      '2024-01-15': 3,
      '2024-01-16': 5,
      '2024-01-17': 2,
      '2024-01-18': 7,
      '2024-01-19': 4,
    },
  },
  isLoading: false,
  lastUpdated: new Date().toISOString(),
};

export const codingStatsSlice = createSlice({
  name: 'codingStats',
  initialState,
  reducers: {
    setGitHubStats: (state, action: PayloadAction<GitHubStats>) => {
      state.github = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setLeetCodeStats: (state, action: PayloadAction<LeetCodeStats>) => {
      state.leetcode = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGitHubStats, setLeetCodeStats, setLoading } = codingStatsSlice.actions;
export default codingStatsSlice.reducer;