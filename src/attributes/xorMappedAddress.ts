import { Attribute } from './attribute';
import { MAGIC_COOKIE_BYTES } from '../const';

/**
 *  The MAPPED-ATTRIBUTE as defined in [RFC5389]{@link https://tools.ietf.org/html/rfc5389#section-15.1}
 */
export class XorMappedAddress extends Attribute {

  constructor(data : rinfo) {

    const port = data.port
    const portBytes = [(port & 0xff00) >> 8, (port & 0x00ff)]
    const xorPortBytes = portBytes.map((byte, i) => byte ^ MAGIC_COOKIE_BYTES[i])

    const ip = Number(data.address)
    const ipBytes = [(ip & 0xff000000) >> 24, (ip & 0x00ff0000) >> 16, (ip & 0x0000ff00) >> 8, (ip & 0x000000ff)]
    const xorIpBytes = ipBytes.map((byte, i) => byte ^ MAGIC_COOKIE_BYTES[i])

    const ipv4 = 0x01

    const value = [0x00, ipv4, ...xorPortBytes, ...xorIpBytes]


    super('XOR-MAPPED-ADDRESS', value);
  }
}
