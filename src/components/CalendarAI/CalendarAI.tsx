import { useEffect, useState } from "react";
import { loginWithGoogle, saveGoogleTokens, sendToN8n } from "./utils.ts";
import { createClient } from "@supabase/supabase-js";
// Initialize Supabase client for authentication
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Chat message structure
interface ChatMessage {
  role: "user" | "ai";
  message: string;
}

function CalendarAI() {
  const [inputText, setInputText] = useState(""); // Current input text
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Chat history
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [sessionId] = useState(() => crypto.randomUUID()); // Unique session ID for this chat
  const [userEmail, setUserEmail] = useState<string>(""); // Logged-in user's email

  const styles = {
    page: {
      minHeight: "100vh",
      color: "var(--text)",
      padding: "10px 16px 40px",
    },
    shell: {
      maxWidth: "980px",
      margin: "0 auto",
      display: "grid",
      gap: "20px",
    },
    header: {
      textAlign: "center" as const,
      display: "grid",
      gap: "8px",
      marginTop: "10px",
    },
    title: {
      margin: 0,
      textShadow: "var(--title-shadow)",
    },
    subtitle: {
      margin: 0,
      opacity: 0.75,
    },
    card: {
      border: "1px solid var(--card-border)",
      borderRadius: "18px",
      background: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      padding: "22px",
      display: "grid",
      gap: "14px",
    },
    loginButton: {
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      color: "var(--text)",
      borderRadius: "999px",
      padding: "10px 16px",
      cursor: "pointer",
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      width: "fit-content",
    },
    loginFootnote: {
      margin: 0,
      opacity: 0.7,
      fontSize: "13px",
      lineHeight: 1.6,
    },
    chatCard: {
      border: "1px solid var(--card-border)",
      borderRadius: "18px",
      background: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      overflow: "hidden",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      minHeight: "55vh",
    },
    userBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      borderBottom: "1px solid var(--card-border)",
      gap: "12px",
      flexWrap: "wrap" as const,
    },
    userChip: {
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      opacity: 0.8,
    },
    signOut: {
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      color: "var(--text)",
      borderRadius: "999px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    messages: {
      padding: "18px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      overflowY: "auto" as const,
      maxHeight: "45vh",
    },
    emptyState: {
      border: "1px dashed var(--chip-border)",
      borderRadius: "16px",
      padding: "18px",
      display: "grid",
      gap: "10px",
      background: "var(--chip-bg)",
    },
    emptyTitle: {
      margin: 0,
      fontSize: "22px",
    },
    emptyText: {
      margin: 0,
      opacity: 0.8,
      lineHeight: 1.6,
    },
    bubbleRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
    bubble: {
      maxWidth: "78%",
      padding: "8px 10px",
      borderRadius: "16px",
      border: "1px solid var(--card-border)",
      background: "var(--chip-bg)",
      lineHeight: 1.5,
      fontSize: "14px",
    },
    bubbleUser: {
      marginLeft: "auto",
      background: "var(--card-bg)",
    },
    bubbleBot: {
      marginRight: "auto",
    },
    sender: {
      fontSize: "12px",
    },
    inputBar: {
      borderTop: "1px solid var(--card-border)",
      padding: "12px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderRadius: "999px",
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      color: "var(--text)",
      padding: "10px 14px",
      outline: "none",
    },
    sendButton: {
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      color: "var(--text)",
      borderRadius: "999px",
      padding: "10px 16px",
      cursor: "pointer",
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    sendDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

  // Check if user has an active session
  const checkSession = async () => {
    // Only allow sessions on production domain
    if (!window.location.href.includes("spiri.pages.dev")) {
      // Clear all Supabase data from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("sb-")) {
          localStorage.removeItem(key);
        }
      });
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUserEmail("");
      return;
    }

    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setIsLoggedIn(true);
      setUserEmail(data.session.user.email || "");
      // Save Google tokens to database if not already saved
      await saveGoogleTokens();
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setChatHistory([]);
    setUserEmail("");
  };

  // Check session on component mount and listen for auth changes
  useEffect(() => {
    checkSession();

    // Listen for auth state changes (e.g., after OAuth callback)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: unknown, session: unknown) => {
      // Only allow sessions on production domain
      if (!window.location.href.includes("spiri.pages.dev")) {
        supabase.auth.signOut();
        setIsLoggedIn(false);
        setUserEmail("");
        return;
      }

      if (
        session &&
        typeof session === "object" &&
        session !== null &&
        "user" in session
      ) {
        const typedSession = session as { user: { email?: string } };
        setIsLoggedIn(true);
        setUserEmail(typedSession.user.email || "");
        saveGoogleTokens();
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Send message to AI
  const handleSendMessage = async () => {
    // Check if logged in
    if (!isLoggedIn) {
      alert("Please sign in with Google first!");
      return;
    }

    if (!inputText.trim()) {
      alert("Please enter a message!");
      return;
    }

    // Add user message to chat
    const userMessage: ChatMessage = { role: "user", message: inputText };
    setChatHistory((prev: ChatMessage[]) => [...prev, userMessage]);

    setInputText(""); // Clear input
    setIsLoading(true);

    // Send to n8n and wait on/get AI response
    const aiResponse = await sendToN8n(inputText, sessionId);

    // Add AI response to chat
    if (aiResponse) {
      const aiMessage: ChatMessage = { role: "ai", message: aiResponse };
      setChatHistory((prev: ChatMessage[]) => [...prev, aiMessage]);
    }

    setIsLoading(false);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.header}>
            <h1 style={styles.title}>CalendarAI</h1>
            <p style={styles.subtitle}>
              Sign in with Google to manage your calendar with AI.
            </p>
            <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>
              CalendarAI can read your calendar to suggest schedules, create
              events, and answer questions about your availability.
            </p>
          </div>

          <div style={{ display: "grid", placeItems: "center" }}>
            <div
              style={{
                ...styles.card,
                padding: "18px",
                width: "fit-content",
              }}
            >
              <button style={styles.loginButton} onClick={loginWithGoogle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
          <p style={styles.loginFootnote}>
            By signing in, you allow CalendarAI to access your Google Calendar.
          </p>
        </div>
      </div>
    );
  }

  // Chat Interface
  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <h1 style={styles.title}>CalendarAI</h1>
          <p style={styles.subtitle}>
            Create events, check availability, and manage your schedule.
          </p>
        </div>

        <div style={styles.chatCard}>
          <div style={styles.userBar}>
            <span style={styles.userChip}>{userEmail}</span>
            <button style={styles.signOut} onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          <div style={styles.messages}>
            {chatHistory.length === 0 && (
              <div style={styles.emptyState}>
                <h2 style={styles.emptyTitle}>Welcome to CalendarAI!</h2>
                <p style={styles.emptyText}>
                  Ask me anything about your calendar, create events, or get
                  schedule information.
                </p>
              </div>
            )}
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.bubbleRow,
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.role === "user"
                      ? styles.bubbleUser
                      : styles.bubbleBot),
                  }}
                >
                  <div style={styles.sender}>
                    {msg.role === "user" ? "You" : "CalendarAI"}
                  </div>
                  <div>{msg.message}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={styles.bubbleRow}>
                <div style={{ ...styles.bubble, ...styles.bubbleBot }}>
                  <div style={styles.sender}>CalendarAI</div>
                  <div>Loading...</div>
                </div>
              </div>
            )}
          </div>

          <div style={styles.inputBar}>
            <input
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
              style={styles.input}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              style={{
                ...styles.sendButton,
                ...(isLoading || !inputText.trim() ? styles.sendDisabled : {}),
              }}
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 1L7 9M15 1L10 15L7 9M15 1L1 6L7 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarAI;
