"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const main_1 = require("../src/main");
const stunMessage_1 = require("../src/stunMessage");
describe('greeter function', () => {
    // Read more about fake timers
    // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
    jest.useFakeTimers();
    const name = 'John';
    let hello;
    // Act before assertions
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const p = main_1.greeter(name);
        jest.runOnlyPendingTimers();
        hello = yield p;
    }));
    // Assert if setTimeout was called properly
    it('delays the greeting by 2 seconds', () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), main_1.Delays.Long);
    });
    // Assert greeter result
    it('greets a user with `Hello, {name}` message', () => {
        expect(hello).toBe(`Hello, ${name}`);
    });
});
describe("STUN message", () => {
    it('parse a frame header from buffer', () => {
        const generateBytes = (n) => [...Array(n)].map(() => Math.floor(Math.random() * (256)));
        const requestType = [0x00, 0x06];
        const messageLength = [0x00, 0xA0];
        const magicCookie = [0x21, 0x12, 0xA4, 0x42];
        const transactionId = generateBytes(12);
        const testHeader = Buffer.from([...requestType, ...messageLength, ...magicCookie, ...transactionId]);
        // expect(exampleHeader).toBe(exampleHeader.toString('hex'))
        const stunMessage = stunMessage_1.StunMessage.fromHeader(testHeader);
        expect(stunMessage).toMatchObject(new stunMessage_1.StunMessage("USERNAME", 160, Buffer.from(transactionId)));
    });
});
//# sourceMappingURL=main.test.js.map