import "./contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            Feel free to reach out for collaborations, opportunities, or just a
            friendly chat!
          </p>
        </div>

        <div className="contact-cards">
          <a
            href="mailto:fabian.spiri@gmx.ch"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">📧</div>
            <h2 className="contact-method">Email</h2>
            <p className="contact-info">fabian.spiri@gmx.ch</p>
            <div className="contact-hover-text">Send me an email</div>
          </a>

          <a
            href="https://www.linkedin.com/in/fabian-spiri-221253363/"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">💼</div>
            <h2 className="contact-method">LinkedIn</h2>
            <p className="contact-info">Fabian Spiri</p>
            <div className="contact-hover-text">Connect with me</div>
          </a>

          <a
            href="https://github.com/Fababum"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">💻</div>
            <h2 className="contact-method">GitHub</h2>
            <p className="contact-info">@Fababum</p>
            <div className="contact-hover-text">Check out my code</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
