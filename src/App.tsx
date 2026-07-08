import { useState } from "react";
import MainPage from "./pages/MainPage";
import BuyMeCoffee from "./components/BuyMeCoffee";
import Header from "./components/Header";
import { AnimatePresence } from "motion/react";
import LandingDialog from "./components/LandingDialog";

export default function App() {
  const [showLanding, setShowLanding] = useState(() => {
    const seen = sessionStorage.getItem("hol-seen");
    if (!seen) {
      sessionStorage.setItem("hol-seen", "1");
      return true;
    }
    return false;
  });

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#080808]">
      <Header/>

      <main className="flex-1 flex relative overflow-hidden">
        <MainPage/>
      </main>

      <AnimatePresence>
        {showLanding && <LandingDialog onClose={() => setShowLanding(false)} />}
      </AnimatePresence>

      <BuyMeCoffee />
    </div>
  );
}