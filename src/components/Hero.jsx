import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// Hero text reveal animation using Framer Motion (ThreeUI-inspired editorial reveal)
function HeroHeadline() {
  const lines = ['YOUR SKIN.', 'UNDERSTOOD.'];
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    },
  };
  const char = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div aria-label="YOUR SKIN. UNDERSTOOD.">
      {lines.map((line, li) => (
        <motion.div
          key={li}
          className="overflow-hidden"
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ lineHeight: li === 1 ? '1.05' : '1.0' }}
        >
          <div className="flex flex-wrap">
            {line.split('').map((ch, ci) => (
              <motion.span
                key={`${li}-${ci}`}
                variants={char}
                className="hero-headline"
                style={{
                  display: 'inline-block',
                  whiteSpace: ch === ' ' ? 'pre' : 'normal',
                  color: li === 1 ? '#C6A46C' : '#3C3028',
                  fontStyle: li === 1 ? 'italic' : 'normal',
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Floating product illustration
function FloatingProducts({ prefersReducedMotion }) {
  const floatingProducts = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80',
      label: 'Serum',
      style: { top: '5%', right: '8%', width: '140px' },
      animate: prefersReducedMotion ? {} : {
        y: [0, -18, 0],
        rotate: [0, 2, 0],
        transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      },
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=300&q=80',
      label: 'Cream',
      style: { top: '38%', right: '2%', width: '110px' },
      animate: prefersReducedMotion ? {} : {
        y: [0, 14, 0],
        x: [0, -6, 0],
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 },
      },
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=300&q=80',
      label: 'SPF',
      style: { bottom: '12%', right: '16%', width: '100px' },
      animate: prefersReducedMotion ? {} : {
        y: [0, -10, 0],
        rotate: [0, -3, 0],
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 },
      },
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80',
      label: 'Cleanser',
      style: { top: '60%', right: '0%', width: '125px' },
      animate: prefersReducedMotion ? {} : {
        y: [0, 12, 0],
        x: [0, 8, 0],
        transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
      },
    },
  ];

  const botanicalLeaves = [
    { style: { top: '20%', right: '30%', width: '80px', opacity: 0.35 }, rotate: [0, 5, 0], dur: 12 },
    { style: { bottom: '25%', right: '40%', width: '55px', opacity: 0.25 }, rotate: [0, -4, 0], dur: 14 },
    { style: { top: '70%', left: '15%', width: '65px', opacity: 0.2 }, rotate: [0, 6, 0], dur: 11 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Botanical leaves */}
      {botanicalLeaves.map((leaf, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={leaf.style}
          animate={prefersReducedMotion ? {} : {
            rotate: leaf.rotate,
            transition: { duration: leaf.dur, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40 110 C20 80 5 50 10 20 C15 -5 65 -5 70 20 C75 50 60 80 40 110Z"
              fill="#9BA58A"
              fillOpacity="0.5"
            />
            <path
              d="M40 110 C40 80 40 50 40 20"
              stroke="#6D5C4D"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating Products */}
      {floatingProducts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={p.style}
          animate={p.animate}
        >
          <div
            className="overflow-hidden shadow-2xl"
            style={{
              borderRadius: '4px',
              boxShadow: '0 20px 60px rgba(60,48,40,0.18), 0 4px 16px rgba(198,164,108,0.12)',
            }}
          >
            <img
              src={p.img}
              alt={p.label}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '3/4' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = '#EFE2D3';
                e.target.parentElement.style.minHeight = '120px';
              }}
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-mocha/60 mt-2 font-sans tracking-widest uppercase">
            {p.label}
          </p>
        </motion.div>
      ))}

      {/* Soft glow orb */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,164,108,0.08) 0%, transparent 70%)',
          transform: 'translate(50%, -50%)',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 85}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 15,
  }));

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0E7 50%, #FAF4EC 100%)' }}
      aria-label="Hero section"
    >
      {/* Particles */}
      {!prefersReducedMotion && particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(198,164,108,0.06) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left — Typography */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Intelligent Skincare
              </span>
            </motion.div>

            {/* Main Headline */}
            <HeroHeadline />

            {/* Supporting text */}
            <motion.p
              className="mt-8 text-mocha/80 font-sans text-lg leading-relaxed max-w-md"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Personalized skincare guidance designed around{' '}
              <em style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#B8945A' }}>
                your skin
              </em>
              , your concerns, and your daily ritual.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Link to="/skin-analysis" className="btn-primary">
                <Sparkles size={15} />
                <span>Analyze My Skin</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/routine" className="btn-outline">
                <span>Explore Routines</span>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              {[
                { label: '10K+', sub: 'Routines' },
                { label: '150+', sub: 'Ingredients' },
                { label: '4.9/5', sub: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                  <div className="text-xs text-mocha/60 font-sans tracking-wider mt-0.5" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Product Composition */}
          <motion.div
            className="relative hidden lg:block"
            style={{ height: '600px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <FloatingProducts prefersReducedMotion={prefersReducedMotion} />

            {/* Main central feature image */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ y: prefersReducedMotion ? 0 : yParallax }}
            >
              <div className="relative w-72 h-96">
                <img
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80"
                  alt="Premium skincare ritual — toner and botanical elements"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: '2px',
                    boxShadow: '0 30px 80px rgba(60,48,40,0.2), 0 8px 24px rgba(198,164,108,0.15)',
                  }}
                  onError={(e) => {
                    e.target.style.background = '#EFE2D3';
                  }}
                />
                {/* Gold frame accent */}
                <div
                  className="absolute -inset-3 pointer-events-none"
                  style={{
                    border: '1px solid rgba(198,164,108,0.3)',
                    borderRadius: '2px',
                  }}
                />
                {/* Tag */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-parchment px-6 py-2 flex items-center gap-2 whitespace-nowrap"
                  style={{
                    border: '1px solid rgba(198,164,108,0.25)',
                    boxShadow: '0 8px 30px rgba(60,48,40,0.1)',
                  }}
                >
                  <Sparkles size={12} className="text-gold" />
                  <span className="text-xs text-mocha font-sans tracking-[0.15em] uppercase" style={{ fontSize: '0.68rem' }}>
                    Curated for your skin
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="text-xs text-mocha/40 font-sans tracking-widest uppercase" style={{ fontSize: '0.62rem', letterSpacing: '0.15em' }}>
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
            animate={prefersReducedMotion ? {} : { scaleY: [1, 0.3, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
