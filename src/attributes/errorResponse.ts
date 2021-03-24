import { Attribute } from './attribute';
import { ErrorCode } from '../util/interfaces';

/**
 *  A error code type of attribute
 */

export class ErrorResponse extends Attribute {

  constructor(error : ErrorCode) {

    const hundreds = Math.floor(error.code / 100)
    const rest = error.code % 100

    const message = Buffer.from(error.message, 'utf8')

    const value : number[] = [0,0,0, hundreds, rest, ...message]

    super("ERROR-CODE", value);
  }

}
