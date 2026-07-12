import { getRunnerAvatar } from "./api/api";
import { backgrounds } from "./assets/backgrounds/index";
import type { RunnerDetails } from "./types";
import { playedList } from "./pages/MainPage";

export function runnerPB(details: RunnerDetails): string | undefined {
  return (
    Math.floor(
      details["statistics"]["total"]["bestTime"]["ranked"] / 60000,
    ).toString() +
    ":" +
    Math.floor(
      (details["statistics"]["total"]["bestTime"]["ranked"] / 1000) % 60,
    )
      .toString()
      .padStart(2, "0")
  );
}

export function runnerPlaytime(details: RunnerDetails): string | undefined {
  return Math.floor(
    details["statistics"]["total"]["playtime"]["ranked"] / 3600000,
  )
    .toString()
    .concat("h");
}

export function getPaneAssets(uuid: string) {
  return {
    avatar: getRunnerAvatar(uuid),
    background: backgrounds[uuid.charCodeAt(0) % backgrounds.length],
  };
}

export function generateShareString(score: number, full: boolean) {
  let shareString = `🏆 I scored ${score} on Higher or Lower | MCSR Ranked! 🎮\n`;
  if (full) {
    playedList.forEach((runner, index) => {
      if (index == 0) shareString += "👉 ";
      if (index == score + 1) shareString += "💀 ";
      shareString += `#${runner.eloRank} ${runner.nickname}\n`;
    });
  } else {
    shareString += `💀 #${playedList[score].eloRank} ${playedList[score].nickname} #${playedList[score + 1].eloRank} ${playedList[score + 1].nickname}\n`;
  }
  shareString += `Play on: ${window.location.href}`;
  return shareString;
}
