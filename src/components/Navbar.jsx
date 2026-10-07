import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/skin-analysis', label: 'Skin Analysis' },
  { to: '/routine', label: 'Routine' },
  { to: '/products', label: 'Products' },
  { to: '/ingredients', label: 'Ingredients' },
  { to: '/journal', label: 'Journal' },
  { to: '/learn', label: 'Learn' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist] = useLocalStorage('glowderma_wishlist', []);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="GLOWDERMA Home">
              <div className="w-7 h-7 relative">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="13" stroke="#C6A46C" strokeWidth="1.5"/>
                  <circle cx="14" cy="14" r="7" fill="#C6A46C" fillOpacity="0.15"/>
                  <circle cx="14" cy="14" r="3" fill="#C6A46C"/>
                </svg>
              </div>
              <span
                className="text-espresso font-display tracking-[0.2em] text-sm font-medium uppercase"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.25em' }}
              >
                GLOWDERMA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `gold-underline text-xs font-sans tracking-widest uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-amber active'
                        : 'text-mocha hover:text-espresso'
                    }`
                  }
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em' }}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-mocha hover:text-espresso transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/products"
                className="relative text-mocha hover:text-espresso transition-colors"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-parchment text-xs rounded-full flex items-center justify-center font-sans font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <Link
                to="/skin-analysis"
                className="hidden md:flex btn-gold text-xs py-2.5 px-5 items-center gap-1.5"
                style={{ fontSize: '0.7rem' }}
              >
                <Sparkles size={13} />
                <span>Analyze My Skin</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-espresso"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-32 bg-espresso/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              className="w-full max-w-xl mx-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSearch}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center bg-parchment border border-sand/40 px-5 py-4 gap-3">
                <Search size={18} className="text-sand flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-espresso placeholder-sand font-sans text-sm outline-none"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-mocha hover:text-espresso">
                  <X size={18} />
                </button>
              </div>
              <p className="text-center text-xs text-mocha/60 mt-3 font-sans tracking-wider">
                Press Enter to search
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-espresso/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 bg-parchment flex flex-col lg:hidden"
              style={{ boxShadow: '-20px 0 60px rgba(60, 48, 40, 0.12)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-sand/20">
                <span className="font-display text-espresso tracking-[0.2em] text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  GLOWDERMA
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-mocha">
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-8 py-8">
                {navLinks.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-4 border-b border-sand/15 group ${
                          isActive ? 'text-amber' : 'text-mocha'
                        }`
                      }
                    >
                      <span className="font-serif text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{label}</span>
                      <ChevronRight size={16} className="text-sand group-hover:text-gold transition-colors" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-8 py-8 border-t border-sand/20">
                <Link
                  to="/skin-analysis"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full justify-center text-xs"
                  style={{ fontSize: '0.72rem' }}
                >
                  <Sparkles size={14} />
                  <span>Analyze My Skin</span>
                </Link>
                <p className="text-center text-xs text-mocha/50 mt-4 font-sans tracking-wider">
                  Your Skin. Understood.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
