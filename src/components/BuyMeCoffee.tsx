import { motion } from "motion/react";
import { Coffee } from "lucide-react";

function BuyMeCoffee() {
  return (
    <motion.a
      href="https://www.buymeacoffee.com"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#facc15] text-[#080808] font-bold text-sm px-4 py-2.5 rounded-full shadow-xl shadow-[#facc15]/20 transition-shadow hover:shadow-[#facc15]/40 hover:shadow-2xl"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <Coffee size={15} />
      <span className="hidden sm:inline">Buy me a coffee</span>
    </motion.a>
  );
}

export default BuyMeCoffee;