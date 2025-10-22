import "./about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <div className="profile-image-container">
            <img
              src="/PB_Fabian.png"
              alt="Fabian Profile"
              className="profile-image"
            />
          </div>
          <h1 className="about-title">About Me</h1>
          <div className="title-underline"></div>
        </div>

        <div className="about-section">
          <div className="about-card">
            <h2 className="section-title">Who I Am</h2>
            <p className="about-text">
              Hi, I'm Fabian Spiri, a passionate full-stack developer currently
              working at Swisscom, where I build robust frontend and backend
              solutions for challenging projects. I love exploring new
              technologies and continuously refining my skills to stay at the
              cutting edge of development.
            </p>
            <p className="about-text" style={{ marginTop: "15px" }}>
              Outside of coding, I enjoy going to the gym and playing Souls-like
              games.
            </p>
          </div>

          <div className="about-card">
            <h2 className="section-title">What I Do</h2>
            <p className="about-text">
              As a full-stack developer at Swisscom, I work on complex projects
              ranging from cybersecurity and phishing detection to API
              development and database integration. I specialize in building
              scalable, secure, and user-friendly applications with modern
              technologies.
            </p>
          </div>

          <div className="about-card">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="skills-grid">
              <div className="skill-tag">React</div>
              <div className="skill-tag">TypeScript</div>
              <div className="skill-tag">JavaScript</div>
              <div className="skill-tag">NestJS</div>
              <div className="skill-tag">SQL</div>
              <div className="skill-tag">Java</div>
              <div className="skill-tag">Python</div>
              <div className="skill-tag">HTML/CSS</div>
              <div className="skill-tag">Node.js</div>
              <div className="skill-tag">Git</div>
              <div className="skill-tag">API Design</div>
              <div className="skill-tag">Cybersecurity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
