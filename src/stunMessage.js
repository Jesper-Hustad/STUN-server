"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StunMessage = void 0;
class StunMessage {
    /**
     * Define variables for a STUN message header
     * @param requestType
     * @param messageLength
     * @param magicCookie
     * @param transactionId
     */
    constructor(requestType, messageLength, transactionId) {
        if (requestType == undefined)
            return;
        this.REQUEST_TYPE = requestType;
        this.MESSAGE_LENGTH = messageLength;
        this.TRANSACTION_ID = transactionId;
    }
    /**
     * Generate a STUN message from existing header
     * @param header
     */
    static fromHeader(header) {
        const stunMessage = new StunMessage();
        // const messageTypeNumber = header.subarray(...StunMessage.HEADER_DATA.MESSAGE_TYPE)
        stunMessage.REQUEST_TYPE = StunMessage.STUN_ATTRIBUTES[header.readInt16BE()];
        stunMessage.MESSAGE_LENGTH = header.readInt16BE(2);
        if (header.subarray(...StunMessage.HEADER_DATA.MAGIC_COOKIE) != StunMessage.MAGIC_COOKIE)
            throw 'Incorrect magic cookie';
        stunMessage.TRANSACTION_ID = header.subarray(...StunMessage.HEADER_DATA.TRANSACTION_ID);
        return stunMessage;
    }
}
exports.StunMessage = StunMessage;
StunMessage.STUN_ATTRIBUTES = {
    0x0001: "MAPPED-ADDRESS",
    0x0006: "USERNAME",
    0x0008: "MESSAGE-INTEGRITY",
    0x0009: "ERROR-CODE",
    0x000A: "UNKNOWN-ATTRIBUTES",
    0x0014: "REALM",
    0x0015: "NONCE",
    0x0020: "XOR-MAPPED-ADDRESS",
    0x8022: "SOFTWARE",
    0x8023: "ALTERNATE-SERVER",
    0x8028: "FINGERPRINT",
};
StunMessage.HEADER_DATA = {
    MESSAGE_TYPE: [0, 1],
    MESSAGE_LENGTH: [2, 3],
    MAGIC_COOKIE: [4, 7],
    TRANSACTION_ID: [8, 20]
};
StunMessage.MAGIC_COOKIE = Buffer.from([0x21, 0x12, 0xA4, 0x42]);
//# sourceMappingURL=stunMessage.js.map