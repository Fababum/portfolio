import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
