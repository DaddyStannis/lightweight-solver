import { test, beforeEach } from 'node:test';
import * as assert from 'node:assert/strict';
import { Solver } from '@lume/kiwi';
import { Plane } from 'src/geometry/plane';

let solver: Solver;

beforeEach(() => {
  solver = new Solver();
});

test('plane should have the correct dimensions', () => {
  const a = new Plane(solver, { width: 2, height: 2, depth: 2 });
  a.solve();
  assert.strictEqual(a.width, 2);
  assert.strictEqual(a.height, 2);
  assert.strictEqual(a.depth, 2);

  a.width = 4;
  a.height = 4;
  a.depth = 4;
  a.solve();
  assert.strictEqual(a.width, 4);
  assert.strictEqual(a.height, 4);
  assert.strictEqual(a.depth, 4);
});

test('plane should have the correct position', () => {
  const a = new Plane(solver);
  a.solve();
  assert.strictEqual(a.position.x, 0);
  assert.strictEqual(a.position.y, 0);
  assert.strictEqual(a.position.z, 0);

  a.position.x = 1;
  a.position.y = 1;
  a.position.z = 1;
  a.solve();
  assert.strictEqual(a.position.x, 1);
  assert.strictEqual(a.position.y, 1);
  assert.strictEqual(a.position.z, 1);

  a.position.set({ x: 2, y: 2, z: 2 });
  a.solve();
  assert.strictEqual(a.position.x, 2);
  assert.strictEqual(a.position.y, 2);
  assert.strictEqual(a.position.z, 2);
});

test('plane a should be o the left of plane b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 2, height: 2 });
  a.setLeftOf(b);
  a.solve();

  assert.strictEqual(b.position.x, 0);
  assert.strictEqual(a.position.x, 2);
});

test('plane a should be to the right of plane b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 2, height: 2 });
  a.setRightOf(b);
  a.solve();

  assert.strictEqual(b.position.x, 0);
  assert.strictEqual(a.position.x, -2);
});

test('plane a should be below plane b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 2, height: 2 });
  a.setBelow(b);
  a.solve();

  assert.strictEqual(b.position.y, 0);
  assert.strictEqual(a.position.y, 2);
});

test('plane a should be above plane b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 2, height: 2 });
  a.setAbove(b);
  a.solve();

  assert.strictEqual(b.position.y, 0);
  assert.strictEqual(a.position.y, -2);
});

test('plane a should be aligned with plane b on its left edges', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.x = 2;
  a.alignLeftEdges(b);
  a.solve();

  assert.strictEqual(a.position.x - a.width / 2, b.position.x - b.width / 2);
});

test('plane a should be aligned with plane b on its right edges', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.x = 2;
  a.alignRightEdges(b);
  a.solve();

  assert.strictEqual(a.position.x + a.width / 2, b.position.x + b.width / 2);
});

test('plane a should be aligned with plane b on its top edges', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.y = 2;
  a.alignTopEdges(b);
  a.solve();

  assert.strictEqual(a.position.y - a.height / 2, b.position.y - b.height / 2);
});

test('plane a should be aligned with plane b on its bottom edges', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.y = 2;
  a.alignBottomEdges(b);
  a.solve();

  assert.strictEqual(a.position.y + a.height / 2, b.position.y + b.height / 2);
});

test('plane a should be aligned with plane b horizontally', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.x = 2;
  a.alignHorizontalEdges(b);
  a.solve();

  assert.strictEqual(a.width, b.width);
  assert.strictEqual(a.position.x, b.position.x);
});

test('plane a should be aligned with plane b vertically', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  b.position.y = 2;
  a.alignVerticalEdges(b);
  a.solve();

  assert.strictEqual(a.height, b.height);
  assert.strictEqual(a.position.y, b.position.y);
});

test('plane a should be the same width like b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  a.matchWidth(b);
  a.solve();

  assert.strictEqual(a.width, b.width);
});

test('plane a should be the same height like b', () => {
  const a = new Plane(solver, { width: 2, height: 2 });
  const b = new Plane(solver, { width: 3, height: 3 });
  a.matchHeight(b);
  a.solve();

  assert.strictEqual(a.height, b.height);
});
