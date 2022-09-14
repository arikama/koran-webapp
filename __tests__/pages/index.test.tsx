import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IndexPage, { getStaticProps } from './../../src/pages/index'

import type { Props } from './../../src/pages/index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('IndexPage', () => {
  test('render', async () => {
    const result = await getStaticProps({}) as unknown as { props: Props }
    render(<IndexPage surahInfos={result.props.surahInfos} />)

    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(await screen.findByText('The Opening')).toBeInTheDocument()
    expect(await screen.findByText('ٱلْفَاتِحَة')).toBeInTheDocument()

    expect(await screen.findByText('114')).toBeInTheDocument()
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

    const result = await getStaticProps({}) as unknown as { props: Props }
    render(<IndexPage surahInfos={result.props.surahInfos} />)

    await userEvent.click(await screen.findByText('The Opening'))
    expect(pushMock).toBeCalledWith('/surahs/1')
  })
})
