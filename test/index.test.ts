import { MaskFlags } from '../src';
describe('MaskFlags', () => {
  it('initialize with correct length', () => {
    const maskFlags = new MaskFlags(10);
    expect(maskFlags.getData() === 0);
    expect(maskFlags.getLength() === 10);
    expect(maskFlags.getPos(0) === false);
    expect(maskFlags.getPos(10) === false);
  });

  it('initialize with default length', () => {
    const maskFlags = new MaskFlags();
    expect(maskFlags.getData() === 0);
    expect(maskFlags.getLength() === MaskFlags.DEFAULT_LENGTH);
    expect(maskFlags.getPos(0) === false);
    expect(maskFlags.getPos(10) === false);
  });

  it('initialize throw error with large length', () => {
    expect(() => {
      new MaskFlags(60);
    }).toThrowError('Length exceeds limit for safe integer');
  });

  it('set position, get and clear position correctly', () => {
    const maskFlags = new MaskFlags(10);
    expect(maskFlags.getPos(2)).toEqual(false);
    maskFlags.setPos(2);
    expect(maskFlags.getPos(2)).toEqual(true);
    maskFlags.clearPos(2);
    expect(maskFlags.getPos(2)).toEqual(false);
  });

  it('set position, get and clear position throw error for invalid position', () => {
    const maskFlags = new MaskFlags(10);
    expect(() => maskFlags.getPos(13)).toThrowError('Position exceeds length');
    expect(() => maskFlags.setPos(13)).toThrowError('Position exceeds length');
    expect(() => maskFlags.getPos(13)).toThrowError('Position exceeds length');
    expect(() => maskFlags.clearPos(13)).toThrowError(
      'Position exceeds length'
    );
  });

  it('set position, get and clear position with default length correctly', () => {
    const maskFlags = new MaskFlags();
    expect(maskFlags.getPos(25)).toEqual(false);
    maskFlags.setPos(25);
    expect(maskFlags.getPos(25)).toEqual(true);
    maskFlags.clearPos(25);
    expect(maskFlags.getPos(25)).toEqual(false);
  });

  it('save and load correctly', () => {
    const maskFlags = new MaskFlags(10);
    maskFlags.setPos(0);
    maskFlags.setPos(2);
    const data = maskFlags.getData();
    const maskFlags2 = MaskFlags.fromData(data, 10);
    expect(maskFlags2.getPos(0)).toEqual(true);
    expect(maskFlags2.getPos(2)).toEqual(true);
  });

  it('save and load correctly with default length', () => {
    const maskFlags = new MaskFlags();
    maskFlags.setPos(0);
    maskFlags.setPos(2);
    const data = maskFlags.getData();
    const maskFlags2 = MaskFlags.fromData(data);
    expect(maskFlags2.getPos(0)).toEqual(true);
    expect(maskFlags2.getPos(2)).toEqual(true);
  });

  it('load correctly', () => {
    const maskFlags2 = MaskFlags.fromData(5, 10);
    expect(maskFlags2.getPos(0)).toEqual(true);
    expect(maskFlags2.getPos(2)).toEqual(true);
  });

  it('sequence of sets, gets and clear runs correctly', () => {
    const maskFlags = new MaskFlags(10);
    maskFlags.setPos(2);
    expect(maskFlags.getPos(0)).toEqual(false);
    expect(maskFlags.getPos(2)).toEqual(true);
    expect(maskFlags.getPos(4)).toEqual(false);
    maskFlags.setPos(4);
    expect(maskFlags.getPos(0)).toEqual(false);
    expect(maskFlags.getPos(2)).toEqual(true);
    expect(maskFlags.getPos(4)).toEqual(true);
    maskFlags.clearPos(2);
    expect(maskFlags.getPos(0)).toEqual(false);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(true);
    maskFlags.clearPos(0);
    expect(maskFlags.getPos(0)).toEqual(false);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(true);
    maskFlags.setPos(0);
    expect(maskFlags.getPos(0)).toEqual(true);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(true);
    maskFlags.clearPos(2);
    expect(maskFlags.getPos(0)).toEqual(true);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(true);
    maskFlags.clearPos(4);
    expect(maskFlags.getPos(0)).toEqual(true);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(false);
    maskFlags.clearPos(0);
    expect(maskFlags.getPos(0)).toEqual(false);
    expect(maskFlags.getPos(2)).toEqual(false);
    expect(maskFlags.getPos(4)).toEqual(false);

    expect(maskFlags.getPos(5)).toEqual(false);
  });
});
