import type { Geometry } from 'src/geometries/geometry';
import type { GeometryConstraints } from 'src/constraints/geometry-constraints';
import { PlaneConstraints } from 'src/constraints/plane-constraints';
import { PlaneToPlaneConstraints } from 'src/constraints/plane-to-plane-constraints';
import { Plane } from 'src/geometries/plane';

export class ConstraintFactory {
  static getConstraints(a: Geometry, b?: Geometry): GeometryConstraints {
    if (a instanceof Plane && b instanceof Plane) {
      return new PlaneToPlaneConstraints(a);
    } else if (a instanceof Plane && b === undefined) {
      return new PlaneConstraints(a);
    } else
      throw new Error(
        `Unsupported geometries: ${a.constructor.name} and ${b?.constructor.name}`
      );
  }
}
