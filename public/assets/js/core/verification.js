const { flat: UNIVERSAL_SUITE, levels: UNIVERSAL_LEVELS } = buildTestSuite(8);

function sanitizeForRegExp(expr) {
  return expr.replace(/\s+/g, '').replace(/ε/g, '(?:)');
}

function buildTestSuite(maxLen) {
  const alphabet = ['a', 'b'];
  const levels = [['']];
  const flat = [''];
  let currentLevel = [''];
  for (let len = 1; len <= maxLen; len += 1) {
    const nextLevel = [];
    for (const prefix of currentLevel) {
      for (const ch of alphabet) {
        nextLevel.push(prefix + ch);
      }
    }
    levels.push(nextLevel);
    flat.push(...nextLevel);
    currentLevel = nextLevel;
  }
  return { levels, flat };
}

export async function verifyEquivalence(pattern1, pattern2, onProgress = () => {}) {
  const regex1 = new RegExp(`^${sanitizeForRegExp(pattern1)}$`);
  const regex2 = new RegExp(`^${sanitizeForRegExp(pattern2)}$`);
  let processed = 0;
  for (let len = 0; len < UNIVERSAL_LEVELS.length; len += 1) {
    const level = UNIVERSAL_LEVELS[len];
    const sample = level[0] ?? '';
    onProgress(sample, processed, UNIVERSAL_SUITE.length, len);
    for (const candidate of level) {
      const match1 = regex1.test(candidate);
      const match2 = regex2.test(candidate);
      if (match1 !== match2) {
        return { equivalent: false, counterExample: candidate };
      }
      processed += 1;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return { equivalent: true };
}
