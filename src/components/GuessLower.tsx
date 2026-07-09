import { TrendingDown } from "lucide-react";

function GuessLower({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-150 active:scale-95 border bg-red-500/80 hover:bg-red-400 border-red-400/30 shadow-red-900/40 hover:scale-105"
      }
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <TrendingDown size={15} />
      Lower
    </button>
  );
}

export default GuessLower;
