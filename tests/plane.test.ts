import { test } from 'node:test';
import * as assert from 'node:assert/strict';

test('eq (bidirectional)', () => {
  const a = new Variable(10);
  const b = new Variable(0);
  eq(a, b, 'bidirectional');

  a.set(42);
  assert.strictEqual(b.get(), 42);

  b.set(100);
  assert.strictEqual(a.get(), 100);
});

test('eq (a-controls-b)', () => {
  const a = new Variable(5);
  const b = new Variable(0);
  eq(a, b, 'a-controls-b');

  a.set(7);
  assert.strictEqual(b.get(), 7);

  b.set(99);
  assert.strictEqual(a.get(), 7);
});
