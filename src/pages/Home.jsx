import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductQuickView from '../components/ProductQuickView.jsx';
import { products } from '../data/products.js';
import { concerns } from '../data/concerns.js';
import { articles } from '../data/articles.js';

// ─── Stats section
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { value: '10K+', label: 'Personalized routines', suffix: '' },
    { value: '150+', label: 'Ingredients explored', suffix: '' },
    { value: '50+', label: 'Skin concerns addressed', suffix: '' },
    { value: '4.9', label: 'User satisfaction', suffix: '/5' },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: '#FAF4EC' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="By the numbers"
          title="Skincare, Made Personal."
          centered
          className="mb-16"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <div
                className="font-display text-5xl lg:text-6xl text-espresso mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
              >
                {stat.value}
                <span className="text-gold text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-xs text-mocha/60 font-sans tracking-wider uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
              <div className="w-8 h-px bg-gold/40 mx-auto mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skin Concerns
function ConcernsSection() {
  const navigate = useNavigate();
  return (
    <section className="py-24" style={{ background: '#FFFDF9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Find your focus"
          title="What Does Your Skin Need?"
          subtitle="Explore personalized insights based on your skin concern."
          className="mb-14"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {concerns.map((concern, i) => (
            <motion.div
              key={concern.id}
              className="concern-card group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => navigate(`/products?concern=${concern.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/products?concern=${concern.id}`)}
              aria-label={`Explore products for ${concern.label}`}
            >
              {/* Image */}
              <div className="relative w-full h-full" style={{ minHeight: '200px' }}>
                <img
                  src={concern.image}
                  alt={concern.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = concern.color;
                  }}
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(60,48,40,0.65) 0%, rgba(60,48,40,0.1) 60%, transparent 100%)' }}
                />
                {/* Gold line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-parchment font-serif text-lg leading-tight transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {concern.label}
                  </h3>
                  <p className="text-parchment/60 text-xs font-sans mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {concern.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Premium Carousel (custom skewed-style)
function ProductCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featured = products.slice(0, 8);
  const navigate = useNavigate();

  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #3C3028 0%, #6D5C4D 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Glow Edit"
          title="Essentials for Your Ritual."
          subtitle="Thoughtfully selected skincare for every step of your daily routine."
          light
          className="mb-14"
        />

        {/* Horizontal scroll carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                className="flex-shrink-0 cursor-pointer group"
                style={{
                  width: '220px',
                  scrollSnapAlign: 'start',
                  transform: `skewY(${i % 2 === 0 ? '-1deg' : '1deg'})`,
                }}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={{ skewY: 0, scale: 1.02, zIndex: 10 }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    aspectRatio: '3/4',
                    background: product.fallbackColor,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                    border: '1px solid rgba(198,164,108,0.15)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="text-gold text-xs tracking-widest uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>
                    {String(i + 1).padStart(2, '0')} — {product.category}
                  </p>
                  <h3 className="text-parchment font-serif text-sm mt-1 group-hover:text-gold transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {product.name}
                  </h3>
                  <p className="text-parchment/50 text-xs font-sans mt-0.5">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/products" className="btn-outline" style={{ borderColor: 'rgba(198,164,108,0.5)', color: '#FAF4EC' }}>
            <span>View All Products</span>
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials
function Testimonials() {
  const testimonials = [
    { name: 'Aanya Mehta', skinType: 'Combination', quote: 'I finally understand what my skin actually needs. The personalized routine changed everything.', rating: 5 },
    { name: 'Priya Sharma', skinType: 'Dry Skin', quote: 'The ingredient guide is incredible. I used to buy random products — now my routine is intentional.', rating: 5 },
    { name: 'Rhea Nair', skinType: 'Sensitive', quote: 'GlowGuide helped me understand niacinamide in 2 minutes. My skin has never been calmer.', rating: 5 },
    { name: 'Ishaan Kapoor', skinType: 'Oily Skin', quote: 'Finally a skincare platform that doesn\'t feel like it\'s just trying to sell me things. Genuinely educational.', rating: 5 },
  ];

  return (
    <section className="py-24" style={{ background: '#F7F0E7' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="From the community"
          title="Real Skin. Real Stories."
          centered
          className="mb-16"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 bg-parchment"
              style={{ border: '1px solid rgba(198,164,108,0.15)', boxShadow: '0 4px 20px rgba(60,48,40,0.06)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill="#C6A46C" className="text-gold" />
                ))}
              </div>
              <blockquote className="text-mocha/80 font-sans text-sm leading-relaxed italic mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic' }}>
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-sans text-sm font-medium text-espresso">{t.name}</p>
                <p className="text-xs text-mocha/50 font-sans tracking-wider" style={{ fontSize: '0.65rem' }}>{t.skinType}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Learn section
function LearnSection() {
  return (
    <section className="py-24" style={{ background: '#FFFDF9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <SectionHeading
            eyebrow="Knowledge"
            title="Learn Your Skin."
            subtitle="Science-backed skincare education, beautifully simplified."
          />
          <Link to="/learn" className="btn-outline text-xs">
            <span>All Articles</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/learn/${article.slug}`} className="group block">
                <div className="overflow-hidden mb-4" style={{ aspectRatio: '16/10', background: '#EFE2D3' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    loading="lazy"
                  />
                </div>
                <span className="text-xs text-gold tracking-widest uppercase font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  {article.category}
                </span>
                <h3 className="font-serif text-espresso text-xl mt-1.5 mb-2 group-hover:text-amber transition-colors leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {article.title}
                </h3>
                <p className="text-mocha/60 text-sm font-sans leading-relaxed" style={{ fontWeight: 300 }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-mocha/40 font-sans">
                  <span>{article.readTime}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner
function CTABanner() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F4EADF 0%, #EFE2D3 50%, #D8C0A0 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-32 h-32 opacity-10">
          <svg viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="58" stroke="#C6A46C" strokeWidth="1"/>
            <circle cx="60" cy="60" r="40" stroke="#C6A46C" strokeWidth="0.5"/>
            <circle cx="60" cy="60" r="20" stroke="#C6A46C" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 w-48 h-48 opacity-8">
          <svg viewBox="0 0 80 120" fill="none">
            <path d="M40 110 C20 80 5 50 10 20 C15 -5 65 -5 70 20 C75 50 60 80 40 110Z" fill="#9BA58A" fillOpacity="0.5"/>
          </svg>
        </div>
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4 font-sans" style={{ fontSize: '0.68rem' }}>
            Your skin journey starts here
          </p>
          <h2 className="section-title text-espresso mb-6">
            Know Your Skin.<br />
            <em style={{ fontFamily: 'Cormorant Garamond, serif', color: '#B8945A', fontStyle: 'italic' }}>Build Your Ritual.</em>
          </h2>
          <p className="text-mocha/70 font-sans text-lg mb-10 leading-relaxed" style={{ fontWeight: 300 }}>
            Take our 2-minute skin analysis and receive a personalized routine crafted around your unique skin profile.
          </p>
          <Link to="/skin-analysis" className="btn-primary inline-flex">
            <span>Start Your Analysis</span>
            <ArrowRight size={15} />
          </Link>
          <p className="text-xs text-mocha/40 mt-4 font-sans">
            Free · No account required · 2 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Home Page
export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featuredProducts = products.filter(p => p.bestseller).slice(0, 4);

  return (
    <main>
      <Hero />
      <StatsSection />
      <ConcernsSection />
      <ProductCarousel />

      {/* Featured products */}
      <section className="py-24" style={{ background: '#FFFDF9' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <SectionHeading
              eyebrow="Editor's picks"
              title="The Glow Edit"
              subtitle="Thoughtfully selected essentials for your daily ritual."
            />
            <Link to="/products" className="btn-outline text-xs">
              <span>Shop All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <LearnSection />
      <CTABanner />

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
