abstract class Constraint {
    abstract solve(v: Variable): void;
}

class Equal extends Constraint {
    private _vars = new Set<Variable>();

    constructor(...vars: Variable[]) {
        super();
        for (const v of vars) {
            this._vars.add(v);
            v.addConstraint(this);
        }
    }

    solve(changed: Variable): void {
        for (const v of this._vars) {
            if (v === changed) continue;
            v.set(changed.get());
        }
    }
}

class Offset extends Constraint {
    private _a: Variable;
    private _b: Variable;
    private _offset: Variable;

    constructor(
         a: Variable,
         b: Variable,
         offset: Variable
    ) {
        super();
        this._a = a;
        this._b = b;
        this._offset = offset;

        this._a.addConstraint(this);
        this._b.addConstraint(this);
        this._offset.addConstraint(this);
    }

    solve(changed: Variable): void {
        if (changed === this._a) {
            this._b.set(this._a.get() + this._offset.get());
        } else if (changed === this._b) {
            this._a.set(this._b.get() - this._offset.get());
        } else if (changed === this._offset) {
            this._a.set(this._b.get() - this._offset.get());
        }
    }
}


class Variable {
    constraints = new Set<Constraint>();
    private _value: number;

    constructor(initial: number = 0) {
        this._value = initial;
    }

    get(): number {
        return this._value;
    }

    set(v: number) {
        if (this._value === v) return;
        this._value = v;
        for (const constraint of this.constraints) {
            constraint.solve(this);
        }
    }

    addConstraint(c: Constraint): void {
        this.constraints.add(c);
    }
}

class Point {
    x: Variable;
    y: Variable;

    constructor(x: Variable, y: Variable) {
        this.x = x;
        this.y = y;
    }

    get(): {x: number, y: number} {
        return {
            x: this.x.get(),
            y: this.y.get(),
        }
    }
}

class Component {
    tl: Point;
    rb: Point;

    constructor(x: number, y: number, width: number, height: number) {
        this.tl = new Point(new Variable(x), new Variable(y));
        this.rb = new Point(new Variable(x + width), new Variable(y + height));
    }
}

const frame = new Component(0, 0, 10, 10);

const section = new Component(2, 2, 8, 8);

const vertical = new Component(0, 0, 2, 10);
const vertical2 = new Component(8, 0, 2, 10);

// const horizontal = new Component(2, 0, 8, 2);
const horizontal2 = new Component(2, 8, 8, 2);

new Equal(frame.rb.y, vertical.rb.y, vertical2.rb.y);
new Equal(section.rb.y, horizontal2.tl.y);

new Offset(horizontal2.rb.y, frame.rb.y, new Variable(2));

/**
 * set new frame height
 */
frame.rb.y.set(22);

// console.log("Frame: ", frame);
// console.log("Verticals: ", vertical, vertical2);
console.log("Section:", section);
console.log("Horizontals:", horizontal2);