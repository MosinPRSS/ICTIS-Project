import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Error from './pages/error'
import { ServerStatus } from './components/error-components/status'
import Login from './components/auth/login-components/form'
import Profile from "./pages/profile"

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
         <Route 
         path="/profile/:user_id"
         element={
          <Profile />
         }
         />
      </Routes>
    </BrowserRouter>
  )
}

function ErrorPageWrapper() {
  const { code } = useParams<{ code: string }>();
  const errorData = ServerStatus[code as keyof typeof ServerStatus];

  if (!errorData) {
    return <div>Серьезная ошибка клиента и сервера</div>;
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
