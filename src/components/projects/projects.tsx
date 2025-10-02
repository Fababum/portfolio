import "./projects.css";

function Projects() {
  const projects = [
    {
      title: "Abuse",
      date: "Aug 2024 – Feb 2025",
      description:
        "In the Abuse team at Swisscom Cyber Security, I gained many new skills in the areas of security and phishing and expanded my knowledge of Java and Python. I also learned how to detect spam effectively and how to design security measures to prevent it.",
      tags: [
        "Cybersecurity",
        "Phishing Detection",
        "Java",
        "Python",
        "Threat Analysis",
        "Incident Response",
      ],
    },
    {
      title: "CodemiX2",
      date: "Feb 2025 – Aug 2025",
      description:
        "In this project, I learned the fundamentals of several programming languages. It helped me develop a strong understanding of programming principles and provided essential foundational skills for my future work.",
      tags: [
        "JavaScript",
        "TypeScript",
        "React",
        "Java",
        "HTML",
        "CSS",
        "Software Fundamentals",
      ],
    },
    {
      title: "Apps Team",
      date: "Aug 2025 – Feb 2026 (ongoing)",
      description:
        "Here, I was able to acquire many new skills, such as developing APIs with NestJS, connecting databases to projects, and learning Prisma. There is still much more to learn in this ongoing project.",
      tags: [
        "Full-Stack Development",
        "API Design",
        "NestJS",
        "Prisma ORM",
        "Database Integration",
        "React",
      ],
      isOngoing: true,
    },
  ];

  return (
    <div className="projects-container">
      <div className="projects-content">
        <div className="projects-header">
          <h1 className="projects-title">My Projects</h1>
          <div className="title-underline"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.isOngoing && (
                <div className="ongoing-badge">Ongoing</div>
              )}
              <h2 className="project-title">{project.title}</h2>
              <p className="project-date">{project.date}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
