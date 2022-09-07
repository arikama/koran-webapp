import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'whatwg-fetch'

import IndexPage, { getStaticProps } from './../../src/pages/index'
import type { Props } from './../../src/pages/index'

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
})
