# mask-flags

JavaScript flags implemented using bitmask for simple and efficient storage.

Version 2.x and 3.x uses [numeric-array-integer](https://github.com/paradite/numeric-array-integer) to implement the flags, while maintaining backwards compatibility with the version 1.x.

[![NPM version](https://img.shields.io/npm/v/mask-flags.svg?style=flat-square)](https://npmjs.org/package/mask-flags)
[![CI](https://github.com/paradite/mask-flags/actions/workflows/node.js.yml/badge.svg)](https://github.com/paradite/mask-flags/actions/workflows/node.js.yml)

## Install:

```bash
$ yarn add mask-flags
```

## Usage:

Set, get and clear:

```js
import { MaskFlags } from 'mask-flags';

// Initialize a new MaskFlags with length 10 (capable of storing 10 flags)
const maskFlags = new MaskFlags(10);

// Default flag value is false
maskFlags.getPos(0); // false

// Set flag at position to true
maskFlags.setPos(0);
maskFlags.getPos(0); // true

// Clear flag at position to false
maskFlags.clearPos(0);
maskFlags.getPos(0); // false
```

Save and load:

```js
import { MaskFlags } from 'mask-flags';

const maskFlags = new MaskFlags(10);
maskFlags.setPos(0);
maskFlags.setPos(5);

// Get data as an integer
const data = maskFlags.getData(); // 33

// Load data from an integer
const maskFlags2 = MaskFlags.fromData(data, 10);
maskFlags2.getPos(0); // true
maskFlags2.getPos(5); // true
maskFlags2.getPos(10); // false
```

Default length (number of bits) of data is 31.

## Related

- [numeric-array-integer](https://github.com/paradite/numeric-array-integer): More generic library that allows arbitrary number of bits at each position.
