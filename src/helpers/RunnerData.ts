import type { RunnerDetails } from "../types/RunnerTypes";

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
