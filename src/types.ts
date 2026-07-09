interface RunnerData {
  nickname: string;
  uuid: string;
  eloRank: number;
}

interface RunnerDetails {
  nickname: string;
  uuid: string;
  eloRate: number;
  eloRank: number;
  statistics: {
    total: {
      bestTime: {
        ranked: number;
      };
      playtime: {
        ranked: number;
      };
    };
  };
}

interface Leaderboard {
  users: RunnerData[];
}

interface PaneDetails {
  details: RunnerDetails | null;
  avatar: string;
  background?: string;
}

export type { RunnerData, RunnerDetails, Leaderboard, PaneDetails };
