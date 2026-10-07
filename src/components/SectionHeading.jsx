import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <motion.div
          className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-6 h-px" style={{ background: '#C6A46C' }} />
          <span
            className={`text-xs tracking-[0.25em] uppercase font-sans ${light ? 'text-sand' : 'text-gold'}`}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.22em' }}
          >
            {eyebrow}
          </span>
          <div className="w-6 h-px" style={{ background: '#C6A46C' }} />
        </motion.div>
      )}

      <motion.h2
        className={`section-title ${light ? 'text-parchment' : 'text-espresso'}`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`mt-4 font-sans text-lg leading-relaxed max-w-xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-sand/80' : 'text-mocha/70'
          }`}
          style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
