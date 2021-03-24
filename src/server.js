"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StunServer = void 0;
const udp = require("dgram");
const logger_1 = require("./util/logger");
const stunMessage_1 = require("./stunMessage");
class StunServer {
    constructor() {
        this.PORT = 3478;
        // const net = require('net');
        this.server = udp.createSocket('udp4');
        this.server.on('message', StunServer.handleRequest);
        // this.server = net.createServer((c) => {
        //
        //   logger.info("client connected");
        //
        //   c.on('end', () => {
        //     logger.info('client disconnected');
        //   });
        //
        //   c.write('hello\r\n');
        //
        //   c.on('data', StunServer.handleRequest)
        // });
        this.server.on('listening', () => logger_1.logger.info(`SSserver listening ${this.server.address().address}:${this.server.address().port}`));
        this.server.on('error', (err) => { throw err; });
    }
    /**
     * Starts the STUN server on port 3478 according to the [RFC 5389 spec]{@link https://tools.ietf.org/html/rfc5389#section-9}
     */
    start() {
        this.server.bind(this.PORT);
    }
    static handleRequest(data) {
        logger_1.logger.debug(data.toString('hex'));
        const stunMessage = stunMessage_1.StunMessage.fromHeader(data.subarray(0, 20));
        logger_1.logger.debug(JSON.stringify(stunMessage));
    }
}
exports.StunServer = StunServer;
//# sourceMappingURL=stunServer.js.map