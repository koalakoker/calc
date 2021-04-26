
const operators = ['=', '+', '-', '*', '/', '>', '<', '>=', '<=', '==', '!='];

function isNum(v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
}

function isOp(v) {
  for (var i = 0; i < operators.length; i++) {
    if (operators[i] == v) return true;
  }
  return false;
}

function hasDot(v: String) {
  return v.includes('.');
}

export class Token {
  static inst: Token = null ;
  tokens: Array<{}>;

  static getInst(): Token {
    if (!this.inst)
      this.inst = new Token()
    return this.inst
  }

  tokenize(fullStr: String): Array<{}> {
    this.tokens = [];
    fullStr = fullStr.trim();
    let subStr = '';
    for (var index = 0; index < fullStr.length; index++) {
      subStr += fullStr[index];
      let subStrNoTrail = subStr.trim();
      const peek = fullStr[index + 1];

      if (isNum(subStrNoTrail) && !isNum(peek)) {
        if ((peek != '.') || (hasDot(subStrNoTrail))) {
          this.tokens.push({ type: 'NUM', value: subStrNoTrail });
          subStr = '';
        }
      }

      if (subStrNoTrail == '(' || subStrNoTrail == ')') {
        subStrNoTrail == '(' ? this.tokens.push({ type: 'LPAREN' }) : this.tokens.push({ type: 'RPAREN' });
        subStr = '';
      }

      if (isOp(subStrNoTrail) && !isOp(peek)) {
        this.tokens.push({ type: 'OP', value: subStrNoTrail });
        subStr = '';
      }

      if (subStr == ';' || subStr == '\n') {
        this.tokens.push({ type: 'EOL' });
        subStr = '';
      }

      if (index == (fullStr.length - 1)) {
        this.tokens.push({ type: 'EOF' });
        subStr = '';
      }

    }

    return this.tokens;
  }
}