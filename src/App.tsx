import MainPage from "./pages/MainPage";
import BuyMeCoffee from "./components/BuyMeCoffee";
import Header from "./components/Header";

export default function App() {

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#080808]">
      <Header/>

      <main className="flex-1 flex relative overflow-hidden">
        <MainPage/>
      </main>

      <BuyMeCoffee />
    </div>
  );
}