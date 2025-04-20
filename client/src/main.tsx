import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import './index.css'
import MainPage from './pages/main';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
      </Routes>
    </Router>
  </StrictMode>
);
