import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/index'
import '@testing-library/jest-dom'

describe('HomePage', () => {
  test('render', async () => {
    const surahs = [
      {
        id: 1,
        title: 'The Opening',
        arabic: 'ٱلْفَاتِحَة'
      },
      {
        id: 2,
        title: 'The Calf',
        arabic: 'ٱلْبَقَرَة'
      }
    ]
    render(<HomePage surahs={surahs} />)

    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(await screen.findByText('The Opening')).toBeInTheDocument()
    expect(await screen.findByText('ٱلْفَاتِحَة')).toBeInTheDocument()

    expect(await screen.findByText('2')).toBeInTheDocument()
    expect(await screen.findByText('The Calf')).toBeInTheDocument()
    expect(await screen.findByText('ٱلْبَقَرَة')).toBeInTheDocument()
  })
})
