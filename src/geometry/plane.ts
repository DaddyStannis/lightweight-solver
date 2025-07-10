import { type Solver, Strength, Variable } from '@lume/kiwi';
import type { Bounds, Point } from 'src/share/types';
import { Geometry } from 'src/geometry/geometry';

export type PlaneOptions = {
  width?: number;
  height?: number;
  depth?: number;
};

export class Plane extends Geometry {
  private readonly _width: Variable;
  private readonly _height: Variable;
  private readonly _depth: Variable;

  constructor(solver: Solver, options?: PlaneOptions) {
    super(solver);
    this._width = new Variable('width');
    this._height = new Variable('height');
    this._depth = new Variable('depth');
    this._solver.addEditVariable(this._width, Strength.weak);
    this._solver.suggestValue(this._width, options?.width ?? 1);
    this._solver.addEditVariable(this._height, Strength.weak);
    this._solver.suggestValue(this._height, options?.height ?? 1);
    this._solver.addEditVariable(this._depth, Strength.weak);
    this._solver.suggestValue(this._depth, options?.height ?? 1);
  }

  set width(val: number) {
    this._solver.suggestValue(this._width, val);
  }

  get width() {
    return this._width.value();
  }

  set height(val: number) {
    this._solver.suggestValue(this._height, val);
  }

  get height() {
    return this._height.value();
  }

  set depth(val: number) {
    this._solver.suggestValue(this._depth, val);
  }

  get depth() {
    return this._depth.value();
  }

  drag(to: Point): void {
    this._solver.suggestValue(this.position['_x'], to.x);
    this._solver.suggestValue(this.position['_y'], to.y);
    this._solver.suggestValue(this.position['_z'], to.z);
  }

  getBounds(): Bounds {
    return {
      bottom: this.position.y + this._height.value() / 2,
      top: this.position.y - this._height.value() / 2,
      right: this.position.x + this._width.value() / 2,
      left: this.position.x - this._width.value() / 2,
      front: this.position.z + this._depth.value() / 2,
      back: this.position.z - this._depth.value() / 2,
    };
  }
}
