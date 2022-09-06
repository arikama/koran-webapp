import { render, screen } from '@testing-library/react'
import HomePage, { getStaticProps } from '../../src/pages/index'
import '@testing-library/jest-dom'
import 'whatwg-fetch'

import type { Props } from '../../src/pages/index'

describe('HomePage', () => {
  test('render', async () => {
    const result = await getStaticProps({}) as unknown as { props: Props }
    render(<HomePage surahs={result.props.surahs} />)

    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(await screen.findByText('The Opening')).toBeInTheDocument()
    expect(await screen.findByText('ٱلْفَاتِحَة')).toBeInTheDocument()

    expect(await screen.findByText('114')).toBeInTheDocument()
    expect(await screen.findByText('Mankind')).toBeInTheDocument()
    expect(await screen.findByText('ٱلنَّاس')).toBeInTheDocument()
  })
})
