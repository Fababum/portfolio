import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";
import CalendarAI from "./components/CalendarAI/CalendarAI";
import NotFound from "./components/error/NotFound";

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div className="pageTransition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatBot" element={<ChatComponent />} />
          <Route path="/calendarai" element={<CalendarAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
