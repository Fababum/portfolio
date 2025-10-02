import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Projects from "./components/projects/projects";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";
import Admin from "./components/admin/admin";
import BlockedBanner from "./components/BlockedBanner";
import PrivacyNotice from "./components/PrivacyNotice";
import { getUserId, isReturningUser } from "./utils/userCookie";

function App() {
  useEffect(() => {
    // Only track if privacy notice was accepted
    const privacyAccepted = localStorage.getItem('privacy_notice_accepted');
    
    if (privacyAccepted) {
      // Initialize user ID cookie on app load
      const userId = getUserId();
      const returning = isReturningUser();

      // Track visit
      fetch("/api/admin/track-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isReturning: returning }),
      }).catch((err) => console.error("Failed to track visit:", err));

      // Optional: Log to console
      console.log("User initialized:", {
        userId,
        isReturning: returning,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return (
    <>
      <PrivacyNotice />
      <NavBar />
      <BlockedBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatBot" element={<ChatComponent />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
