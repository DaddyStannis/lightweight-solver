# 🚀 Kiwi Geometry [![npm version](https://img.shields.io/npm/v/kiwi-geometry.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/lightweight-solver) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

✨ Lightweight fast constraint solver for 2D/3D geometries powered by [@lume/kiwi](https://github.com/lume/kiwi)

## 📦 Installation

```bash
npm install kiwi-geometry
# or
yarn add kiwi-geometry
```

## 🚀 Quick Start

```typescript
import {Solver, Plane} from 'kiwi-geometry';

const solver = new Solver();
const plane1 = new Plane(solver, {width: 100, height: 100});
const plane2 = new Plane(solver, {width: 50});

// Align right edge of plane2 to left edge of plane1
plane2.setLeftOf(plane1);
```