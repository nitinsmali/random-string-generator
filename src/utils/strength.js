// Estimate password strength based on length and character variety
export function estimateStrength(value, options) {
  if (!value) return { score: 0, label: 'Empty' };
  let score = 0;
  const length = value.length;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (options.upper) score += 1;
  if (options.lower) score += 1;
  if (options.numbers) score += 1;
  if (options.special) score += 1;

  const maxScore = 6;
  const pct = Math.min(1, score / maxScore);

  let label = 'Weak';
  if (pct > 0.8) label = 'Very Strong';
  else if (pct > 0.6) label = 'Strong';
  else if (pct > 0.4) label = 'Medium';

  return { score: Math.round(pct * 100), label };
}
