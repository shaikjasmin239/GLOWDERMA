import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import ProductQuickView from '../components/ProductQuickView.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { products, categories, skinTypeOptions, concernOptions, ingredientOptions } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wishlist] = useLocalStorage('glowderma_wishlist', []);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('All');
  const [skinType, setSkinType] = useState('All Skin Types');
  const [concern, setConcern] = useState(searchParams.get('concern') ? searchParams.get('concern').replace('-', ' ') : '');
  const [sort, setSort] = useState('recommended');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
    const c = searchParams.get('concern');
    if (c) setConcern(c.replace('-', ' '));
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (showWishlistOnly) {
      result = result.filter(p => wishlist.includes(p.id));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (skinType !== 'All Skin Types') {
      result = result.filter(p =>
        p.skinTypes.some(st => st.toLowerCase().includes(skinType.toLowerCase()) || st === 'All Skin Types')
      );
    }

    if (concern.trim()) {
      const c = concern.toLowerCase();
      result = result.filter(p =>
        p.concerns.some(pc => pc.toLowerCase().includes(c))
      );
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)); break;
    }

    return result;
  }, [search, category, skinType, concern, sort, showWishlistOnly, wishlist]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSkinType('All Skin Types');
    setConcern('');
    setSort('recommended');
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  const hasFilters = search || category !== 'All' || skinType !== 'All Skin Types' || concern || showWishlistOnly;

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 pt-4">
          <SectionHeading
            eyebrow="Product explorer"
            title="Discover Your Products"
            subtitle="Explore curated skincare, filtered by your skin's unique needs."
          />
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="flex-1 min-w-64 flex items-center gap-3 bg-parchment px-4 py-3 border border-sand/30">
            <Search size={16} className="text-mocha/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products, ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-espresso placeholder-mocha/35 font-sans text-sm outline-none"
              aria-label="Search products"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-mocha/30 hover:text-mocha">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-parchment border border-sand/30 px-4 py-3 text-sm font-sans text-espresso outline-none focus:border-gold/50 cursor-pointer"
            aria-label="Filter by category"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-parchment border border-sand/30 px-4 py-3 text-sm font-sans text-espresso outline-none focus:border-gold/50 cursor-pointer"
            aria-label="Sort products"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* More filters */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 border text-sm font-sans transition-all ${
              filtersOpen || hasFilters ? 'bg-espresso text-ivory border-espresso' : 'bg-parchment border-sand/30 text-mocha'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
          </button>

          {/* Wishlist toggle */}
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            className={`flex items-center gap-2 px-4 py-3 border text-sm font-sans transition-all ${
              showWishlistOnly ? 'bg-gold text-parchment border-gold' : 'bg-parchment border-sand/30 text-mocha hover:border-gold/40'
            }`}
            aria-pressed={showWishlistOnly}
          >
            <Heart size={15} fill={showWishlistOnly ? 'currentColor' : 'none'} />
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="bg-parchment p-6 mb-8 border border-sand/20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Skin type */}
              <div>
                <label className="text-xs text-mocha/50 font-sans tracking-wider uppercase block mb-3" style={{ fontSize: '0.65rem' }}>Skin Type</label>
                <div className="flex flex-wrap gap-2">
                  {skinTypeOptions.map(st => (
                    <button
                      key={st}
                      onClick={() => setSkinType(st === skinType ? 'All Skin Types' : st)}
                      className={`ingredient-chip cursor-pointer transition-all ${skinType === st ? 'border-gold bg-gold/15 text-amber' : ''}`}
                      aria-pressed={skinType === st}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern */}
              <div>
                <label className="text-xs text-mocha/50 font-sans tracking-wider uppercase block mb-3" style={{ fontSize: '0.65rem' }}>Skin Concern</label>
                <div className="flex flex-wrap gap-2">
                  {concernOptions.map(c => (
                    <button
                      key={c}
                      onClick={() => setConcern(concern.toLowerCase() === c.toLowerCase() ? '' : c)}
                      className={`ingredient-chip cursor-pointer transition-all ${concern.toLowerCase() === c.toLowerCase() ? 'border-gold bg-gold/15 text-amber' : ''}`}
                      aria-pressed={concern.toLowerCase() === c.toLowerCase()}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-mocha/50 hover:text-mocha font-sans transition-colors flex items-center gap-1.5">
                    <X size={12} /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-mocha/60 font-sans">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {search && <span> for "<em>{search}</em>"</span>}
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-gold hover:text-amber font-sans transition-colors">
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-6 opacity-20">
              <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="#C6A46C" strokeWidth="1.5"/><circle cx="32" cy="32" r="5" fill="#C6A46C"/></svg>
            </div>
            <h3 className="font-serif text-espresso text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No products found</h3>
            <p className="text-mocha/50 font-sans text-sm mb-6" style={{ fontWeight: 300 }}>
              {showWishlistOnly ? 'Your wishlist is empty. Explore products and save your favourites.' : 'Try adjusting your search or filters.'}
            </p>
            <button onClick={clearFilters} className="btn-outline text-xs">
              <X size={14} />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
}
