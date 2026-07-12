import { useState } from "react";
import { Share2 } from "lucide-react";
import DialogShell from "./ui/DialogShell";
import { motion } from "motion/react";
import { generateShareString } from "../helpers";
import { emptyPlayedList } from "../pages/MainPage";
import { gameOverMessages } from "../constants";

export function GameOverDialog({
  score,
  onRestart,
}: {
  score: number;
  onRestart: () => void;
}) {
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const msg = gameOverMessages[Math.random() * gameOverMessages.length];

  const handleShare = (full: boolean) => () => {
    const text = generateShareString(score, full);
    if (navigator.share) {
      navigator
        .share({ title: "Higher or Lower", text })
        .then(() => setShareMessage("Shared!"))
        .catch(() => setShareMessage("Failed. Try again."));
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => setShareMessage("Copied to clipboard!"))
        .catch(() => setShareMessage("Copy failed. Try again."));
    }
  };

  const onClose = () => {
    emptyPlayedList();
    onRestart();
  };

  return (
    <DialogShell onClose={onClose}>
      <div className="px-8 py-9 flex flex-col items-center text-center gap-5">
        <span className="text-4xl leading-none select-none">💀</span>

        <div>
          <h2
            className="text-white font-black text-3xl uppercase tracking-[0.12em]"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Game <span className="text-[#facc15]">Over</span>
          </h2>
          <p
            className="mt-1.5 text-white/40 text-sm"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            {msg}
          </p>
        </div>

        <div className="w-full rounded-xl border border-white/8 bg-white/4 py-5 flex flex-col items-center gap-1">
          <span
            className="text-white/35 text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Final Score
          </span>
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
              delay: 0.15,
            }}
            className="text-[#facc15] font-black leading-none"
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "5rem",
            }}
          >
            {score}
          </motion.span>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={handleShare(false)}
            className="w-full flex items-center justify-center gap-2 bg-white/[0.07] hover:bg-white/12 border border-white/10 text-white/70 hover:text-white font-bold text-sm py-3 rounded-xl transition-all duration-150 active:scale-[0.98]"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            <Share2 size={14} />
            Share Score
          </button>
          <button
            onClick={handleShare(true)}
            className="w-full flex items-center justify-center gap-2 bg-white/[0.07] hover:bg-white/12 border border-white/10 text-white/70 hover:text-white font-bold text-sm py-3 rounded-xl transition-all duration-150 active:scale-[0.98]"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            <Share2 size={14} />
            Share Full Game
          </button>
          {shareMessage ? (
            <p className="text-xs mt-2 text-white/70">{shareMessage}</p>
          ) : null}
          <button
            onClick={onClose}
            className="w-full bg-[#facc15] hover:bg-yellow-300 active:scale-[0.98] text-[#080808] font-black text-base uppercase tracking-widest py-3.5 rounded-xl transition-all duration-150 shadow-lg shadow-[#facc15]/20"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Play Again
          </button>
        </div>
      </div>
    </DialogShell>
  );
}

export default GameOverDialog;
