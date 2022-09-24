import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IndexPage, { getStaticProps } from './../../src/pages/index'

import type { SurahInfo } from '../../src/types/surah_info'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('IndexPage', () => {
  test('render', async () => {
    const result = await getStaticProps({}) as unknown as { props: { surahInfos: SurahInfo[] } }
    render(<IndexPage surahInfos={result.props.surahInfos} />)

    expect(((await screen.findAllByText('1')).length)).not.toEqual(0)
    expect(await screen.findByText('The Opening')).toBeInTheDocument()
    expect(await screen.findByText('ٱلْفَاتِحَة')).toBeInTheDocument()

    expect(((await screen.findAllByText('114')).length)).not.toEqual(0)
    expect(await screen.findByText('Mankind')).toBeInTheDocument()
    expect(await screen.findByText('ٱلنَّاس')).toBeInTheDocument()
  })

  test('clicking surah', async () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => {
      return {
        push: pushMock
      }
    })

    const result = await getStaticProps({}) as unknown as { props: { surahInfos: SurahInfo[] } }
    render(<IndexPage surahInfos={result.props.surahInfos} />)

    await userEvent.click(await screen.findByText('The Opening'))
    expect(pushMock).toBeCalledWith('/surahs/1')
  })

  test('clicking shortcut', async () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => {
      return {
        push: pushMock
      }
    })

    const result = await getStaticProps({}) as unknown as { props: { surahInfos: SurahInfo[] } }
    render(<IndexPage surahInfos={result.props.surahInfos} />)

    const found = await screen.findAllByText('114')
    await userEvent.click(found[0])
    expect(pushMock).toBeCalledWith('/#114')
  })
})
