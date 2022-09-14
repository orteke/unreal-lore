import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mom from "./pages/mom";
import Board from "./pages/board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Mom />} />
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
