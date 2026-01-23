import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";
import CalendarAI from "./components/CalendarAI/CalendarAI";
import NotFound from "./components/error/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatBot" element={<ChatComponent />} />
        <Route path="/calendarai" element={<CalendarAI />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
