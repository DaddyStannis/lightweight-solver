import type { Geometry } from 'src/geometry/geometry';
import type { GeometryConstraints } from 'src/constraint/geometry-constraints';
import { PlaneConstraints } from 'src/constraint/plane-constraints';
import { PlaneToPlaneConstraints } from 'src/constraint/plane-to-plane-constraints';
import { Plane } from 'src/geometry/plane';

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
