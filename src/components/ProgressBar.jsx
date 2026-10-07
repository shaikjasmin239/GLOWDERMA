import { motion } from 'framer-motion';

export default function ProgressBar({ value, label, delay = 0, color = '#C6A46C' }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-sans tracking-wider text-mocha/70 uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.1em' }}>
          {label}
        </span>
        <motion.span
          className="font-serif text-espresso text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ background: `linear-gradient(to right, ${color}, ${color}bb)` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
