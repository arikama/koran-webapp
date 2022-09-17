import { getEmptyUser } from "../../src/utils/get_empty_user"

describe("getEmptyUser", () => {
  test("empty", () => {
    expect(getEmptyUser()).toEqual({
      email: "",
      token: "",
      name: "",
      picture: ""
    })
  })
})
