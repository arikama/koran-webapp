import { FavManagerDummy } from "../../src/managers/fav_manager_dummy"

describe("FavManagerDummy", () => {
  let favManagerDummy: FavManagerDummy

  beforeEach(() => {
    favManagerDummy = new FavManagerDummy()
  })

  test("add, remove, & get", async () => {
    let favs = await favManagerDummy.add('1:1')

    expect(favs.size).toBe(1)
    expect(favs.has('1:1')).toBeTruthy()

    favs = await favManagerDummy.remove('1:1')

    expect(favs.size).toBe(0)

    await favManagerDummy.add('1:1')
    await favManagerDummy.add('1:2')
    favs = await favManagerDummy.get()

    expect(favs.size).toBe(2)
    expect(favs.has("1:1"))
    expect(favs.has("1:2"))
  })
})
