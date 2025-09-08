import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import './App.css'
import Home from "./pages/home"
import Error from './pages/error'
import { ServerStatus } from './components/error/status'
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
         }
         />
         <Route 
         path="/profile/:user_id"
         element={
          <ProfilePageWrapper />
         }
         />
         <Route 
         path="/chats"
         />
         <Route 
         path="/personas"
         />
         <Route 
         path="/personas/:persona_id" // for modal
         />
         <Route 
         path="/chats/:chat_id"
         
         />
         <Route 
         path="/bot/:bot_id"
         />
        {/*пусть чаты будут универсальны, без ввода каких-нибудь sessions */}
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

function ProfilePageWrapper() {
  const { user_id } = useParams<{ user_id: string }>();

  if (!user_id) {
    return <div>Не указан ID пользователя</div>;
  }

  return <Profile user_id={user_id} />;
}

export default App
