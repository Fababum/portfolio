import { useEffect, useRef, useState } from "react";

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
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = (seconds: number) => {
    const duration = Math.max(1, Math.floor(seconds));
    setCooldownSeconds(duration);
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    cooldownTimerRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) {
            clearInterval(cooldownTimerRef.current);
            cooldownTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

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
        let retryAfterSeconds: number | null = null;
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
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          if (retryAfter) {
            errorText = `${errorText} Try again in ${retryAfter}s.`;
            const parsed = Number.parseInt(retryAfter, 10);
            retryAfterSeconds = Number.isFinite(parsed) ? parsed : null;
          }
          if (!retryAfterSeconds) {
            retryAfterSeconds = 60;
          }
          startCooldown(retryAfterSeconds);
        }
        throw new Error(errorText);
      }

      let data: { text?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      const botText =
        typeof data?.text === "string" && data.text.trim().length > 0
          ? data.text
          : null;

      if (!botText) {
        throw new Error("Chat service returned an empty response.");
      }

      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
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

  return { messages, sendMessage, loading, cooldownSeconds };
};

export default useChatbot;
