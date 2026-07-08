import { motion } from "motion/react";
import ranked_logo from "../assets/ranked_logo.png";

function LandingDialog({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60"
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.32, 0, 0.08, 1] }}
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/9 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#facc15]/60 to-transparent" />

        <div className="px-8 py-9 flex flex-col items-center text-center gap-5">
          <img src={ranked_logo} alt="Game Logo" />

          <div>
            <h1
              className="text-white font-black text-3xl uppercase tracking-[0.12em] leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Higher
              <br />
              <span className="text-[#facc15]">or</span>
              <br />
              Lower
            </h1>
            <p
              className="mt-2 text-white/45 text-sm leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Two runners. One question.
              <br />
              Who is higher on the leaderboard?
            </p>
          </div>

          <ul className="w-full space-y-2.5 text-left">
            {[
              "Hover the right panel to reveal your options.",
              "Guess Higher or Lower than the left side.",
              "Chain correct answers to build your score.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="text-[#facc15] font-black text-sm leading-snug shrink-0 tabular-nums"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-white/50 text-sm leading-snug"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {tip}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            className="mt-1 w-full bg-[#facc15] hover:bg-yellow-300 active:scale-[0.98] text-[#080808] font-black text-base uppercase tracking-widest py-3.5 rounded-xl transition-all duration-150 shadow-lg shadow-[#facc15]/20"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Let's Play
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LandingDialog;
