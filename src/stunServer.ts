import * as net from "net";
import { logger } from './util/logger';
import { StunMessage } from './stunMessage';



export class StunServer{

  private readonly PORT = 3478;
  private server : net.Server;

  constructor() {
    // const net = require('net');
    this.server = net.createServer((c) => {

      logger.info("client connected");

      c.on('end', () => {
        logger.info('client disconnected');
      });

      c.write('hello\r\n');

      c.on('data', StunServer.handleRequest)
    });

    this.server.on('error', (err) => {throw err });
  }

  /**
   * Starts the STUN server on port 3478 according to the [RFC 5389 spec]{@link https://tools.ietf.org/html/rfc5389#section-9}
   */
  start(): void {

    this.server.listen(this.PORT, () =>
      logger.info(`server bound to port: ${this.PORT}`)
    );
  }


  private static handleRequest(data : Buffer): void {
    logger.debug(data.toString('hex'))

    const headerData = data.subarray(0,160)
    const stunMessage = StunMessage.fromHeader(headerData)

    logger.debug(JSON.stringify(stunMessage))
  }

}

