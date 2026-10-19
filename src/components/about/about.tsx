import type { ReactNode } from "react";
import Reveal from "@/components/reveal/Reveal";

function About() {
  return (
    <div className="relative bg-cream text-ink overflow-hidden">
      <div className="container-x" style={{ paddingBlock: "clamp(96px, 14vw, 200px)" }}>
        <Reveal>
          <p className="eyebrow text-[var(--muted-light)] mb-10 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-current" />
            Nachricht von Fabian
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="font-medium tracking-tight max-w-[18ch] sm:max-w-[22ch]"
            style={{ fontSize: "clamp(2.2rem, 5.6vw, 5.5rem)", lineHeight: 1.02, letterSpacing: "-0.035em" }}
          >
            <Hl>Neugierig</Hl> auf neue Technologien, <Hl>begeistert</Hl> von gutem Code. Ich baue Web-Apps, die{" "}
            <Hl>funktionieren</Hl> und Freude machen.
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-24 items-end">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl group">
                <img
                  src="/images/portraits/portrait-hiking.jpg"
                  alt="Fabian Spiri beim Wandern"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                  style={{ objectPosition: "50% 30%", transitionTimingFunction: "var(--ease)" }}
                />
              </div>
              <p className="eyebrow text-[var(--muted-light)] mt-4">Alpen, Schweiz</p>
              <div
                className="absolute -right-2 sm:-right-10 -bottom-6 grid place-items-center h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-lime text-ink"
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ animation: "spin-slow 14s linear infinite" }}>
                  <defs>
                    <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text fontSize="9.5" fontWeight="700" letterSpacing="2.4" fill="currentColor">
                    <textPath href="#circle">SWISSCOM · FULL-STACK · REACT · NESTJS ·</textPath>
                  </text>
                </svg>
                <span className="font-display text-3xl">FS</span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
                Über <span className="text-outline">mich</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-5 text-[var(--muted-light)] leading-7 max-w-xl text-base sm:text-lg">
                <p>
                  Ich bin Fabian Spiri, Informatik Applikationsentwickler Lehrling im dritten Lehrjahr bei{" "}
                  <strong className="text-ink">Swisscom</strong>. Am liebsten entwickle ich Web-Applikationen von A bis Z: vom React-, Next.js- oder Vue-Frontend
                  über APIs mit NestJS, Express oder FastAPI bis zur Datenbank und dem Deployment in der Cloud. Sogar eine eigene Handy-App
                  mit React Native habe ich gebaut. Immer öfter
                  mit dabei: KI, etwa über die Swiss AI Platform oder eigene MCP-Server. Zusätzlich habe ich mir durch Immersive-Labs-Kurse und den
                  SPARC-Kurs des Militärs Wissen in Cybersecurity angeeignet.
                </p>
                <p>
                  Ich bin wissbegierig, kenne die Meeting-Kultur und SCRUM aus verschiedenen Teams bei
                  Swisscom und arbeite sehr gerne im Team, aktuell als Host im Team Halo. Früher war ich auch als
                  Hilfsleiter im Sommerlager aktiv. Ich bin offen, hilfsbereit und teamfähig, kann aber genauso gut
                  selbständig arbeiten.
                </p>
                <p>Ausserhalb der Arbeit gehe ich regelmässig ins Gym und spiele gerne Golf.</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="font-sign text-5xl sm:text-6xl mt-10 -rotate-3 text-olive-2">Fabian Spiri</p>
            </Reveal>
          </div>
        </div>

        {/* Kennzahlen */}
        <div className="mt-24 sm:mt-32 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--line-light)]">
          {[
            { n: "2024", l: "Start der Lehre" },
            { n: "3.", l: "Lehrjahr" },
            { n: "6", l: "Stationen bei Swisscom" },
            { n: "7", l: "Projekte gebaut" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 60}>
              <div className={"py-8 pr-4 " + (i > 0 ? "lg:border-l lg:pl-8 border-[var(--line-light)]" : "")}>
                <p className="font-display" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>{s.n}</p>
                <p className="eyebrow text-[var(--muted-light)] mt-2">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hl({ children }: { children: ReactNode }) {
  return (
    <strong className="relative inline-block font-semibold">
      <span className="absolute inset-x-[-0.08em] bottom-[0.08em] h-[0.42em] bg-lime -z-0" aria-hidden="true" />
      <span className="relative">{children}</span>
    </strong>
  );
}

export default About;
