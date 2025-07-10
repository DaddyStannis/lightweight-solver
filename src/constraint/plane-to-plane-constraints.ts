import { Constraint, Operator, Strength } from '@lume/kiwi';
import { type Geometry } from 'src/geometry/geometry';
import { GeometryConstraints } from 'src/constraint/geometry-constraints';
import { Plane } from 'src/geometry/plane';

export class PlaneToPlaneConstraints extends GeometryConstraints {
  private readonly _plane: Plane;

  constructor(plane: Plane) {
    super();
    this._plane = plane;
  }

  setRightOf(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_x'].plus(this._plane['_width'].divide(2)),
      Operator.Eq,
      target.position['_x'].minus(target['_width'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  setLeftOf(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_x'].minus(this._plane['_width'].divide(2)),
      Operator.Eq,
      target.position['_x'].plus(target['_width'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  setAbove(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_y'].plus(this._plane['_height'].divide(2)),
      Operator.Eq,
      target.position['_y'].minus(target['_height'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  setBelow(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_y'].minus(this._plane['_height'].divide(2)),
      Operator.Eq,
      target.position['_y'].plus(target['_height'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  alignHorizontalEdges(target: Geometry): void {
    this.alignLeftEdges(target);
    this.alignRightEdges(target);
    this.matchWidth(target);
  }

  alignVerticalEdges(target: Geometry): void {
    this.alignTopEdges(target);
    this.alignBottomEdges(target);
    this.matchHeight(target);
  }

  alignTopEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_y'].minus(this._plane['_height'].divide(2)), // Верхній край поточного об'єкта
      Operator.Eq,
      target.position['_y'].minus(target['_height'].divide(2)), // Верхній край цільового об'єкта
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  alignRightEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_x'].plus(this._plane['_width'].divide(2)),
      Operator.Eq,
      target.position['_x'].plus(target['_width'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  alignBottomEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_y'].plus(this._plane['_height'].divide(2)),
      Operator.Eq,
      target.position['_y'].plus(target['_height'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  alignLeftEdges(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane.position['_x'].minus(this._plane['_width'].divide(2)),
      Operator.Eq,
      target.position['_x'].minus(target['_width'].divide(2)),
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  matchWidth(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane['_width'],
      Operator.Eq,
      target['_width'],
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }

  matchHeight(target: Geometry): void {
    if (!(target instanceof Plane)) {
      throw new Error('Unsupported geometry');
    }

    const constraint = new Constraint(
      this._plane['_height'],
      Operator.Eq,
      target['_height'],
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
    target.addTrackedConstraint(constraint);
  }
}
