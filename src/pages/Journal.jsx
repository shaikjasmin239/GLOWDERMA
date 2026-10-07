import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Droplets, Smile, Sun, Moon, X, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const MOODS = ['✨ Great', '😊 Good', '😐 Okay', '😔 Low', '😣 Stressed'];
const HYDRATION = ['💧 Very hydrated', '🌿 Normal', '🌵 A bit dry', '😩 Very dry'];
const COMFORT = ['🌸 Comfortable', '⚡ Slightly reactive', '🔴 Irritated', '🥲 Rough & tight'];

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateKey) {
  const d = new Date(dateKey);
  return d.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });
}

function CheckInModal({ onClose, onSave }) {
  const [mood, setMood] = useState('');
  const [hydration, setHydration] = useState('');
  const [comfort, setComfort] = useState('');
  const [notes, setNotes] = useState('');
  const [routineComplete, setRoutineComplete] = useState(false);

  const canSave = mood && hydration && comfort;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ mood, hydration, comfort, notes, routineComplete, date: getTodayKey() });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-espresso/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-parchment overflow-y-auto"
        style={{ maxHeight: '90vh', border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 40px 100px rgba(60,48,40,0.25)' }}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(198,164,108,0.15)' }}>
          <h3 className="font-serif text-espresso text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Daily Check-In</h3>
          <button onClick={onClose} className="text-mocha/50 hover:text-mocha"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mood */}
          <div>
            <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-3" style={{ fontSize: '0.65rem' }}>How are you feeling today?</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(m => (
                <button key={m} onClick={() => setMood(m)}
                  className={`ingredient-chip cursor-pointer transition-all text-sm ${mood === m ? 'border-gold bg-gold/15 text-amber' : ''}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Hydration */}
          <div>
            <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-3" style={{ fontSize: '0.65rem' }}>Skin hydration level?</p>
            <div className="flex flex-wrap gap-2">
              {HYDRATION.map(h => (
                <button key={h} onClick={() => setHydration(h)}
                  className={`ingredient-chip cursor-pointer transition-all text-sm ${hydration === h ? 'border-gold bg-gold/15 text-amber' : ''}`}>
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Comfort */}
          <div>
            <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-3" style={{ fontSize: '0.65rem' }}>Skin comfort?</p>
            <div className="flex flex-wrap gap-2">
              {COMFORT.map(c => (
                <button key={c} onClick={() => setComfort(c)}
                  className={`ingredient-chip cursor-pointer transition-all text-sm ${comfort === c ? 'border-gold bg-gold/15 text-amber' : ''}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Routine complete */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRoutineComplete(!routineComplete)}
              className={`w-6 h-6 border flex items-center justify-center transition-all ${routineComplete ? 'bg-gold border-gold' : 'border-sand/40'}`}
              aria-pressed={routineComplete}
            >
              {routineComplete && <Check size={13} className="text-parchment" />}
            </button>
            <span className="text-sm text-mocha/70 font-sans">Completed my skincare routine today</span>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-mocha/50 font-sans tracking-wider uppercase mb-2" style={{ fontSize: '0.65rem' }}>Notes (optional)</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any observations about your skin today..."
              rows={3}
              className="w-full bg-ivory border border-sand/30 px-4 py-3 text-sm font-sans text-espresso placeholder-mocha/30 outline-none focus:border-gold/50 resize-none"
              style={{ fontWeight: 300 }}
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1 text-xs justify-center">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="btn-primary flex-1 text-xs justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Check-In
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Journal() {
  const [entries, setEntries] = useLocalStorage('glowderma_journal', []);
  const [modalOpen, setModalOpen] = useState(false);

  const todayKey = getTodayKey();
  const todayEntry = entries.find(e => e.date === todayKey);

  const saveEntry = (entry) => {
    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== entry.date);
      return [entry, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
    });
  };

  const deleteEntry = (dateKey) => {
    setEntries(prev => prev.filter(e => e.date !== dateKey));
  };

  // Streak calculation
  const streak = (() => {
    if (entries.length === 0) return 0;
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      if (entries.find(e => e.date === key)) count++;
      else break;
    }
    return count;
  })();

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0E7 100%)' }}>
      <div className="max-w-4xl mx-auto px-6">

        <div className="mb-10 pt-4">
          <SectionHeading
            eyebrow="Skin journal"
            title="Your Skincare Journey"
            subtitle="Track your daily skin check-ins, consistency, and progress over time."
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Check-ins', value: entries.length, icon: Calendar },
            { label: 'Current Streak', value: `${streak} days`, icon: Sun },
            { label: 'Routines Completed', value: entries.filter(e => e.routineComplete).length, icon: Check },
          ].map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={i}
              className="bg-parchment p-5 text-center"
              style={{ border: '1px solid rgba(198,164,108,0.15)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Icon size={18} className="text-gold mx-auto mb-2" />
              <div className="font-display text-3xl text-espresso mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                {value}
              </div>
              <div className="text-xs text-mocha/50 font-sans tracking-wider" style={{ fontSize: '0.65rem' }}>{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Today's check-in CTA */}
        {!todayEntry ? (
          <motion.div
            className="bg-parchment p-8 mb-10 text-center"
            style={{ border: '1px solid rgba(198,164,108,0.2)', boxShadow: '0 4px 20px rgba(60,48,40,0.06)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sun size={24} className="text-gold mx-auto mb-3" />
            <h3 className="font-serif text-espresso text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Good day! How's your skin today?
            </h3>
            <p className="text-mocha/50 font-sans text-sm mb-6" style={{ fontWeight: 300 }}>
              Log your daily check-in to track your skin's journey over time.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold inline-flex items-center gap-2 text-xs"
            >
              <Plus size={15} />
              Log Today's Check-In
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="bg-parchment p-6 mb-10"
            style={{ border: '1px solid rgba(198,164,108,0.25)', background: 'rgba(198,164,108,0.04)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-gold" />
                <h3 className="font-serif text-espresso text-base" style={{ fontFamily: 'Playfair Display, serif' }}>Today's check-in saved!</h3>
              </div>
              <button
                onClick={() => { deleteEntry(todayKey); setModalOpen(true); }}
                className="text-xs text-mocha/40 hover:text-mocha font-sans transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="ingredient-chip">{todayEntry.mood}</span>
              <span className="ingredient-chip">{todayEntry.hydration}</span>
              <span className="ingredient-chip">{todayEntry.comfort}</span>
              {todayEntry.routineComplete && <span className="ingredient-chip border-sage/40 text-sage">✓ Routine complete</span>}
            </div>
            {todayEntry.notes && (
              <p className="text-sm text-mocha/60 font-sans mt-3 italic" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem' }}>
                "{todayEntry.notes}"
              </p>
            )}
          </motion.div>
        )}

        {/* Past entries */}
        {entries.filter(e => e.date !== todayKey).length > 0 ? (
          <div>
            <h3 className="font-sans text-xs text-mocha/50 tracking-widest uppercase mb-5" style={{ fontSize: '0.68rem' }}>Past Check-ins</h3>
            <div className="space-y-3">
              {entries.filter(e => e.date !== todayKey).map((entry, i) => (
                <motion.div
                  key={entry.date}
                  className="bg-parchment px-6 py-5 flex items-start justify-between gap-4"
                  style={{ border: '1px solid rgba(198,164,108,0.12)' }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-mocha/40 font-sans mb-2" style={{ fontSize: '0.65rem' }}>
                      {formatDate(entry.date)}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="ingredient-chip">{entry.mood}</span>
                      <span className="ingredient-chip">{entry.hydration}</span>
                      {entry.routineComplete && <span className="ingredient-chip border-sage/30 text-sage text-xs">✓ Routine</span>}
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-mocha/55 font-sans italic" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem' }}>
                        "{entry.notes}"
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.date)}
                    className="text-mocha/20 hover:text-mocha/50 transition-colors flex-shrink-0"
                    aria-label="Delete entry"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <Moon size={24} className="text-mocha/20 mx-auto mb-4" />
            <p className="font-serif text-espresso text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No entries yet</p>
            <p className="text-mocha/50 font-sans text-sm" style={{ fontWeight: 300 }}>
              Start logging your skin journey — consistency reveals patterns.
            </p>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <CheckInModal onClose={() => setModalOpen(false)} onSave={saveEntry} />
        )}
      </AnimatePresence>
    </main>
  );
}
