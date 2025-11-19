import { useEffect, useState } from "react";
import { loginWithGoogle, saveGoogleTokens, sendToN8n } from "./utils.ts";
import { createClient } from "@supabase/supabase-js";
import "./CalendarAI.css";

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
      <div className="calendar-ai-container">
        <div className="calendar-ai-content">
          <div className="login-section">
            <h1>CalendarAI</h1>
            <p>
              Sign in with your Google account to manage your calendar with AI
            </p>
            <button className="login-button" onClick={loginWithGoogle}>
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
            <p className="login-disclaimer">
              By signing in, you agree to allow CalendarAI to access your Google
              Calendar
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Chat Interface
  return (
    <div className="calendar-ai-container">
      <div className="calendar-ai-content">
        <div className="chat-section">
          <div className="chat-header">
            <div className="header-content">
              <h1>CalendarAI Chat</h1>
              {userEmail && <span className="user-email">{userEmail}</span>}
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          <div className="chat-messages">
            {chatHistory.length === 0 && (
              <div className="welcome-message">
                <h2>Welcome to CalendarAI!</h2>
                <p>
                  Ask me anything about your calendar, create events, or get
                  schedule information.
                </p>
              </div>
            )}
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-label">
                  {msg.role === "user" ? "You" : "AI"}
                </div>
                <div className="message-text">{msg.message}</div>
              </div>
            ))}
            {isLoading && <div className="loading">AI is typing...</div>}
          </div>

          <div className="chat-input">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your calendar, create events, or get schedule info..."
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarAI;
