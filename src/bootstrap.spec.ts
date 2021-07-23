import { bootstrap } from '@/bootstrap'

describe('bootstrap should', () => {
  it('return an empty object', () => {
    expect(bootstrap()).toStrictEqual({})
  })
})
