import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { AuthContext, WireContext } from "../../src/pages/_app"
import BookmarkPage from "../../src/pages/bookmark"
import { act } from "react-dom/test-utils"
import { getDefaultUser } from '../../src/testutils/get_default_user'

import type { Auth } from "../../src/types/auth"
import type { Verse } from "../../src/types/verse"
import type { Wire } from "../../src/types/wire"

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe("BookmarkPage", () => {
  const koranApiMock = jest.fn()
  const userApiMock = jest.fn()
  const googleAuthApiMock = jest.fn()

  const updateUserMock = jest.fn()
  const isLoggedInMock = jest.fn()

  beforeEach(() => {
    koranApiMock.mockReset()
    userApiMock.mockReset()
    googleAuthApiMock.mockReset()

    updateUserMock.mockReset()
    isLoggedInMock.mockReset()
  })

  test("clicking next button", async () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock
    }))

    const advanceUserPointerMock = jest.fn()

    const wire: Wire = {
      koranApi: () => ({
        getSurahInfos: jest.fn(),
        getSurah: jest.fn(),
        getVerse: jest.fn().mockImplementation(async () => {
          const verse: Verse = {
            key: "1:1",
            verse: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "In the name of God, the Gracious, the Merciful."
          }
          return verse
        })
      }),
      userApi: () => ({
        getUserPointer: jest.fn().mockImplementation(async () => {
          return "1:1"
        }),
        advanceUserPointer: advanceUserPointerMock.mockImplementation(async () => {
          return "1:2"
        }),
      }),
      googleAuthApi: googleAuthApiMock
    }

    const auth: Auth = {
      user: getDefaultUser(),
      updateUser: updateUserMock,
      isLoggedIn: isLoggedInMock.mockImplementation(() => true)
    }

    render(
      <WireContext.Provider value={wire}>
        <AuthContext.Provider value={auth}>
          <BookmarkPage />
        </AuthContext.Provider>
      </WireContext.Provider>
    )

    expect(await screen.findByText("1:1")).toBeInTheDocument()

    const nextButton = await screen.findByText("Next")
    await userEvent.click(nextButton)

    expect(advanceUserPointerMock).toBeCalledWith("amir.ariffin@google.com", "token")
    expect(await screen.findByText("1:2")).toBeInTheDocument()

    const verseId = await screen.findByText("1:2")
    await userEvent.click(verseId)

    expect(pushMock).toBeCalledWith('/surahs/1#1')
  })

  test("when not logged in", async () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock
    }))

    const advanceUserPointerMock = jest.fn()

    const wire: Wire = {
      koranApi: () => ({
        getSurahInfos: jest.fn(),
        getSurah: jest.fn(),
        getVerse: jest.fn()
      }),
      userApi: () => ({
        getUserPointer: jest.fn(),
        advanceUserPointer: advanceUserPointerMock,
      }),
      googleAuthApi: googleAuthApiMock
    }

    const auth: Auth = {
      updateUser: updateUserMock,
      isLoggedIn: isLoggedInMock.mockImplementation(() => false)
    }

    render(
      <WireContext.Provider value={wire}>
        <AuthContext.Provider value={auth}>
          <BookmarkPage />
        </AuthContext.Provider>
      </WireContext.Provider>
    )

    expect(pushMock).toBeCalledWith('/')
  })
})
