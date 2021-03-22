import { Delays, greeter } from '../src/main';
import { StunMessage } from '../src/stunMessage';


describe('greeter function', () => {

  // Read more about fake timers
  // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  const name = 'John';
  let hello: string;

  // Act before assertions
  beforeAll(async () => {
    const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    hello = await p;
  });

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      Delays.Long,
    );
  });

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});

describe("STUN message", () => {



  it('parse a frame header from buffer', () => {

    const generateBytes = (n) : number[] => [...Array(n)].map(() => Math.floor(Math.random() * (256)))

    const requestType = [0x00,0x06]
    const messageLength = [0x00,0xA0]
    const magicCookie = [0x21, 0x12 ,0xA4, 0x42]
    const transactionId = generateBytes(12)

    const testHeader = Buffer.from([...requestType,  ...messageLength,  ...magicCookie, ...transactionId])

    // expect(exampleHeader).toBe(exampleHeader.toString('hex'))

    const stunMessage = StunMessage.fromHeader(testHeader)
    expect(stunMessage).toMatchObject(
      new StunMessage(
        "USERNAME",
        160,
        Buffer.from(transactionId)
      )
    )
  })
})