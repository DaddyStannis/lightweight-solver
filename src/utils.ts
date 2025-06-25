import { type Direction, EqualConstraint } from "./constraint";
import type { Variable } from "./variable";

export function eq(a: Variable, b: Variable, dir?: Direction) {
  new EqualConstraint(a, b, dir);
}
