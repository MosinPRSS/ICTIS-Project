import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import MainPage from "./pages/MainPage";
import { UserIsRegisteredContext } from "./context/UserIsRegisteredContext";

export default function App() {
  return (
    <UserIsRegisteredContext>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </UserIsRegisteredContext>
  )
}