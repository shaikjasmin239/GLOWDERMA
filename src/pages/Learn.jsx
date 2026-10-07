import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { articles } from '../data/articles.js';

const categoryColors = {
  Routine: '#EFE2D3',
  Education: '#FAF4EC',
  Ingredients: '#D8C0A0',
  Protection: '#F4EADF',
};

export default function Learn() {
  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="mb-14 pt-4">
          <SectionHeading
            eyebrow="Skincare education"
            title="Learn Your Skin"
            subtitle="Science-backed guides, ingredient deep-dives, and routine frameworks — beautifully simplified."
          />
        </div>

        {/* Featured article */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to={`/learn/${articles[0].slug}`} className="group grid lg:grid-cols-2 gap-0 overflow-hidden bg-parchment"
            style={{ border: '1px solid rgba(198,164,108,0.18)', boxShadow: '0 8px 40px rgba(60,48,40,0.08)' }}>
            <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#EFE2D3'; }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-espresso text-ivory text-xs px-3 py-1 font-sans tracking-wider" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  FEATURED
                </span>
              </div>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="text-xs text-gold tracking-widest uppercase font-sans mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.18em' }}>
                {articles[0].category}
              </span>
              <h2 className="font-serif text-espresso text-3xl leading-tight mb-4 group-hover:text-amber transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                {articles[0].title}
              </h2>
              <p className="text-mocha/70 font-sans leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                {articles[0].excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-mocha/40 font-sans">
                  <Clock size={12} />
                  {articles[0].readTime}
                </div>
                <span className="text-mocha/20">·</span>
                <span className="text-xs text-mocha/40 font-sans">{articles[0].date}</span>
              </div>
              <div className="flex items-center gap-2 mt-6 text-gold group-hover:text-amber transition-colors font-sans text-sm">
                Read Article <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Categories row */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All', 'Routine', 'Ingredients', 'Education', 'Protection'].map(cat => (
            <button
              key={cat}
              className="ingredient-chip cursor-pointer text-sm px-4 py-2"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/learn/${article.slug}`} className="group block bg-parchment overflow-hidden"
                style={{ border: '1px solid rgba(198,164,108,0.15)', transition: 'box-shadow 0.3s ease' }}>
                <div className="overflow-hidden" style={{ aspectRatio: '16/9', background: categoryColors[article.category] || '#EFE2D3' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-gold tracking-widest uppercase font-sans" style={{ fontSize: '0.62rem', letterSpacing: '0.15em' }}>
                      {article.category}
                    </span>
                    <span className="text-mocha/20">·</span>
                    <div className="flex items-center gap-1 text-xs text-mocha/40 font-sans">
                      <Clock size={11} />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="font-serif text-espresso text-xl leading-tight mb-3 group-hover:text-amber transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-mocha/60 font-sans text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="ingredient-chip" style={{ fontSize: '0.6rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
