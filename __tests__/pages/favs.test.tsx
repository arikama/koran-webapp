import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContext, WireContext } from '../../src/pages/app'
import { FavManagerDummy } from '../../src/managers/fav_manager_dummy'
import FavsPage from '../../src/pages/favs'
import { GoogleAuthApiImpl } from '../../src/apis/google_auth_api_impl'
import { UserApiImpl } from '../../src/apis/user_api_impl'

import { Auth } from '../../src/types/auth'
import type { FavManager } from '../../src/managers/fav_manager'
import type { Wire } from '../../src/types/wire'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('FavsPage', () => {
  let auth: Auth
  let wire: Wire
  let favManager: FavManager

  const isLoggedIn = jest.fn(() => true)
  const push = jest.fn()

  const router = {
    push
  }

  useRouter.mockImplementation(() => (router))

  beforeEach(() => {
    isLoggedIn.mockClear()

    auth = {
      user: undefined,
      isLoggedIn,
      updateUser: jest.fn(),
    }

    wire = {
      koranApi: () => ({
        getSurahInfos: jest.fn(),
        getSurah: jest.fn(),
        getVerse: jest.fn((surahId, verseId) => {
          return Promise.resolve({
            key: `${surahId}:${verseId}`,
            verse: `verse ${surahId}:${verseId}`,
            translation: `translation ${surahId}:${verseId}`
          })
        })
      }),
      userApi: () => new UserApiImpl(),
      googleAuthApi: () => new GoogleAuthApiImpl(),
      favManager: () => favManager
    }

    favManager = new FavManagerDummy()
  })

  test('listing & hiding favs', async () => {
    favManager.add("1:2")
    favManager.add("1:1")

    await act(async () => {
      render(
        <AuthContext.Provider value={auth}>
          <WireContext.Provider value={wire}>
            <FavsPage />
          </WireContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(await screen.findByText("hide verse")).toBeInTheDocument()
    expect(await screen.findByText("hide translation")).toBeInTheDocument()

    expect(await screen.findByText("1:1")).toBeInTheDocument()
    expect(await screen.findByText("verse 1:1")).toBeInTheDocument()
    expect(await screen.findByText("translation 1:1")).toBeInTheDocument()

    expect(await screen.findByText("1:2")).toBeInTheDocument()
    expect(await screen.findByText("verse 1:2")).toBeInTheDocument()
    expect(await screen.findByText("translation 1:2")).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(await screen.findByText("hide verse"))
    })

    expect(screen.queryByText("verse 1:1")).not.toBeInTheDocument()
    expect(screen.queryByText("verse 1:2")).not.toBeInTheDocument()

    await act(async () => {
      await userEvent.click(await screen.findByText("hide translation"))
    })

    expect(screen.queryByText("translation 1:1")).not.toBeInTheDocument()
    expect(screen.queryByText("translation 1:2")).not.toBeInTheDocument()

    await act(async () => {
      await userEvent.click(await screen.findByText("1:1"))
    })

    expect(push).toBeCalledWith("/surahs/1#1")
  })

  test('when not logged in', async () => {
    isLoggedIn.mockReturnValue(false)

    await act(async () => {
      render(
        <AuthContext.Provider value={auth}>
          <WireContext.Provider value={wire}>
            <FavsPage />
          </WireContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(push).toBeCalled()
  })
})
