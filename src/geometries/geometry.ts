import type { Constraint, Solver } from '@lume/kiwi';
import { ConstraintFactory } from 'src/constraints/constraint-factory';
import { ConstraintManager } from 'src/constraints/constraint-manager';
import type { Bounds, Point } from 'src/share/types';
import { Vector3 } from 'src/share/vector';

export abstract class Geometry {
  protected readonly _solver: Solver;
  public readonly position: Vector3;

  protected constructor(solver: Solver) {
    this._solver = solver;
    this.position = new Vector3(solver);
  }

  solve(): this {
    this._solver.updateVariables();
    return this;
  }

  addTrackedConstraint(constraint: Constraint): void {
    ConstraintManager.addConstraint(this, constraint, this._solver);
  }

  dispose(): void {
    ConstraintManager.removeAllConstraints(this, this._solver);
  }

  setLeftOf(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.setLeftOf(target);
    return this;
  }

  setRightOf(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.setRightOf(target);
    return this;
  }

  setAbove(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.setAbove(target);
    return this;
  }

  setBelow(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.setBelow(target);
    return this;
  }

  alignTopEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignTopEdges(target);
    return this;
  }

  alignRightEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignRightEdges(target);
    return this;
  }

  alignBottomEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignBottomEdges(target);
    return this;
  }

  alignLeftEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignLeftEdges(target);
    return this;
  }

  alignHorizontalEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignHorizontalEdges(target);
    return this;
  }

  matchWidth(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.matchWidth(target);
    return this;
  }

  alignVerticalEdges(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.alignVerticalEdges(target);
    return this;
  }

  matchHeight(target: Geometry): this {
    const constraints = ConstraintFactory.getConstraints(this, target);
    constraints.matchHeight(target);
    return this;
  }

  setMaxWidth(size: number): this {
    const constraints = ConstraintFactory.getConstraints(this);
    constraints.setMaxWidth(size);
    return this;
  }

  setMinWidth(size: number): this {
    const constraints = ConstraintFactory.getConstraints(this);
    constraints.setMinWidth(size);
    return this;
  }

  setMaxHeight(size: number): this {
    const constraints = ConstraintFactory.getConstraints(this);
    constraints.setMaxHeight(size);
    return this;
  }

  setMinHeight(size: number): this {
    const constraints = ConstraintFactory.getConstraints(this);
    constraints.setMinHeight(size);
    return this;
  }

  abstract drag(to: Point): void;

  abstract getBounds(): Bounds;
}
