import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, User, Cpu } from "lucide-react";
import clsx from "clsx";

// ----------------------------------
// Type Definitions
// ----------------------------------
type Message = {
  id: string;
  from: "bot" | "user" | "system";
  text: string;
  timestamp: number;
};

type Resource = {
  keywords: string[];
  label: string;
  url: string;
};

// ----------------------------------
// Expanded Resource List
// ----------------------------------
const RESOURCES: Resource[] = [
  {
    keywords: ["988", "helpline", "crisis", "emergency", "suicide", "help"],
    label: "Dial 988 (Suicide & Crisis Lifeline)",
    url: "tel:988",
  },
  {
    keywords: ["reach vet", "at-risk", "initiative", "save lives"],
    label: "VA REACH VET Initiative",
    url: "https://news.va.gov/press-room/va-reach-vet-initiative-helps-save-veterans-lives-program-signals-when-more-help-is-needed-for-at-risk-veterans/",
  },
  {
    keywords: ["va news", "veterans affairs news", "latest va news"],
    label: "VA News",
    url: "https://news.va.gov/",
  },
  {
    keywords: ["video connect", "telehealth", "virtual", "video call", "telehealth va"],
    label: "VA Video Connect (Telehealth)",
    url: "https://mobile.va.gov/app/va-video-connect",
  },
  {
    keywords: ["health", "healthcare", "medical", "va health", "health va"],
    label: "VA Health",
    url: "https://www.va.gov/health/",
  },
  {
    keywords: ["my health", "portal", "records", "myhealthevet", "medical records"],
    label: "My HealtheVet Portal",
    url: "https://www.myhealth.va.gov/mhv-portal-web/home",
  },
  {
    keywords: ["cemetery", "burial", "memorial", "va cemeteries"],
    label: "VA National Cemeteries",
    url: "https://www.cem.va.gov/",
  },
  {
    keywords: ["careers", "jobs", "work", "employment", "va careers"],
    label: "VA Careers",
    url: "https://vacareers.va.gov/",
  },
  {
    keywords: ["benefits", "claims", "compensation", "disability benefits", "va benefits"],
    label: "VA Benefits",
    url: "https://benefits.va.gov/benefits/",
  },
  {
    keywords: ["education", "gi bill", "post-9/11", "stem", "montgomery gi bill"],
    label: "GI Bill & Education Benefits",
    url: "https://www.va.gov/education/",
  },
  {
    keywords: ["housing", "homeless", "home loan", "va home loan", "housing assistance"],
    label: "VA Home Loans & Housing Resources",
    url: "https://www.va.gov/housing-assistance/",
  },
  {
    keywords: ["mental health", "ptsd", "counseling", "therapy", "psychologist", "va mental health"],
    label: "VA Mental Health Services",
    url: "https://www.va.gov/mental-health/",
  },
  {
    keywords: ["caregiver", "family support", "caregiver support", "respite", "family help"],
    label: "VA Caregiver Support",
    url: "https://www.caregiver.va.gov/",
  },
  {
    keywords: ["vocational rehab", "vre", "voc rehab", "vocational rehabilitation"],
    label: "Vocational Rehabilitation & Employment (VR&E)",
    url: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
  },
  {
    keywords: ["nrd", "resource directory", "disability", "rehab", "national resource directory"],
    label: "National Resource Directory",
    url: "https://nrd.gov/",
  },
  {
    keywords: ["va", "veterans affairs", "official site", "main va site"],
    label: "VA.gov (Main Site)",
    url: "https://www.va.gov/",
  },
  {
    keywords: ["family caregiver", "caregiver education", "caregiver resources"],
    label: "VA Caregiver Education & Training",
    url: "https://www.va.gov/family-member-benefits/education-and-training/",
  },
  {
    keywords: ["pension", "survivor benefits", "dependency indemnity", "dica pension"],
    label: "VA Pensions & Survivor Benefits",
    url: "https://www.va.gov/pension/",
  },
  {
    keywords: ["child care", "child care benefits", "camp hope", "va child care"],
    label: "VA Child Care Benefits & Programs",
    url: "https://www.va.gov/education/survivor-dependent-assistance-benefits/child-care/",
  },
  {
    keywords: ["veteran crisis line", "veteran crisis", "vcounseling"],
    label: "Veterans Crisis Line",
    url: "https://www.veteranscrisisline.net/",
  },
];

// ----------------------------------
// Utility: Escape Regex
// ----------------------------------
function escapeRegex(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// ----------------------------------
// Improved Matching: Whole‐Word Regex
// ----------------------------------
function matchResources(query: string): Resource[] {
  const q = query.toLowerCase();
  return RESOURCES.filter((resource) =>
    resource.keywords.some((kw) => {
      const pattern = new RegExp(`\\b${escapeRegex(kw.toLowerCase())}\\b`);
      return pattern.test(q);
    })
  );
}

// ----------------------------------
// Quick Suggestion Chips
// ----------------------------------
const QUICK_SUGGESTIONS: string[] = [
  "Check benefits status",
  "Find a local VA office",
  "Apply for GI Bill",
  "Schedule a medical appointment",
  "Find mental health resources",
  "VA Home Loan guidance",
  "Learn about VA Careers",
];

// ----------------------------------
// MessageBubble Component
// ----------------------------------
interface MessageBubbleProps {
  msg: Message;
}

const MessageBubble = ({ msg }: MessageBubbleProps) => {
  const date = new Date(msg.timestamp);
  const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const isBot = msg.from === "bot";
  const avatarIcon = msg.from === "bot" ? <Cpu className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />;

  return (
    <div className={clsx("flex items-start space-x-2", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <div className="flex-shrink-0 p-1 bg-blue-600 rounded-full">{avatarIcon}</div>
      )}
      <div
        className={clsx(
          "max-w-[70%] px-3 py-2 rounded-lg relative",
          isBot
            ? "bg-gray-100 text-gray-900 rounded-bl-none"
            : "bg-blue-600 text-white rounded-br-none"
        )}
      >
        {isBot ? (
          <span
            className="prose-sm prose"
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ) : (
          <span>{msg.text}</span>
        )}
        <div className="absolute -bottom-4 right-1 text-[10px] text-gray-400">
          {timeString}
        </div>
      </div>
      {!isBot && (
        <div className="flex-shrink-0 p-1 bg-blue-600 rounded-full">{avatarIcon}</div>
      )}
    </div>
  );
};

// ----------------------------------
// QuickSuggestion Component (Chip/Button)
// ----------------------------------
interface QuickSuggestionProps {
  text: string;
  onClick: (txt: string) => void;
}

const QuickSuggestion = ({ text, onClick }: QuickSuggestionProps) => {
  return (
    <button
      className="px-2 py-1 text-xs text-gray-800 transition bg-gray-200 rounded-full hover:bg-gray-300"
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};

// ----------------------------------
// Main Chatbot Component
// ----------------------------------
const Chatbot = () => {
  // ------------ STATE ------------
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // ------------ EFFECTS ------------

  // On mount: Load saved messages from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("vaChatbotMessages");
    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed);
      } catch {
        setMessages([]);
      }
    } else {
      // If no saved history, push a friendly greeting
      const greeting1: Message = {
        id: crypto.randomUUID(),
        from: "bot",
        text: "Hi there! I’m your VA Resource Assistant 😊. How can I help you today?",
        timestamp: Date.now(),
      };
      const greeting2: Message = {
        id: crypto.randomUUID(),
        from: "bot",
        text: "You can ask me about benefits, health care, education, or anything VA-related!",
        timestamp: Date.now(),
      };
      setMessages([greeting1, greeting2]);
    }
  }, []);

  // Persist messages whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("vaChatbotMessages", JSON.stringify(messages));
    // Scroll to bottom when a new message arrives
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus management: when chat opens, focus input; when closes, return focus to open button
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      openButtonRef.current?.focus();
    }
  }, [open]);

  // ------------ HANDLERS ------------

  const addMessage = useCallback((from: Message["from"], text: string) => {
    const newMsg: Message = {
      id: crypto.randomUUID(),
      from,
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    addMessage("user", trimmed);
    setInput("");
    setIsTyping(true);

    // Check for simple greetings
    const lower = trimmed.toLowerCase();
    const greetingPatterns = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
    const isGreeting = greetingPatterns.some((greet) => {
      const pattern = new RegExp(`^${escapeRegex(greet)}\\b`, "i");
      return pattern.test(lower);
    });

    setTimeout(() => {
      if (isGreeting) {
        addMessage("bot", "Hello! 😊 How can I assist you with VA resources today?");
        setIsTyping(false);
        return;
      }

      // Otherwise, proceed to resource lookup
      addMessage("bot", "Let me look that up for you…");
      setTimeout(() => {
        const matches = matchResources(trimmed);
        if (matches.length > 0) {
          addMessage("bot", "Great! I found these resources for you:");
          matches.forEach((res) => {
            addMessage(
              "bot",
              `<a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.label}</a>`
            );
          });
          addMessage("bot", "Anything else I can help you with? 😊");
        } else {
          addMessage(
            "bot",
            `I’m not seeing a perfect match. Try rephrasing or check out <a href="https://www.va.gov/" target="_blank" rel="noopener noreferrer">VA.gov</a>.`
          );
          addMessage("bot", "Feel free to try another question!");
        }
        setIsTyping(false);
      }, 800);
    }, 700);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    // Wait for state update, then submit
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // ------------ RENDER ------------
  return (
    <>
      {/* Open Chatbot Button */}
      {!open && (
        <button
          ref={openButtonRef}
          className="fixed z-50 flex items-center p-4 text-white bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpen(true)}
          aria-label="Open VA Resource Chatbot"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-80 max-w-full h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="VA Resource Chatbot"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-blue-600 border-b rounded-t-xl">
            <span className="font-semibold text-white">VA Resource Chatbot</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              className="text-white rounded-full hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 px-4 py-2 space-y-3 overflow-y-auto text-sm scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-thin"
            style={{ maxHeight: "360px" }}
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 p-1 bg-blue-600 rounded-full">
                  <Cpu className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-bl-none">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pt-2 pb-1 border-t">
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((sugg) => (
                <QuickSuggestion
                  key={sugg}
                  text={sugg}
                  onClick={handleSuggestionClick}
                />
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center px-3 py-2 border-t bg-gray-50"
          >
            <input
              ref={inputRef}
              className="flex-1 px-3 py-2 mr-2 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Chat input"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={clsx(
                "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400",
                !input.trim() || isTyping
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
