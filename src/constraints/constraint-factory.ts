import type { Solver } from '@lume/kiwi';
import type { Geometry } from 'src/geometries/geometry';
import type { GeometryConstraints } from 'src/constraints/geometry-constraints';
import { PlaneConstraints } from 'src/constraints/plane-constraints';
import { Plane } from 'src/geometries/plane';

export class ConstraintFactory {
  private readonly _solver: Solver;

  constructor(solver: Solver) {
    this._solver = solver;
  }

  getConstraints(a: Geometry, b?: Geometry): GeometryConstraints {
    if (
      (a instanceof Plane && b instanceof Plane) ||
      (!b && a instanceof Plane)
    ) {
      return new PlaneConstraints(a, this._solver);
    } else
      throw new Error(
        `Unsupported geometries: ${a.constructor.name} and ${b?.constructor.name}`
      );
  }
}
