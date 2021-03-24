import { REQUEST_TYPES_BYTES } from '../const';

/**
 * A class to be extended that can handle any current and future attribute
 */
export class Attribute{

  type : string
  value : Buffer

  constructor(type: string, value: number[]) {

    const fill = new Array(value.length % 4).fill(0)

    this.type = type;
    this.value = Buffer.from([...value, ...fill]);
  }

  toBuffer() : Buffer {

    const type = REQUEST_TYPES_BYTES[this.type]
    const length = [(this.value.length & 0xff00) >> 8, (this.value.length & 0x00ff)]

    return Buffer.from([...type, ...length, ...this.value])
  }

}
