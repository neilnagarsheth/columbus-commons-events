import { verifySignatureFromRequest } from './auth';

describe('Auth', () => {
  let oldSigningKey

  beforeEach(() => {
    oldSigningKey = process.env.SIGNING_SECRET;
    process.env.SIGNING_SECRET = '83252398sfsefsef';
  });

  afterEach(() => {
    process.env.SIGNING_SECRET = oldSigningKey;
  })

  const request = {
    header: (key) => {
      const headers = {
        'x-slack-signature': 'v0:0cfc53cf5cfe388e83b245df6010a122e116f3ffc57d6b5b725fdcb62934b5f1',
        'x-slack-timestamp': '4252323255'
      };
      return headers[key];
    },
    body: {
      text: 'some text',
      command: 'some command'
    },
  }
  test('invalid signature from header', () => {
    expect(() => {
      verifySignatureFromRequest(request);
    }).toThrow('Request not permitted');
  });
});