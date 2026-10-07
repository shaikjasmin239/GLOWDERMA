import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { ingredients } from '../data/ingredients.js';
import { checkCompatibility, compatibilityResultConfig } from '../utils/compatibility.js';

function IngredientCard({ ingredient, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-parchment overflow-hidden"
      style={{ border: '1px solid rgba(198,164,108,0.15)', boxShadow: '0 2px 12px rgba(60,48,40,0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: ingredient.color, border: '1px solid rgba(198,164,108,0.2)' }}
            >
              {ingredient.icon}
            </div>
            <div>
              <h3 className="font-serif text-espresso text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {ingredient.name}
              </h3>
              <p className="text-xs text-mocha/50 font-sans mt-0.5" style={{ fontSize: '0.7rem' }}>
                {ingredient.aliases.join(' · ')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="ingredient-chip text-xs">{ingredient.category}</span>
            <ChevronRight
              size={16}
              className={`text-mocha/40 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
            />
          </div>
        </div>

        <p className="text-sm text-mocha/70 font-sans mt-3 leading-relaxed" style={{ fontWeight: 300 }}>
          {ingredient.whatItDoes}
        </p>

        {/* Best for chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {ingredient.bestFor.slice(0, 3).map(bf => (
            <span key={bf} className="ingredient-chip">{bf}</span>
          ))}
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <motion.div
          className="px-6 pb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4" style={{ borderTop: '1px solid rgba(198,164,108,0.15)' }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>What It Is</p>
                <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>{ingredient.whatItIs}</p>
              </div>
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>How to Use</p>
                <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>{ingredient.howToUse}</p>
              </div>
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>Pairs Well With</p>
                <div className="flex flex-wrap gap-1.5">
                  {ingredient.pairWell.map(p => <span key={p} className="ingredient-chip text-sage border-sage/30">{p}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>Possible Irritation</p>
                <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>{ingredient.possibleIrritation}</p>
              </div>
              {ingredient.avoidWith.length > 0 && (
                <div>
                  <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>Use with Caution</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ingredient.avoidWith.map(a => <span key={a} className="ingredient-chip text-amber border-amber/30">{a}</span>)}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.63rem' }}>Key Fact</p>
                <p className="text-sm text-gold font-sans leading-relaxed italic" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                  "{ingredient.keyFact}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function CompatibilityChecker() {
  const [ingA, setIngA] = useState('');
  const [ingB, setIngB] = useState('');
  const result = ingA && ingB ? checkCompatibility(ingA, ingB) : null;
  const config = result ? compatibilityResultConfig[result.result] : null;

  return (
    <div className="bg-parchment p-8 mb-16" style={{ border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 8px 40px rgba(60,48,40,0.08)' }}>
      <h2 className="font-serif text-espresso text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        Can I Use These Together?
      </h2>
      <p className="text-sm text-mocha/60 font-sans mb-8" style={{ fontWeight: 300 }}>
        Check ingredient compatibility for your routine. For educational purposes only.
      </p>

      <div className="grid md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-2">
          <label className="text-xs text-mocha/50 font-sans tracking-wider uppercase block mb-2" style={{ fontSize: '0.63rem' }}>Ingredient A</label>
          <select
            value={ingA}
            onChange={(e) => setIngA(e.target.value)}
            className="w-full bg-ivory border border-sand/30 px-4 py-3 text-sm font-sans text-espresso outline-none focus:border-gold/50"
            aria-label="Select first ingredient"
          >
            <option value="">Select ingredient...</option>
            {ingredients.map(ing => <option key={ing.id} value={ing.name}>{ing.name}</option>)}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-mocha/30 font-display text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>+</span>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs text-mocha/50 font-sans tracking-wider uppercase block mb-2" style={{ fontSize: '0.63rem' }}>Ingredient B</label>
          <select
            value={ingB}
            onChange={(e) => setIngB(e.target.value)}
            className="w-full bg-ivory border border-sand/30 px-4 py-3 text-sm font-sans text-espresso outline-none focus:border-gold/50"
            aria-label="Select second ingredient"
          >
            <option value="">Select ingredient...</option>
            {ingredients.map(ing => <option key={ing.id} value={ing.name}>{ing.name}</option>)}
          </select>
        </div>
      </div>

      {result && config && (
        <motion.div
          className="mt-6 p-5"
          style={{ background: config.bg, border: `1px solid ${config.color}30` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl" style={{ color: config.color }}>{config.icon}</span>
            <h3 className="font-serif text-lg text-espresso" style={{ fontFamily: 'Playfair Display, serif', color: config.color }}>
              {config.label}
            </h3>
          </div>
          <p className="text-sm text-mocha/60 font-sans mb-2" style={{ fontWeight: 300 }}>{config.description}</p>
          <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>{result.note}</p>
          <p className="text-xs text-mocha/30 font-sans mt-3" style={{ fontSize: '0.62rem' }}>
            This is general guidance only. Individual skin responses vary. Consult a dermatologist for personal advice.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function Ingredients() {
  const [search, setSearch] = useState('');

  const filtered = ingredients.filter(ing =>
    !search ||
    ing.name.toLowerCase().includes(search.toLowerCase()) ||
    ing.aliases.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
    ing.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#FFFDF9' }}>
      <div className="max-w-5xl mx-auto px-6">

        <div className="mb-12 pt-4">
          <SectionHeading
            eyebrow="Ingredient intelligence"
            title="Know Your Ingredients"
            subtitle="Science-backed profiles of the most important skincare actives."
            className="mb-8"
          />

          {/* Search */}
          <div className="flex items-center gap-3 bg-parchment px-4 py-3 border border-sand/30 max-w-md">
            <Search size={16} className="text-mocha/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-espresso placeholder-mocha/35 font-sans text-sm outline-none"
              aria-label="Search ingredients"
            />
          </div>
        </div>

        {/* Compatibility checker */}
        <CompatibilityChecker />

        {/* Ingredient cards */}
        <div className="space-y-4">
          {filtered.length > 0
            ? filtered.map((ing, i) => <IngredientCard key={ing.id} ingredient={ing} index={i} />)
            : (
              <div className="text-center py-16">
                <p className="font-serif text-espresso text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No ingredients found</p>
                <p className="text-mocha/50 font-sans text-sm" style={{ fontWeight: 300 }}>Try a different search term.</p>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
