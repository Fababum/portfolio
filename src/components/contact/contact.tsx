import Reveal from "@/components/reveal/Reveal";
import { EMAIL, navItems, scrollToId, socials } from "@/lib/content";

const WORK_EMAIL = "fabian.spiri@swisscom.com";

const availability = [
  { label: "Geschäftlich", value: "07:00 – 15:00" },
  { label: "Privat", value: "18:00 – 22:00" },
  { label: "Reaktionszeit", value: "≤ 1 Tag" },
];

function Contact() {
  return (
    <footer className="relative bg-olive text-cream overflow-hidden grain">
      <div className="container-x relative z-10" style={{ paddingTop: "clamp(96px, 12vw, 180px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-lime mb-6">Kontakt</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}>
                Lass uns<br />
                <span className="text-lime">reden.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-cream/70 leading-7 max-w-md mt-8">
                Melde dich für Kollaborationen, Fragen oder ein kurzes Gespräch. Ich helfe gerne bei Web-Apps, APIs,
                Frontends und der Verbesserung bestehender Produkte.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="flex flex-wrap gap-3 mt-10">
                <a href={`mailto:${EMAIL}`} className="btn-pill btn-lime">Schreib mir <span aria-hidden="true">↗</span></a>
                <a href="https://www.linkedin.com/in/fabian-spiri" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-10 content-end">
            <Reveal>
              <p className="eyebrow text-cream/50 mb-5">Seiten</p>
              <ul className="space-y-2">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToId(n.id); }}
                      className="link-line text-lg hover:text-lime transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={60}>
              <p className="eyebrow text-cream/50 mb-5">Folgen</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link-line text-lg hover:text-lime transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="col-span-2">
              <p className="eyebrow text-cream/50 mb-3">Verfügbarkeit</p>
              {availability.map((a) => (
                <div key={a.label} className="flex justify-between py-3 border-b border-[var(--line-dark)] text-sm">
                  <span className="text-cream/70">{a.label}</span>
                  <span className="font-mono">{a.value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-1 mt-5 text-sm">
                <a href={`mailto:${EMAIL}`} className="link-line w-fit hover:text-lime transition-colors">{EMAIL}</a>
                <a href={`mailto:${WORK_EMAIL}`} className="link-line w-fit text-cream/70 hover:text-lime transition-colors">{WORK_EMAIL}</a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Riesen-Claim */}
        <div className="mt-24 sm:mt-36 relative">
          <p className="font-sign text-lime text-4xl sm:text-6xl -rotate-6 absolute -top-6 sm:-top-10 right-2 sm:right-10 z-10">
            Fabian Spiri
          </p>
          <h2
            className="font-display text-center whitespace-nowrap select-none"
            style={{ fontSize: "clamp(2rem, 8.5vw, 10rem)" }}
          >
            Immer voller Einsatz.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--line-dark)] py-8 mt-6">
          <p className="eyebrow text-cream/50">© {new Date().getFullYear()} Fabian Spiri. Alle Rechte vorbehalten.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="eyebrow flex items-center gap-2 hover:text-lime transition-colors"
          >
            Nach oben <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
