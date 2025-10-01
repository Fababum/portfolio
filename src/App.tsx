import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Projects from "./components/projects/projects";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";

function App() {
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
