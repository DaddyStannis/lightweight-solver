import { Constraint, Operator, type Solver, Strength } from '@lume/kiwi';
import { type Geometry } from 'src/geometries/geometry';
import type { GeometryConstraints } from 'src/constraints/geometry-constraints';
import { Plane } from 'src/geometries/plane';

export class PlaneConstraints implements GeometryConstraints {
  private readonly _plane: Plane;
  private readonly _solver: Solver;

  constructor(plane: Plane, solver: Solver) {
    this._plane = plane;
    this._solver = solver;
  }

  setRightOf(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varX.plus(this._plane.varWidth.divide(2)),
        Operator.Eq,
        target.position.varX.minus(target.varWidth.divide(2)),
        Strength.strong
      )
    );
  }

  setLeftOf(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varX.minus(this._plane.varWidth.divide(2)),
        Operator.Eq,
        target.position.varX.plus(target.varWidth.divide(2)),
        Strength.strong
      )
    );
  }

  setAbove(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varY.plus(this._plane.varHeight.divide(2)),
        Operator.Eq,
        target.position.varY.minus(target.varHeight.divide(2)),
        Strength.strong
      )
    );
  }

  setBelow(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varY.minus(this._plane.varHeight.divide(2)),
        Operator.Eq,
        target.position.varY.plus(target.varHeight.divide(2)),
        Strength.strong
      )
    );
  }

  alignTopEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varY.minus(this._plane.varHeight.divide(2)),
        Operator.Eq,
        target.position.varY.minus(target.varHeight.divide(2)),
        Strength.strong
      )
    );
  }

  alignRightEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varX.plus(this._plane.varWidth.divide(2)),
        Operator.Eq,
        target.position.varX.plus(target.varWidth.divide(2)),
        Strength.strong
      )
    );
  }

  alignBottomEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varY.plus(this._plane.varHeight.divide(2)),
        Operator.Eq,
        target.position.varY.plus(target.varHeight.divide(2)),
        Strength.strong
      )
    );
  }

  alignLeftEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    this._solver.addConstraint(
      new Constraint(
        this._plane.position.varX.minus(this._plane.varWidth.divide(2)),
        Operator.Eq,
        target.position.varX.minus(target.varWidth.divide(2)),
        Strength.strong
      )
    );
  }

  alignHorizontalEdges(target: Plane) {
    this.alignLeftEdges(target);
    this.alignRightEdges(target);
    this.matchWidth(target);
  }

  matchWidth(target: Plane): void {
    this._solver.addConstraint(
      new Constraint(
        this._plane.varWidth,
        Operator.Eq,
        target.varWidth,
        Strength.strong
      )
    );
  }

  alignVerticalEdges(target: Plane) {
    this.alignTopEdges(target);
    this.alignBottomEdges(target);
    this.matchHeight(target);
  }

  matchHeight(target: Plane) {
    this._solver.addConstraint(
      new Constraint(
        this._plane.varHeight,
        Operator.Eq,
        target.varHeight,
        Strength.strong
      )
    );
  }

  setMaxWidth(size: number) {
    this._solver.addConstraint(
      new Constraint(this._plane.varWidth, Operator.Le, size, Strength.strong)
    );
  }

  setMinWidth(size: number) {
    this._solver.addConstraint(
      new Constraint(this._plane.varWidth, Operator.Ge, size, Strength.strong)
    );
  }

  setMaxHeight(size: number) {
    this._solver.addConstraint(
      new Constraint(this._plane.varHeight, Operator.Le, size, Strength.strong)
    );
  }

  setMinHeight(size: number) {
    this._solver.addConstraint(
      new Constraint(this._plane.varHeight, Operator.Ge, size, Strength.strong)
    );
  }
}
