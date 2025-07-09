import { type Solver, Strength, Variable } from '@lume/kiwi';
import type { Bounds, Point } from 'src/share/types';
import { Geometry } from 'src/geometries/geometry';

export type PlaneOptions = {
  width?: number;
  height?: number;
  depth?: number;
};

export class Plane extends Geometry {
  public readonly varWidth: Variable;
  public readonly varHeight: Variable;
  public readonly varDepth: Variable;

  constructor(solver: Solver, options?: PlaneOptions) {
    super(solver);
    this.varWidth = new Variable('width');
    this.varHeight = new Variable('height');
    this.varDepth = new Variable('depth');
    this._solver.addEditVariable(this.varWidth, Strength.weak);
    this._solver.suggestValue(this.varWidth, options?.width ?? 1);
    this._solver.addEditVariable(this.varHeight, Strength.weak);
    this._solver.suggestValue(this.varHeight, options?.height ?? 1);
    this._solver.addEditVariable(this.varDepth, Strength.weak);
    this._solver.suggestValue(this.varDepth, options?.height ?? 1);
  }

  set width(val: number) {
    this._solver.suggestValue(this.varWidth, val);
  }

  get width() {
    return this.varWidth.value();
  }

  set height(val: number) {
    this._solver.suggestValue(this.varHeight, val);
  }

  get height() {
    return this.varHeight.value();
  }

  set depth(val: number) {
    this._solver.suggestValue(this.varDepth, val);
  }

  get depth() {
    return this.varDepth.value();
  }

  drag(to: Point): void {
    this._solver.suggestValue(this.position.varX, to.x);
    this._solver.suggestValue(this.position.varY, to.y);
    this._solver.suggestValue(this.position.varZ, to.z);
  }

  getBounds(): Bounds {
    return {
      bottom: this.position.varY.value() + this.varHeight.value() / 2,
      top: this.position.varY.value() - this.varHeight.value() / 2,
      right: this.position.varX.value() + this.varWidth.value() / 2,
      left: this.position.varX.value() - this.varWidth.value() / 2,
      front: this.position.varZ.value() + this.varDepth.value() / 2,
      back: this.position.varZ.value() - this.varDepth.value() / 2,
    };
  }
}
