import DialogShell from "./ui/DialogShell";
// import { useEffect } from "react";
// import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function SupportDialog({ onClose }: { onClose: () => void }) {
  //   useEffect(() => {
  //     emailjs
  //       .send(
  //         import.meta.env.VITE_EMAILJS_SERVICE_ID,
  //         import.meta.env.VITE_EMAILJS_SUPPORT_TEMPLATE_ID,
  //       )
  //       .then(
  //         (response) => {
  //           console.log("SUCCESS!", response.status, response.text);
  //         },
  //         (error) => {
  //           console.log("FAILED...", error);
  //         },
  //       );
  //   }, []);

  return (
    <DialogShell onClose={onClose}>
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#facc15]/60 to-transparent" />

      <div className="px-8 py-9 flex flex-col items-center text-center">
        <div className="max-w-md w-full">
          <h1
            className="text-white font-black text-3xl uppercase tracking-[0.12em] leading-tight"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Support <span className="text-[#facc15]">Me</span>
          </h1>

          <p
            className="mt-2 text-white/45 text-sm leading-relaxed"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            I can't accept donations yet.
            <br />
            Until I figure it out, the best way <br />
            to support me is:
          </p>

          <ul className="mt-5 mx-auto w-fit list-disc text-left text-white/70 space-y-2">
            <li>
              ⭐ Star my GitHub repo{" "}
              <a
                href="https://github.com/Anar9686/ranked-higher-or-lower"
                className="text-[#facc15] underline hover:text-yellow-300 transition-colors"
              >
                here
              </a>
            </li>
            <li>📢 Share the game with your friends</li>
          </ul>

          <p
            className="mt-5 text-white/45 text-sm"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Thank you for your support! ❤️
          </p>
        </div>
      </div>
    </DialogShell>
  );
}

export function SupportButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#facc15] text-[#080808] font-bold text-sm px-4 py-2.5 rounded-full shadow-xl shadow-[#facc15]/20 transition-shadow hover:shadow-[#facc15]/40 hover:shadow-2xl"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <Heart size={15} />
      <span className="hidden sm:inline">Support Me</span>
    </motion.button>
  );
}
