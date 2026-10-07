import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, BookOpen } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

const values = [
  {
    icon: '🔬',
    title: 'Science First',
    body: 'Every recommendation on GLOWDERMA is rooted in dermatological research and evidence-based skincare science.',
  },
  {
    icon: '🌿',
    title: 'Gentle by Default',
    body: 'We believe effective skincare doesn\'t have to be harsh. Our philosophy centers on barrier-first, sustainable skin health.',
  },
  {
    icon: '✨',
    title: 'Personalization',
    body: 'No two skins are identical. GLOWDERMA puts your unique skin at the center of every recommendation.',
  },
  {
    icon: '📖',
    title: 'Education',
    body: 'We empower you to understand your own skin — not just follow instructions. Knowledge is the best skincare tool.',
  },
];

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>

      {/* Hero */}
      <section className="py-24" style={{ background: 'linear-gradient(145deg, #F7F0E7, #EFE2D3)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gold" />
              <Sparkles size={16} className="text-gold" />
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1
              className="font-display text-6xl text-espresso mb-6 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
            >
              Your Skin.<br />
              <em style={{ color: '#B8945A', fontStyle: 'italic' }}>Understood.</em>
            </h1>
            <p className="text-mocha/70 font-sans text-xl leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
              GLOWDERMA was built on a simple belief: everyone deserves to understand their own skin — not just follow a generic routine someone else prescribed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="gold-line" />
              <h2 className="section-title mb-6">Why We Built GLOWDERMA</h2>
              <p className="text-mocha/70 font-sans leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                Skincare shelves are overwhelming. Ingredient lists are confusing. Influencer advice is contradictory. And somehow, despite thousands of products available, most people still don't know what their skin actually needs.
              </p>
              <p className="text-mocha/70 font-sans leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                GLOWDERMA was created to change that — a platform where personalized analysis, ingredient education, and daily ritual tools come together in one beautiful, accessible experience.
              </p>
              <p className="text-mocha/70 font-sans leading-relaxed" style={{ fontWeight: 300 }}>
                We don't sell products. We sell understanding. And we believe that when you truly understand your skin, everything else follows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80"
                  alt="Luxury skincare ritual"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/5', border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 20px 60px rgba(60,48,40,0.12)' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = '#EFE2D3';
                    e.target.parentElement.style.minHeight = '400px';
                  }}
                />
                <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: '#F7F0E7' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our philosophy"
            title="What We Stand For"
            centered
            className="mb-14"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                className="bg-parchment p-7"
                style={{ border: '1px solid rgba(198,164,108,0.15)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="text-3xl mb-4 block">{val.icon}</span>
                <h3 className="font-serif text-espresso text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {val.title}
                </h3>
                <p className="text-mocha/70 font-sans text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {val.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center bg-ivory p-10" style={{ border: '1px solid rgba(198,164,108,0.2)' }}>
            <Heart size={20} className="text-gold mx-auto mb-4" />
            <h3 className="font-serif text-espresso text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              A Note on Our Guidance
            </h3>
            <p className="text-mocha/60 font-sans text-sm leading-relaxed" style={{ fontWeight: 300 }}>
              GLOWDERMA provides general skincare education and personalized guidance based on your self-reported information. Our skin analysis, product recommendations, and ingredient information are for educational purposes and are not a substitute for professional medical or dermatological advice.
            </p>
            <p className="text-mocha/50 font-sans text-sm leading-relaxed mt-3" style={{ fontWeight: 300 }}>
              If you have a diagnosed skin condition, please consult a qualified dermatologist.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="section-title text-espresso mb-6">
            Ready to understand your skin?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/skin-analysis" className="btn-primary">
              <span>Start Skin Analysis</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/learn" className="btn-outline">
              <BookOpen size={15} />
              <span>Read Our Guides</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
