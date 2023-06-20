import { FavApiImpl } from "../../src/apis/fav_api_impl"
import { server } from '../../mocks/server'

describe('FavApiImpl', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('valid token', () => {
    const favApiImpl = new FavApiImpl('valid_token')

    test('add', async () => {
      const actual = await favApiImpl.add(1, 1)
      const expected = [
        {
          id: 1,
          surah: 1,
          verse: 1
        }
      ]
      expect(actual).toEqual(expected)
    })

    test('remove', async () => {
      const actual = await favApiImpl.remove(1)
      expect(actual).toEqual([])
    })

    test('list', async () => {
      const actual = await favApiImpl.list()
      expect(actual).toEqual([
        {
          id: 1,
          surah: 1,
          verse: 1
        },
        {
          id: 2,
          surah: 1,
          verse: 2
        }
      ])
    })
  })

  describe('invalid token', () => {
    const favApiImpl = new FavApiImpl('invalid_token')

    test('add', async () => {
      const actual = await favApiImpl.add(1, 1)
      expect(actual).toEqual([])
    })

    test('remove', async () => {
      const actual = await favApiImpl.remove(1)
      expect(actual).toEqual([])
    })

    test('list', async () => {
      const actual = await favApiImpl.list()
      expect(actual).toEqual([])
    })
  })
})
