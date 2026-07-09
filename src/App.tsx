import { useState } from "react";
import MainPage from "./pages/MainPage";
import BuyMeCoffee from "./components/BuyMeCoffee";
import Header from "./components/Header";
import { AnimatePresence } from "motion/react";
import LandingDialog from "./components/LandingDialog";
import { ContactButton, ContactDialog } from "./components/ContactMe";
import { CONSTANTS } from "./constants";
import GameOverDialog from "./components/GameOverDialog";

export default function App() {
  const [gameId, setGameId] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLanding, setShowLanding] = useState(() => {
    const seen = sessionStorage.getItem(CONSTANTS.LANDING_SEEN);
    return !seen;
  });
  const [highScore, setHighScore] = useState(() => {
    const highScore = localStorage.getItem(CONSTANTS.HIGH_SCORE);
    if (highScore) {
      return parseInt(highScore);
    }
    return 0;
  });

  const updateHighScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(CONSTANTS.HIGH_SCORE, score.toString());
    }
  };

  return (
    <div
      key={gameId}
      className="h-screen w-screen overflow-hidden flex flex-col bg-[#080808]"
    >
      <Header highScore={highScore} />

      <main className="flex-1 flex relative overflow-hidden">
        <MainPage
          onGameOver={(finalScore) => {
            setFinalScore(finalScore);
            setGameOver(true);
            updateHighScore(finalScore);
            setGameId((prev) => prev + 1);
          }}
        />
      </main>

      <AnimatePresence>
        {showLanding && (
          <LandingDialog
            onClose={() => {
              setShowLanding(false);
              sessionStorage.setItem(CONSTANTS.LANDING_SEEN, "1");
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameOver && (
          <GameOverDialog
            score={finalScore}
            onRestart={() => {
              setGameOver(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContact && <ContactDialog onClose={() => setShowContact(false)} />}
      </AnimatePresence>

      <ContactButton onClick={() => setShowContact(true)} />
      <BuyMeCoffee />
    </div>
  );
}
