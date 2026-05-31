import { useState, useEffect, useRef } from "react";
import { Search, Package, RefreshCw, CreditCard, User, Shield, HelpCircle, Phone, Mail, Send, Bot, Smile, ArrowRight } from "lucide-react";

export default function CustomerServicePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "aria",
      text: "Hello! 👋 I'm Aria, your Amazon Assistant. How can I help you with your orders, returns, or Prime membership today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const helpTopics = [
    {
      id: 1,
      title: "Your Orders",
      desc: "Track packages, edit shipping details, or cancel items.",
      icon: <Package size={32} className="text-orange-500" />,
      query: "track my order"
    },
    {
      id: 2,
      title: "Returns & Refunds",
      desc: "Initiate product returns, print labels, or check refund status.",
      icon: <RefreshCw size={32} className="text-green-600" />,
      query: "check my refund status"
    },
    {
      id: 3,
      title: "Prime & Memberships",
      desc: "View membership benefits, renewal dates, or cancel subscription.",
      icon: <HelpCircle size={32} className="text-sky-500" />,
      query: "how does prime membership work"
    },
    {
      id: 4,
      title: "Payment Settings",
      desc: "Manage cards, edit billing address, or resolve payment failures.",
      icon: <CreditCard size={32} className="text-red-500" />,
      query: "update my payment methods"
    },
    {
      id: 5,
      title: "Account Security",
      desc: "Change passwords, update 2FA, or manage active sessions.",
      icon: <User size={32} className="text-indigo-500" />,
      query: "how to secure my account"
    },
    {
      id: 6,
      title: "Safe Shopping Guarantee",
      desc: "Learn about secure checkout and our A-to-z safety assurance.",
      icon: <Shield size={32} className="text-emerald-600" />,
      query: "tell me about buyer protection"
    }
  ];

  // Smart bot keyword responder logic
  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes("refund") || text.includes("return") || text.includes("money") || text.includes("cashback")) {
      return "Refunds are processed back to your original payment method. Card refunds take 5-7 business days, while Amazon Pay balance refunds show up within 2 hours of package verification. 💳";
    }
    if (text.includes("order") || text.includes("track") || text.includes("package") || text.includes("delivery")) {
      return "You can track your packages in real-time under 'Your Orders'. Your current order of 'Sony Headphones' is currently in transit and scheduled to arrive Tomorrow by 8:00 PM. 🚚";
    }
    if (text.includes("prime") || text.includes("membership") || text.includes("trial")) {
      return "Amazon Prime provides free same-day shipping, Prime Video entertainment, and Prime Music. You can start a free trial or manage billing from your Prime Page. 👑";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("assist")) {
      return "Hello! I am here to help you. Ask me about refund statuses, tracking details, or setting up your Prime trial! 😊";
    }
    return "I understand your concern. If you need live assistance, click the 'Call Customer Service' button below to talk to a human agent, or email support@amazon.in. 📞";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Bot response timeout simulation
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: "aria",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="bg-[#f7f9f9] min-h-screen pb-16">
      {/* Help Portal Banner */}
      <div className="bg-[#232f3e] text-white py-8 px-4 md:px-8 shadow-inner relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mb-32" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">
            Hello. What can we help you with?
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-2 font-medium">
            Search our knowledgebase or trigger support requests immediately.
          </p>

          <div className="max-w-xl mx-auto mt-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles (e.g. refund policy, change address)..."
              className="w-full bg-white text-gray-800 pl-11 pr-4 py-2.5 rounded-md text-sm border-none shadow focus:outline-none focus:ring-2 focus:ring-[#e47911] transition"
            />
            <Search className="absolute left-4 top-3 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Help Portals Grid */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-extrabold text-gray-800 border-b pb-2 flex items-center gap-2">
            <Bot size={20} className="text-orange-500 animate-pulse" /> Self-Service Portals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpTopics
              .filter((topic) =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                topic.desc.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleSendMessage(topic.query)}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex gap-4 group"
                >
                  <div className="shrink-0">{topic.icon}</div>
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-orange-600 transition flex items-center gap-1">
                      {topic.title} <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{topic.desc}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Quick Contact Box */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 mb-3">Still need assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleSendMessage("Request Call Back from Customer Care")}
                className="flex-1 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] border border-[#a88734] py-2 rounded text-xs font-bold text-gray-900 shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <Phone size={14} /> Call Me Back Now
              </button>
              <button
                onClick={() => handleSendMessage("Send support email ticket")}
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded text-xs font-bold text-gray-700 shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <Mail size={14} /> Email Support Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Aria Support Chat Drawer */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg flex flex-col h-[520px]">
            {/* Chat Header */}
            <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-400 flex items-center justify-center relative">
                  <Bot size={20} className="text-orange-400" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-1">
                    Aria <span className="text-[10px] text-green-400 font-bold bg-green-950/60 px-1.5 py-0.5 rounded">ONLINE</span>
                  </h3>
                  <p className="text-[10px] text-gray-300">Amazon Support Assistant</p>
                </div>
              </div>
              <HelpCircle size={18} className="text-gray-400" />
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs shadow-sm ${
                    msg.sender === "user"
                      ? "bg-orange-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200/80 rounded-tl-none"
                  }`}>
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <span className={`block text-[9px] mt-1 text-right ${msg.sender === "user" ? "text-orange-200" : "text-gray-400"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200/80 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Reply Suggestions */}
            <div className="p-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendMessage("Track my recent order")}
                className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition shadow-sm"
              >
                📦 Track Order
              </button>
              <button
                onClick={() => handleSendMessage("Check refund policy details")}
                className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition shadow-sm"
              >
                💵 Refund Status
              </button>
              <button
                onClick={() => handleSendMessage("What are Prime benefits?")}
                className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition shadow-sm"
              >
                👑 Prime Membership
              </button>
            </div>

            {/* Chat Footer Input */}
            <div className="p-3 border-t bg-white flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                placeholder="Ask Aria a question..."
                className="flex-grow border rounded-md text-xs px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition shadow-md shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
