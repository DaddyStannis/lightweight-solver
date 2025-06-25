import { Variable } from "./variable";
import { Point3D } from "./point";

class Component {
  tl: Point3D;
  rb: Point3D;

  constructor(x: number, y: number, width: number, height: number) {
    this.tl = new Point3D(new Variable(x), new Variable(y));
    this.rb = new Point3D(new Variable(x + width), new Variable(y + height));
  }
}

const frame = new Component(0, 0, 10, 10);

// const section = new Component(2, 2, 8, 8);

const vertical = new Component(0, 0, 2, 10);
const vertical2 = new Component(8, 0, 2, 10);

// console.log("Horizontals:", horizontal2);
