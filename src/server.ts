import * as udp  from 'dgram'
import { logger } from './util/logger';
import { StunMessage } from './stunMessage';




export class StunServer{

  private readonly PORT = 3478;
  private server;

  constructor() {
    // const net = require('net');
    this.server = udp.createSocket('udp4')

    this.server.on('message', (d) => {
      logger.info(`${d}`)
      this.handleRequest(d)
    });

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
    this.server.on('listening', () =>
      logger.info(`A server listening ${this.server.address().address}:${this.server.address().port}`)
    )

    this.server.on('error', (err) => {throw err });
  }

  /**
   * Starts the STUN server on port 3478 according to the [RFC 5389 spec]{@link https://tools.ietf.org/html/rfc5389#section-9}
   */
  start(): void {

    this.server.bind(this.PORT);

  }


  private handleRequest(data : Buffer): void {

    logger.info("connection happened")
    logger.info(data.toString('hex'))

    const stunMessage = StunMessage.fromHeader(data.subarray(0,20))

    logger.info(JSON.stringify(stunMessage))
  }

}

