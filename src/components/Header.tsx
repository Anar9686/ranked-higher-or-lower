function Header({ highScore }: { highScore: number }) {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
      <div className="flex flex-col leading-none">
        <div
          className="mt-1 text-sm font-semibold uppercase tracking-[0.35em] text-white"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Higher <span className="text-yellow-400">or</span> Lower
        </div>
        <div
          className="flex items-center gap-3 text-xl font-black uppercase"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          <span className="tracking-[0.22em] text-white">MCSR</span>
          <span className="h-5 w-px bg-white/20" />
          <span className="tracking-[0.18em] text-[#86ce34]">Ranked</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-0">
        <span className="text-yellow-400 font-black text-[14px] uppercase tracking-[0.15em]">
          High Score
        </span>
        <span className="text-white text-2xl font-bold leading-none">
          {highScore}
        </span>
      </div>
    </header>
  );
}

export default Header;
