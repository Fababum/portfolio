import { useCallback, useState } from "react";
import Loader from "./components/loader/Loader";
import Cursor from "./components/cursor/Cursor";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Experience from "./components/experience/Experience";
import Gallery from "./components/gallery/Gallery";
import Contact from "./components/contact/contact";

function App() {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <Loader onDone={handleDone} />
      <Cursor />
      <NavBar />
      <main>
        <section id="home">
          <Home ready={!loading} />
        </section>
        <section id="about">
          <About />
        </section>
        <section>
          <Experience />
        </section>
        <section id="moments">
          <Gallery />
        </section>
      </main>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
