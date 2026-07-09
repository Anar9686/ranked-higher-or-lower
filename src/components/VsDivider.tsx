function VsDivider({ score }: { score?: number }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center justify-center gap-3">
      <div className="absolute top-0 bottom-0 w-px bg-white/[0.07]" />
      <div className="relative w-20 h-14 rounded-3xl bg-[#facc15] border-[3px] border-[#080808] flex items-center justify-center shadow-lg shadow-[#facc15]/20">
        {typeof score === "number" ? (
          <div
            className="text-black/80 font-semibold text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Score
            <div className="text-black text-xl font-black leading-none text-center">
              {score}
            </div>
          </div>
        ) : null}
      </div>
      <div className="relative w-11 h-11 rounded-full bg-[#facc15] border-[3px] border-[#080808] flex items-center justify-center shadow-lg shadow-[#facc15]/20">
        <span
          className="text-[#080808] font-bold text-xs tracking-wider leading-none"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          VS
        </span>
      </div>
    </div>
  );
}

export default VsDivider;
