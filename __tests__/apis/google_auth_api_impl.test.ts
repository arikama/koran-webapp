import '@testing-library/react'

import { GoogleAuthApi } from '../../src/apis/google_auth_api'
import { GoogleAuthApiImpl } from '../../src/apis/google_auth_api_impl'

describe('GoogleAuthApiImpl', () => {
  test('auth', async () => {
    const googleAuthApi: GoogleAuthApi = new GoogleAuthApiImpl()

    const user = await googleAuthApi.auth('code')

    expect(user.email).toEqual('amir.ariffin@google.com')
    expect(user.token).toEqual('codecode')
    expect(user.name).toEqual('Amir')
    expect(user.picture).toEqual('')
  })
})
