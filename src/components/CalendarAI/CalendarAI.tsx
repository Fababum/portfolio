import { useEffect, useState } from "react";
import { loginWithGoogle, saveGoogleTokens, sendToN8n } from "./utils.ts";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, Bot, User, LogOut, CalendarDays } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

interface ChatMessage {
  role: "user" | "ai";
  message: string;
}

function CalendarAIUnavailable() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-foreground px-6 py-16 text-center gap-4">
      <CalendarDays className="h-12 w-12 text-primary opacity-60" />
      <h1 className="text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
        CalendarAI
      </h1>
      <p className="text-muted-foreground max-w-sm leading-7 text-sm">
        CalendarAI ist derzeit nur auf der Produktionsumgebung verfügbar.
        Bitte besuche{" "}
        <a href="https://spiri.pages.dev" className="text-primary underline underline-offset-2">
          spiri.pages.dev
        </a>{" "}
        um CalendarAI zu nutzen.
      </p>
    </div>
  );
}

function CalendarAI() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (!supabase) return;

    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsLoggedIn(true);
          setUserEmail(data.session.user.email || "");
          await saveGoogleTokens(data.session);
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: unknown, session: unknown) => {
        if (session && typeof session === "object" && "user" in session) {
          const typed = session as {
            user: { email?: string; id: string };
            provider_token?: string | null;
            provider_refresh_token?: string | null;
            expires_in?: number | null;
          };
          setIsLoggedIn(true);
          setUserEmail(typed.user.email || "");
          saveGoogleTokens(typed);
        } else {
          setIsLoggedIn(false);
          setUserEmail("");
        }
      }
    );

    return () => { subscription.unsubscribe(); };
  }, []);

  if (!supabase) return <CalendarAIUnavailable />;

  const handleLogout = async () => {
    try { await supabase.auth.signOut(); } catch (err) { console.error(err); }
    setIsLoggedIn(false);
    setChatHistory([]);
    setUserEmail("");
  };

  const handleSendMessage = async () => {
    if (!isLoggedIn || !inputText.trim()) return;

    const userMessage: ChatMessage = { role: "user", message: inputText };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const aiResponse = await sendToN8n(inputText, sessionId);
      if (aiResponse) {
        setChatHistory((prev) => [...prev, { role: "ai", message: aiResponse }]);
      }
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Login Screen ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen text-foreground px-6 pt-10 pb-24">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
              <CalendarDays className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
              CalendarAI
            </h1>
            <p className="text-muted-foreground text-sm leading-7">
              Sign in with Google to manage your calendar with AI.
              CalendarAI can read your calendar to suggest schedules,
              create events, and answer questions about your availability.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-3 font-semibold"
                onClick={loginWithGoogle}
              >
                {/* Google logo */}
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </Button>
              <p className="text-xs text-muted-foreground text-center leading-5">
                By signing in, you allow CalendarAI to access your Google Calendar.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Chat Interface ──
  return (
    <div className="min-h-screen text-foreground px-4 pt-6 pb-24">
      <div className="max-w-3xl mx-auto space-y-5">

        <div className="text-center space-y-1.5">
          <h1 className="text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
            CalendarAI
          </h1>
          <p className="text-muted-foreground text-sm">
            Create events, check availability, and manage your schedule.
          </p>
        </div>

        <Card className="overflow-hidden flex flex-col" style={{ minHeight: "55vh" }}>
          {/* User bar */}
          <CardHeader className="border-b border-border px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {userEmail}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 px-5 py-4" style={{ maxHeight: "45vh" }}>
            {chatHistory.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 space-y-2">
                <p className="font-semibold text-foreground text-lg">Welcome to CalendarAI!</p>
                <p className="text-sm text-muted-foreground leading-6">
                  Ask me anything about your calendar, create events, or get schedule information.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5 items-start",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {msg.role === "user"
                        ? <User className="h-3.5 w-3.5" />
                        : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-6",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground border border-border rounded-tl-sm"
                      )}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5 bg-muted border border-border">
                      <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="bg-muted border border-border rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <div className="flex gap-1 items-center h-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input bar */}
          <CardContent className="p-3 border-t border-border">
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="rounded-full bg-muted border-border focus-visible:ring-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                size="icon"
                className="rounded-full shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default CalendarAI;
