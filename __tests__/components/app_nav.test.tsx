import { render, screen } from '@testing-library/react'

import { AppNav } from '../../src/components/app_nav'

describe('AppNav', () => {
  test('render', async () => {
    render(<AppNav />)
    expect(await screen.findByText('Koran')).toBeInTheDocument()
  })
})
