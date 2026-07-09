import ranked_logo from "../assets/ranked_logo.png";
import DialogShell from "./ui/DialogShell";

function LandingDialog({ onClose }: { onClose: () => void }) {
  return (
    <DialogShell onClose={onClose}>
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#facc15]/60 to-transparent" />

      <div className="px-8 py-9 flex flex-col items-center text-center gap-5">
        <img src={ranked_logo} alt="Game Logo" />

        <div>
          <h1
            className="text-white font-black text-3xl uppercase tracking-[0.12em] leading-tight"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Higher
            <br />
            <span className="text-[#facc15]">or</span>
            <br />
            Lower
          </h1>
          <p
            className="mt-2 text-white/45 text-sm leading-relaxed"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
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
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
              >
                0{i + 1}
              </span>
              <span
                className="text-white/50 text-sm leading-snug"
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
              >
                {tip}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-1 w-full bg-[#facc15] hover:bg-yellow-300 active:scale-[0.98] text-[#080808] font-black text-base uppercase tracking-widest py-3.5 rounded-xl transition-all duration-150 shadow-lg shadow-[#facc15]/20"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Let's Play
        </button>
      </div>
    </DialogShell>
  );
}

export default LandingDialog;
