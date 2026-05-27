import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, ExternalLink, GitFork, Clock, Wrench, ArrowRight } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "fabian.spiri@swisscom.com",
    sub: "Fabian Swisscom Mail",
    href: "mailto:fabian.spiri@swisscom.com",
    cta: "Nachricht senden",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "Fabian Spiri",
    sub: "linkedin.com/in/fabian-spiri",
    href: "https://www.linkedin.com/in/fabian-spiri",
    cta: "Profil ansehen",
  },
  {
    icon: GitFork,
    label: "GitHub",
    value: "@Fababum",
    sub: "github.com/Fababum",
    href: "https://github.com/Fababum",
    cta: "Code ansehen",
  },
];

function Contact() {
  return (
    <div className="min-h-screen text-foreground px-6 pt-10 pb-24">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2.5">
            Kontakt
          </p>
          <h1 className="text-foreground mb-3" style={{ textShadow: "var(--title-shadow)" }}>
            Lass uns reden
          </h1>
          <p className="text-muted-foreground text-sm leading-7 max-w-lg">
            Melde dich für Kollaborationen, Fragen oder ein kurzes Gespräch.
            Ich antworte in der Regel innerhalb eines Tages.
          </p>
        </div>

        <div className="space-y-4">

          {/* ── Contact links ── */}
          <div className="grid gap-3 sm:grid-cols-3">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 cursor-pointer">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground mb-0.5">{c.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">{c.value}</span>
                        <span className="text-xs text-primary font-semibold flex items-center gap-1">
                          {c.cta} <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          {/* ── Details row ── */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* What I can help with */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Wrench className="h-3 w-3" />
                  Womit ich helfen kann
                </p>
                <p className="text-sm text-muted-foreground leading-7 mb-3">
                  Web-Apps, APIs, sicherheitsorientierte Features und Verbesserungen bestehender Produkte.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Frontend", "Backend", "APIs", "Security", "UI"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Verfügbarkeit
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Geschäftlich</span>
                    <span className="text-muted-foreground font-mono text-xs">07:00 – 15:00</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Privat</span>
                    <span className="text-muted-foreground font-mono text-xs">18:00 – 22:00</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reaktionszeit</span>
                    <span className="text-green-500 dark:text-green-400 font-semibold text-xs">≤ 1 Tag</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── CTA banner ── */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-base text-foreground mb-1">Möchtest du mich kontaktieren?</p>
                <p className="text-sm text-muted-foreground">
                    Bei Anliegen ausserhalb der regulären Geschäftszeiten kannst du mir gerne eine E-Mail schreiben über meine Privat Mail.
                </p>
              </div>
              <a
                href="mailto:fabian.spiri@gmx.ch"
                className="inline-flex items-center justify-center h-9 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-opacity hover:opacity-85 shrink-0"
              >
                E-Mail senden
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default Contact;
