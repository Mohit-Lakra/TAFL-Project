const UNIVERSAL_SUITE = buildTestSuite(8);

function sanitizeForRegExp(expr) {
  return expr.replace(/\s+/g, '').replace(/ε/g, '(?:)');
}

function buildTestSuite(maxLen) {
  const suite = [''];
  const alphabet = ['a', 'b'];
  let currentLevel = [''];
  for (let len = 1; len <= maxLen; len += 1) {
    const nextLevel = [];
    for (const prefix of currentLevel) {
      for (const ch of alphabet) {
        nextLevel.push(prefix + ch);
      }
    }
    suite.push(...nextLevel);
    currentLevel = nextLevel;
  }
  return suite;
}

export async function verifyEquivalence(pattern1, pattern2, onProgress = () => {}) {
  const regex1 = new RegExp(`^${sanitizeForRegExp(pattern1)}$`);
  const regex2 = new RegExp(`^${sanitizeForRegExp(pattern2)}$`);
  for (let index = 0; index < UNIVERSAL_SUITE.length; index += 1) {
    const candidate = UNIVERSAL_SUITE[index];
    onProgress(candidate, index, UNIVERSAL_SUITE.length);
    if (index % 20 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    const match1 = regex1.test(candidate);
    const match2 = regex2.test(candidate);
    if (match1 !== match2) {
      return { equivalent: false, counterExample: candidate };
    }
  }
  return { equivalent: true };
}
