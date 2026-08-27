import NavBar from "./components/navBar/navBar";
import Background from "./components/background/Background";
import Home from "./components/home/home";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import Gallery from "./components/gallery/Gallery";

function App() {
  return (
    <>
      <Background />
      <NavBar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}

export default App;
