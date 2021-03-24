import { Attribute } from './attributes/attribute';
import { logger } from './util/logger';
import { REQUEST_TYPES, CLASSES, MAGIC_COOKIE, REQUEST_TYPES_BYTES, CLASSES_BYTES, MAGIC_COOKIE_BYTES } from './const';

export class Message {


  public requestType : string
  className : string
  transactionId : Buffer;
  attributes : Attribute[] = []


  constructor(requestType: string, className: string, transactionId: Buffer) {

    this.requestType = requestType;
    this.className = className;
    this.transactionId = transactionId;
  }


  /**
   * Generate a STUN message from existing header
   * Check that the message obeys of the rules of [rfc5389 Section 6]{@link https://tools.ietf.org/html/rfc5389#section-6}
   * @param data
   */
  static fromBuffer(data : Buffer) : Message | ErrorCode{

    const messageType = data.readInt16BE(0)

    // the first two bits are 0
    if ((messageType & 0xC000) > 0) return {code: 400, message: 'First two bytes not zero'}

    // the magic cookie field has the correct value
    if (data.readUInt32BE(4) != MAGIC_COOKIE) return { code: 400, message: 'Cookie field incorrect'}

    // the message length is sensible
    if (data.readInt16BE(2) != data.length - 20) return { code: 400, message: 'The message length was incorrect'}

    // the method value is a supported method
    if (! (data.readInt16BE(0) in REQUEST_TYPES)) return { code: 420, message: 'Server doesn\'t support this attribute'}

    const requestType = REQUEST_TYPES[(messageType & 0xfeef)]
    const className = CLASSES[(messageType & 0x0110)]
    const transactionId = data.subarray(8, 20)

    return new Message(requestType, className, transactionId)
  }

  addAttribute(attribute : Attribute) : void{
    this.attributes.push(attribute)
  }

  /**
   *  Encodes STUN message to bytes following protocol of header like this:
   *
   *  0                   1                   2                   3
   *  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   *  |0 0|     STUN Message Type     |         Message Length        |
   *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   *  |                         Magic Cookie                          |
   *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   *  |                                                               |
   *  |                     Transaction ID (96 bits)                  |
   *  |                                                               |
   *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   */
  toBuffer() : Buffer {

    const attribute = REQUEST_TYPES_BYTES[this.requestType]
    const classType = CLASSES_BYTES[this.className]

    const attributesBytes = this.attributes.map(attribute => [...attribute.toBuffer()]).flat()

    const messageType = [attribute[0] | classType[0], attribute[1] | classType[1]]
    const messageLength =  [(attributesBytes.length & 0xff00) >> 8, (attributesBytes.length & 0x00ff)]


    logger.info(JSON.stringify(this.attributes[0]))


    return Buffer.from([
      ...messageType,
      ...messageLength,
      ...MAGIC_COOKIE_BYTES,
      ...this.transactionId,
      ...attributesBytes
    ])
  }



}
