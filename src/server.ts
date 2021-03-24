import * as udp  from 'dgram'
import { logger } from './util/logger';
import { Message } from './message';
import { XorMappedAddress } from './attributes/xorMappedAddress';
import { ErrorResponse } from './attributes/errorResponse';
import { ErrorCode, rinfo } from './util/interfaces';

/**
 * A STUN server following RFC 5389 protocols
 */
export class Server {

  private readonly PORT = 3478;
  private server;

  constructor() {
    this.server = udp.createSocket('udp4')

    this.server.on('message', this.handleRequest);

    this.server.on('listening', () => logger.info(`Listening ${this.server.address().address}:${this.server.address().port}`))

    this.server.on('error', (err) => {throw err });
  }

  /**
   * Starts the STUN server on port 3478 according to the [RFC 5389 spec]{@link https://tools.ietf.org/html/rfc5389#section-9}
   */
  start(): void {

    this.server.bind(this.PORT);
  }


  /**
   * Decodes received data, creates a response, and sends the response encoded
   * @param data received from client
   * @param info about client
   * @private
   */
  private handleRequest(data : Buffer, info : rinfo): void {

    logger.info(`connection from ${info.address}:${info.port}`)

    const stunMessage = Message.fromBuffer(data)

    const response = Server.processRequest(stunMessage, info)

    this.server.send(response.toBuffer(), info.port, info.address)
  }


  /**
   * Generates different types of stun messages given a request
   * @param message received
   * @param info about udp packet
   * @private
   */
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

    // switch for future attributes
    switch (message.requestType) {

      case "MAPPED-ADDRESS": message.addAttribute(new XorMappedAddress(info)); break

    }

    return message

  }


}
