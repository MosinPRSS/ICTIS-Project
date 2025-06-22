import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";
import { UserIsRegisteredContext } from "./context/UserIsRegisteredContext";
import CreateBotPage from "./pages/CreateBotPage";
import UserBotsPage from "./pages/UserBotsPage";
import HelpPage from "./pages/HelpPage";
import UserPage from "./pages/UserPage";
import UserPersonasPage from "./pages/UserPersonasPage";
import CreatePersonaPage from "./pages/CreatePersonaPage";
import UserViewPage from "./pages/UserViewPage";
import NumberGuessingGame from "./ai/game";

export default function App() {

  return (
    <UserIsRegisteredContext>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/create" element={<CreateBotPage />} />
        <Route path="/userbots" element={<UserBotsPage />} />
        <Route path='/secret' element={<NumberGuessingGame />} />
        <Route path='/help' element={<HelpPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/userpersonas' element={<UserPersonasPage />} />
        <Route path="/createper" element={<CreatePersonaPage />} />
        <Route path="/userview" element={<UserViewPage />} />
      </Routes>
    </UserIsRegisteredContext>
  )
}