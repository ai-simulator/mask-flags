# mask-flags

JavaScript flags implemented using bitmask for simple and efficient storage.

[![NPM version](https://img.shields.io/npm/v/mask-flags.svg?style=flat-square)](https://npmjs.org/package/mask-flags)

## Install:

```bash
$ yarn add mask-flags
```

## Usage:

Set, get and clear:

```js
import { MaskFlags } from 'mask-flags';

const maskFlags = new MaskFlags(10);
// default flag false
maskFlags.getPos(0); // false

// set
maskFlags.setPos(0);
maskFlags.getPos(0); // true

// clear
maskFlags.clearPos(0);
maskFlags.getPos(0); // false
```

Save and load:

```js
import { MaskFlags } from 'mask-flags';

const maskFlags = new MaskFlags(10);
maskFlags.setPos(0);
maskFlags.setPos(5);

// save data
const data = maskFlags.getData(); // 33

// load data
const maskFlags2 = MaskFlags.fromData(data, 10);
maskFlags2.getPos(0); // true
maskFlags2.getPos(5); // true
maskFlags2.getPos(10); // false
```

Default length (number of bits) of data is 31.
