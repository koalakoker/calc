import { Visitor } from './visitor';

export class Evaluator {
  asts;
  visitor: Visitor;
  constructor(asts) {
    this.asts = asts
    this.visitor = new Visitor()
  }
  evaluate() {
    console.log('======================== RESULTS ========================');
    this.visitor.visitExpressions(this.asts);
  }
}