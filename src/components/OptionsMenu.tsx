import { Mail, SlidersHorizontal, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

function OptionsMenu({
  open,
  onToggle,
  onContact,
  onSettings,
}: {
  open: boolean;
  onToggle: () => void;
  onContact: () => void;
  onSettings: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (open) onToggle();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onToggle]);

  const itemClass =
    "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors duration-150 text-left";

  return (
    <div
      ref={menuRef}
      className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-1 bg-[#141414] border border-white/9 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl mb-1"
          >
            {[
              {
                label: "Contact",
                icon: <Mail size={14} />,
                action: onContact,
                delay: 0.05,
              },
              {
                label: "Settings",
                icon: <SlidersHorizontal size={14} />,
                action: onSettings,
                delay: 0,
              },
            ].map(({ label, icon, action, delay }) => (
              <motion.button
                key={label}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.18 }}
                onClick={action}
                className={itemClass}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {icon}
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.93 }}
        className="flex items-center gap-2 bg-white/8 hover:bg-white/13 border border-white/10 text-white/70 hover:text-white font-bold text-sm px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg transition-colors duration-150"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{
            duration: 0.3,
            ease: [0.32, 0, 0.08, 1],
          }}
        >
          <div className="relative w-4 h-4">
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{
                duration: 0.3,
                ease: [0.32, 0, 0.08, 1],
              }}
            >
              <Settings size={14} />
            </motion.span>

            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: open ? 1 : 0 }}
              transition={{
                duration: 0.3,
                ease: [0.32, 0, 0.08, 1],
              }}
            >
              <X size={14} />
            </motion.span>
          </div>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "close" : "options"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:inline"
          >
            {open ? "Close" : "Options"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default OptionsMenu;
