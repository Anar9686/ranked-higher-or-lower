import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

function Dropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-150 hover:bg-white/[0.09] focus:border-[#facc15]/50"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: value ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
        }}
      >
        <span>{value || placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-white/40" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 top-full mt-1.5 w-full rounded-xl border border-white/10 bg-[#141414] backdrop-blur-xl shadow-2xl overflow-hidden py-1"
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100 ${
                  opt === value
                    ? "text-[#facc15] bg-white/6"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;