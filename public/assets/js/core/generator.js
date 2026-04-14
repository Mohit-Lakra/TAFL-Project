const MAX_LENGTH = 5;

export function generateStrings(ast, maxLen = MAX_LENGTH) {
  if (!ast) return [];
  const memo = new Map();

  const helper = (node) => {
    if (memo.has(node)) return memo.get(node);
    let result = new Set();
    switch (node.type) {
      case 'literal':
        if (maxLen >= 1) result.add(node.value);
        break;
      case 'epsilon':
        result.add('');
        break;
      case 'union': {
        const left = helper(node.left);
        const right = helper(node.right);
        result = new Set([...left, ...right]);
        break;
      }
      case 'concat': {
        const left = helper(node.left);
        const right = helper(node.right);
        for (const l of left) {
          for (const r of right) {
            const combo = l + r;
            if (combo.length <= maxLen) {
              result.add(combo);
            }
          }
        }
        break;
      }
      case 'star': {
        const child = helper(node.child);
        result.add('');
        let frontier = new Set(['']);
        while (frontier.size) {
          const next = new Set();
          for (const prefix of frontier) {
            for (const piece of child) {
              if (piece === '' && prefix === '') continue;
              const candidate = prefix + piece;
              if (candidate.length === 0 || candidate.length > maxLen) continue;
              if (!result.has(candidate)) {
                result.add(candidate);
                next.add(candidate);
              }
            }
          }
          frontier = new Set(next);
        }
        break;
      }
      default:
        throw new Error('Unsupported AST node.');
    }
    memo.set(node, result);
    return result;
  };

  return Array.from(helper(ast))
    .filter((s) => s.length <= maxLen)
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}
