import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Error from './pages/error'
import { ServerStatus } from './components/error-components/status'
import Login from './components/auth/login-components/form'

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
          path="/error/:code"
          element={<ErrorPageWrapper />}
        />
         <Route 
         path='/login'
         element={
         <Login 
             onClose={undefined}         
          />
         }/>
      </Routes>
    </BrowserRouter>
  )
}

function ErrorPageWrapper() {
  const { code } = useParams<{ code: string }>();
  const errorData = ServerStatus[code as keyof typeof ServerStatus];

  if (!errorData) {
    return <div>Ошибка не найдена</div>;
  }

  return (
    <Error
      status={errorData.status}
      description={errorData.description}
      solution={errorData.solution}
      short_description={errorData.short_status}
    />
  );
}

export default App
