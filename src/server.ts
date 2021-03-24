import * as udp  from 'dgram'
import { logger } from './util/logger';
import { Message } from './message';
import { XorMappedAddress } from './attributes/xorMappedAddress';
import { ErrorResponse } from './attributes/errorResponse';
// import { Attribute } from './attributes/attribute';
import { ErrorCode, rinfo } from './util/interfaces';

export class Server {

  private readonly PORT = 3478;
  private server;

  constructor() {
    // const net = require('net');
    this.server = udp.createSocket('udp4')

    this.server.on('message', (d, i) => {
      logger.info(`${d}`)
      this.handleRequest(d, i)
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
    //   c.on('data', Server.handleRequest)
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


  private handleRequest(data : Buffer, info : rinfo): void {

    logger.info("connection happened")
    logger.info(data.toString('hex'))

    const stunMessage = Message.fromBuffer(data)

    logger.info(JSON.stringify(stunMessage))

    const response = Server.processRequest(stunMessage, info)

    logger.info(info.address)

    // info.port
    this.server.send(response.toBuffer(), 3478, info.address)

  }


  private static processRequest(message : Message | ErrorCode, info : rinfo) : Message {

    if(message instanceof ErrorCode) {

      const error = message

      const type = "ERROR-CODE"
      const className = "ERROR-RESPONSE"
      const value =  new Buffer([new Array(12).fill(0)])

      const response = new Message(type, className, value)
      response.addAttribute(new ErrorResponse(error))

      return response
    }

    message.className = "SUCCESS-RESPONSE"

    switch (message.requestType) {

      case "MAPPED-ADDRESS": message.addAttribute(new XorMappedAddress(info)); break


      // EXAMPLE of future functionality:
      // case "ALTERNATE-SERVER": message.addAttribute(new Attribute("",[])); break
      //
      // case "SOFTWARE": message.addAttribute(new Attribute("",[])); break
      //
      // case "USERNAME": message.addAttribute(new Attribute("",[])); break

    }

    return message

  }


}
