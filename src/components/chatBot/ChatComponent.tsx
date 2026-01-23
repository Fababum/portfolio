import * as React from "react";
import useChatbot from "../../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../../hooks/useChatScroll";

function ChatComponent() {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage, loading } = useChatbot();
  const messagesEndRef = useChatScroll(messages);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    chatCard: {
      border: "1px solid var(--card-border)",
      borderRadius: "18px",
      background: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      overflow: "hidden",
      display: "grid",
      gridTemplateRows: "1fr auto",
      minHeight: "48vh",
    },
    messages: {
      padding: "20px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "14px",
      overflowY: "auto" as const,
      maxHeight: "42vh",
    },
    emptyState: {
      border: "1px dashed var(--chip-border)",
      borderRadius: "16px",
      padding: "18px",
      display: "grid",
      gap: "10px",
      textAlign: "left" as const,
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
    promptRow: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "8px",
    },
    promptButton: {
      border: "1px solid var(--chip-border)",
      background: "var(--chip-bg)",
      color: "var(--text)",
      borderRadius: "999px",
      padding: "6px 12px",
      fontSize: "12px",
      cursor: "pointer",
    },
    bubbleRow: {
      display: "flex",
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
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      opacity: 0.6,
      marginBottom: "4px",
    },
    loading: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "13px",
      opacity: 0.7,
    },
    inputBar: {
      borderTop: "1px solid var(--card-border)",
      padding: "12px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      background: "rgba(0,0,0,0)",
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

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsSending(true);
    await sendMessage(input.trim());
    setInput("");
    setIsSending(false);

    if (window.innerWidth >= 768 && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <h1 style={styles.title}>Chat Bot</h1>
          <p style={styles.subtitle}>
            Ask anything about Fabian&apos;s work, projects, or experience.
          </p>
        </div>

        <div style={styles.chatCard}>
          <div style={styles.messages} ref={messagesEndRef}>
            {messages.length === 0 ? (
              <div style={styles.emptyState}>
                <h2 style={styles.emptyTitle}>Welcome to the AI Assistant</h2>
                <p style={styles.emptyText}>
                  Start a conversation by typing a message below. I can help you
                  learn more about Fabian&apos;s expertise, projects, and
                  professional background.
                </p>
                <div style={styles.promptRow}>
                  <button
                    style={styles.promptButton}
                    onClick={() => {
                      setInput("What are Fabian's main skills?");
                      inputRef.current?.focus();
                    }}
                  >
                    Main Skills
                  </button>
                  <button
                    style={styles.promptButton}
                    onClick={() => {
                      setInput("Tell me about Fabian's projects");
                      inputRef.current?.focus();
                    }}
                  >
                    Projects
                  </button>
                  <button
                    style={styles.promptButton}
                    onClick={() => {
                      setInput("What is Fabian's experience?");
                      inputRef.current?.focus();
                    }}
                  >
                    Experience
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.bubbleRow,
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        ...styles.bubble,
                        ...(msg.sender === "user"
                          ? styles.bubbleUser
                          : styles.bubbleBot),
                      }}
                    >
                      <div style={styles.sender}>
                        {msg.sender === "user" ? "You" : "Bot"}
                      </div>
                      <Markdown remarkPlugins={[]}>{msg.text}</Markdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={styles.bubbleRow}>
                    <div style={{ ...styles.bubble, ...styles.bubbleBot }}>
                      <div style={styles.loading}>Loading...</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div style={styles.inputBar}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              aria-label="Type your message"
              style={styles.input}
            />
            <button
              onClick={handleSend}
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              style={{
                ...styles.sendButton,
                ...(isSending || !input.trim() ? styles.sendDisabled : {}),
              }}
            >
              {isSending ? (
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

export default ChatComponent;
