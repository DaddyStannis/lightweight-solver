import type { Constraint } from "./constraint";

export class Variable {
  private _value: number;
  private _prevValue: number;
  constraints = new Set<Constraint>();
  name: string;

  constructor(initial = 0, name = "") {
    this._value = initial;
    this._prevValue = initial;
    this.name = name;
  }

  get(): number {
    return this._value;
  }

  set(v: number, visited = new Set<Variable>()): boolean {
    if (this._value === v || visited.has(this)) return true;

    this._prevValue = this._value;
    this._value = v;
    visited.add(this);

    for (const constraint of this.constraints) {
      const ok = constraint.solve(this, visited);
      if (!ok) {
        this.abort();
        return false;
      }
    }

    return true;
  }

  abort() {
    this._value = this._prevValue;
  }

  addConstraint(c: Constraint): void {
    this.constraints.add(c);
  }
}
