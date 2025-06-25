export abstract class Constraint {
  abstract solve(changed: Variable, visited: Set<Variable>): boolean;
}

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

type Direction = "a-controls-b" | "b-controls-a" | "bidirectional";

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

// export class Offset extends Constraint {
//   private _a: Variable;
//   private _b: Variable;
//   private _offset: Variable;

//   constructor(a: Variable, b: Variable, offset: Variable) {
//     super();
//     this._a = a;
//     this._b = b;
//     this._offset = offset;

//     this._a.addConstraint(this);
//     this._b.addConstraint(this);
//     this._offset.addConstraint(this);
//   }

//   solve(changed: Variable): void {
//     if (changed === this._a) {
//       this._b.set(this._a.get() + this._offset.get());
//     } else if (changed === this._b) {
//       this._a.set(this._b.get() - this._offset.get());
//     } else if (changed === this._offset) {
//       this._a.set(this._b.get() - this._offset.get());
//     }
//   }
// }

export class Point3D {
  x: Variable;
  y: Variable;
  z: Variable;

  constructor(
    x: Variable = new Variable(0),
    y: Variable = new Variable(0),
    z: Variable = new Variable(0)
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get(): { x: number; y: number; z: number } {
    return {
      x: this.x.get(),
      y: this.y.get(),
      z: this.z.get(),
    };
  }
}

class Component {
  tl: Point3D;
  rb: Point3D;

  constructor(x: number, y: number, width: number, height: number) {
    this.tl = new Point3D(new Variable(x), new Variable(y));
    this.rb = new Point3D(new Variable(x + width), new Variable(y + height));
  }
}

const frame = new Component(0, 0, 10, 10);

// const section = new Component(2, 2, 8, 8);

const vertical = new Component(0, 0, 2, 10);
const vertical2 = new Component(8, 0, 2, 10);

// const horizontal = new Component(2, 0, 8, 2);
// const horizontal2 = new Component(2, 8, 8, 2);

eq(frame.rb.y, vertical.rb.y, "a-controls-b");
eq(frame.rb.y, vertical2.rb.y, "a-controls-b");

// new Equal(section.rb.y, horizontal2.tl.y);

// new Offset(horizontal2.rb.y, frame.rb.y, new Variable(2));

// new MaxConstraint(frame.rb.y, 12);

/**
 * set new frame height
 */
frame.rb.y.set(22);

console.log("Frame: ", frame);
console.log("Verticals: ", vertical, vertical2);
// console.log("Section:", section);
// console.log("Horizontals:", horizontal2);

export function eq(a: Variable, b: Variable, dir?: Direction) {
  new EqualConstraint(a, b, dir);
}
