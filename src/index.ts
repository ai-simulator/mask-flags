export class MaskFlags {
  private length: number;
  private data: number;
  static DEFAULT_LENGTH = 31;

  constructor(length?: number) {
    length = length || MaskFlags.DEFAULT_LENGTH;
    if (2 ** length >= Number.MAX_SAFE_INTEGER) {
      throw new Error('Length exceeds limit for safe integer');
    }
    this.length = length;
    this.data = 0;
  }

  loadData(data: number) {
    this.data = data;
  }

  static fromData(data: number, length?: number) {
    length = length || MaskFlags.DEFAULT_LENGTH;
    const maskFlags = new MaskFlags(length);
    maskFlags.loadData(data);
    return maskFlags;
  }

  getData() {
    return this.data;
  }

  getLength() {
    return this.length;
  }

  setPos(position: number) {
    if (position > this.length) {
      throw new Error('Position exceeds length');
    }
    const mask = 1 << position;
    this.data |= mask;
  }

  clearPos(position: number) {
    if (position > this.length) {
      throw new Error('Position exceeds length');
    }
    const mask = 1 << position;
    this.data &= ~mask;
  }

  getPos(position: number) {
    if (position > this.length) {
      throw new Error('Position exceeds length');
    }
    const mask = 1 << position;
    return (this.data & mask) === 0 ? false : true;
  }
}
