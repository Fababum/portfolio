import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground" style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}>
      <div className="max-w-md w-full text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="text-display font-medium mb-4" style={{ textShadow: "var(--title-shadow)" }}>
          Hier gibt es nichts zu sehen.
        </h1>
        <p className="text-muted-foreground leading-7 mb-10 text-sm">
          Die gesuchte Seite existiert nicht. Sie wurde möglicherweise verschoben, gelöscht
          oder die URL wurde falsch eingegeben.
        </p>

        <div className="flex items-center justify-center gap-8 mb-16">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            Zur Startseite
            <span className="inline-block transition-transform duration-200 ease-editorial group-hover:translate-x-0.5">→</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Zurück
          </button>
        </div>

        <div className="hairline pt-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Oder besuche eine dieser Seiten
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
