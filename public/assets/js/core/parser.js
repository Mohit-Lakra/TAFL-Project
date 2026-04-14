export class RegexParser {
  constructor(input) {
    this.input = input.replace(/\s+/g, '');
    this.position = 0;
  }

  parse() {
    if (!this.input) {
      throw new Error('Expression cannot be empty.');
    }
    const node = this.parseExpression();
    if (this.position < this.input.length) {
      throw new Error(`Unexpected token "${this.peek()}" at position ${this.position + 1}.`);
    }
    return node;
  }

  parseExpression() {
    let node = this.parseConcat();
    if (!node) {
      throw new Error('Expression requires an operand; check operators and parentheses.');
    }
    while (this.match('|')) {
      const right = this.parseConcat();
      if (!right) {
        throw new Error('Union operator requires a right operand.');
      }
      node = { type: 'union', left: node, right };
    }
    return node;
  }

  parseConcat() {
    const nodes = [];
    while (true) {
      const term = this.parseKleene();
      if (!term) break;
      nodes.push(term);
    }
    if (!nodes.length) {
      return null;
    }
    return nodes.reduce((acc, node) => {
      if (!acc) return node;
      return { type: 'concat', left: acc, right: node };
    }, null);
  }

  parseKleene() {
    const primary = this.parsePrimary();
    if (!primary) return null;
    let node = primary;
    let starApplied = false;
    while (this.match('*')) {
      if (starApplied) {
        throw new Error('Consecutive Kleene stars (e.g., a**) are invalid.');
      }
      node = { type: 'star', child: node };
      starApplied = true;
    }
    return node;
  }

  parsePrimary() {
    const char = this.peek();
    if (!char) return null;
    if (char === '(') {
      this.consume();
      const expr = this.parseExpression();
      if (!this.match(')')) {
        throw new Error('Missing closing parenthesis.');
      }
      return expr;
    }
    if (char === 'ε') {
      this.consume();
      return { type: 'epsilon' };
    }
    if (char === 'a' || char === 'b') {
      this.consume();
      return { type: 'literal', value: char };
    }
    if (char === '|' || char === ')') {
      return null;
    }
    throw new Error(`Invalid token "${char}". Only a, b, ε, (, ), |, * are allowed.`);
  }

  match(expected) {
    if (this.peek() === expected) {
      this.consume();
      return true;
    }
    return false;
  }

  peek() {
    return this.input[this.position];
  }

  consume() {
    this.position += 1;
  }
}
