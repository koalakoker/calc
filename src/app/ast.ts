export interface Visitable {
  visit(visitor);
};

export class Binary implements Visitable {
  left;
  right;
  operator;
  constructor(left, operator, right) {
    this.left = left
    this.right = right
    this.operator = operator
  }
  visit(visitor) {
    return visitor.visitBinary(this)
  }
}

export class Literal implements Visitable {
  value;
  constructor(value) {
    this.value = value
  }
  visit(visitor) {
    return visitor.visitLiteral(this)
  }
}

export class Grouping implements Visitable {
  expr;
  constructor(expr) {
    this.expr = expr
  }
  visit(visitor) {
    return visitor.visitGrouping(this)
  }
}