export const curatedExamples = [
  {
    title: 'Synchronous Blocks',
    regex1: '(ab|ε)(ab)*',
    regex2: '(ab)*',
    equivalent: true,
  },
  {
    title: 'Optional Prefix',
    regex1: '(a|ε)b*',
    regex2: '(ab*|b*)',
    equivalent: true,
  },
  {
    title: 'All Binary Strings',
    regex1: '(a*b*)*',
    regex2: '(a|b)*',
    equivalent: true,
  },
  {
    title: 'Terminal Symbol Contrast',
    regex1: '(a|b)*a',
    regex2: '(a|b)*b',
    equivalent: false,
  },
  {
    title: 'Order of Blocks',
    regex1: 'a*b*',
    regex2: 'b*a*',
    equivalent: false,
  },
  {
    title: 'Alternating Patterns',
    regex1: '(ab)*',
    regex2: '(ba)*',
    equivalent: false,
  },
];
