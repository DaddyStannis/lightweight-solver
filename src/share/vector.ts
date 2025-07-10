import { type Solver, Variable } from '@lume/kiwi';
import type { Point } from 'src/share/types.ts';

export class Vector3 {
  private readonly _solver: Solver;
  private readonly _x: Variable = new Variable('x');
  private readonly _y: Variable = new Variable('y');
  private readonly _z: Variable = new Variable('z');

  constructor(solver: Solver) {
    this._solver = solver;
  }

  set x(val: number) {
    this._solver.suggestValue(this._x, val);
  }

  get x() {
    return this._x.value();
  }

  set y(val: number) {
    this._solver.suggestValue(this._y, val);
  }

  get y() {
    return this._y.value();
  }

  set z(val: number) {
    this._solver.suggestValue(this._z, val);
  }

  get z() {
    return this._z.value();
  }

  get(): Point {
    return {
      x: this._x.value(),
      y: this._y.value(),
      z: this._z.value(),
    };
  }
}
