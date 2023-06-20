import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { AuthContext, WireContext } from "../../src/pages/app"
import BookmarkPage from "../../src/pages/bookmark"
import { getDefaultUser } from '../../src/testutils/get_default_user'

import type { Auth } from "../../src/types/auth"
import { FavManagerDummy } from "../../src/managers/fav_manager_dummy"
import type { Verse } from "../../src/types/verse"
import type { Wire } from "../../src/types/wire"

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe("BookmarkPage", () => {
  const push = jest.fn()
  const router = {
    push
  }
  const isLoggedIn = jest.fn()

  useRouter.mockImplementation(() => (router))

  const wire: Wire = {
    koranApi: () => {
      return {
        getSurahInfos: jest.fn(),
        getSurah: jest.fn(),
        getVerse: (surahId: number, verseId: number) => {
          const key = `${surahId}:${verseId}`
          const verse: Verse = {
            key,
            verse: `${key}:verse`,
            translation: `${key}:translation`
          }
          return Promise.resolve(verse)
        }
      }
    },
    userApi: () => {
      return {
        getUserPointer: () => Promise.resolve("1:1"),
        advanceUserPointer: () => Promise.resolve("1:2")
      }
    },
    googleAuthApi: () => {
      return { auth: () => Promise.resolve(getDefaultUser()) }
    },
    favManager: () => {
      return new FavManagerDummy()
    }
  }

  const auth: Auth = {
    user: getDefaultUser(),
    updateUser: jest.fn(),
    isLoggedIn: isLoggedIn,
  }

  beforeEach(() => {
    push.mockReset()
    isLoggedIn.mockReset()
  })

  test("clicking next", async () => {
    isLoggedIn.mockImplementation(() => true)

    render(
      <WireContext.Provider value={wire}>
        <AuthContext.Provider value={auth}>
          <BookmarkPage />
        </AuthContext.Provider>
      </WireContext.Provider>
    )

    expect(await screen.findByText("1:1")).toBeInTheDocument()
    expect(await screen.findByText("1:1:verse")).toBeInTheDocument()
    expect(await screen.findByText("1:1:translation")).toBeInTheDocument()

    const nextButton = await screen.findByText("Next")
    await userEvent.click(nextButton)

    expect(await screen.findByText("1:2")).toBeInTheDocument()
    expect(await screen.findByText("1:2:verse")).toBeInTheDocument()
    expect(await screen.findByText("1:2:translation")).toBeInTheDocument()
  })

  test("when not logged in", async () => {
    isLoggedIn.mockImplementation(() => false)

    render(
      <WireContext.Provider value={wire}>
        <AuthContext.Provider value={auth}>
          <BookmarkPage />
        </AuthContext.Provider>
      </WireContext.Provider>
    )

    expect(push).toBeCalledWith("/")
  })
})
