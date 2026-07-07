import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import GuessLower from "./GuessLower";
import GuessHigher from "./GuessHigher";
import type { RunnerData, RunnerDetails } from "../types/RunnerTypes";
import { runnerPB, runnerPlaytime } from "../helpers/RunnerData";
import { getRunnerAvatar, getRunnerDetails } from "../api/api";

import defaultAvatar from "../assets/bengu_skin.webp";

const backgrounds = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=1200&fit=crop&auto=format",
];

function GamePane({
  side,
  data,
  showValue,
  onGuess,
}: {
  side: "left" | "right";
  data: RunnerData;
  showValue: boolean;
  onGuess?: (direction: "higher" | "lower") => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [details, setDetails] = useState<RunnerDetails | null>(null);
  const canInteract = !!onGuess && !showValue;

  useEffect(() => {
    getRunnerAvatar(data.uuid).then(setImgUrl);
    getRunnerDetails(data.uuid).then(setDetails);
  }, []);

  return (
    <div
      className="relative flex-1 overflow-hidden cursor-pointer"
      onMouseEnter={() => canInteract && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`,
        }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
      />

      <motion.img
        src={imgUrl || defaultAvatar}
        alt=""
        className="absolute left-1/2 top-1/2 w-1/2 h-4/5 -translate-x-1/2 -translate-y-1/2 object-contain"
        animate={{ scale: hovered ? 1.3 : 1 }}
        transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
      />

      <div className="absolute inset-0 bg-black/30" />

      <AnimatePresence>
        {hovered && (
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
          style={{ fontFamily: "'Outfit', sans-serif" }}
          animate={{ opacity: hovered ? 0.3 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          Personal Best:{" "}
          <span className="font-bold text-white text-[16px]">
            {details ? runnerPB(details) : "Loading..."}
          </span>
          <br />
          Total Playtime:{" "}
          <span className="font-bold text-white text-[16px]">
            {details ? runnerPlaytime(details) : "Loading..."}
          </span>
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center gap-3">
        <motion.h2
          className="font-black text-white leading-tight drop-shadow-xl"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
        >
          {data.name}
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
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              #{data.ranking}
              <br />
              <span className="text-white">{data.elo}</span>
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              animate={{ y: hovered ? -8 : 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
              className="font-black text-white/20 drop-shadow-lg"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hovered && canInteract && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex gap-3 mt-2"
            >
              <GuessHigher onClick={() => onGuess?.("higher")} />
              <GuessLower onClick={() => onGuess?.("lower")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`absolute inset-0 pointer-events-none ${
          side === "left"
            ? "bg-linear-to-r from-black/20 via-transparent to-transparent"
            : "bg-linear-to-l from-black/20 via-transparent to-transparent"
        }`}
      />
    </div>
  );
}

export default GamePane;
