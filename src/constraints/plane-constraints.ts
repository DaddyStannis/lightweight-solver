import { Constraint, Operator, Strength } from '@lume/kiwi';
import { GeometryConstraints } from 'src/constraints/geometry-constraints';
import { Plane } from 'src/geometries/plane';

export class PlaneConstraints extends GeometryConstraints {
  private readonly _plane: Plane;

  constructor(plane: Plane) {
    super();
    this._plane = plane;
  }

  setMaxWidth(size: number) {
    const constraint = new Constraint(
      this._plane['_width'],
      Operator.Le,
      size,
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
  }

  setMinWidth(size: number) {
    const constraint = new Constraint(
      this._plane['_width'],
      Operator.Ge,
      size,
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
  }

  setMaxHeight(size: number) {
    const constraint = new Constraint(
      this._plane['_height'],
      Operator.Le,
      size,
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
  }

  setMinHeight(size: number) {
    const constraint = new Constraint(
      this._plane['_height'],
      Operator.Ge,
      size,
      Strength.strong
    );

    this._plane.addTrackedConstraint(constraint);
  }
}
