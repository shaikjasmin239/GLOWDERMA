import { motion } from 'framer-motion';

export default function QuizOption({ option, selected, onSelect, multiSelect = false }) {
  return (
    <motion.button
      onClick={() => onSelect(option.value)}
      className={`w-full text-left p-4 border transition-all duration-300 group ${
        selected
          ? 'border-gold bg-gold/8'
          : 'border-sand/30 hover:border-gold/50 hover:bg-warm'
      }`}
      style={{
        background: selected ? 'rgba(198,164,108,0.08)' : undefined,
      }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={selected}
      role={multiSelect ? 'checkbox' : 'radio'}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <span className="text-2xl flex-shrink-0 w-10 text-center">{option.icon}</span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className={`font-serif text-base leading-tight transition-colors ${selected ? 'text-amber' : 'text-espresso group-hover:text-espresso'}`}
            style={{ fontFamily: 'Playfair Display, serif' }}>
            {option.label}
          </div>
          {option.description && (
            <div className="text-xs text-mocha/60 font-sans mt-0.5" style={{ fontWeight: 300 }}>
              {option.description}
            </div>
          )}
        </div>

        {/* Indicator */}
        <div
          className={`w-5 h-5 flex-shrink-0 border flex items-center justify-center transition-all ${
            selected ? 'border-gold bg-gold' : 'border-sand/40'
          }`}
          style={{ borderRadius: multiSelect ? '2px' : '50%' }}
        >
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-parchment"
              style={{ borderRadius: multiSelect ? '1px' : '50%' }}
            />
          )}
        </div>
      </div>
    </motion.button>
  );
}
