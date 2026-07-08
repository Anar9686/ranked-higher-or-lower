import ranked_logo_full from "../assets/ranked_logo_full.png";

function Header() {
  return (
    <header className="relative z-30 shrink-0 h-14 flex items-center justify-between px-6 border-b border-white/6 bg-[#080808]/90 backdrop-blur-xl">
      <div className="flex items-center">
        <img
          src={ranked_logo_full}
          alt="Game Logo"
          className="h-10 w-auto mr-4"
        />

        <div className="flex items-baseline gap-1.5">
          <span
            className="text-white font-black text-lg uppercase tracking-[0.22em]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Higher
          </span>
          <span
            className="text-[#facc15] font-black text-lg uppercase tracking-[0.22em]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            or
          </span>
          <span
            className="text-white font-black text-lg uppercase tracking-[0.22em]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Lower
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
