import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Fabian's AI assistant. Feel free to ask me anything about his skills, projects, or experience!",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.text, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.";
      setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
