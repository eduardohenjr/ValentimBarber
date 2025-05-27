import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}