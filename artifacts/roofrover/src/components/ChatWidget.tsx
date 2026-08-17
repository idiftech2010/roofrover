import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";

const QUICK_REPLIES = [
  "Browse listings",
  "Schedule a viewing",
  "Contact an agent",
  "Saved pads",
  "Help with selling",
];

const BOT_RESPONSES: Record<string, string> = {
  "browse listings":
    "You can browse curated listings under 'Browse Homes'. Use filters to narrow by price, beds, and location. Would you like me to show popular areas?",
  "schedule a viewing":
    "Tell me the property you're interested in and preferred times, and we'll connect you with an agent to schedule a viewing.",
  "contact an agent":
    "We can introduce you to a local agent. Share your preferred neighbourhood and budget and we'll match you.",
  "saved pads":
    "Open 'Saved Pads' to view properties you've bookmarked. You can also request a viewing from any saved listing.",
  "help with selling":
    "To sell with RoofRover, visit 'Sell' to start the listing process. We offer photography, marketing, and agent support to help you get the best price.",
};

function getBotReply(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (lower.includes(key) || key.includes(lower)) {
      return BOT_RESPONSES[key];
    }
  }
  return "Thank you for your message! A member of our team will get back to you shortly. For urgent inquiries, email info@roofrover.com.";
}

type Message = { role: "user" | "bot"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! I'm the RoofRover virtual assistant. How can I help you today? Ask about listings, schedule viewings, or contact an agent.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "bot", text: getBotReply(text) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 600);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ maxHeight: "520px" }}>
          <div className="bg-[#2D3E4A] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="RoofRover Logo"
                  className="h-8 w-8 object-contain rounded-full bg-white/10 p-0.5"
                />
              <div>
                <p className="text-white font-semibold text-sm">RoofRover Support</p>
                <p className="text-white/60 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white p-1"
              aria-label="Close chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FBF9F5]" style={{ minHeight: 220, maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#2D3E4A] text-white rounded-br-sm"
                      : "bg-white text-[#2D3E4A] rounded-bl-sm shadow-sm"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

            <div className="px-4 py-2 bg-white border-t border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm outline-none text-[#282828] placeholder-gray-400 bg-transparent"
            />
            <button
              type="submit"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2D3E4A] text-white hover:bg-[#6C7A89] transition-colors"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#2D3E4A] text-white shadow-lg hover:bg-[#D4AF37] transition-all duration-300 flex items-center justify-center relative"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#2D3E4A]">1</span>
          </span>
        )}
      </button>
    </div>
  );
}
