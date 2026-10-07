import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          className={star <= Math.round(rating) ? 'text-gold fill-gold' : 'text-sand'}
          fill={star <= Math.round(rating) ? '#C6A46C' : 'none'}
        />
      ))}
      <span className="text-xs text-mocha/60 ml-1 font-sans">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, onQuickView, index = 0 }) {
  const [wishlist, setWishlist] = useLocalStorage('glowderma_wishlist', []);
  const [imgError, setImgError] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <motion.div
      className="product-card group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
        {/* Image container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: product.fallbackColor || '#EFE2D3' }}>
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: product.fallbackColor || '#EFE2D3' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 opacity-30">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="#C6A46C" strokeWidth="1.5"/>
                    <circle cx="32" cy="32" r="14" fill="#C6A46C" fillOpacity="0.2"/>
                    <circle cx="32" cy="32" r="5" fill="#C6A46C"/>
                  </svg>
                </div>
                <span className="text-xs text-mocha/50 font-sans tracking-wider">{product.category}</span>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new && (
              <span className="bg-espresso text-ivory text-xs px-2 py-0.5 font-sans tracking-wider" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                NEW
              </span>
            )}
            {product.bestseller && (
              <span className="bg-gold text-parchment text-xs px-2 py-0.5 font-sans tracking-wider" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                BESTSELLER
              </span>
            )}
          </div>

          {/* Wishlist heart */}
          <button
            className={`heart-btn ${isWishlisted ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <Heart
              size={14}
              className={isWishlisted ? 'text-parchment fill-parchment' : 'text-mocha'}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick view overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, rgba(60,48,40,0.3) 0%, transparent 60%)' }}
          >
            <button
              onClick={handleQuickView}
              className="flex items-center gap-2 bg-parchment/95 text-espresso px-4 py-2 text-xs font-sans tracking-wider uppercase backdrop-blur-sm"
              style={{ fontSize: '0.68rem', letterSpacing: '0.1em' }}
              aria-label={`Quick view ${product.name}`}
            >
              <Eye size={13} />
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gold font-sans tracking-widest uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
            {product.category}
          </p>
          <h3 className="font-serif text-espresso text-base leading-tight mb-2 group-hover:text-amber transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.name}
          </h3>
          <StarRating rating={product.rating} />

          {/* Key ingredients chips */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.ingredients.slice(0, 2).map((ing) => (
              <span key={ing} className="ingredient-chip">
                {ing}
              </span>
            ))}
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(198,164,108,0.15)' }}>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-espresso text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-mocha/40 text-sm line-through font-sans">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div className="text-xs text-mocha/50 font-sans">{product.volume}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
