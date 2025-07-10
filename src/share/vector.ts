import { type Solver, Variable, Strength } from '@lume/kiwi';
import type { Point } from 'src/share/types.ts';

export class Vector3 {
  private readonly _solver: Solver;
  private readonly _x: Variable = new Variable('x');
  private readonly _y: Variable = new Variable('y');
  private readonly _z: Variable = new Variable('z');

  constructor(solver: Solver) {
    this._solver = solver;
    this._solver.addEditVariable(this._x, Strength.weak);
    this._solver.addEditVariable(this._y, Strength.weak);
    this._solver.addEditVariable(this._z, Strength.weak);
    this.set({ x: 0, y: 0, z: 0 });
  }

  set x(val: number) {
    this._solver.suggestValue(this._x, val);
  }

  get x(): number {
    return this._x.value();
  }

  set y(val: number) {
    this._solver.suggestValue(this._y, val);
  }

  get y(): number {
    return this._y.value();
  }

  set z(val: number) {
    this._solver.suggestValue(this._z, val);
  }

  get z(): number {
    return this._z.value();
  }

  set(point: Point): void {
    this.x = point.x;
    this.y = point.y;
    this.z = point.z;
  }

  get(): Point {
    return {
      x: this._x.value(),
      y: this._y.value(),
      z: this._z.value(),
    };
  }
}
