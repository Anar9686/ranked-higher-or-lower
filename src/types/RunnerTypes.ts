interface RunnerData {
  name: string;
  ranking: string;
  elo: string;
  uuid: string;
}

interface RunnerDetails {
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

export type { RunnerData, RunnerDetails };