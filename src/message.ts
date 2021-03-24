export class StunMessage{

  static readonly STUN_ATTRIBUTES = {
    0x0001 : "MAPPED-ADDRESS",
    0x0006 : "USERNAME",
    0x0008 : "MESSAGE-INTEGRITY",
    0x0009 : "ERROR-CODE",
    0x000A : "UNKNOWN-ATTRIBUTES",
    0x0014 : "REALM",
    0x0015 : "NONCE",
    0x0020 : "XOR-MAPPED-ADDRESS",
    0x8022 : "SOFTWARE",
    0x8023 : "ALTERNATE-SERVER",
    0x8028 : "FINGERPRINT",
  }

  static HEADER_DATA = {
    MESSAGE_TYPE : [0, 1],
    MESSAGE_LENGTH : [2, 3],
    MAGIC_COOKIE : [4, 8],
    TRANSACTION_ID : [8, 20]
  }

  REQUEST_TYPE : string
  MESSAGE_LENGTH : number;
  TRANSACTION_ID : Buffer;

  static readonly MAGIC_COOKIE = 0x2112A442

  /**
   * Define variables for a STUN message header
   * @param requestType
   * @param messageLength
   * @param magicCookie
   * @param transactionId
   */
  constructor(requestType?: string, messageLength?: number, transactionId?: Buffer) {

    if(requestType == undefined) return

    this.REQUEST_TYPE = requestType
    this.MESSAGE_LENGTH = messageLength
    this.TRANSACTION_ID = transactionId
  }


  /**
   * Generate a STUN message from existing header
   * @param header
   */
  static fromHeader(header : Buffer) : StunMessage{

    const magicCookie = header.readUInt32BE(4)
    if (StunMessage.MAGIC_COOKIE != magicCookie) throw 'Incorrect magic cookie'

    const stunMessage = new StunMessage()

    stunMessage.REQUEST_TYPE = StunMessage.STUN_ATTRIBUTES[header.readInt16BE()]
    stunMessage.MESSAGE_LENGTH = header.readInt16BE(2)
    stunMessage.TRANSACTION_ID = header.subarray(...StunMessage.HEADER_DATA.TRANSACTION_ID)

    return stunMessage
  }

}
