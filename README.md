![example workflow](https://github.com/Jesper-Hustad/STUN-server/actions/workflows/main.yml/badge.svg)
# STUN-server


Navn på STUN-serveren og eventuell lenke til siste continuous integration/deployment kjøring

Introduksjon
## Introduction

You can test the STUN server that is running live at `stun:stun.jesperhustad.com:3478` at [this](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) website by the Google/WebRTC foundation.

There is a simple demo client i made to see it working [here](https://jesper-hustad.github.io/STUN-server/client/index.html)



## Implemented functionality
- XOR Mapped address
- Error response 
- Unit tests
- Linting
- YAML Actions
- Documentation
- Simple client
- Extendable classes
- Implemented with scale 
- Written in typescript


## Future goals
- Add more STUN features from the RFC standards
- Implement signaling server


## Limitations
- Missing features from the specifications
- Implement more tests


## Setup
To install and run the stun server
```
git clone https://github.com/Jesper-Hustad/STUN-server.git
cd STUN-server
npm install
npm start
2021-03-24 16:15:40,992 INFO [server] Listening on port 3478
```

## Tests
To run test follow setup instructions above and run
```
~$ npm test

 PASS  __tests__/main.test.ts
  STUN message
    √ parses a frame header from buffer correctly (6 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.343 s, estimated 3 s
```



## Documentation
Read trough the [Documentation](https://jesper-hustad.github.io/STUN-server/docs/index.html) for a better understanding of the inner workings of the code.


## External dependencies

- **Typescript Logging:** A simple logging library

## Frameworks

- **Typescript:** Language for type safety in javascript

- **Jest:** Testing framework

- **EsLint:** A linting framework

- **TypeDoc:** Generates documentation 

- **Prettier:** Enforces code format

