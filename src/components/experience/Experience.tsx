import { useState } from "react";
import Reveal from "@/components/reveal/Reveal";
import { certifications, marqueeWords, projects, scrollToId, skillGroups, timeline } from "@/lib/content";

function Marquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const track = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center gap-8 pr-8">
          <span className="font-display whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{w}</span>
          <span className="h-3 w-3 rounded-full bg-lime shrink-0" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={"marquee" + (reverse ? " marquee--reverse" : "")}>
      {track(false)}
      {track(true)}
    </div>
  );
}

function SplitCards() {
  const cards = [
    { id: "skills", top: "On", bottom: "Code", text: <>Aktuelle <strong className="text-cream">Projekte</strong>, Skills, Stationen und Zertifikate.</>, image: "/images/portraits/portrait-night.jpg" },
    { id: "moments", top: "Off", bottom: "Code", text: <><strong className="text-cream">Momente</strong>, Berge, Meer und mein Hund, abseits vom Bildschirm.</>, image: "/images/landscapes/landscape-mountain-lake.jpg" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {cards.map((c, i) => (
        <Reveal key={c.top} delay={i * 100}>
          <button
            type="button"
            onClick={() => scrollToId(c.id)}
            className="group relative w-full text-left overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-[5/4] bg-olive-2"
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-50 scale-110 grayscale transition-all duration-[1.2s] group-hover:opacity-80 group-hover:scale-100 group-hover:grayscale-0"
              style={{ transitionTimingFunction: "var(--ease)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-10">
              <span className="self-end grid place-items-center h-14 w-14 rounded-full bg-lime text-ink text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
              <div>
                <h3 className="font-display" style={{ fontSize: "clamp(4rem, 9vw, 8.5rem)" }}>
                  <span className="block text-outline transition-colors duration-500 group-hover:text-lime">{c.top}</span>
                  <span className="block">{c.bottom}</span>
                </h3>
                <p className="text-cream/70 max-w-xs mt-4">{c.text}</p>
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div id="skills" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
            Skills<br /><span className="text-lime">Hall of Fame</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-cream/70 max-w-sm leading-7">
            Vom <strong className="text-cream">Frontend</strong> über APIs und <strong className="text-cream">KI</strong> bis zum Deployment in der Cloud. Alles aus echten Projekten.
          </p>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.category} delay={i * 60} className={g.featured ? "sm:col-span-2 h-full" : "h-full"}>
            {g.featured ? (
              <div className="group relative h-full min-h-[280px] rounded-3xl bg-lime text-ink p-6 sm:p-8 overflow-hidden grid grid-cols-[1fr_auto] gap-6">
                <div className="flex flex-col">
                  <p className="eyebrow opacity-60">0{i + 1} · Highlight</p>
                  <h3 className="font-display text-4xl sm:text-5xl mt-3 mb-2">{g.category}</h3>
                  {g.note && <p className="text-sm text-ink/70 max-w-[26ch] mb-6">{g.note}</p>}
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full bg-ink text-cream px-3 py-1 text-xs">{s}</li>
                    ))}
                  </ul>
                </div>
                {/* Handy-Mockup */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block relative w-[120px] lg:w-[130px] self-center rotate-6 transition-transform duration-700 group-hover:rotate-0 group-hover:-translate-y-2"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                >
                  <div className="rounded-[1.6rem] bg-ink p-[6px] shadow-2xl">
                    <div className="relative rounded-[1.25rem] overflow-hidden bg-olive" style={{ aspectRatio: "9 / 19" }}>
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-3 w-10 rounded-full bg-ink z-10" />
                      <img src="/images/landscapes/landscape-ocean-sunset.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70" />
                      <div className="absolute inset-x-2 bottom-2 space-y-1.5">
                        <p className="font-display text-cream text-lg leading-none">freetly</p>
                        <div className="rounded-lg bg-cream/90 px-2 py-1.5 text-[9px] text-ink font-semibold">3 Freunde haben Zeit</div>
                        <div className="rounded-lg bg-lime px-2 py-1.5 text-[9px] text-ink font-semibold">Heute Abend? →</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="group relative h-full min-h-[280px] rounded-3xl border border-[var(--line-dark)] p-6 overflow-hidden transition-colors duration-500 hover:border-lime">
                <div
                  className="absolute inset-0 bg-lime translate-y-full group-hover:translate-y-0 transition-transform duration-700"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                />
                <div className="relative flex flex-col h-full transition-colors duration-500 group-hover:text-ink">
                  <p className="eyebrow opacity-60">0{i + 1}</p>
                  <h3 className="font-display text-4xl mt-3 mb-6">{g.category}</h3>
                  <ul className="mt-auto space-y-1.5 text-sm">
                    {g.items.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div id="experience" className="scroll-mt-24">
      <Reveal>
        <h2 className="font-display mb-12" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
          Stationen <span className="text-outline">Swisscom</span>
        </h2>
      </Reveal>
      <div className="border-t border-[var(--line-dark)]">
        {timeline.map((t, i) => (
          <Reveal key={t.period + t.role} delay={i * 40}>
            <div className="group relative grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-2 md:gap-10 py-7 md:py-9 border-b border-[var(--line-dark)] overflow-hidden">
              <div
                className="absolute inset-0 bg-olive-2 -z-0 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"
                style={{ transitionTimingFunction: "var(--ease)" }}
              />
              <p className="relative eyebrow text-cream/60 flex items-center gap-2 md:pl-2">
                {t.isOngoing && <span className="h-2 w-2 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />}
                {t.period}
              </p>
              <h3 className="relative font-display text-3xl sm:text-5xl transition-all duration-500 group-hover:text-lime group-hover:translate-x-2">
                {t.role}
              </h3>
              <div className="relative">
                <p className="eyebrow text-lime mb-1">{t.company}</p>
                <p className="text-cream/70 leading-7">{t.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <Reveal>
        <h2 className="font-display mb-12" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
          Pro<span className="text-lime">jekte</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
        {projects.map((p, i) => {
          const inner = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                />
                <span className="absolute top-4 left-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1.5 eyebrow text-cream">{p.tag}</span>
                {p.href && (
                  <span className="absolute bottom-4 right-4 grid place-items-center h-12 w-12 rounded-full bg-lime text-ink transition-transform duration-500 group-hover:-rotate-45">→</span>
                )}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl group-hover:text-lime transition-colors">{p.name}</h3>
              <p className="text-cream/70 mt-2 leading-7">{p.description}</p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border border-[var(--line-dark)] px-3 py-1 text-xs text-cream/80">{t}</li>
                ))}
              </ul>
            </>
          );
          return (
            <Reveal key={p.name} delay={i * 80}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">{inner}</a>
              ) : (
                <div className="group">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function Certifications() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[2rem] bg-lime text-ink p-6 sm:p-12 lg:p-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="eyebrow mb-4">Zertifikate</p>
          <h2 className="font-display mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            Zertifikate &amp;<br />Kurse
          </h2>
          <div className="border-t border-ink/20">
            {certifications.map((c) => (
              <div key={c.name} className="py-5 border-b border-ink/20 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-6">
                <p className="eyebrow opacity-60 pt-1">{c.issuer}</p>
                <div>
                  <p className="font-semibold text-lg flex items-center gap-2 flex-wrap">
                    {c.name}
                    {c.inProgress && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
                        Work in Progress
                      </span>
                    )}
                  </p>
                  <p className="text-ink/70 text-sm leading-6">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="group text-left" aria-label="Immersive Labs Zertifikate vergrössern">
          <div className="rounded-2xl overflow-hidden bg-ink p-3 shadow-2xl transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[1.02]" style={{ transitionTimingFunction: "var(--ease)" }}>
            <img
              src="/images/immersivlabscertifikate.png"
              alt="Abgeschlossene Immersive Labs Kurse: Secure Fundamentals, Secure Testing, Secure Tooling, Browser Developer Tools, OWASP Top 10"
              loading="lazy"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <p className="eyebrow mt-4 link-line">Nachweis ansehen ↗</p>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-ink/95 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Zertifikat"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <img src="/images/immersivlabscertifikate.png" alt="Abgeschlossene Immersive Labs Kurse" className="max-h-[85vh] max-w-[92vw] rounded-xl" onClick={(e) => e.stopPropagation()} />
          <button type="button" aria-label="Schliessen" onClick={() => setOpen(false)} className="absolute top-6 right-6 h-12 w-12 rounded-full bg-cream text-ink text-2xl grid place-items-center hover:bg-lime transition-colors">×</button>
        </div>
      )}
    </div>
  );
}

function Experience() {
  return (
    <div className="relative bg-ink text-cream overflow-hidden">
      <div className="container-x space-y-28 sm:space-y-40" style={{ paddingBlock: "clamp(96px, 12vw, 180px)" }}>
        <SplitCards />
        <Skills />
      </div>

      <div className="border-y border-[var(--line-dark)] py-8 space-y-4">
        <Marquee words={marqueeWords} />
        <div className="text-cream/30">
          <Marquee words={[...marqueeWords].reverse()} reverse />
        </div>
      </div>

      <div className="container-x space-y-28 sm:space-y-40" style={{ paddingBlock: "clamp(96px, 12vw, 180px)" }}>
        <Timeline />
        <Projects />
        <Certifications />
      </div>
    </div>
  );
}

export default Experience;
