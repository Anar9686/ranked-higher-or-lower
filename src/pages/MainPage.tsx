import { useEffect, useRef, useState } from "react";
import GamePane from "../components/GamePane";
import VsDivider from "../components/VsDivider";
import { animate, motion, useMotionValue } from "motion/react";
import { getLeaderboard, getRunnerDetails } from "../api/api";
import type { PaneDetails, RunnerData } from "../types";
import { getPaneAssets } from "../helpers";
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
  const detailCache = useRef<Map<string, PaneDetails>>(new Map());
  const pendingCache = useRef<Map<string, Promise<PaneDetails>>>(new Map());

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

  // Caching next 2 pane details (only viable for small games)
  useEffect(() => {
    if (!list.length) return;

    const indices = [
      ...new Set(
        [step, step + 1, step + 2, step + 3].map((i) => i % list.length),
      ),
    ];

    setPaneDetails((current) =>
      indices.slice(0, 3).map((index, offset) => {
        const uuid = list[index].uuid;
        return detailCache.current.get(uuid) ?? current[offset] ?? null;
      }),
    );

    let cancelled = false;

    indices.forEach((index) => {
      const uuid = list[index].uuid;
      if (detailCache.current.has(uuid) || pendingCache.current.has(uuid))
        return;

      const { avatar, background } = getPaneAssets(uuid);
      // Preload the background image and keep it loaded until the pane is ready
      const preload = new Image();
      preload.src = background;
      preload.onload = preload.onerror = () => {};

      const promise: Promise<PaneDetails> = getRunnerDetails(uuid)
        .then((details) => {
          const paneDetails: PaneDetails = { avatar, background, details };
          detailCache.current.set(uuid, paneDetails);
          return paneDetails;
        })
        .catch((err) => {
          console.error(`Failed to load details for ${uuid}`, err);
          throw err;
        })
        .finally(() => {
          pendingCache.current.delete(uuid);
        });

      pendingCache.current.set(uuid, promise);
    });

    const visibleIndices = indices.slice(0, 3);

    const visiblePromises = visibleIndices
      .map((i) => pendingCache.current.get(list[i].uuid))
      .filter((p): p is Promise<PaneDetails> => p !== undefined);

    Promise.allSettled(visiblePromises).then(() => {
      if (cancelled) return;
      setPaneDetails((current) =>
        visibleIndices.map((index, offset) => {
          const uuid = list[index].uuid;
          return detailCache.current.get(uuid) ?? current[offset] ?? null;
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
