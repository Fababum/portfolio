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
      const baseUrl =
        (import.meta.env.VITE_CHAT_API_URL as string | undefined) ?? "";
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        let errorText = `Request failed (${response.status})`;
        try {
          const errorData = await response.json();
          if (typeof errorData?.error === "string") {
            errorText = errorData.error;
          }
        } catch {
          const fallback = await response.text();
          if (fallback) {
            errorText = fallback;
          }
        }
        throw new Error(errorText);
      }

      let data: { text?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!data?.text) {
        throw new Error("Chat service returned an empty response.");
      }

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
