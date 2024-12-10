import { useState } from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import CardInfo from "./pages/CardInfo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="qr-info/:id" element={<CardInfo />} />
      </Routes>
    </>
  );
}
  
export default App;
