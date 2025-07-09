import { Constraint, type Solver } from '@lume/kiwi';
import { Vector3 } from 'src/share/vector';
import { ConstraintFactory } from 'src/constraints/constraint-factory';
import type { Bounds, Point } from 'src/share/types';
import { ConstraintType } from 'src/share/enums';

export abstract class Geometry {
  private readonly _constraintFactory: ConstraintFactory;
  protected readonly _solver: Solver;
  protected readonly _constraints: Constraint[] = [];
  public readonly position: Vector3;

  protected constructor(solver: Solver) {
    this._solver = solver;
    this._constraintFactory = new ConstraintFactory(this._solver);
    this.position = new Vector3(solver);
  }

  setLeftOf(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.setLeftOf(target);
  }

  setRightOf(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.setRightOf(target);
  }

  setAbove(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.setAbove(target);
  }

  setBelow(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.setBelow(target);
  }

  alignTopEdges(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignTopEdges(target);
  }

  alignRightEdges(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignRightEdges(target);
  }

  alignBottomEdges(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignBottomEdges(target);
  }

  alignLeftEdges(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignLeftEdges(target);
  }

  alignHorizontalEdges(target: Geometry) {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignHorizontalEdges(target);
  }

  matchWidth(target: Geometry): void {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.matchWidth(target);
  }

  alignVerticalEdges(target: Geometry) {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.alignVerticalEdges(target);
  }

  matchHeight(target: Geometry) {
    const constraints = this._constraintFactory.getConstraints(this, target);
    constraints.matchHeight(target);
  }

  setMaxWidth(size: number) {
    const constraints = this._constraintFactory.getConstraints(this);
    constraints.setMaxWidth(size);
  }

  setMinWidth(size: number) {
    const constraints = this._constraintFactory.getConstraints(this);
    constraints.setMinWidth(size);
  }

  setMaxHeight(size: number) {
    const constraints = this._constraintFactory.getConstraints(this);
    constraints.setMaxHeight(size);
  }

  setMinHeight(size: number) {
    const constraints = this._constraintFactory.getConstraints(this);
    constraints.setMinHeight(size);
  }

  attachTo(target: Geometry, constraintType: ConstraintType): void {
    const constraints = this._constraintFactory.getConstraints(this, target);

    switch (constraintType) {
      case ConstraintType.TANGENT_TOP:
        constraints.setAbove(target);
        break;
      case ConstraintType.TANGENT_RIGHT:
        constraints.setRightOf(target);
        break;
      case ConstraintType.TANGENT_BOTTOM:
        constraints.setBelow(target);
        break;
      case ConstraintType.TANGENT_LEFT:
        constraints.setLeftOf(target);
        break;
      case ConstraintType.TANGENT_FRONT:
        break;
      case ConstraintType.TANGENT_BACK:
        break;
      case ConstraintType.ALIGN_TOP:
        constraints.alignTopEdges(target);
        break;
      case ConstraintType.ALIGN_RIGHT:
        constraints.alignRightEdges(target);
        break;
      case ConstraintType.ALIGN_BOTTOM:
        constraints.alignBottomEdges(target);
        break;
      case ConstraintType.ALIGN_LEFT:
        constraints.alignLeftEdges(target);
        break;
      case ConstraintType.ALIGN_FRONT:
        break;
      case ConstraintType.ALIGN_BACK:
        break;
      case ConstraintType.ALIGN_HORIZONTAL:
        constraints.alignHorizontalEdges(target);
        break;
      case ConstraintType.ALIGN_VERTICAL:
        constraints.alignVerticalEdges(target);
        break;
    }
  }

  abstract drag(to: Point): void;

  abstract getBounds(): Bounds;
}
