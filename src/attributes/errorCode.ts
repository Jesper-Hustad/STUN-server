import { Attribute } from './attribute';

/**
 *  A error code type of attribute, encoded like this:
 *
 *  0                   1                   2                   3
 *  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |           Reserved, should be 0         |Class|     Number    |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |      Reason Phrase (variable)                                ..
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 */

export class ErrorCode extends Attribute {

  constructor(error : errorCode) {

    const hundreds = Math.floor(error.code / 100)
    const rest = error.code % 100

    const message = Buffer.from(error.message, 'utf8')

    const value : number[] = [0,0,0, hundreds, rest, ...message]

    super("ERROR-CODE", value);
  }

}
