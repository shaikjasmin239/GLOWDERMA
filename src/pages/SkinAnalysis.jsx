import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import QuizOption from '../components/QuizOption.jsx';
import { quizSteps } from '../data/quiz.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function SkinAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [, setSkinProfile] = useLocalStorage('glowderma_profile', null);
  const navigate = useNavigate();

  const step = quizSteps[currentStep];
  const isMulti = step?.type === 'multi';
  const currentAnswer = answers[step?.id];

  const selectOption = (value) => {
    if (isMulti) {
      const prev = currentAnswer || [];
      const updated = prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value];
      setAnswers(a => ({ ...a, [step.id]: updated }));
    } else {
      setAnswers(a => ({ ...a, [step.id]: value }));
    }
  };

  const canProceed = isMulti
    ? (currentAnswer?.length ?? 0) > 0
    : !!currentAnswer;

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      // Save profile and navigate
      setSkinProfile(answers);
      navigate('/skin-profile');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0E7 100%)' }}>
      {/* Decorative top bg element */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(198,164,108,0.06), transparent)' }} />

      <div className="max-w-2xl mx-auto px-6">
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
            Let's Understand<br />
            <em className="text-amber" style={{ fontStyle: 'italic' }}>Your Skin.</em>
          </h1>
          <p className="text-mocha/60 font-sans text-sm" style={{ fontWeight: 300 }}>
            Answer a few questions to receive your personalized skin profile.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-mocha/50 font-sans tracking-wider">Step {currentStep + 1} of {quizSteps.length}</span>
            <span className="text-xs text-mocha/50 font-sans">{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-parchment p-8 mb-8"
            style={{ border: '1px solid rgba(198,164,108,0.18)', boxShadow: '0 8px 40px rgba(60,48,40,0.08)' }}
          >
            <h2 className="font-serif text-2xl text-espresso mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {step.question}
            </h2>
            <p className="text-mocha/50 font-sans text-sm mb-7" style={{ fontWeight: 300 }}>
              {step.subtitle}
              {isMulti && <span className="text-gold ml-1">(Select all that apply)</span>}
            </p>

            <div className="space-y-2.5">
              {step.options.map((option) => {
                const selected = isMulti
                  ? (currentAnswer || []).includes(option.value)
                  : currentAnswer === option.value;
                return (
                  <QuizOption
                    key={option.value}
                    option={option}
                    selected={selected}
                    onSelect={selectOption}
                    multiSelect={isMulti}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-mocha/60 hover:text-mocha transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-sans text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={canProceed ? { x: 4 } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
          >
            <span>{currentStep === quizSteps.length - 1 ? 'See My Profile' : 'Continue'}</span>
            <ArrowRight size={15} />
          </motion.button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-mocha/30 mt-8 font-sans leading-relaxed" style={{ fontSize: '0.65rem' }}>
          This tool provides general skincare guidance and is not a medical diagnosis.<br />
          Results are for educational and illustrative purposes only.
        </p>
      </div>
    </main>
  );
}
