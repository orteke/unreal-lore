import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mom from './pages/mom'
import Board from './pages/board'
import ReactGA from 'react-ga';

ReactGA.initialize("G-392J59B0Y5");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Mom />} />
          <Route path='board' element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
