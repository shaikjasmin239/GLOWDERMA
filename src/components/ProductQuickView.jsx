import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function ProductQuickView({ product, onClose }) {
  const [wishlist, setWishlist] = useLocalStorage('glowderma_wishlist', []);
  const [imgError, setImgError] = useState(false);
  const isWishlisted = wishlist.includes(product?.id);

  const toggleWishlist = () => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl bg-parchment overflow-hidden z-10"
          style={{ maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 100px rgba(60,48,40,0.25)' }}
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-ivory border border-sand/30 hover:bg-champagne transition-colors"
            aria-label="Close quick view"
          >
            <X size={16} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div
              className="relative"
              style={{ aspectRatio: '3/4', background: product.fallbackColor || '#EFE2D3' }}
            >
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: product.fallbackColor }}>
                  <div className="w-20 h-20 opacity-30">
                    <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="#C6A46C" strokeWidth="1.5"/><circle cx="32" cy="32" r="5" fill="#C6A46C"/></svg>
                  </div>
                </div>
              )}
              {product.new && (
                <span className="absolute top-3 left-3 bg-espresso text-ivory text-xs px-2 py-0.5 font-sans tracking-wider" style={{ fontSize: '0.6rem' }}>NEW</span>
              )}
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col">
              <p className="text-xs text-gold tracking-widest uppercase mb-1 font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                {product.brand} — {product.category}
              </p>
              <h2 className="font-serif text-espresso text-2xl mb-3 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= Math.round(product.rating) ? '#C6A46C' : 'none'} className={s <= Math.round(product.rating) ? 'text-gold' : 'text-sand'} />
                  ))}
                </div>
                <span className="text-xs text-mocha/70 font-sans">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-espresso text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-mocha/40 line-through font-sans text-lg">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-sm text-mocha/80 leading-relaxed font-sans mb-4" style={{ fontWeight: 300 }}>
                {product.description}
              </p>

              {/* Ingredients */}
              <div className="mb-4">
                <p className="text-xs text-mocha/50 tracking-widest uppercase mb-2 font-sans" style={{ fontSize: '0.65rem' }}>Key Ingredients</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map(ing => (
                    <span key={ing} className="ingredient-chip">{ing}</span>
                  ))}
                </div>
              </div>

              {/* Skin types */}
              <div className="mb-6">
                <p className="text-xs text-mocha/50 tracking-widest uppercase mb-2 font-sans" style={{ fontSize: '0.65rem' }}>Suitable For</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.skinTypes.map(st => (
                    <span key={st} className="ingredient-chip">{st}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="btn-primary flex-1 justify-center text-xs"
                  style={{ fontSize: '0.72rem' }}
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  onClick={toggleWishlist}
                  className={`heart-btn static w-11 h-11 flex-shrink-0 rounded-none ${isWishlisted ? 'active' : ''}`}
                  style={{ position: 'relative', top: 'auto', right: 'auto', borderRadius: 0 }}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-parchment' : 'text-mocha'} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
