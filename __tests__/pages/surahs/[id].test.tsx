import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContext, WireContext } from '../../../src/pages/app'
import SurahPage, { getStaticPaths, getStaticProps } from './../../../src/pages/surahs/[id]'
import { FavManagerDummy } from '../../../src/managers/fav_manager_dummy'
import { GoogleAuthApiImpl } from '../../../src/apis/google_auth_api_impl'
import { KoranApiImpl } from '../../../src/apis/koran_api_impl'
import { UserApiImpl } from '../../../src/apis/user_api_impl'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SurahPage', () => {
  test('render', async () => {
    const result: any = await getStaticProps({ params: { id: '1' } })
    render(<SurahPage surah={result.props.surah} />)

    expect(await screen.findByText('1:1')).toBeInTheDocument()
    expect(await screen.findByText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')).toBeInTheDocument()
    expect(await screen.findByText('In the name of God, the Gracious, the Merciful.')).toBeInTheDocument()

    expect(await screen.findByText('1:7')).toBeInTheDocument()
    expect(await screen.findByText('صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ')).toBeInTheDocument()
    expect(await screen.findByText('The path of those You have blessed, not of those against whom there is anger, nor of those who are misguided.')).toBeInTheDocument()
  })

  test('clicking back', async () => {
    const backMock = jest.fn()
    useRouter.mockImplementation(() => ({
      back: backMock
    }))

    const result: any = await getStaticProps({ params: { id: '1' } })
    render(<SurahPage surah={result.props.surah} />)

    await userEvent.click((await screen.findAllByText('back'))[0])
    expect(backMock).toBeCalled()
  })

  test('getStaticPaths', async () => {
    const result: any = await getStaticPaths()
    expect(result.paths.length).toEqual(114)
  })

  test('clicking favorite should show ❤️ afterwards', async () => {
    const result: any = await getStaticProps({ params: { id: '1' } })

    render(
      <AuthContext.Provider
        value={{
          user: undefined,
          isLoggedIn: jest.fn(() => true),
          updateUser: jest.fn(),
        }}
      >
        <WireContext.Provider
          value={{
            koranApi: () => new KoranApiImpl(),
            userApi: () => new UserApiImpl(),
            googleAuthApi: () => new GoogleAuthApiImpl(),
            favManager: () => new FavManagerDummy()
          }}
        >
          <SurahPage surah={result.props.surah} />
        </WireContext.Provider>
      </AuthContext.Provider>
    )

    await userEvent.click((await screen.findAllByText('favorite'))[0])
    await userEvent.click((await screen.findAllByText('❤️'))[0])
  })
})
