import { X } from "lucide-react";
import { motion } from "motion/react";

function DialogShell({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ delay: 0.08, duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/9 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#facc15]/60 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X size={16} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default DialogShell;
