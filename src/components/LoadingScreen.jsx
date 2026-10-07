import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#FFFDF9' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
              <circle cx="24" cy="24" r="22" stroke="#C6A46C" strokeWidth="1"/>
              <circle cx="24" cy="24" r="12" fill="#C6A46C" fillOpacity="0.12"/>
              <circle cx="24" cy="24" r="5" fill="#C6A46C"/>
              <circle cx="24" cy="24" r="5" fill="#C6A46C" className="animate-ping" fillOpacity="0.2"/>
            </svg>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1
              className="text-espresso tracking-[0.35em] text-lg uppercase mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, letterSpacing: '0.38em' }}
            >
              GLOWDERMA
            </h1>
            <p
              className="text-mocha/50 text-xs tracking-[0.2em] italic"
              style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em' }}
            >
              Your Skin. Understood.
            </p>
          </motion.div>

          {/* Gold line progress */}
          <motion.div
            className="mt-10 w-32 h-px overflow-hidden"
            style={{ background: 'rgba(198,164,108,0.2)' }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(to right, transparent, #C6A46C, transparent)' }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
