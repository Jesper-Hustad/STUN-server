// import { Delays, greeter } from '../src/main';
import { Message } from '../src/message';

describe("STUN message", () => {


  it('parses a frame header from buffer correctly', () => {

    const generateBytes = (n) : number[] => [...Array(n)].map(() => Math.floor(Math.random() * (256)))

    const requestType = [0x00,0x06]
    const messageLength = [0x00,0x00]
    const magicCookie = [0x21, 0x12 ,0xA4, 0x42]
    const transactionId = generateBytes(12)

    const testHeader = Buffer.from([...requestType,  ...messageLength,  ...magicCookie, ...transactionId])



    const stunMessage = Message.fromBuffer(testHeader)

    expect(stunMessage).toMatchObject(
      new Message(
        "USERNAME",
        "REQUEST",
        Buffer.from(transactionId)
      )
    )

  })
})

