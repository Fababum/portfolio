import * as React from "react";
import useChatbot from "../../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../../hooks/useChatScroll";
import "./ChatComponent.css";

function ChatComponent() {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage, loading } = useChatbot();
  const messagesEndRef = useChatScroll(messages);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
    };
  }, []);

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
    <div className="chat-wrapper">
      <div className="chat-content">
        <h1 className="chat-title">Chat Bot</h1>
        <div className="title-underline"></div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">💬</div>
                <h2>Welcome to the AI Assistant</h2>
                <p>
                  Start a conversation by typing a message below. I can help you
                  learn more about Fabian's expertise, projects, and
                  professional background.
                </p>
                <div className="suggestion-chips">
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("What are Fabian's main skills?");
                      inputRef.current?.focus();
                    }}
                  >
                    💡 Main Skills
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("Tell me about Fabian's projects");
                      inputRef.current?.focus();
                    }}
                  >
                    🚀 Projects
                  </button>
                  <button
                    className="suggestion-chip"
                    onClick={() => {
                      setInput("What is Fabian's experience?");
                      inputRef.current?.focus();
                    }}
                  >
                    💼 Experience
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-bubble ${
                      msg.sender === "user"
                        ? "chat-bubble-user"
                        : "chat-bubble-bot"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="message-avatar">🤖</div>
                    )}
                    <div className="message-content">
                      <Markdown remarkPlugins={[]}>{msg.text}</Markdown>
                    </div>
                    {msg.sender === "user" && (
                      <div className="message-avatar">👤</div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="chat-bubble chat-bubble-bot typing-indicator">
                    <div className="message-avatar">🤖</div>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              aria-label="Type your message"
            />
            <button
              onClick={handleSend}
              className={`chat-send-btn ${
                isSending ? "chat-send-btn-disabled" : ""
              }`}
              disabled={isSending || !input.trim()}
              aria-label="Send message"
            >
              {isSending ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Sending...
                </span>
              ) : (
                <span className="btn-text">
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
