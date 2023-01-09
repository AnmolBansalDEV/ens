import { RESOLVER_ADDRESSES } from './constants'

describe('RESOLVER_ADDRESSES', () => {
  it('should have the most recent resolver as the first address', () => {
    expect(RESOLVER_ADDRESSES['1'][0]).toEqual('0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41')
    expect(RESOLVER_ADDRESSES['1337'][0]).toEqual('0x70e0bA845a1A0F2DA3359C97E0285013525FFC49')
    expect(RESOLVER_ADDRESSES['5'][0]).toEqual('0x3A8b6F310d5D9eB510d7e648Fd4E56Eb16d7fB24')
  })
})
