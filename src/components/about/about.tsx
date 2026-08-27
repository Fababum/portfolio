import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/reveal/Reveal";

const skillGroups = [
  { category: "Frontend",    items: ["React", "TypeScript", "JavaScript", "HTML / CSS"] },
  { category: "Backend",     items: ["NestJS", "Node.js", "Java", "Python", "Docker"] },
  { category: "Datenbanken", items: ["Prisma ORM", "PostgreSQL", "SQL"] },
  { category: "Tools",       items: ["Git", "REST APIs", "Agile / Scrum"] },
  { category: "Security",    items: ["Cybersecurity", "Phishing Detection", "Threat Analysis", "OWASP Top 10"], accent: true },
];

const certifications = [
  { name: "SPARC-Kurs", issuer: "Schweizer Armee", note: "Vertiefte Cybersecurity-Ausbildung." },
  { name: "OWASP Top 10", issuer: "Immersive Labs", note: "Web-Sicherheitslücken & Gegenmassnahmen." },
  { name: "Security Fundamentals & Tooling", issuer: "Immersive Labs", note: "Secure Fundamentals, Secure Testing, Secure Tooling, Browser Developer Tools." },
];

const projects = [
  {
    name: "Security Awareness Game",
    tag: "SSO · Security · Web-App",
    description: "Ein spielerisches Tool zur Sensibilisierung für Cybersecurity-Themen, inkl. SSO-Integration.",
    href: "https://humanorai.dev-scapp.swisscom.com/",
  },
  {
    name: "Startup (Nebenprojekt)",
    tag: "Nebenprojekt",
    description: "Mitarbeit an einem eigenen Startup-Projekt neben der Ausbildung.",
  },
  {
    name: "Webseite für die Kirche",
    tag: "Webdesign · Ehrenamt",
    description: "Unterstützung beim Webdesign und Aufbau einer Webseite für eine Kirchgemeinde.",
  },
];

const timeline = [
  {
    period: "2026 – heute",
    role: "Host, Team Halo",
    company: "Swisscom",
    description: "Aktuelles Ausbildungsprojekt als Host im Team Halo.",
    isOngoing: true,
  },
  {
    period: "2026",
    role: "Mitglied, Team Halo",
    company: "Swisscom",
    description: "Aktuelles Ausbildungsprojekt als Host im Team Halo.",
  },
  {
    period: "2025 – 2026",
    role: "Apps Team",
    company: "Swisscom",
    description: "API-Entwicklung mit NestJS, Datenbankintegration via Prisma ORM und React-Frontend.",
  },
  {
    period: "2025",
    role: "CodemiX2",
    company: "Swisscom",
    description: "Vertiefung in JavaScript, TypeScript, React und Software-Engineering-Grundlagen.",
  },
  {
    period: "2024 – 2025",
    role: "Abuse Team",
    company: "Swisscom Cyber Security",
    description: "Spam- und Phishing-Erkennung, Sicherheitsmassnahmen, Java und Python.",
  },
  {
    period: "2024",
    role: "Start Berufslehre Informatik EFZ",
    company: "Swisscom",
    description: "Beginn der vierjährigen Ausbildung zum Informatiker EFZ, 3. Lehrjahr aktuell.",
  },
];

function About() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="relative text-foreground px-5 sm:px-8" style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}>
      {/* Section scrim: keeps body copy readable over busy photo textures */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "var(--section-scrim-v)" }} />
      <div className="relative mx-auto max-w-content" style={{ paddingBlock: "clamp(64px, 12vw, 160px)" }}>

        {/* ── Intro: portrait + heading, two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 mb-24">
          <Reveal>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md">
              <img
                src="/images/portraits/portrait-hiking.jpg"
                alt="Fabian Spiri"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
            </div>
          </Reveal>

          <div style={{ textShadow: "var(--label-shadow)" }}>
            <Reveal>
              <p className="eyebrow mb-4">About / 01</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-display font-medium mb-2">Fabian Spiri</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground font-medium mb-1">
                Informatik Applikationsentwickler EFZ · Host bei Team Halo · Swisscom
              </p>
              <p className="text-muted-foreground text-sm mb-8">Zürich, Schweiz</p>
            </Reveal>

            <Reveal delay={140}>
              <div className="space-y-4 max-w-xl">
                <p className="text-muted-foreground leading-7">
                  Ich bin Fabian Spiri, Informatik Applikationsentwickler Lehrling im dritten
                  Lehrjahr bei Swisscom. Ich interessiere mich sehr für Cybersecurity und habe
                  mir neben Backend- und Frontend-Development auch Kenntnisse durch verschiedene
                  Immersive-Labs-Kurse und den SPARC-Kurs des Militärs angeeignet.
                </p>
                <p className="text-muted-foreground leading-7">
                  Ich bin wissbegierig, kenne die Meeting-Kultur und SCRUM aus eigener Erfahrung
                  in der Cybersecurity bei Swisscom und arbeite sehr gerne im Team – aktuell als
                  Host im Team Halo. Ich war früher auch als Hilfsleiter im Sommerlager aktiv und
                  bin eine offene, hilfsbereite und teamfähige Person, die genauso gut
                  selbständig arbeiten kann.
                </p>
                <p className="text-muted-foreground leading-7">
                  Ausserhalb der Arbeit gehe ich regelmässig ins Gym und spiele gerne
                  Golf.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Skills ── */}
        <Reveal>
          <div className="hairline pt-10 mb-16">
            <p className="eyebrow mb-8">Skills / 02</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <p
                    className={
                      "text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1.5 " +
                      (group.accent ? "text-foreground" : "text-level2")
                    }
                    style={{ textShadow: "var(--label-shadow)" }}
                  >
                    {group.accent && (
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ongoing-dot)" }} />
                    )}
                    {group.category}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground" style={{ textShadow: "var(--label-shadow)" }}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Certifications ── */}
        <Reveal>
          <div className="hairline pt-10 mb-16">
            <p className="eyebrow mb-8">Zertifikate / 03</p>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
              <div>
                {certifications.map((c, i) => (
                  <div
                    key={c.name}
                    className={
                      "py-5 grid grid-cols-[1fr] sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 " +
                      (i > 0 ? "hairline" : "")
                    }
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-level2" style={{ textShadow: "var(--label-shadow)" }}>
                      {c.issuer}
                    </p>
                    <div>
                      <p className="text-base font-medium text-foreground mb-1">{c.name}</p>
                      <p className="text-sm text-muted-foreground leading-6" style={{ textShadow: "var(--label-shadow)" }}>{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full text-left group"
                aria-label="Immersive Labs Zertifikate vergrössern"
              >
                <div
                  className="overflow-hidden rounded-md"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}
                >
                  <img
                    src="/images/immersivlabscertifikate.png"
                    alt="Abgeschlossene Immersive Labs Kurse: Secure Fundamentals, Secure Testing, Secure Tooling, Browser Developer Tools, OWASP Top 10"
                    className="w-full h-auto transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2" style={{ textShadow: "var(--label-shadow)" }}>Immersive Labs: Nachweis ansehen ↗</p>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Projects ── */}
        <Reveal>
          <div className="hairline pt-10 mb-16" style={{ textShadow: "var(--label-shadow)" }}>
            <p className="eyebrow mb-8">Nebenprojekte / 04</p>
            <div>
              {projects.map((p, i) => {
                const Wrapper = p.href ? "a" : "div";
                return (
                  <Wrapper
                    key={p.name}
                    {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={
                      "group flex items-center justify-between gap-6 py-6 " +
                      (i > 0 ? "hairline" : "") +
                      (p.href ? " cursor-pointer" : "")
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <p className="text-lg sm:text-xl font-medium text-foreground transition-transform duration-200 ease-editorial group-hover:translate-x-1">
                          {p.name}
                        </p>
                        <span className="text-[11px] uppercase tracking-widest text-level4">
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-6 mt-1.5 max-w-lg">
                        {p.description}
                      </p>
                    </div>
                    {p.href && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Timeline ── */}
        <Reveal>
          <div className="hairline pt-10" style={{ textShadow: "var(--label-shadow)" }}>
            <p className="eyebrow mb-8">Erfahrung / 05</p>
            <div>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={
                    "grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-8 py-6 " +
                    (i > 0 ? "hairline" : "")
                  }
                >
                  <div className="flex items-center gap-2">
                    {item.isOngoing && (
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: "var(--ongoing-dot)" }}
                      />
                    )}
                    <p className="text-sm font-mono text-muted-foreground">{item.period}</p>
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {item.role} <span className="text-muted-foreground font-normal">· {item.company}</span>
                    </p>
                    <p className="text-sm text-muted-foreground leading-6 mt-1 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox for certificate screenshot */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/85"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxOpen(false)}
          tabIndex={-1}
        >
          <img
            src="/images/immersivlabscertifikate.png"
            alt="Abgeschlossene Immersive Labs Kurse"
            className="max-h-[85vh] max-w-[92vw] rounded-md"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Schliessen"
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default About;
