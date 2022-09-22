import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../../src/components/button'

describe('Button', () => {
  test('clicking on it', async () => {
    const user = userEvent.setup()
    const mockFn = jest.fn()

    render(
      <Button
        onClick={mockFn}
      >
        Google please hire me!
      </Button>
    )

    const button = await screen.findByText('Google please hire me!')
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(mockFn).toBeCalledTimes(1)
  })

  test('clicking on loading button', async () => {
    const user = userEvent.setup()
    const mockFn = jest.fn()

    render(
      <Button
        onClick={mockFn}
        isLoading={true}
      >
        Google please hire me!
      </Button>
    )

    const button = await screen.findByText('Google please hire me!')
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(mockFn).toBeCalledTimes(0)
  })
})
