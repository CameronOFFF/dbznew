import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Arena from "./pages/Arena";
import Quests from "./pages/Quests";
import Sagas from "./pages/Sagas";
import Shop from "./pages/Shop";
import Clan from "./pages/Clan";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/quests" element={<Quests />} />
      <Route path="/sagas" element={<Sagas />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/clan" element={<Clan />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
