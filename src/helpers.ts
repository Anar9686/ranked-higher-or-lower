import { getRunnerAvatar, getRunnerDetails } from "./api/api";
import { backgrounds } from "./assets/backgrounds/index";
import type { RunnerDetails } from "./types";

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

export async function getPaneDetails(uuid: string) {
  const details = await getRunnerDetails(uuid);
  const avatar = await getRunnerAvatar(uuid);
  const background = backgrounds[uuid.charCodeAt(0) % backgrounds.length];
  return { details, avatar, background };
}