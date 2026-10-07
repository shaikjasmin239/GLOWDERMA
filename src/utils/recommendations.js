import { products } from '../data/products.js';

export function getRecommendations(skinProfile) {
  if (!skinProfile) return products.slice(0, 6);

  const { skinType, concerns = [], goal } = skinProfile;

  const scored = products.map((product) => {
    let score = 0;

    // Skin type match
    if (product.skinTypes.some(t => t.toLowerCase().includes(skinType?.toLowerCase() || ''))) {
      score += 3;
    }
    if (product.skinTypes.includes('All Skin Types')) {
      score += 1;
    }

    // Concern match
    concerns.forEach((concern) => {
      const concernLabel = concern.replace('-', ' ');
      if (product.concerns.some(c => c.toLowerCase().includes(concernLabel.toLowerCase()))) {
        score += 2;
      }
    });

    // Goal match
    if (goal === 'hydration' && ['Moisturizer', 'Toner', 'Serum'].includes(product.category)) score += 2;
    if (goal === 'clearer' && ['Cleanser', 'Treatment', 'Serum'].includes(product.category)) score += 2;
    if (goal === 'glow' && ['Serum', 'Treatment'].includes(product.category)) score += 2;
    if (goal === 'even-tone' && ['Serum', 'Treatment'].includes(product.category)) score += 2;
    if (goal === 'texture' && ['Treatment', 'Serum'].includes(product.category)) score += 2;
    if (goal === 'barrier' && ['Moisturizer', 'Treatment'].includes(product.category)) score += 2;
    if (goal === 'anti-aging' && ['Serum', 'Treatment'].includes(product.category)) score += 2;

    // Rating boost
    score += product.rating / 5;

    // Bestseller boost
    if (product.bestseller) score += 1;

    return { ...product, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 8);
}

export function getSkinScores(answers) {
  const base = {
    balance: 75,
    hydration: 70,
    texture: 72,
    comfort: 68,
  };

  // Adjust based on skin type
  const skinTypeAdjustments = {
    normal: { balance: 15, hydration: 10, texture: 13, comfort: 20 },
    dry: { balance: -10, hydration: -15, texture: -8, comfort: -15 },
    oily: { balance: -5, hydration: 5, texture: -8, comfort: -5 },
    combination: { balance: -3, hydration: 0, texture: 3, comfort: 4 },
    sensitive: { balance: -8, hydration: 2, texture: -7, comfort: -10 },
  };

  const adj = skinTypeAdjustments[answers.skinType] || {};
  Object.keys(adj).forEach(key => { base[key] = Math.max(30, Math.min(98, base[key] + adj[key])); });

  // Adjust based on concerns count
  const concernPenalty = (answers.concerns?.length || 0) * 2;
  Object.keys(base).forEach(key => { base[key] = Math.max(30, base[key] - concernPenalty); });

  // Sensitivity adjustment
  if (answers.sensitivity === 'high') {
    base.comfort -= 12;
    base.balance -= 8;
  } else if (answers.sensitivity === 'low') {
    base.comfort += 8;
  }

  // Clamp all values
  Object.keys(base).forEach(key => { base[key] = Math.max(35, Math.min(97, Math.round(base[key]))); });

  return base;
}

export function getSkinTypeLabel(skinType) {
  const labels = {
    normal: 'Normal Skin',
    dry: 'Dry Skin',
    oily: 'Oily Skin',
    combination: 'Combination Skin',
    sensitive: 'Sensitive Skin',
  };
  return labels[skinType] || 'Normal Skin';
}

export function getConcernLabels(concerns) {
  const labels = {
    acne: 'Acne & Blemishes',
    pigmentation: 'Pigmentation',
    dryness: 'Dryness',
    dullness: 'Dullness',
    'large-pores': 'Large Pores',
    'uneven-texture': 'Uneven Texture',
    'fine-lines': 'Fine Lines',
    sensitivity: 'Sensitivity',
  };
  return (concerns || []).map(c => labels[c] || c);
}

export function getGoalLabel(goal) {
  const labels = {
    hydration: 'Deep Hydration',
    clearer: 'Clearer-Looking Skin',
    glow: 'Natural Glow',
    'even-tone': 'Even Skin Tone',
    texture: 'Smoother Texture',
    barrier: 'Barrier Support',
    'anti-aging': 'Anti-Aging',
  };
  return labels[goal] || goal;
}
