import { Binary, Grouping, Literal, Visitable } from "./ast"

/**
 *  Binary Expressions
 *  *,/,-,+
 */
export class Visitor {

  visitBinary(ctx: Binary) {
    const type = ctx.operator
    switch (type) {
      case 'ADD':
        return ctx.left.visit(this) + ctx.right.visit(this)
      case 'SUB':
        return ctx.left.visit(this) - ctx.right.visit(this)
      case 'MUL':
        return ctx.left.visit(this) * ctx.right.visit(this)
      case 'DIV':
        return ctx.left.visit(this) / ctx.right.visit(this)
    }
  }

  visitLiteral(ctx: Literal) {
    return Number(ctx.value)
  }

  visitGrouping(expr: Grouping) {
    console.log("visitGrouping expr:" + expr);
    const e = expr.expr
    return e.visit(this)
  }

  visitExpressions(expressions: Array<Visitable>) {
    for (const expr of expressions) {
      console.log(expr.visit(this))
    }
  }
}