import { useEffect, useRef, useState } from "react";
import GamePane from "../components/GamePane";
import VsDivider from "../components/VsDivider";
import { animate, motion, useMotionValue } from "motion/react";
import { getLeaderboard } from "../api/api";
import type { PaneDetails, RunnerData } from "../types";
import { getPaneDetails } from "../helpers";
import { CONSTANTS } from "../constants";

function MainPage({
  onGameOver,
}: {
  onGameOver: (finalScore: number) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(0);
  const [gameList, setGameList] = useState<RunnerData[] | null>(null);
  const [paneDetails, setPaneDetails] = useState<(PaneDetails | null)[]>([
    null,
    null,
    null,
  ]);

  const trackX = useMotionValue(0);
  const detailCache = useRef<Record<string, PaneDetails>>({});

  useEffect(() => {
    getLeaderboard().then((data) => {
      const first100 = data.users.slice(0, 100);
      // Biased shuffle to make the top of the top runners are more likely to appear first, but still randomize the order a bit
      function biasedShuffle<RunnerData>(array: RunnerData[]) {
        return [...array]
          .map((item, index) => ({
            item,
            score: index + Math.random() * 35,
          }))
          .sort((a, b) => a.score - b.score)
          .map(({ item }) => item);
      }
      const shuffled = biasedShuffle(first100);
      setGameList(shuffled);
    });
  }, []);

  const list = gameList ?? [];

  useEffect(() => {
    if (!list.length) return;

    // Loop around if you reach the end
    const indices = [step, step + 1, step + 2, step + 3].map(
      (index) => index % list.length,
    );

    setPaneDetails((current) =>
      indices.slice(0, 3).map((index, offset) => {
        const uuid = list[index]["uuid"];
        return detailCache.current[uuid] ?? current[offset] ?? null;
      }),
    );

    const missingIndices = indices.filter((index) => {
      const uuid = list[index]["uuid"];
      return !detailCache.current[uuid];
    });

    if (!missingIndices.length) return;

    let cancelled = false;

    Promise.all(
      missingIndices.map((index) => {
        const uuid = list[index]["uuid"];
        return getPaneDetails(uuid).then((paneDetails) => {
          detailCache.current[uuid] = paneDetails;
          return { index, paneDetails };
        });
      }),
    ).then(() => {
      if (cancelled) return;

      setPaneDetails((current) =>
        [step, step + 1, step + 2].map((index, offset) => {
          const uuid = list[index % list.length]["uuid"];
          return detailCache.current[uuid] ?? current[offset] ?? null;
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [list, step]);

  const left = paneDetails[0];
  const right = paneDetails[1];
  const incoming = paneDetails[2];

  const handleGuess = (
    _direction: typeof CONSTANTS.HIGHER | typeof CONSTANTS.LOWER,
  ) => {
    if (revealed) return;
    setRevealed(true);

    if (left && right) {
      const leftRank = left.details?.eloRank ?? 0;
      const rightRank = right.details?.eloRank ?? 0;

      const correct =
        (leftRank <= rightRank && _direction === CONSTANTS.LOWER) ||
        (leftRank >= rightRank && _direction === CONSTANTS.HIGHER);
      // Pause so the user can read the revealed value
      if (correct) {
        setTimeout(() => {
          animate(trackX, -(window.innerWidth / 2), {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          }).then(() => {
            trackX.set(0);
            setStep((s) => s + 1);
            setRevealed(false);
          });
        }, 1300);
      } else {
        playedList = list.slice(0, step + 2);
        onGameOver(step);
      }
    }
  };

  return (
    <>
      {list[0] && (
        <motion.div
          className="flex h-full absolute inset-y-0 left-0"
          style={{ width: "150vw", x: trackX }}
        >
          <div className="h-full shrink-0" style={{ width: "50vw" }}>
            <GamePane paneDetails={left} showValue={true} />
          </div>

          <div className="h-full shrink-0" style={{ width: "50vw" }}>
            <GamePane
              paneDetails={right}
              showValue={revealed}
              onGuess={handleGuess}
            />
          </div>

          <div className="h-full shrink-0" style={{ width: "50vw" }}>
            <GamePane paneDetails={incoming} showValue={false} />
          </div>
        </motion.div>
      )}

      <VsDivider score={step} />
    </>
  );
}

export default MainPage;

export let playedList: RunnerData[] = [];

export function emptyPlayedList() {
  playedList = [];
}
