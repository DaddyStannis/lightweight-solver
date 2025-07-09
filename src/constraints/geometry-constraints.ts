import { type Geometry } from 'src/geometries/geometry';

export interface GeometryConstraints {
  setRightOf(target: Geometry): void;

  setLeftOf(target: Geometry): void;

  setAbove(target: Geometry): void;

  setBelow(target: Geometry): void;

  alignTopEdges(target: Geometry): void;

  alignRightEdges(target: Geometry): void;

  alignBottomEdges(target: Geometry): void;

  alignLeftEdges(target: Geometry): void;

  alignHorizontalEdges(target: Geometry): void;

  alignVerticalEdges(target: Geometry): void;

  alignVerticalEdges(target: Geometry): void;

  matchWidth(target: Geometry): void;

  matchHeight(target: Geometry): void;

  setMaxWidth(size: number): void;

  setMinWidth(size: number): void;

  setMaxHeight(size: number): void;

  setMinHeight(size: number): void;
}
