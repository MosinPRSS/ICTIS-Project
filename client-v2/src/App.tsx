import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Error from './pages/error'
import { ServerStatus } from './components/error-components/status'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  
        path="/"
        element={
          <Home />
        }
         />
         <Route  
        path="/error"
        element={
          <Error
          status={ServerStatus["404"]["status"]}
          description={ServerStatus["404"]["description"]}
          solution={ServerStatus["404"]["solution"]}
          short_description={ServerStatus["404"]["short_status"]}
          />
        }
         />
      </Routes>
    </BrowserRouter>
  )
}

export default App
