import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, ShieldCheck, Leaf, Info } from 'lucide-react';
import { products } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import ProductCard from '../components/ProductCard.jsx';

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={16} fill={s <= Math.round(rating) ? '#C6A46C' : 'none'}
            className={s <= Math.round(rating) ? 'text-gold' : 'text-sand'} />
        ))}
      </div>
      <span className="text-sm text-mocha/60 font-sans">{rating} ({reviews} reviews)</span>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useLocalStorage('glowderma_wishlist', []);
  const [imgError, setImgError] = useState(false);

  const product = products.find(p => p.id === parseInt(id));
  const related = products.filter(p => p.id !== parseInt(id) && p.category === product?.category).slice(0, 4);
  const isWishlisted = wishlist.includes(product?.id);

  if (!product) {
    return (
      <main className="min-h-screen pt-28 pb-16 flex items-center justify-center" style={{ background: '#FFFDF9' }}>
        <div className="text-center">
          <h2 className="font-serif text-espresso text-2xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Product not found</h2>
          <p className="text-mocha/60 font-sans text-sm mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary text-xs">Back to Products</Link>
        </div>
      </main>
    );
  }

  const toggleWishlist = () => {
    setWishlist(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 mb-10 pt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-mocha/50 hover:text-mocha font-sans transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <span className="text-mocha/30">/</span>
          <Link to="/products" className="text-sm text-mocha/50 hover:text-mocha font-sans transition-colors">Products</Link>
          <span className="text-mocha/30">/</span>
          <span className="text-sm text-mocha font-sans">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', background: product.fallbackColor, border: '1px solid rgba(198,164,108,0.15)' }}
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
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 opacity-25">
                      <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="#C6A46C" strokeWidth="1.5"/><circle cx="32" cy="32" r="5" fill="#C6A46C"/></svg>
                    </div>
                    <span className="text-mocha/40 font-serif text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{product.category}</span>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && <span className="bg-espresso text-ivory text-xs px-2 py-0.5 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>NEW</span>}
                {product.bestseller && <span className="bg-gold text-parchment text-xs px-2 py-0.5 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>BESTSELLER</span>}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-xs text-gold tracking-widest uppercase font-sans mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.18em' }}>
              {product.brand} — {product.category}
            </p>

            <h1 className="font-display text-4xl text-espresso mb-4 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              {product.name}
            </h1>

            <StarRating rating={product.rating} reviews={product.reviews} />

            {/* Price */}
            <div className="flex items-baseline gap-4 my-6">
              <span className="font-display text-4xl text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-mocha/40 line-through font-sans text-xl">₹{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-sage text-sm font-sans">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            <div className="h-px mb-6" style={{ background: 'rgba(198,164,108,0.2)' }} />

            <p className="text-mocha/80 font-sans leading-relaxed mb-6" style={{ fontWeight: 300, fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Volume / Texture */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Volume', value: product.volume },
                { label: 'Texture', value: product.texture },
                { label: 'Finish', value: product.finish },
              ].map(({ label, value }) => (
                <div key={label} className="text-center p-3 bg-ivory border border-sand/20">
                  <p className="text-xs text-mocha/40 font-sans tracking-wider uppercase mb-1" style={{ fontSize: '0.62rem' }}>{label}</p>
                  <p className="text-xs text-espresso font-sans">{value}</p>
                </div>
              ))}
            </div>

            {/* Skin types */}
            <div className="mb-5">
              <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.65rem' }}>Best For</p>
              <div className="flex flex-wrap gap-2">
                {product.skinTypes.map(st => <span key={st} className="ingredient-chip">{st}</span>)}
              </div>
            </div>

            {/* Concerns */}
            <div className="mb-6">
              <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.65rem' }}>Addresses</p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map(c => <span key={c} className="ingredient-chip">{c}</span>)}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <Link to="/routine" className="btn-primary flex-1 justify-center text-xs" style={{ fontSize: '0.72rem' }}>
                <span>Add to My Ritual</span>
              </Link>
              <button
                onClick={toggleWishlist}
                className={`heart-btn static w-12 h-12 flex-shrink-0 rounded-none ${isWishlisted ? 'active' : ''}`}
                style={{ position: 'relative', top: 'auto', right: 'auto', borderRadius: 0 }}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWishlisted}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-parchment' : 'text-mocha'} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Details tabs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">

          {/* Ingredients */}
          <div className="bg-parchment p-7" style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
            <div className="flex items-center gap-2 mb-5">
              <Leaf size={16} className="text-sage" />
              <h2 className="font-serif text-espresso text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Key Ingredients</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <Link key={ing} to={`/ingredients`} className="ingredient-chip hover:border-gold hover:bg-gold/10 transition-all">
                  {ing}
                </Link>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-parchment p-7" style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={16} className="text-gold" />
              <h2 className="font-serif text-espresso text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits</h2>
            </div>
            <ul className="space-y-3">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-sm text-mocha/80 font-sans" style={{ fontWeight: 300 }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why This May Suit You */}
          <div className="bg-parchment p-7" style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
            <div className="flex items-center gap-2 mb-5">
              <Info size={16} className="text-amber" />
              <h2 className="font-serif text-espresso text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Why This May Suit You</h2>
            </div>
            <ul className="space-y-3">
              {[
                `Suitable for ${product.skinTypes.slice(0, 2).join(' and ')} skin`,
                `Targets ${product.concerns.slice(0, 2).join(' and ').toLowerCase()}`,
                `${product.texture} texture — easy to layer`,
                `${product.finish} finish for a natural look`,
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-sm text-mocha/80 font-sans" style={{ fontWeight: 300 }}>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-mocha/30 font-sans mt-5 leading-relaxed" style={{ fontSize: '0.62rem' }}>
              General guidance only. Not a medical claim.
            </p>
          </div>
        </div>

        {/* How to use */}
        <div className="bg-ivory p-8 mb-20" style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
          <h2 className="font-serif text-espresso text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>How to Use</h2>
          <p className="text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>
            {product.howToUse}
          </p>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl text-espresso mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              More in {product.category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
