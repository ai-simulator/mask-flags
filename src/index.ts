import { NumericArrayInteger } from 'numeric-array-integer';

export class MaskFlags {
  private integer: NumericArrayInteger;
  static BIT_LENGTH = 1;
  static DEFAULT_LENGTH = 31;

  constructor(length?: number) {
    length = length || MaskFlags.DEFAULT_LENGTH;
    if (2 ** length >= Number.MAX_SAFE_INTEGER) {
      throw new Error('Length exceeds limit for safe integer');
    }
    this.integer = new NumericArrayInteger(MaskFlags.BIT_LENGTH, length);
  }

  loadData(data: number) {
    this.integer.loadData(data);
  }

  static fromData(data: number, length?: number) {
    length = length || MaskFlags.DEFAULT_LENGTH;
    const newMaskFlags = new MaskFlags(length);
    newMaskFlags.loadData(data);
    return newMaskFlags;
  }

  getData() {
    return this.integer.getData();
  }

  getLength() {
    return this.integer.getArrayLength();
  }

  setPos(position: number) {
    this.integer.setPos(position, 1);
  }

  clearPos(position: number) {
    this.integer.clearPos(position);
  }

  getPos(position: number) {
    return this.integer.getPos(position) ? true : false;
  }
}
