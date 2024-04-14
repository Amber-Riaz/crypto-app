import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Coins from "./component/Coins";
import CoinDetails from "./component/CoinDetails";
import Exchanges from "./component/Exchanges";
import Footer from "./component/Footer";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/coins" element={<Coins/>}/>
      <Route path="/exchanges" element={<Exchanges/>}/>
      <Route path="/coin/:id" element={<CoinDetails/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
