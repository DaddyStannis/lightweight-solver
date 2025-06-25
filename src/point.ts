import { Variable } from "./constraint";

export class Point3D {
  x: Variable;
  y: Variable;
  z: Variable;

  constructor(
    x: Variable = new Variable(0),
    y: Variable = new Variable(0),
    z: Variable = new Variable(0)
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get(): { x: number; y: number; z: number } {
    return {
      x: this.x.get(),
      y: this.y.get(),
      z: this.z.get(),
    };
  }
}
