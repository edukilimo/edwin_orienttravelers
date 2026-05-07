import { useState, useRef, useEffect } from "react";

const TRAVEL_KEYWORDS = [
  "travel", "trip", "tour", "flight", "hotel", "destination", "vacation",
  "holiday", "adventure", "luxury", "honeymoon", "culture", "safari",
  "beach", "mountain", "cruise", "visa", "passport", "booking", "package",
  "resort", "airfare", "transport", "sightseeing", "guide", "itinerary",
  "budget", "accommodation", "explore", "escape", "journey", "country",
  "countries", "africa", "kenya", "nairobi", "mombasa", "zanzibar",
  "kilimanjaro", "serengeti", "europe", "asia", "america", "cheap", "cost",
  "price", "recommend", "suggest", "best", "where", "how to get", "train",
  "bus", "car hire", "airport", "city", "weather", "currency", "food",
  "restaurant", "attractions", "museum", "national park", "wildlife",
  "camping", "backpacking", "solo", "family", "couple", "group"
];

const isTravelRelated = (message) => {
  const lower = message.toLowerCase();
  return TRAVEL_KEYWORDS.some(keyword => lower.includes(keyword));
};

const ChatBotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I'm your Orient Travel AI Assistant. Ask me anything — cheapest trips, country info, hotel suggestions, itineraries, transport options, visa requirements, and more! 🌍✈️"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    if (!isTravelRelated(userText)) {
      setMessages(prev => [
        ...prev,
        { from: "user", text: userText },
        {
          from: "bot",
          text: "⚠️ I can only assist with travel-related questions! Try asking about destinations, hotels, flights, budgets, countries, transport, or trip suggestions. 🌍"
        }
      ]);
      return;
    }

    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const conversationHistory = messages
        .filter(m => m.from === "user" || m.from === "bot")
        .map(m => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text
        }));

      conversationHistory.push({ role: "user", content: userText });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Orient Travel Assistant — a friendly, expert travel AI for Orient Travellers, a travel company. 
          
You help users with:
- Trip planning and itineraries
- Country information (visa, currency, weather, culture, safety)
- Budget travel tips and cheapest options
- Hotel, resort, and accommodation recommendations
- Flight and transport options (trains, buses, car hire)
- Tour packages (luxury, adventure, honeymoon, cultural, safari)
- Best time to visit destinations
- Local food and restaurant tips
- Travel documents and requirements

Always be warm, enthusiastic, and helpful. Give specific, actionable advice. 
Format responses clearly — use bullet points or short paragraphs. Keep answers concise but comprehensive.
If asked about Orient Travellers packages specifically, mention they offer Luxury, Adventure, Honeymoon, and Cultural packages.
Only answer travel-related questions.`,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      const botReply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again!";

      setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "⚠️ Connection error. Please check your internet and try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.chatBox}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <span style={styles.headerIcon}>🌍</span>
              <div>
                <div style={styles.headerTitle}>Orient Travel AI</div>
                <div style={styles.headerSub}>Always here to help</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.from === "user" ? styles.userBubble : styles.botBubble}>
                {msg.from === "bot" && <span style={styles.botAvatar}>🤖</span>}
                <div style={msg.from === "user" ? styles.userMsg : styles.botMsg}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={styles.botBubble}>
                <span style={styles.botAvatar}>🤖</span>
                <div style={styles.botMsg}>
                  <span style={styles.typing}>Thinking</span>
                  <span style={styles.dot1}>.</span>
                  <span style={styles.dot2}>.</span>
                  <span style={styles.dot3}>.</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about trips, hotels, countries..."
              disabled={loading}
            />
            <button style={loading ? styles.sendBtnDisabled : styles.sendBtn} onClick={sendMessage} disabled={loading}>
              ➤
            </button>
          </div>
        </div>
      )}
        {/* FAB Button */}
        <button 
          style={styles.fab} 
          onClick={() => setIsOpen(!isOpen)}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={styles.fabIcon}>💬</span>
          <span style={styles.fabText}>AI Assistant</span>
        </button>
    </div>
  );
};

// At the top with other styles, update or replace:
const styles = {
  // ... keep all your other styles ...

  wrapper: { 
    position: "fixed", 
    bottom: "24px", 
    right: "24px", 
    zIndex: 10000, 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "flex-end" 
  },

  fab: {
    display: "flex", 
    alignItems: "center", 
    gap: "8px",
    backgroundColor: "#f97316", 
    border: "none", 
    borderRadius: "28px",
    padding: "12px 20px", 
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(249,115,22,0.6)",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "14px",
    transition: "all 0.2s ease"
  },
  fabIcon: { fontSize: "20px" },
  fabText: { color: "white", fontWeight: "700", letterSpacing: "0.3px" },
  chatBox: {
    width: "340px", height: "480px", backgroundColor: "#fff",
    borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
    display: "flex", flexDirection: "column", marginBottom: "12px", overflow: "hidden"
  },
  header: {
    background: "linear-gradient(135deg, #1e3a5f, #2d6a9f)",
    color: "white", padding: "14px 16px",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  headerIcon: { fontSize: "28px" },
  headerTitle: { fontWeight: "bold", fontSize: "15px" },
  headerSub: { fontSize: "11px", opacity: 0.8 },
  closeBtn: { background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" },
  messages: { flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#f8faff" },
  botBubble: { display: "flex", alignItems: "flex-start", gap: "6px" },
  userBubble: { display: "flex", justifyContent: "flex-end" },
  botAvatar: { fontSize: "18px", marginTop: "2px" },
  botMsg: {
    backgroundColor: "#fff", border: "1px solid #e2e8f0",
    padding: "9px 13px", borderRadius: "0 12px 12px 12px",
    fontSize: "13px", maxWidth: "82%", lineHeight: "1.5",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)", whiteSpace: "pre-wrap"
  },
  userMsg: {
    backgroundColor: "#f97316", color: "white",
    padding: "9px 13px", borderRadius: "12px 12px 0 12px",
    fontSize: "13px", maxWidth: "82%", lineHeight: "1.5"
  },
  typing: { fontSize: "13px", color: "#666" },
  dot1: { animation: "blink 1.4s infinite 0s", fontSize: "16px" },
  dot2: { animation: "blink 1.4s infinite 0.2s", fontSize: "16px" },
  dot3: { animation: "blink 1.4s infinite 0.4s", fontSize: "16px" },
  inputRow: {
    display: "flex", borderTop: "1px solid #eee",
    padding: "10px", backgroundColor: "#fff", gap: "8px"
  },
  input: {
    flex: 1, border: "1px solid #ddd", borderRadius: "20px",
    padding: "8px 14px", fontSize: "13px", outline: "none"
  },
  sendBtn: {
    backgroundColor: "#f97316", color: "white", border: "none",
    borderRadius: "50%", width: "36px", height: "36px",
    cursor: "pointer", fontSize: "16px", display: "flex",
    alignItems: "center", justifyContent: "center"
  },
  sendBtnDisabled: {
    backgroundColor: "#ccc", color: "white", border: "none",
    borderRadius: "50%", width: "36px", height: "36px",
    cursor: "not-allowed", fontSize: "16px"
  }
};

export default ChatBotComponent;