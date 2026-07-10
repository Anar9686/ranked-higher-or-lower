import type { Leaderboard, RunnerDetails } from "../types";

// export async function getRunnerAvatarFancy(uuid: string) {
//   const types = [
//     "default",
//     "walking",
//     "crossed",
//     "ultimate",
//     "lunging",
//     "mojavatar",
//   ];
//   const response = await fetch(
//     `https://starlightskins.lunareclipse.studio/render/${types[Math.floor(Math.random() * types.length)]}/${uuid}/full`,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch runner model");
//   }

//   const blob = await response.blob();
//   const url = URL.createObjectURL(blob);
//   return url;
// }

// export async function getRunnerAvatar(uuid: string) {
//   const response = await fetch(
//     `https://render.crafty.gg/3d/full/${uuid}?height=960&width=540`,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch runner model");
//   }

//   const blob = await response.blob();
//   const url = URL.createObjectURL(blob);
//   return url;
// }

export function getRunnerAvatar(uuid: string) {
  return `https://render.crafty.gg/3d/full/${uuid}?height=960&width=540`;
}

export async function getLeaderboard() {
  const response = await fetch(`https://api.mcsrranked.com/leaderboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  const json = await response.json();
  const data: Leaderboard = json["data"];
  return data;
}

export async function getRunnerDetails(uuid: string) {
  const response = await fetch(`https://api.mcsrranked.com/users/${uuid}`);

  if (!response.ok) {
    throw new Error("Failed to fetch runner details");
  }
  const json = await response.json();
  const details: RunnerDetails = json["data"];
  return details;
}
