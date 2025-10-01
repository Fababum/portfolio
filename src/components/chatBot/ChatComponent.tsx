import * as React from "react";
import useChatbot from "../../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../../hooks/useChatScroll";
import "./ChatComponent.css";

const ChatComponent: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage } = useChatbot();
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
    <div className="chat-container">
      <h2 className="title">Chatbot</h2>

      <div ref={messagesEndRef} className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"
            }`}
          >
            <Markdown remarkPlugins={[]}>{msg.text}</Markdown>
          </div>
        ))}
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
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
