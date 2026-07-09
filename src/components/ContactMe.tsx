import { motion } from "motion/react";
import DialogShell from "./ui/DialogShell";
import { Mail } from "lucide-react";
import { useState } from "react";
import Dropdown from "./ui/Dropdown";
import emailjs from "@emailjs/browser";

const CONTACT_REASONS = [
  "Bug report",
  "Feature request",
  "Partnership",
  "Just saying hi",
  "Other",
];

export function ContactDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email,
          reason,
          message,
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSent(true);
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
  };

  const inputClass =
    "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white/80 text-sm placeholder:text-white/25 outline-none focus:border-[#facc15]/50 focus:bg-white/[0.09] transition-all duration-150";

  return (
    <DialogShell onClose={onClose}>
      <div className="px-8 py-9 flex flex-col gap-5">
        <div>
          <h2
            className="text-white font-black text-2xl uppercase tracking-[0.12em]"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Contact <span className="text-[#facc15]">Me</span>
          </h2>
          <p
            className="mt-1 text-white/40 text-xs"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            I read every message.
          </p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <span className="text-3xl">✉️</span>
            <p
              className="text-white/70 text-sm"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              Message sent — I'll get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-[#facc15] text-sm font-bold hover:underline"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              Close
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            />

            <Dropdown
              value={reason}
              onChange={setReason}
              options={CONTACT_REASONS}
              placeholder="Why are you reaching out?"
            />

            <textarea
              required
              placeholder="Your message…"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            />

            <button
              type="submit"
              className="mt-1 w-full bg-[#facc15] hover:bg-yellow-300 active:scale-[0.98] text-[#080808] font-black text-base uppercase tracking-widest py-3.5 rounded-xl transition-all duration-150 shadow-lg shadow-[#facc15]/20"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </DialogShell>
  );
}

export function ContactButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-white/8 hover:bg-white/[0.14] border border-white/10 text-white/70 hover:text-white font-bold text-sm px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg transition-colors duration-150"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <Mail size={14} />
      <span className="hidden sm:inline">Contact</span>
    </motion.button>
  );
}
