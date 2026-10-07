import { compatibilityMatrix } from '../data/ingredients.js';

export function checkCompatibility(ingredientA, ingredientB) {
  if (!ingredientA || !ingredientB) return null;
  if (ingredientA === ingredientB) {
    return { result: 'compatible', note: 'You selected the same ingredient twice.' };
  }

  const matrixA = compatibilityMatrix[ingredientA];
  if (matrixA && matrixA[ingredientB]) {
    return matrixA[ingredientB];
  }

  const matrixB = compatibilityMatrix[ingredientB];
  if (matrixB && matrixB[ingredientA]) {
    return matrixB[ingredientA];
  }

  // Default: generally compatible with note to research
  return {
    result: 'compatible',
    note: `${ingredientA} and ${ingredientB} are generally considered compatible. Always patch test when introducing new combinations.`,
  };
}

export const compatibilityResultConfig = {
  compatible: {
    label: 'Generally Compatible',
    color: '#9BA58A',
    bg: 'rgba(155, 165, 138, 0.12)',
    icon: '✓',
    description: 'These ingredients can typically be used together in the same routine.',
  },
  caution: {
    label: 'Use with Caution',
    color: '#C6A46C',
    bg: 'rgba(198, 164, 108, 0.12)',
    icon: '⚠',
    description: 'These ingredients may be combined, but timing or method may matter. Read the note below.',
  },
  avoid: {
    label: 'Best to Avoid Together',
    color: '#B8945A',
    bg: 'rgba(184, 148, 90, 0.12)',
    icon: '✕',
    description: 'These ingredients generally don\'t pair well. Consider using on alternate days or routines.',
  },
};
