import { type Geometry } from 'src/geometries/geometry';

export abstract class GeometryConstraints {
  setRightOf(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  setLeftOf(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  setAbove(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  setBelow(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignTopEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignRightEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignBottomEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignLeftEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignHorizontalEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  alignVerticalEdges(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  matchWidth(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  matchHeight(target: Geometry): void {
    throw new Error('Unsupported geometry');
  }

  setMaxWidth(size: number): void {
    throw new Error('Unsupported geometry');
  }

  setMinWidth(size: number): void {
    throw new Error('Unsupported geometry');
  }

  setMaxHeight(size: number): void {
    throw new Error('Unsupported geometry');
  }

  setMinHeight(size: number): void {
    throw new Error('Unsupported geometry');
  }
}
