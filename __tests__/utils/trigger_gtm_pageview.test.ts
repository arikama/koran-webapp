import { triggerGtmPageview } from "../../src/utils/trigger_gtm_pageview"

describe('', () => {
  test('', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = {
      push: mockPushFn
    }

    triggerGtmPageview()
    expect(mockPushFn).toBeCalledTimes(1)
  })

  test('', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = undefined

    triggerGtmPageview()
    expect(mockPushFn).toBeCalledTimes(1)
  })
})
