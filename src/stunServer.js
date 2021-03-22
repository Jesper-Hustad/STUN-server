"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StunServer = void 0;
const net = require("net");
const logger_1 = require("./util/logger");
const stunMessage_1 = require("./stunMessage");
class StunServer {
    constructor() {
        this.PORT = 3478;
        // const net = require('net');
        this.server = net.createServer((c) => {
            logger_1.logger.info("client connected");
            c.on('end', () => {
                logger_1.logger.info('client disconnected');
            });
            c.write('hello\r\n');
            c.on('data', StunServer.handleRequest);
        });
        this.server.on('error', (err) => { throw err; });
    }
    /**
     * Starts the STUN server on port 3478 according to the [RFC 5389 spec]{@link https://tools.ietf.org/html/rfc5389#section-9}
     */
    start() {
        this.server.listen(this.PORT, () => logger_1.logger.info(`server bound to port: ${this.PORT}`));
    }
    static handleRequest(data) {
        logger_1.logger.debug(data.toString('hex'));
        const headerData = data.subarray(0, 160);
        const stunMessage = stunMessage_1.StunMessage.fromHeader(headerData);
        logger_1.logger.debug(JSON.stringify(stunMessage));
    }
}
exports.StunServer = StunServer;
//# sourceMappingURL=stunServer.js.map