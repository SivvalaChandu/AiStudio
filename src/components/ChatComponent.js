import { useState, useRef, useEffect } from "react";
import { FiSend, FiMessageSquare } from "react-icons/fi";
import { askAI } from "../utils/api";
import TypewriterEffect from "./TypewriterEffect";
import CustomReactMarkdown from "./CustomReactMarkdown";

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const lineHeight = 24;
  const paddingVertical = 24;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        const contentHeight = textarea.scrollHeight - paddingVertical;
        const currentRows = Math.floor(contentHeight / lineHeight);

        const minRows = 1;
        const maxRows = 6;
        const clampedRows = Math.min(Math.max(currentRows, minRows), maxRows);

        textarea.style.height = `${
          clampedRows * lineHeight + paddingVertical
        }px`;
      }
    };

    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setError(null);
      const newMessage = { content: input, isBot: false };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setIsLoading(true);

      const data = await askAI(input);
      const botResponse = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        { content: botResponse, isBot: true, isTyping: true },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { content: "⚠️ Failed to get response", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingComplete = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isTyping: false } : msg))
    );
  };

  return (
    <div className="flex flex-col h-full">
      {error && <div className="text-red-400 text-sm text-center">{error}</div>}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar pb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <FiMessageSquare className="text-4xl mb-4 text-slate-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-slate-300 mb-2">
                AI Chat
              </h2>
              <p className="text-slate-400">
                Ask me anything! I'm here to help.
              </p>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-4 rounded-2xl wrap-anywhere ${
                      msg.isBot
                        ? "bg-slate-800/50"
                        : "bg-cyan-500/90 text-white"
                    }`}
                  >
                    {msg.isBot ? (
                      msg.isTyping ? (
                        <TypewriterEffect
                          text={msg.content}
                          onComplete={() => handleTypingComplete(i)}
                        />
                      ) : (
                        <CustomReactMarkdown content={msg.content} />
                      )
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] p-4 rounded-2xl bg-slate-800/50">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-4 border-t border-slate-700/50"
      >
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="flex-1 bg-slate-800/50 overflow-hidden custom-scrollbar rounded-lg px-4 py-3 focus:outline-none 
                      focus:ring-2 focus:ring-cyan-400 placeholder-slate-400 resize-none 
                      min-h-[3rem] max-h-[12rem] overflow-y-auto leading-6"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-4 bg-cyan-500/90 hover:bg-cyan-500 rounded-2xl 
                     transition-colors disabled:opacity-50 shrink-0"
          >
            <FiSend className="text-xl" />
          </button>
        </div>
      </form>
      <div className="-mb-3 mt-2 text-gray-500 text-sm text-center">
        Note: AI-generated responses may be inaccurate. Use at your own
        discretion.
      </div>
    </div>
  );
}
