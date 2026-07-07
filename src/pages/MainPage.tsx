import { useState } from "react";
import GamePane from "../components/GamePane";
import VsDivider from "../components/VsDivider";
import type { RunnerData } from "../types/RunnerTypes";

function MainPage() {
  const [leftRevealed, setLeftRevealed] = useState(true);
  const [rightRevealed, setRightRevealed] = useState(false);

  const handleLeftGuess = (direction: "higher" | "lower") => {
    setLeftRevealed(true);
    // Game logic goes here — compare values and update feedback
  };

  const handleRightGuess = (direction: "higher" | "lower") => {
    setRightRevealed(true);
    // Game logic goes here — compare values and update feedback
  };

  const LEFT: RunnerData = {
    name: "edcr",
    ranking: "1234",
    elo: "1500",
    uuid: "edcr",
  };

  const RIGHT: RunnerData = {
    name: "Infume",
    ranking: "4",
    elo: "1500",
    uuid: "Infume",
  };

  return (
    <>
      <GamePane
        side="left"
        data={LEFT}
        showValue={leftRevealed}
        onGuess={handleLeftGuess}
      />

      <VsDivider />

      <GamePane
        side="right"
        data={RIGHT}
        showValue={rightRevealed}
        onGuess={handleRightGuess}
      />
    </>
  );
}

export default MainPage;
