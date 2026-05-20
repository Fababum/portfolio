import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ChatComponent from "./components/chatBot/ChatComponent";
import CalendarAI from "./components/CalendarAI/CalendarAI";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="chat">
          <ChatComponent />
        </section>
        <section id="calendarai">
          <CalendarAI />
        </section>
      </main>
    </>
  );
}

export default App;
