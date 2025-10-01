import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(message);
      const response = await result.response.text();

      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
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
