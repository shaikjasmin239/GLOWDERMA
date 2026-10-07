import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { getSkinScores, getSkinTypeLabel, getConcernLabels, getGoalLabel, getRecommendations } from '../utils/recommendations.js';

export default function SkinProfile() {
  const [skinProfile] = useLocalStorage('glowderma_profile', null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!skinProfile) {
      navigate('/skin-analysis');
    }
  }, [skinProfile, navigate]);

  if (!skinProfile) return null;

  const scores = getSkinScores(skinProfile);
  const skinTypeLabel = getSkinTypeLabel(skinProfile.skinType);
  const concernLabels = getConcernLabels(skinProfile.concerns);
  const goalLabel = getGoalLabel(skinProfile.goal);
  const recommendations = getRecommendations(skinProfile).slice(0, 4);

  const scoreLabels = {
    balance: 'Skin Balance',
    hydration: 'Hydration',
    texture: 'Texture',
    comfort: 'Comfort',
  };

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0E7 100%)' }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold" />
            <Sparkles size={14} className="text-gold" />
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-espresso mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
            Your Skin Profile
          </h1>
          <p className="text-mocha/60 font-sans text-sm" style={{ fontWeight: 300 }}>
            Based on your responses — personalized guidance, not medical diagnosis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">

          {/* Profile Card */}
          <motion.div
            className="lg:col-span-1 bg-parchment p-8"
            style={{ border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 8px 40px rgba(60,48,40,0.08)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Skin type */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold/20">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="font-serif text-2xl text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                {skinTypeLabel}
              </h2>
            </div>

            <div className="space-y-5">
              {/* Concerns */}
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-widest uppercase mb-2" style={{ fontSize: '0.65rem' }}>
                  Primary Concerns
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {concernLabels.length > 0
                    ? concernLabels.map(c => (
                        <span key={c} className="ingredient-chip">{c}</span>
                      ))
                    : <span className="text-sm text-mocha/50 font-sans">None selected</span>
                  }
                </div>
              </div>

              {/* Sensitivity */}
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-widest uppercase mb-1" style={{ fontSize: '0.65rem' }}>Sensitivity</p>
                <p className="font-serif text-espresso capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {skinProfile.sensitivity || 'Moderate'} Sensitivity
                </p>
              </div>

              {/* Goal */}
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-widest uppercase mb-1" style={{ fontSize: '0.65rem' }}>Primary Goal</p>
                <p className="font-serif text-espresso" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {goalLabel}
                </p>
              </div>

              {/* Routine level */}
              <div>
                <p className="text-xs text-mocha/50 font-sans tracking-widest uppercase mb-1" style={{ fontSize: '0.65rem' }}>Current Routine</p>
                <p className="font-serif text-espresso capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {skinProfile.currentRoutine || 'Basic'} Routine
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(198,164,108,0.2)' }}>
              <button
                onClick={() => navigate('/skin-analysis')}
                className="flex items-center gap-2 text-mocha/50 hover:text-mocha text-xs font-sans transition-colors w-full justify-center"
              >
                <RefreshCw size={13} />
                Retake Analysis
              </button>
            </div>
          </motion.div>

          {/* Scores */}
          <motion.div
            className="lg:col-span-2 bg-parchment p-8"
            style={{ border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 8px 40px rgba(60,48,40,0.08)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="font-serif text-xl text-espresso mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Skin Scores
              </h3>
              <p className="text-xs text-mocha/50 font-sans" style={{ fontWeight: 300 }}>
                Illustrative metrics based on your selections — not clinical measurements.
              </p>
            </div>

            {Object.entries(scores).map(([key, value], i) => (
              <ProgressBar
                key={key}
                value={value}
                label={scoreLabels[key]}
                delay={i * 0.15}
              />
            ))}

            {/* Insights */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(198,164,108,0.15)' }}>
              <h4 className="font-sans text-xs tracking-widest uppercase text-mocha/50 mb-4" style={{ fontSize: '0.68rem' }}>
                Personalized Insights
              </h4>
              <div className="space-y-3">
                {[
                  `Your ${skinTypeLabel.toLowerCase()} benefits from consistent hydration and barrier support.`,
                  skinProfile.sensitivity === 'high'
                    ? 'With high sensitivity, introduce actives one at a time and always patch test.'
                    : 'You can generally tolerate a standard active routine with proper layering.',
                  `Focus on ${goalLabel.toLowerCase()} — your current routine level shows there's room to build gradually.`,
                ].map((insight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended products */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Curated for you"
            title="Recommended Products"
            subtitle="Selected based on your skin type, concerns, and goals."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/routine" className="btn-primary">
            <span>View My Routine</span>
            <ArrowRight size={15} />
          </Link>
          <Link to="/products" className="btn-outline">
            <span>Explore All Products</span>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-mocha/30 mt-10 font-sans leading-relaxed max-w-lg mx-auto" style={{ fontSize: '0.65rem' }}>
          This tool provides general skincare guidance and is not a medical diagnosis. Scores and recommendations are illustrative, based on your self-reported information. Always consult a qualified dermatologist for medical skin concerns.
        </p>
      </div>
    </main>
  );
}
