import Reveal from "@/components/reveal/Reveal";

const links = [
  { label: "Email", value: "fabian.spiri@swisscom.com", href: "mailto:fabian.spiri@swisscom.com" },
  { label: "LinkedIn", value: "linkedin.com/in/fabian-spiri", href: "https://www.linkedin.com/in/fabian-spiri" },
  { label: "GitHub", value: "github.com/Fababum", href: "https://github.com/Fababum" },
];

const availability = [
  { label: "Geschäftlich", value: "07:00 – 15:00" },
  { label: "Privat", value: "18:00 – 22:00" },
  { label: "Reaktionszeit", value: "≤ 1 Tag" },
];

const helpTopics = ["Frontend", "Backend", "APIs", "Security", "UI"];

function Contact() {
  return (
    <div className="relative text-foreground" style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}>
      <div className="relative mx-auto max-w-content" style={{ paddingBlock: "clamp(64px, 12vw, 160px)", textShadow: "var(--label-shadow)" }}>

        <Reveal>
          <p className="eyebrow mb-4">Contact / 07</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="text-display font-medium mb-4">Lass uns reden.</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted-foreground leading-7 max-w-lg mb-16">
            Melde dich für Kollaborationen, Fragen oder ein kurzes Gespräch. Ich antworte in
            der Regel innerhalb eines Tages.
          </p>
        </Reveal>

        {/* Links */}
        <Reveal>
          <div className="hairline">
            {links.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 py-6 hairline"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground w-24 shrink-0">
                    {c.label}
                  </span>
                  <span className="text-lg sm:text-xl font-medium transition-transform duration-200 ease-editorial group-hover:translate-x-1">
                    {c.value}
                  </span>
                </div>
                <span className="text-muted-foreground transition-transform duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Help + Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16">
          <Reveal>
            <p className="eyebrow mb-4">Womit ich helfen kann</p>
            <p className="text-sm text-muted-foreground leading-7 mb-4 max-w-sm">
              Web-Apps, APIs, sicherheitsorientierte Features und Verbesserungen bestehender
              Produkte.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {helpTopics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={60}>
            <p className="eyebrow mb-4">Verfügbarkeit</p>
            <div>
              {availability.map((a, i) => (
                <div
                  key={a.label}
                  className={"flex items-center justify-between py-3 text-sm " + (i > 0 ? "hairline" : "")}
                >
                  <span className="text-muted-foreground">{a.label}</span>
                  <span className="font-mono text-foreground">{a.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Final CTA */}
        <Reveal delay={100}>
          <div className="hairline mt-20 pt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <p className="text-display font-medium leading-tight max-w-lg">
              Ein Projekt<br />im Kopf?
            </p>
            <a
              href="mailto:fabian.spiri@gmx.ch"
              className="group inline-flex items-center gap-2 text-lg font-semibold shrink-0"
            >
              Schreib mir
              <span className="inline-block transition-transform duration-200 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Contact;
