import * as React from "react";
import useChatbot from "../../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../../hooks/useChatScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, Bot, User } from "lucide-react";

const PROMPT_SUGGESTIONS = [
  { label: "Main Skills", text: "What are Fabian's main skills?" },
  { label: "Projekte",    text: "Tell me about Fabian's projects" },
  { label: "Erfahrung",  text: "What is Fabian's experience?" },
];

function ChatComponent() {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage, loading, cooldownSeconds } = useChatbot();
  const messagesEndRef = useChatScroll(messages);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim() || cooldownSeconds > 0 || isSending || loading) return;
    setIsSending(true);
    await sendMessage(input.trim());
    setInput("");
    setIsSending(false);
    if (window.innerWidth >= 768 && inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = isSending || cooldownSeconds > 0;

  return (
    <div className="min-h-screen text-foreground px-4 pt-6 pb-24">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header */}
        <div className="text-center space-y-1.5">
          <h1 className="text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
            Chat Bot
          </h1>
          <p className="text-muted-foreground text-sm">
            Ask anything about Fabian's work, projects, or experience.
          </p>
        </div>

        {/* Chat card */}
        <Card className="overflow-hidden flex flex-col" style={{ minHeight: "52vh" }}>
          <CardHeader className="border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
              <span className="text-sm font-medium text-foreground">AI Assistant</span>
              <span className="text-xs text-muted-foreground ml-auto">Powered by Gemini</span>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 px-5 py-4" ref={messagesEndRef} style={{ maxHeight: "45vh" }}>
            {messages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 space-y-3">
                <p className="font-semibold text-foreground text-lg">Welcome to the AI Assistant</p>
                <p className="text-sm text-muted-foreground leading-6">
                  Start a conversation. I can help you learn more about Fabian's expertise,
                  projects, and professional background.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROMPT_SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
                      onClick={() => {
                        setInput(s.text);
                        inputRef.current?.focus();
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5 items-start",
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {msg.sender === "user"
                        ? <User className="h-3.5 w-3.5" />
                        : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-6",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground border border-border rounded-tl-sm"
                      )}
                    >
                      <Markdown remarkPlugins={[]}>{msg.text}</Markdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5 bg-muted text-muted-foreground border border-border">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-muted border border-border rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <div className="flex gap-1 items-center h-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input bar */}
          <CardContent className="p-3 border-t border-border">
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                type="text"
                placeholder={
                  cooldownSeconds > 0
                    ? `Bitte warten… (${cooldownSeconds}s)`
                    : "Type your message..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isDisabled}
                className="rounded-full bg-muted border-border focus-visible:ring-primary"
                aria-label="Type your message"
              />
              <Button
                onClick={handleSend}
                disabled={isDisabled || !input.trim()}
                size="icon"
                className="rounded-full shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default ChatComponent;
