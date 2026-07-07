import { TrendingUp } from "lucide-react";

function GuessHigher({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-150 active:scale-95 border bg-green-500/80 hover:bg-green-400 border-green-400/30 shadow-green-900/40 hover:scale-105"
      }
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <TrendingUp size={15} />
      Higher
    </button>
  );
}

export default GuessHigher;
