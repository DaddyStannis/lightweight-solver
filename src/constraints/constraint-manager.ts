import type { Constraint, Solver } from '@lume/kiwi';
import type { Geometry } from 'src/geometries/geometry.ts';

export class ConstraintManager {
  private static _constraintsMap = new WeakMap<Geometry, Constraint[]>();

  static addConstraint(
    geometry: Geometry,
    constraint: Constraint,
    solver: Solver
  ): void {
    if (!solver.hasConstraint(constraint)) {
      solver.addConstraint(constraint);
    }
    if (!this._constraintsMap.has(geometry)) {
      this._constraintsMap.set(geometry, []);
    }
    this._constraintsMap.get(geometry)!.push(constraint);
  }

  static removeAllConstraints(geometry: Geometry, solver: Solver): void {
    const constraints = this._constraintsMap.get(geometry) || [];
    constraints.forEach((c) => solver.removeConstraint(c));
    this._constraintsMap.delete(geometry);
  }
}
