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
        const magicCookie = header.readUInt32BE(4);
        if (StunMessage.MAGIC_COOKIE != magicCookie)
            throw 'Incorrect magic cookie';
        const stunMessage = new StunMessage();
        stunMessage.REQUEST_TYPE = StunMessage.STUN_ATTRIBUTES[header.readInt16BE()];
        stunMessage.MESSAGE_LENGTH = header.readInt16BE(2);
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
    MAGIC_COOKIE: [4, 8],
    TRANSACTION_ID: [8, 20]
};
StunMessage.MAGIC_COOKIE = 0x2112A442;
//# sourceMappingURL=stunMessage.js.map