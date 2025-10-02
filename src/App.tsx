import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Projects from "./components/projects/projects";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";
import { getUserId, isReturningUser } from "./utils/userCookie";

function App() {
  useEffect(() => {
    // Initialize user ID cookie on app load
    const userId = getUserId();
    const returning = isReturningUser();
    
    // Optional: Log to console or send analytics
    console.log('User initialized:', {
      userId,
      isReturning: returning,
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatBot" element={<ChatComponent />} />
      </Routes>
    </>
  );
}

export default App;
