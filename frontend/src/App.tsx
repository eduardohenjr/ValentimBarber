import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agendamento from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agendamento />} />
      </Routes>
    </BrowserRouter>
  );
}