import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Explore: [
    { to: '/skin-analysis', label: 'Skin Analysis' },
    { to: '/routine', label: 'Daily Ritual' },
    { to: '/products', label: 'Products' },
    { to: '/ingredients', label: 'Ingredients' },
  ],
  Learn: [
    { to: '/learn', label: 'Skincare Guide' },
    { to: '/journal', label: 'Journal' },
    { to: '/about', label: 'Our Story' },
    { to: '/learn/sunscreen-basics', label: 'SPF 101' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="relative pt-20 pb-12"
      style={{ background: '#3C3028', color: '#FAF4EC' }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(198,164,108,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <circle cx="14" cy="14" r="13" stroke="#C6A46C" strokeWidth="1.5"/>
                <circle cx="14" cy="14" r="7" fill="#C6A46C" fillOpacity="0.15"/>
                <circle cx="14" cy="14" r="3" fill="#C6A46C"/>
              </svg>
              <span className="tracking-[0.25em] text-sm text-parchment/90" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.28em' }}>
                GLOWDERMA
              </span>
            </div>
            <p className="text-parchment/50 font-sans text-sm leading-relaxed mb-8 max-w-xs" style={{ fontWeight: 300 }}>
              Personalized skincare guidance designed around your skin, your concerns, and your daily ritual.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-sand mb-3 font-sans" style={{ fontSize: '0.68rem' }}>
                Join The Glow Letter
              </p>
              {subscribed ? (
                <motion.p
                  className="text-sage text-sm font-sans"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Welcome to the ritual. Your skin will thank you.
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-stretch">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border border-sand/20 px-4 py-3 text-parchment/80 placeholder-parchment/30 text-sm font-sans outline-none focus:border-gold/50 transition-colors"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-gold text-parchment px-4 py-3 hover:bg-amber transition-colors flex-shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`GLOWDERMA on ${label}`}
                  className="w-9 h-9 border border-sand/20 flex items-center justify-center text-parchment/50 hover:text-gold hover:border-gold/40 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-sand mb-5 font-sans" style={{ fontSize: '0.68rem' }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-parchment/50 hover:text-parchment text-sm font-sans transition-colors"
                      style={{ fontWeight: 300 }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'rgba(198,164,108,0.1)' }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-parchment/30 text-xs font-sans">
            © 2026 GLOWDERMA. For educational purposes only.
          </p>
          <p className="text-parchment/30 text-xs font-sans italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "Your Skin. Understood."
          </p>
          <p className="text-parchment/20 text-xs font-sans">
            Not a medical service. Always consult a dermatologist.
          </p>
        </div>
      </div>
    </footer>
  );
}
