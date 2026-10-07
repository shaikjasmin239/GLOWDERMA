import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Sparkles } from 'lucide-react';

const responses = {
  greeting: {
    triggers: ['hi', 'hello', 'hey', 'start', 'help'],
    response: "Hello! I'm GlowGuide ✨ I'm here to help with skincare questions, routine advice, and ingredient guidance. What can I help you with today?",
    options: ['Morning routine help', 'Night routine help', 'Recommend a serum', 'What is niacinamide?', 'How to use retinol?'],
  },
  morning: {
    triggers: ['morning routine', 'morning', 'am routine'],
    response: "A simple, effective morning routine:\n\n1️⃣ Gentle cleanser — removes overnight buildup\n2️⃣ Toner — balances pH\n3️⃣ Vitamin C serum — antioxidant protection\n4️⃣ Moisturizer — hydration\n5️⃣ SPF 30-50+ — non-negotiable!\n\nAlways end with sunscreen — it protects everything you've worked for.",
    options: ['What sunscreen to use?', 'Can I skip toner?', 'Tell me about Vitamin C'],
  },
  night: {
    triggers: ['night routine', 'evening routine', 'pm routine', 'night'],
    response: "Your evening routine is for repair and renewal:\n\n1️⃣ Double cleanse — removes SPF + makeup\n2️⃣ Exfoliant (2-3x/week) — AHA or BHA\n3️⃣ Treatment serum — retinol or niacinamide\n4️⃣ Rich moisturizer — overnight repair\n\nNote: Don't use retinol and AHA on the same night.",
    options: ['Tell me about retinol', 'What is AHA?', 'What moisturizer for night?'],
  },
  niacinamide: {
    triggers: ['niacinamide', 'vitamin b3', 'b3'],
    response: "Niacinamide (Vitamin B3) is one of the most versatile skincare ingredients! ✨\n\n• Minimizes pore appearance\n• Brightens skin tone\n• Controls sebum production\n• Strengthens the skin barrier\n\nUse at 5-10% concentration, AM or PM. It's generally suitable for all skin types and highly compatible with most other actives.",
    options: ['Can I use with Vitamin C?', 'What products have niacinamide?', 'Tell me about Vitamin C'],
  },
  retinol: {
    triggers: ['retinol', 'retin', 'vitamin a', 'anti aging', 'anti-aging'],
    response: "Retinol is considered the gold-standard for anti-aging ⭐\n\nHow to start:\n• Begin 2x per week at 0.025-0.1%\n• Gradually increase frequency\n• Always use PM — never AM\n• Expect a 4-6 week 'retinization' period (mild dryness/peeling is normal)\n• Always follow with SPF during the day\n\nPair with ceramides and hyaluronic acid to minimize irritation.",
    options: ['What can I combine with retinol?', 'Night routine help', 'Tell me about ceramides'],
  },
  vitaminC: {
    triggers: ['vitamin c', 'ascorbic', 'brightening serum', 'brightening'],
    response: "Vitamin C is your morning antioxidant MVP! 🍋\n\n• Brightens and evens skin tone\n• Fights free radical damage\n• Supports collagen synthesis\n• Fades dark spots over time\n\nBest used in the morning before SPF. L-Ascorbic Acid is most potent (5-20%). For sensitive skin, try stabilized derivatives like ascorbyl glucoside.",
    options: ['What can I combine with Vitamin C?', 'Tell me about SPF', 'Morning routine help'],
  },
  ceramides: {
    triggers: ['ceramide', 'barrier', 'barrier repair', 'sensitive skin', 'dry skin'],
    response: "Ceramides are the 'glue' of your skin barrier 🛡️\n\nThey make up ~50% of the outer skin layer, preventing moisture loss and protecting against irritants.\n\nIf your skin is:\n• Dry or tight → you need ceramides\n• Reactive or sensitive → ceramides will help\n• Post-actives (after retinol/AHAs) → ceramides recover your barrier\n\nThey're incredibly gentle and pair well with everything.",
    options: ['Tell me about retinol', 'Night routine help', 'What is hyaluronic acid?'],
  },
  hyaluronic: {
    triggers: ['hyaluronic acid', 'hyaluronic', 'ha serum', 'dry', 'dehydrated', 'hydration'],
    response: "Hyaluronic acid is nature's best humectant 💧\n\nIt can hold up to 1000x its weight in water, plumping and hydrating skin.\n\nPro tip: Apply to slightly damp skin and follow with a moisturizer to seal it in. In very dry climates, HA can draw moisture from your skin instead — that's why the moisturizer seal is key.",
    options: ['How to layer skincare?', 'Tell me about ceramides', 'Morning routine help'],
  },
  spf: {
    triggers: ['spf', 'sunscreen', 'sun protection', 'uv'],
    response: "SPF is the single most impactful anti-aging step you can take ☀️\n\n• Use SPF 30+ daily, even indoors\n• Apply as the LAST step in AM routine\n• Use about 1/4 teaspoon for your face\n• Reapply every 2 hours when outdoors\n• Both mineral and chemical sunscreens are effective\n\nNo serum will undo the damage UV causes every day.",
    options: ['Morning routine help', 'Tell me about Vitamin C', 'What is hyaluronic acid?'],
  },
  compatibility: {
    triggers: ['combine', 'together', 'compatible', 'mix', 'layer', 'can i use'],
    response: "Great question! Here are key compatibility notes:\n\n✅ Safe to combine:\n• Niacinamide + Hyaluronic Acid\n• Ceramides + everything\n• SPF + everything\n\n⚠️ Use with caution:\n• Vitamin C + Niacinamide (use AM/PM split)\n• Retinol + AHAs (alternate nights)\n\nVisit our Ingredients page for the full compatibility checker! 🔬",
    options: ['Tell me about retinol', 'Tell me about niacinamide', 'Morning routine help'],
  },
  default: {
    response: "That's a great skincare question! For personalized guidance, I'd recommend taking our Skin Analysis quiz — it creates a custom routine just for you ✨\n\nIn the meantime, feel free to ask about specific ingredients or routines!",
    options: ['Morning routine help', 'Night routine help', 'What is niacinamide?', 'Tell me about retinol'],
  },
};

function findResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(responses)) {
    if (key === 'default' || key === 'greeting') continue;
    if (val.triggers?.some(t => lower.includes(t))) {
      return val;
    }
  }
  if (responses.greeting.triggers.some(t => lower.includes(t))) {
    return responses.greeting;
  }
  return responses.default;
}

export default function GlowGuide() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm GlowGuide ✨ Your personalized skincare assistant. Ask me about routines, ingredients, or product recommendations!" },
  ]);
  const [input, setInput] = useState('');
  const [options, setOptions] = useState(['Morning routine help', 'Night routine help', 'What is niacinamide?', 'Tell me about retinol']);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setInput('');
    setOptions([]);
    setTyping(true);

    setTimeout(() => {
      const res = findResponse(userMsg);
      setMessages(prev => [...prev, { from: 'bot', text: res.response }]);
      setOptions(res.options || responses.default.options);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-espresso text-ivory flex items-center justify-center shadow-2xl"
        style={{ borderRadius: '50%', boxShadow: '0 8px 30px rgba(60,48,40,0.3)' }}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open GlowGuide assistant"
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ scale: 0.5, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.5 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
              <Sparkles size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 bg-parchment flex flex-col"
            style={{
              height: '520px',
              maxHeight: 'calc(100vh - 120px)',
              border: '1px solid rgba(198,164,108,0.2)',
              boxShadow: '0 20px 60px rgba(60,48,40,0.18)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="GlowGuide skincare assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(198,164,108,0.15)', background: 'rgba(247,240,231,0.8)' }}>
              <div className="w-9 h-9 bg-gold/20 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-espresso text-sm font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>GlowGuide</h3>
                <p className="text-xs text-mocha/50 font-sans">Your skincare companion</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                <span className="text-xs text-mocha/50 font-sans">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 bg-gold/15 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Sparkles size={12} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={msg.from === 'user'
                      ? 'bg-espresso text-ivory px-4 py-3 text-sm font-sans max-w-[80%] leading-relaxed'
                      : 'glowguide-bubble whitespace-pre-line'
                    }
                    style={{ borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : undefined }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gold/15 rounded-full flex items-center justify-center">
                    <Sparkles size={12} className="text-gold" />
                  </div>
                  <div className="glowguide-bubble flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gold"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick options */}
              {options.length > 0 && !typing && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(opt)}
                      className="text-xs text-mocha border border-sand/40 px-3 py-1.5 font-sans hover:bg-champagne hover:border-gold transition-all"
                      style={{ borderRadius: '14px', fontSize: '0.72rem' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2" style={{ borderTop: '1px solid rgba(198,164,108,0.1)', background: 'rgba(247,240,231,0.5)' }}>
              <p className="text-center text-xs text-mocha/35 font-sans" style={{ fontSize: '0.6rem' }}>
                GlowGuide provides general skincare education, not medical advice.
              </p>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderTop: '1px solid rgba(198,164,108,0.15)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about routines, ingredients..."
                className="flex-1 bg-transparent text-espresso placeholder-mocha/40 text-sm font-sans outline-none py-1"
                aria-label="Type your skincare question"
              />
              <button
                type="submit"
                className="w-8 h-8 bg-espresso text-ivory flex items-center justify-center hover:bg-mocha transition-colors flex-shrink-0"
                style={{ borderRadius: '50%' }}
                aria-label="Send message"
              >
                <ChevronRight size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
