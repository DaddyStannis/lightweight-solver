import { Variable } from "./variable";

export abstract class Constraint {
  abstract solve(changed: Variable, visited: Set<Variable>): boolean;
}

export class MinConstraint extends Constraint {
  private _target: Variable;
  private _min: Variable;

  constructor(target: Variable, min: Variable | number) {
    super();
    this._target = target;
    this._min = typeof min === "number" ? new Variable(min) : min;

    this._target.addConstraint(this);
    this._min.addConstraint(this);
  }

  solve(_changed: Variable, visited: Set<Variable>): boolean {
    if (this._target.get() < this._min.get()) {
      return this._target.set(this._min.get(), visited);
    }
    return true;
  }
}

export class MaxConstraint extends Constraint {
  private _target: Variable;
  private _max: Variable;

  constructor(target: Variable, max: Variable | number) {
    super();
    this._target = target;
    this._max = typeof max === "number" ? new Variable(max) : max;

    this._target.addConstraint(this);
    this._max.addConstraint(this);
  }

  solve(_changed: Variable, visited: Set<Variable>): boolean {
    if (this._target.get() > this._max.get()) {
      return this._target.set(this._max.get(), visited);
    }
    return true;
  }
}

export type Direction = "a-controls-b" | "b-controls-a" | "bidirectional";

export class EqualConstraint extends Constraint {
  private _a: Variable;
  private _b: Variable;
  private _dir: Direction = "bidirectional";

  constructor(a: Variable, b: Variable, dir: Direction = "bidirectional") {
    super();
    this._a = a;
    this._b = b;
    this._dir = dir;
    this._a.addConstraint(this);
    this._b.addConstraint(this);
  }

  solve(changed: Variable, visited: Set<Variable>): boolean {
    if (
      changed === this._a &&
      (this._dir === "bidirectional" || this._dir === "a-controls-b")
    ) {
      if (this._b.get() !== this._a.get()) {
        return this._b.set(this._a.get(), visited);
      }
    } else if (
      changed === this._b &&
      (this._dir === "bidirectional" || this._dir === "b-controls-a")
    ) {
      if (this._a.get() !== this._b.get()) {
        return this._a.set(this._b.get(), visited);
      }
    }
    return true;
  }
}
