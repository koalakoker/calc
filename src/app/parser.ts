/**
 * Using Recursive Descent algorithm
 * 
 */

import { Token } from './token';
import { Binary, Literal, Grouping } from './ast';

export class Parser {
  static inst;
  index;
  tokens;
  expr;

  init() {
    this.index = 0
    this.tokens = null
    this.expr = []
  }
  
  private constructor() {
    this.init();
  }

  static getInst() {
    if (!this.inst)
      this.inst = new Parser()
    return this.inst
  }

  advance() {
    this.index++
  }
  
  peep() { return this.tokens(this.index + 1) }
  
  current() { return this.tokens[this.index] }
  
  parse(str: String) {
    this.init();
    const tokenizer = Token.getInst()
    const tokens = tokenizer.tokenize(str)
    this.tokens = tokens
    while (this.current().type != 'EOF') {
      const expr = this.add()
      if (expr)
        this.expr.push(expr)
    }
    return this.expr
  }

  add() {
    const left = this.sub()
    if (this.current().value == '+') {
      this.advance()
      return new Binary(left, 'ADD', this.sub())
    }
    return left
  }

  sub() {
    const left = this.mul()
    if (this.current().value == '-') {
      this.advance()
      return new Binary(left, 'SUB', this.mul())
    }
    return left
  }

  mul() {
    const left = this.div()
    if (this.current().value == '*') {
      this.advance()
      return new Binary(left, 'MUL', this.div())
    }
    return left
  }

  div() {
    const left = this.primary()
    if (this.current().value == '/') {
      this.advance()
      return new Binary(left, 'DIV', this.primary())
    }
    return left
  }

  primary() {
    const curr = this.current()
    this.advance()
    if (curr.type == 'NUM')
      return new Literal(curr.value)
    if (curr.type == 'LPAREN') {
      const expr = this.add()
      this.advance()
      return new Grouping(expr)
    }
  }
}