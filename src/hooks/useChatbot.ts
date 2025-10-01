import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hello! I'm Fabian's AI assistant. Feel free to ask me anything about his skills, projects, or experience!",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setLoading(true);

    try {
      // Call our secure Cloudflare Function instead of using the API key directly
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.text, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
