import { UserApiImpl } from "../../src/apis/user_api_impl"
import { server } from '../../mocks/server'

describe('UserApiImpl', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  const userApiImpl = new UserApiImpl()

  test('getUserPointer', async () => {
    const actual = await userApiImpl.getUserPointer('email', 'token')
    expect(actual).toEqual('1:1')
  })

  test('advanceUserPointer', async () => {
    const actual = await userApiImpl.advanceUserPointer('email', 'token')
    expect(actual).toEqual('1:2')
  })
})
