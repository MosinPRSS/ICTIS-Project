import { Route, Routes } from "react-router-dom";
import ChatsPage from "./pages/ChatsPage";
import MainPage from "./pages/MainPage";
import { UserIsRegisteredContext } from "./context/UserIsRegisteredContext";
import CreateBotPage from "./pages/CreateBotPage";
import UserBotsPage from "./pages/UserBotsPage";
import HelpPage from "./pages/HelpPage";

export default function App() {

  return (
    <UserIsRegisteredContext>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/create" element={<CreateBotPage />} />
        <Route path="/userbots" element={<UserBotsPage />} />
        <Route path='/help' element={<HelpPage />} />
      </Routes>
    </UserIsRegisteredContext>
  )
}