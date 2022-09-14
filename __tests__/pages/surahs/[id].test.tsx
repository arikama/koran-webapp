import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SurahPage, { getStaticPaths, getStaticProps } from './../../../src/pages/surahs/[id]'

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
})
