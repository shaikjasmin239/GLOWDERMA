import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import { articles } from '../data/articles.js';

export default function ArticleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);
  const related = articles.filter(a => a.slug !== slug).slice(0, 2);

  if (!article) {
    return (
      <main className="min-h-screen pt-28 pb-16 flex items-center justify-center" style={{ background: '#FFFDF9' }}>
        <div className="text-center">
          <h2 className="font-serif text-espresso text-2xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Article not found</h2>
          <Link to="/learn" className="btn-primary text-xs mt-4">Back to Learn</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <motion.div
          className="mb-10 pt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-mocha/50 hover:text-mocha font-sans transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Learn
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-gold tracking-widest uppercase font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.18em' }}>
              {article.category}
            </span>
            <span className="text-mocha/20">·</span>
            <div className="flex items-center gap-1.5 text-xs text-mocha/40 font-sans">
              <Clock size={12} />
              {article.readTime}
            </div>
            <span className="text-mocha/20">·</span>
            <span className="text-xs text-mocha/40 font-sans">{article.date}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-espresso mb-6 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
            {article.title}
          </h1>

          <p className="text-mocha/70 font-sans text-lg leading-relaxed" style={{ fontWeight: 300 }}>
            {article.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {article.tags.map(tag => (
              <span key={tag} className="ingredient-chip">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="overflow-hidden mb-14"
          style={{ aspectRatio: '16/7', background: '#EFE2D3' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {article.content.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-serif text-espresso text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {section.heading}
              </h2>
              <p className="text-mocha/80 font-sans leading-relaxed text-lg" style={{ fontWeight: 300, lineHeight: 1.85 }}>
                {section.body}
              </p>
            </div>
          ))}

          {/* Divider */}
          <div className="section-divider my-14" />

          {/* Editorial note */}
          <div
            className="p-6 mb-10"
            style={{ background: 'rgba(198,164,108,0.06)', border: '1px solid rgba(198,164,108,0.2)', borderLeft: '3px solid #C6A46C' }}
          >
            <p className="text-mocha/70 font-sans text-sm leading-relaxed italic" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
              This article is for general educational purposes. Always consult a qualified dermatologist for personalized skincare advice, especially if you have a diagnosed skin condition.
            </p>
          </div>
        </motion.div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-sans text-xs text-mocha/50 tracking-widest uppercase mb-8" style={{ fontSize: '0.68rem' }}>
              Continue Reading
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} to={`/learn/${rel.slug}`} className="group flex gap-4 bg-parchment p-5"
                  style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#EFE2D3' }}>
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gold font-sans tracking-wider uppercase" style={{ fontSize: '0.6rem' }}>{rel.category}</span>
                    <h4 className="font-serif text-espresso text-base leading-tight mt-1 group-hover:text-amber transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {rel.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-mocha/40 font-sans mt-1">
                      <Clock size={11} /> {rel.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/learn" className="btn-outline text-xs inline-flex">
            <span>Browse All Articles</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
