import { FavApiImpl } from "../../src/apis/fav_api_impl"
import { FavManagerImpl } from "../../src/managers/fav_manager_impl"

import type { FavApi } from "../../src/apis/fav_api"

describe("FavManagerImpl", () => {
  const removeFn = jest.fn()
  const listFn = jest.fn()

  const favApi: FavApi = {
    add: jest.fn(async (surah, verse) => [{
      id: 1,
      surah,
      verse
    }]),
    remove: removeFn,
    list: listFn
  }

  let favManagerImpl: FavManagerImpl

  beforeEach(() => {
    removeFn.mockClear()
    listFn.mockClear()

    favManagerImpl = new FavManagerImpl(favApi)
  })

  test("add", async () => {
    const favs = await favManagerImpl.add('1:1')

    expect(favApi.add).toBeCalledWith(1, 1)
    expect(favs.size).toBe(1)
    expect(favs.has('1:1')).toBeTruthy()
  })

  test("remove", async () => {
    listFn.mockReturnValueOnce(Promise.resolve([
      {
        id: 1337,
        surah: 1,
        verse: 1
      }
    ]))

    listFn.mockReturnValueOnce(Promise.resolve([]))

    const favs = await favManagerImpl.remove('1:1')

    expect(favApi.remove).toBeCalledWith(1337)
    expect(favs.size).toBe(0)
  })

  test("get", async () => {
    listFn.mockReturnValueOnce(Promise.resolve([
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
    ]))

    listFn.mockReturnValueOnce(Promise.resolve([]))

    const favs = await favManagerImpl.get()

    expect(favs.size).toBe(2)
    expect(favs.has("1:1"))
    expect(favs.has("1:2"))
  })
})
