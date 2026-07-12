import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import GuessLower from "./GuessLower";
import GuessHigher from "./GuessHigher";
import type { PaneDetails } from "../types";
import { runnerPB, runnerPlaytime } from "../helpers";

import benguSkin from "../assets/bengu_skin.webp";
import { CONSTANTS } from "../constants";

function GamePane({
  paneDetails,
  showValue,
  onGuess,
}: {
  paneDetails: PaneDetails | null;
  showValue: boolean;
  onGuess?: (
    direction: typeof CONSTANTS.HIGHER | typeof CONSTANTS.LOWER,
  ) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canInteract = onGuess && !showValue;
  const activeHover = hovered && canInteract;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkInitialHover = (e: MouseEvent) => {
      if (container.contains(e.target as Node)) {
        setHovered(true);
      }
    };

    document.addEventListener("mousemove", checkInitialHover);
    return () => document.removeEventListener("mousemove", checkInitialHover);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => canInteract && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={paneDetails?.background}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: activeHover ? 1.06 : 1 }}
        transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
        alt=""
      />

      <motion.img
        src={paneDetails?.avatar ?? benguSkin}
        alt=""
        className="absolute left-1/2 top-1/2 w-1/2 h-4/5 -translate-x-1/2 -translate-y-1/2 object-contain"
        animate={{ scale: activeHover ? 1.3 : 1 }}
        transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
      />

      <div className="absolute inset-0 bg-black/30" />

      <AnimatePresence>
        {activeHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 backdrop-blur-md bg-black/50"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-8 text-center gap-3">
        <div className="h-3" />
        <motion.span
          className="text-white/85 text-[14px] uppercase tracking-[0.22em] font-medium"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
          animate={{ opacity: activeHover ? 0.3 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          Personal Best:{" "}
          <span className="font-bold text-white text-[16px]">
            {paneDetails?.details ? runnerPB(paneDetails.details) : ""}
          </span>
          <br />
          Total Playtime:{" "}
          <span className="font-bold text-white text-[16px]">
            {paneDetails?.details ? runnerPlaytime(paneDetails.details) : ""}
          </span>
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center gap-3">
        <motion.h2
          className="font-black text-white leading-tight drop-shadow-xl"
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
          animate={{ y: activeHover ? -8 : 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
        >
          {paneDetails?.details
            ? paneDetails.details["nickname"]
            : "Loading..."}
        </motion.h2>

        <AnimatePresence mode="wait">
          {showValue ? (
            <motion.div
              key="value"
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="font-black text-[#facc15] drop-shadow-lg"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              #{paneDetails?.details ? paneDetails.details["eloRank"] : ""}
              <br />
              <span className="text-white">
                {paneDetails?.details ? paneDetails.details["eloRate"] : ""}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              animate={{ y: activeHover ? -8 : 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
              className="font-black text-white/20 drop-shadow-lg"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeHover && canInteract && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex gap-3 mt-2"
            >
              <GuessHigher onClick={() => onGuess?.(CONSTANTS.HIGHER)} />
              <GuessLower onClick={() => onGuess?.(CONSTANTS.LOWER)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GamePane;
