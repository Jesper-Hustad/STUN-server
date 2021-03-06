const REQUEST_TYPES = {
  0x0001 : "MAPPED-ADDRESS",
  0x0006 : "USERNAME",
  0x0008 : "MESSAGE-INTEGRITY",
  0x0009 : "ERROR-CODE",
  0x000A : "UNKNOWN-ATTRIBUTES",
  0x0014 : "REALM",
  0x0015 : "NONCE",
  0x0020 : "XOR-MAPPED-ADDRESS",
  0x8022 : "SOFTWARE",
  0x8023 : "ALTERNATE-SERVER",
  0x8028 : "FINGERPRINT",
}

const REQUEST_TYPES_BYTES = {
   "MAPPED-ADDRESS" : [0x00, 0x01],
   "USERNAME" : [0x00, 0x06],
   "MESSAGE-INTEGRITY" : [0x00, 0x08],
   "ERROR-CODE" : [0x00, 0x09],
   "UNKNOWN-ATTRIBUTES" : [0x00, 0x0A],
   "REALM" : [0x00, 0x14],
   "NONCE" : [0x00, 0x15],
   "XOR-MAPPED-ADDRESS" : [0x00, 0x20],
   "SOFTWARE" : [0x80, 0x22],
   "ALTERNATE-SERVER" : [0x80, 0x23],
   "FINGERPRINT" : [0x80, 0x28],
}

const CLASSES = {
  0x0000 : "REQUEST",
  0x0010 : "INDICATION",
  0x0100 : "SUCCESS-RESPONSE",
  0x0110 : "ERROR-RESPONSE"
}

const CLASSES_BYTES = {
  "REQUEST" : [0x00, 0x00],
  "INDICATION" : [0x00, 0x10],
  "SUCCESS-RESPONSE" : [0x01, 0x00],
  "ERROR-RESPONSE" : [0x01, 0x10]
}

const MAGIC_COOKIE = 0x2112A442
const MAGIC_COOKIE_BYTES = [0x21, 0x12, 0xA4, 0x42]

export {REQUEST_TYPES, CLASSES, REQUEST_TYPES_BYTES, CLASSES_BYTES, MAGIC_COOKIE, MAGIC_COOKIE_BYTES}
