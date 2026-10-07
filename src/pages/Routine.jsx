import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Check, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { morningRoutine, eveningRoutine } from '../data/routines.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

function RoutineStep({ step, completed, onToggle, index, period }) {
  const [showInfo, setShowInfo] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="flex gap-5 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Step number & line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all duration-300 cursor-pointer"
          style={{
            background: completed ? '#C6A46C' : 'transparent',
            color: completed ? '#FFFDF9' : '#C6A46C',
            border: `1px solid ${completed ? '#C6A46C' : 'rgba(198,164,108,0.4)'}`,
          }}
          onClick={onToggle}
          role="checkbox"
          aria-checked={completed}
          aria-label={`Mark ${step.name} as ${completed ? 'incomplete' : 'complete'}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        >
          {completed ? <Check size={14} /> : step.step}
        </div>
        {index < (period === 'morning' ? morningRoutine.length - 1 : eveningRoutine.length - 1) && (
          <div className="w-px flex-1 mt-2" style={{ background: completed ? 'rgba(198,164,108,0.4)' : 'rgba(198,164,108,0.15)', minHeight: '40px' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div
          className="bg-parchment p-5 transition-all duration-300 group-hover:shadow-md"
          style={{
            border: `1px solid ${completed ? 'rgba(198,164,108,0.35)' : 'rgba(198,164,108,0.15)'}`,
            background: completed ? 'rgba(198,164,108,0.04)' : undefined,
          }}
        >
          <div className="flex items-start gap-4">
            {/* Product thumbnail */}
            <div
              className="w-14 h-14 flex-shrink-0 overflow-hidden"
              style={{ background: '#EFE2D3', border: '1px solid rgba(198,164,108,0.2)' }}
            >
              {!imgError ? (
                <img
                  src={step.image}
                  alt={step.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-5 h-5 opacity-30">
                    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#C6A46C" strokeWidth="1"/></svg>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-serif text-base leading-tight transition-colors ${completed ? 'text-gold' : 'text-espresso'}`}
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {step.name}
                  </h3>
                  <p className="text-xs text-mocha/60 font-sans mt-0.5" style={{ fontWeight: 300 }}>
                    {step.purpose}
                  </p>
                </div>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-mocha/30 hover:text-gold transition-colors flex-shrink-0 mt-0.5"
                  aria-label="Show how to use"
                >
                  <Info size={15} />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="ingredient-chip">
                  {step.keyIngredient}
                </span>
                <span className="text-xs text-mocha/40 font-sans">{step.duration}</span>
              </div>
            </div>
          </div>

          {/* Expanded info */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(198,164,108,0.15)' }}>
                  <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-1" style={{ fontSize: '0.63rem' }}>How to use</p>
                  <p className="text-sm text-mocha/80 font-sans leading-relaxed" style={{ fontWeight: 300 }}>
                    {step.howToUse}
                  </p>
                  {step.productId && (
                    <Link
                      to={`/products/${step.productId}`}
                      className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-amber transition-colors font-sans mt-3"
                    >
                      View Product →
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Routine() {
  const [morningCompleted, setMorningCompleted] = useLocalStorage('glowderma_morning_completed', []);
  const [eveningCompleted, setEveningCompleted] = useLocalStorage('glowderma_evening_completed', []);
  const [activeTab, setActiveTab] = useState('morning');

  const currentRoutine = activeTab === 'morning' ? morningRoutine : eveningRoutine;
  const completed = activeTab === 'morning' ? morningCompleted : eveningCompleted;
  const setCompleted = activeTab === 'morning' ? setMorningCompleted : setEveningCompleted;

  const toggleStep = (stepNum) => {
    setCompleted(prev =>
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const completedCount = currentRoutine.filter(s => completed.includes(s.step)).length;

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0E7 100%)' }}>
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            eyebrow="Daily Ritual"
            title="Your Daily Ritual"
            subtitle="Build consistency with a routine designed for your skin. Tap the step numbers to mark them complete."
            centered
          />
        </motion.div>

        {/* Tab toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex bg-ivory border border-sand/30 p-1">
            {[
              { key: 'morning', label: 'Morning', Icon: Sun },
              { key: 'evening', label: 'Evening', Icon: Moon },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-espresso text-ivory'
                    : 'text-mocha/60 hover:text-mocha'
                }`}
                style={{ fontSize: '0.68rem', letterSpacing: '0.12em' }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="flex items-center justify-between mb-8 px-2"
          layout
        >
          <span className="font-serif text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {completedCount}/{currentRoutine.length} completed
          </span>
          <div className="flex items-center gap-3">
            <div className="progress-track w-32">
              <motion.div
                className="progress-fill"
                animate={{ width: `${(completedCount / currentRoutine.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <button
              onClick={() => setCompleted([])}
              className="text-xs text-mocha/40 hover:text-mocha font-sans transition-colors"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Routine steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentRoutine.map((step, i) => (
              <RoutineStep
                key={step.step}
                step={step}
                completed={completed.includes(step.step)}
                onToggle={() => toggleStep(step.step)}
                index={i}
                period={activeTab}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Completion celebration */}
        {completedCount === currentRoutine.length && (
          <motion.div
            className="text-center py-8 mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-serif text-espresso text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {activeTab === 'morning' ? 'Morning' : 'Evening'} Ritual Complete!
            </h3>
            <p className="text-mocha/60 font-sans text-sm" style={{ fontWeight: 300 }}>
              Consistency is the most important skincare ingredient.
            </p>
          </motion.div>
        )}

        {/* Note */}
        <div className="mt-12 p-5 bg-ivory" style={{ border: '1px solid rgba(198,164,108,0.15)' }}>
          <p className="text-xs text-mocha/50 font-sans leading-relaxed text-center" style={{ fontWeight: 300 }}>
            This routine is a general recommendation. For a personalized routine based on your skin profile, take our{' '}
            <Link to="/skin-analysis" className="text-gold hover:text-amber transition-colors">Skin Analysis</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
