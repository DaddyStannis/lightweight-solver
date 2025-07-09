import { type Solver, Variable } from '@lume/kiwi';
import type { Point } from 'src/share/types.ts';

export class Vector3 {
  private readonly _solver: Solver;
  public readonly varX: Variable = new Variable('x');
  public readonly varY: Variable = new Variable('y');
  public readonly varZ: Variable = new Variable('z');

  constructor(solver: Solver) {
    this._solver = solver;
  }

  set x(val: number) {
    this._solver.suggestValue(this.varX, val);
  }

  get x() {
    return this.varX.value();
  }

  set y(val: number) {
    this._solver.suggestValue(this.varY, val);
  }

  get y() {
    return this.varY.value();
  }

  set z(val: number) {
    this._solver.suggestValue(this.varZ, val);
  }

  get z() {
    return this.varZ.value();
  }

  get(): Point {
    return {
      x: this.varX.value(),
      y: this.varY.value(),
      z: this.varZ.value(),
    };
  }
}
