import { UserApiImpl } from "../../src/apis/user_api_impl"

describe('UserApiImpl', () => {
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
