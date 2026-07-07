function VsDivider() {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center">
      <div className="absolute top-0 bottom-0 w-px bg-white/[0.07]" />
      <div className="relative w-11 h-11 rounded-full bg-[#facc15] border-[3px] border-[#080808] flex items-center justify-center shadow-lg shadow-[#facc15]/20">
        <span
          className="text-[#080808] font-black text-xs tracking-wider leading-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          VS
        </span>
      </div>
    </div>
  );
}

export default VsDivider;
